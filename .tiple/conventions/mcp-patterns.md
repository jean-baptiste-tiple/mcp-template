# MCP Patterns

> Tag : `mcp`
> Lire ce fichier avant d'écrire un tool MCP, un widget MCP Apps, ou de toucher à `src/mcp/` / `widgets/`.
> Squelette d'implémentation prêt : `.tiple/starters/mcp/` (installé en S01) — chaque fichier du starter référence la section qu'il implémente.
> Les exemples ci-dessous utilisent un domaine fictif (gestion de documents) — adapter au domaine du projet.
> Cibles : **Claude ET ChatGPT dès la V1** — toute règle ci-dessous s'applique aux deux hosts.

## 1. Règle d'or : parité par services partagés

Un tool MCP est un **adaptateur fin** — exactement comme une Server Action. La logique vit dans `lib/services/`.

```typescript
// ❌ Logique métier dans le tool
server.registerTool("archive_document", ..., async (input, extra) => {
  const { data } = await supabase.from("documents").select()...  // NON
})

// ✅ Tool = auth + validation + appel service + mise en forme
server.registerTool("archive_document", {
  title: "Archiver un document",
  description: ARCHIVE_DESC,                   // voir §3
  inputSchema: ArchiveDocumentInput,           // Zod — même schéma que le form web
  annotations: { readOnlyHint: false, idempotentHint: true },
  _meta: widgetMeta("document-preview"),       // voir §5
}, async (input, extra) => {
  const ctx = await requireAuthContext(extra)  // {userId, orgId, role, supabase} — voir §6
  const result = await archiveDocument(ctx, input) // lib/services/document-service.ts
  return toToolResult(result, { widget: "document-preview" })
})
```

Toute nouvelle capacité = 1 fonction service + 2 adaptateurs (action + tool). Si un des deux manque, le dire dans la story.

## 2. AX — le serveur se présente (découverte par l'agent)

L'« Agent Experience » commence à l'`initialize` : c'est là que le modèle apprend qui on est, ce qu'on sait faire et comment enchaîner. Trois niveaux, du global au local :

### 2.1 `serverInfo` + `instructions` (niveau serveur)

- `serverInfo` : `name` court et stable, `title` humain, `version` (semver, bumpé à chaque évolution de tools).
- **`instructions` est OBLIGATOIRE et maintenu** — c'est le "system prompt" du serveur, injecté chez l'host. Il décrit : mission, entités, workflow type, conventions. À rédiger **en anglais** (robustesse cross-host ; les utilisateurs parlent leur langue, le modèle fait le pont). Structure à suivre :

```typescript
instructions: `<Product> manages <entities> for <audience> (multi-tenant).

Core concepts:
- <entité centrale, son cycle de vie, ses invariants (ex: immutabilité des versions)>
- <comment les utilisateurs désignent les entités (par nom ? les tools acceptent les noms et les résolvent)>

Typical workflows:
1. <workflow 1 : enchaînement de tools>
2. <workflow 2>

Rules:
- Prefer tool results' structuredContent.next_actions to decide what to propose next.
- Do not paste large entity JSON into the conversation; widgets display it.
- All operations are scoped to the authenticated user's organization.`
```

- Interdits dans `instructions` et les descriptions : date du jour, contenu par utilisateur, compteurs — tout ce qui varie casse le prompt caching de l'host et pollue la découverte.

### 2.2 Métadonnées de tools (niveau tool)

Voir §3. Le modèle décide **uniquement** sur `name` + `title` + `description` + schéma : c'est notre "SEO agent".

### 2.3 Prompts MCP + starter prompts (niveau utilisateur)

- Exposer des **prompts MCP** (capability `prompts`) pour les parcours canoniques du produit. Dans Claude ils apparaissent comme commandes cliquables → découvrabilité immédiate des cas d'usage.
- Côté ChatGPT, renseigner les starter prompts / golden queries dans les métadonnées de l'app (soumission Apps SDK).

## 3. Design des tools

- **Peu de tools, orientés tâche** (≤ 10). Un tool = une intention ("archiver"), pas un endpoint CRUD.
- **Nommage** : `verb_noun` en anglais, le domaine toujours visible dans le nom (`import_document`, `search_documents`). Les utilisateurs ont d'autres connecteurs : un nom ambigu (`search`, `list`) = mauvais routage garanti.
- **`title` humain** dans la langue des utilisateurs (affiché dans les UI des hosts) ; `name` stable à jamais (voir §10).
- **Descriptions : format imposé** — verbe d'abord, « Use this when… », puis « Do not use for… », l'essentiel dans la première phrase (les modèles tronquent) :

```typescript
const SEARCH_DESC = `Searches the organization's documents by title, author or date range.
Use this when the user asks "les documents de Cédric", "les docs de la semaine", or to resolve
a document name before get_document. Do not use to read a document's content (use get_document).
Returns a paginated list (id, title, updated_at).`
```

- **Inputs** : Zod avec `.describe()` sur CHAQUE champ, enums pour les valeurs fermées, exemples dans la description du champ, défauts explicites. Champs optionnels vraiment optionnels.
- **Annotations** sur chaque tool : `readOnlyHint: true` pour les lectures, `destructiveHint` si suppression, `openWorldHint: false` (on ne touche pas au monde extérieur), `idempotentHint` quand vrai.
- **`securitySchemes` par tool** (exigence ChatGPT pour déclencher l'UI de connexion) : tools authentifiés = `oauth2`. Sans cette déclaration, ChatGPT n'affiche jamais le bouton "Se connecter".
- **Résolution par nom** : les tools acceptent un nom en plus des ids. Ambiguïté (2 résultats) → retourner les candidats possibles dans `structuredContent` et laisser le modèle demander.

## 4. Résultats de tools

Toujours retourner **les deux formes** :

```typescript
return {
  content: [{ type: "text", text: résuméCourtPourLeModèle }],   // 2-4 lignes max
  structuredContent: {                                          // JSON pour le modèle ET le widget
    id, title, status,
    next_actions: ["archive_document", "share_document"],       // le modèle proposera la suite
  },
  _meta: widgetMeta("document-preview"),
}
```

- `structuredContent` est **la** donnée : c'est ce que le modèle peut citer et ce que le widget reçoit (contrat identique sur les deux hosts). Compact : ids + résumé, **jamais** l'entité complète si le widget l'affiche (économie de contexte).
- `next_actions` : liste des tools pertinents après celui-ci — c'est ce qui rend la conversation fluide et l'AX « guidée ».
- **Erreurs actionnables** : pas de throw brut. `isError: true` + message qui dit quoi faire ("Aucun document trouvé pour 'X'. Utiliser search_documents pour lister."). Une erreur est une instruction de récupération pour l'agent, pas un stack trace.

## 5. MCP Apps dual-host (Claude + ChatGPT) — conventions widgets

Standard : **MCP Apps (SEP-1865)** — resources `ui://`, HTML sandboxé, JSON-RPC MCP over postMessage. Claude (et Goose, VS Code) parlent **uniquement** le standard ; ChatGPT parle le standard **plus** ses extensions historiques Apps SDK. D'où :

### 5.1 Déclaration — toujours les deux metas

```typescript
// helpers/widget-meta.ts — SEUL endroit où ces clés apparaissent
export function widgetMeta(name: WidgetName) {
  return {
    "ui/resourceUri": `ui://widgets/${name}.html`,        // standard SEP-1865 (Claude & ChatGPT)
    "openai/outputTemplate": `ui://widgets/${name}.html`, // alias legacy Apps SDK (ChatGPT)
  }
}
// Resource enregistrée avec mimeType text/html (standard) ;
// si ChatGPT l'exige encore, exposer aussi la variante text/html+skybridge — géré dans registerWidget().
```

Règle : **aucun fichier hors `helpers/` ne manipule ces clés**. Quand ChatGPT finira sa convergence vers le standard, on supprime l'alias à UN endroit.

### 5.2 Bridge — un seul module, deux dialectes

- `widgets/shared/bridge.ts` expose une API interne unique : `getToolOutput()`, `callTool(name, args)`, `sendFollowupMessage(text)`, `openExternal(url)`, `getTheme()`.
- Implémentation : postMessage JSON-RPC `ui/*` (standard) avec détection de `window.openai` → délégation aux équivalents Apps SDK quand présent. Les widgets n'importent QUE le bridge, jamais `window.openai` directement.
- Données d'entrée du widget = le `structuredContent` du tool (contrat §4) — identique sur les deux hosts.

### 5.3 Contraintes de build (CSP des hosts)

- Bundle **Vite single-file** : JS/CSS inlinés, images en data-URI, **zéro requête réseau** (pas de CDN, pas de Google Fonts, pas de fetch d'API tierce). Les deux hosts sandboxent l'iframe avec une CSP stricte.
- Exception possible : un widget peut POST sur NOTRE API (même produit) avec un token court fourni par le tool — vérifier que l'origine est autorisée par la CSP du host ; sinon prévoir un fallback texte (le tool le propose).
- Poids cible < 300 Ko par bundle ; si un rendu existe côté web (composant React), le widget importe **le même composant**, pas une copie.
- Thème : lire clair/sombre via le bridge, styler les deux. États loading / vide / erreur obligatoires.
- **Dégradation** : tout tool doit être pleinement utilisable sans widget (le `content` texte suffit). Le widget est un bonus d'ergonomie, jamais le seul canal d'information.

### 5.4 Matrice de test avant push (story taguée `mcp` + widgets)

| Check | Claude | ChatGPT (developer mode) |
|-------|--------|--------------------------|
| Tool visible + description correcte | ✅ | ✅ |
| Widget rendu (standard / alias) | `ui/resourceUri` | `openai/outputTemplate` |
| Actions widget → tool call | bridge standard | bridge + `window.openai` |
| Auth déclenchée si token absent | ✅ | ✅ (exige `securitySchemes` + `_meta["mcp/www_authenticate"]`) |
| Dark mode + resize | ✅ | ✅ |

## 6. Auth OAuth 2.1 (Supabase)

Notre serveur = **resource server** ; Supabase Auth = **authorization server** (OAuth 2.1 Server, DCR activé). À figer par ADR lors du cadrage du projet. Ce qui doit exister et ne jamais régresser :

1. **`/.well-known/oauth-protected-resource`** sur NOTRE domaine (RFC 9728) : `resource` (URL canonique du serveur MCP), `authorization_servers: ["https://<ref>.supabase.co/auth/v1"]`, `scopes_supported`, `resource_documentation` (→ notre page /connect). C'est LE point d'entrée de la découverte auth des deux hosts.
2. **401 + header `WWW-Authenticate`** pointant la metadata ci-dessus sur toute requête non authentifiée — c'est ce qui déclenche le flow OAuth chez l'host. Jamais de "mode dégradé anonyme".
3. **Par tool** : `securitySchemes: oauth2` + en cas de token manquant/invalide, erreur avec `_meta["mcp/www_authenticate"]` (exigence ChatGPT pour afficher l'UI de liaison).
4. **Validation de token dans `src/mcp/auth.ts`** : signature via JWKS Supabase, `iss`, `exp`/`nbf`, scopes ; puis résolution `{userId, orgId, role}` (claims injectés par Custom Access Token Hook Supabase) → client Supabase **au JWT de l'utilisateur** → RLS active dans les tools comme au web. `service_role` interdit.
5. **Redirect URIs autorisés** (dashboard Supabase) : `https://claude.ai/api/mcp/auth_callback` + `https://chatgpt.com/connector/oauth/*`. DCR ouvert = monitorer les clients enregistrés.
6. Les inputs de tools restent **non fiables** (même statut qu'un formulaire public) : Zod partout, appartenance org garantie par RLS + checks service.

## 7. Stateless

- Transport Streamable HTTP **sans session** : pas de `Mcp-Session-Id` persisté, pas de Redis, chaque requête reconstruit le serveur. Tout l'état métier est en Postgres ; l'état conversationnel appartient à l'host. À figer par ADR lors du cadrage.
- Conséquences pratiques : pas de notifications server→client ni de subscriptions resources — ne PAS en introduire sans rouvrir l'ADR. Une opération longue tient dans la requête (`maxDuration` ajusté sur la route) ; si un jour > 60 s → pattern "job + tool de statut", pas du push.

## 8. Golden queries — l'éval AX obligatoire

Jeu de prompts versionné dans `docs/mcp-golden-queries.md` (créé depuis `.tiple/templates/mcp-golden-queries.tmpl.md`), trois catégories :

- **Directs** (nomment l'action) — doivent router vers les bons tools, dans le bon ordre ;
- **Indirects** (décrivent le résultat attendu) — doivent quand même router ;
- **Négatifs** (hors périmètre) — ne doivent PAS déclencher nos tools.

Règles : seed = les prompts d'exemple du brief ; toute story qui ajoute/modifie un tool ou une description ajoute ses golden queries et **rejoue le jeu sur les deux hosts** (Claude + ChatGPT developer mode) ; en cas de mauvais routage, corriger la description — **un champ de métadonnée à la fois**, et noter la révision dans le fichier.

## 9. Onboarding humain (l'autre moitié de l'AX)

- Page **`/connect`** dans l'app web : URL du serveur MCP à copier, guide pas-à-pas par host (Claude : Paramètres → Connecteurs → Ajouter ; ChatGPT : mode développeur / app), les prompts d'exemple à essayer, lien vers l'état de connexion.
- `resource_documentation` de la metadata OAuth pointe cette page ; le README produit aussi.
- Après la première connexion, le premier message de l'utilisateur est guidé par les prompts MCP (§2.3) — l'objectif : **< 2 min entre "j'ajoute le connecteur" et "premier résultat utile"**.

## 10. Tests & évolution

- **Unit** : services sans MCP ; tools via `InMemoryTransport.createLinkedPair()` + `Client` (auth mockée) — vérifier schéma, `structuredContent`, `next_actions`, erreurs actionnables, metas widget (les DEUX clés).
- **Manuel** : MCP Inspector sur `http://localhost:3000/api/mcp` (tools, auth, resources) + matrice §5.4.
- **Évolution** : ajouter un champ optionnel = OK. Renommer/supprimer un tool ou rendre un champ requis = **breaking** → ADR + dépréciation (le tool répond encore avec un message de migration) + notification `listChanged`. Bump `serverInfo.version` à chaque changement de surface.
- Descriptions/schemas **stables** (prompt caching des hosts) ; golden queries rejouées à chaque évolution (§8).
