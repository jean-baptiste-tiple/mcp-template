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

## 4 bis. Pattern « prepare → modèle de l'host → save » (optionnel — si zéro IA serveur)

Quand le produit délègue le travail intelligent (structuration, réécriture, traduction…) au
**modèle de l'host** plutôt qu'à des appels LLM côté serveur (choix à figer par ADR — c'est
l'abonnement de l'utilisateur qui paie, et il voit/corrige en direct), toute opération
intelligente devient un aller-retour :

1. **`prepare_x`** : le serveur fait sa part déterministe (extraction, masquages, garde-fous) et retourne au modèle **les données + des consignes précises et STATIQUES** (constantes versionnées avec le code, ex `src/mcp/prompts/…` — jamais générées dynamiquement par utilisateur).
2. **Le modèle travaille dans le chat** et produit le résultat.
3. **`save_x`** : le serveur est le **garde-fou** — validation Zod stricte + audits déterministes. Rejet = erreur actionnable qui dit exactement quoi corriger ; le modèle réessaie.

Règles : ne JAMAIS faire confiance au contenu produit par le modèle (le save revalide tout, comme un formulaire public) ; les consignes des prepare sont testées par les golden queries ; introduire un appel LLM serveur = rouvrir l'ADR. Implémentation de référence : mcp-cv-editor (import/anonymize/adapt).

## 5. MCP Apps dual-host (Claude + ChatGPT) — conventions widgets

Standard : **MCP Apps (SEP-1865)** — resources `ui://`, HTML sandboxé, JSON-RPC MCP over postMessage. Claude (et Goose, VS Code) parlent **uniquement** le standard ; ChatGPT parle le standard **plus** ses extensions historiques Apps SDK. D'où :

### 5.1 Déclaration — toujours les trois metas + mimeTypes profilés

```typescript
// src/mcp/widget-meta.ts — SEUL endroit où ces clés apparaissent
export function widgetMeta(name: WidgetName) {
  return {
    ui: { resourceUri: `ui://widgets/${name}.html` },     // standard MCP Apps GA 2026-01-26 (Claude, Goose, VS Code)
    "ui/resourceUri": `ui://widgets/${name}.html`,        // alias plat du draft SEP-1865 — déprécié, hosts pré-GA
    "openai/outputTemplate": `ui://widgets/${name}-skybridge.html`, // alias Apps SDK (ChatGPT)
  }
}
```

**MimeTypes (piège vécu)** : la spec GA impose `text/html;profile=mcp-app` sur la resource
(déclaration ET contents de `resources/read`) — un `text/html` nu est **rejeté** par Claude
avec `Unsupported UI resource content format`. ChatGPT attend `text/html+skybridge`.
→ chaque bundle est enregistré en DEUX resources (même HTML) : `ui://widgets/<name>.html`
(`text/html;profile=mcp-app`) et `ui://widgets/<name>-skybridge.html` (`text/html+skybridge`).
CSP : sans `_meta.ui.csp`, le host applique la CSP par défaut (aucune requête externe) — parfait
pour nos bundles single-file ; ne déclarer `csp` que si un domaine externe devient nécessaire.

Règle : **aucun fichier hors `widget-meta.ts` ne manipule ces clés**. Quand ChatGPT finira sa convergence vers le standard, on supprime la variante skybridge à UN endroit.

### 5.2 Bridge — un seul module, deux dialectes

- `widgets/shared/bridge.ts` expose une API interne unique : `getToolOutput()`, `callTool(name, args)`, `sendFollowupMessage(text)`, `openExternal(url)`, `getTheme()`.
- **Protocole GA : utiliser le SDK OFFICIEL `@modelcontextprotocol/ext-apps` (entrée
  `app-with-deps`, autonome) — ne JAMAIS réimplémenter le handshake à la main.** Deux pièges
  vécus (= widget vide, sans erreur) : (1) le host n'envoie RIEN avant `ui/notifications/initialized` ;
  (2) les params d'`ui/initialize` sont validés par schéma — c'est `appInfo`, PAS `clientInfo`,
  et un initialize invalide est rejeté silencieusement. Le SDK gère aussi : tool-result
  (CallToolResult complet → déballer `structuredContent`), host-context (thème), size-changed
  (`autoResize`), `ui/open-link`, `ui/message`, et les requêtes du host (ping). L'entrée
  `app-with-deps` évite le conflit de peer avec le SDK serveur épinglé (mcp-handler).
- Détection de `window.openai` → délégation aux équivalents Apps SDK quand présent. Les widgets n'importent QUE le bridge, jamais `window.openai` directement.
- Données d'entrée du widget = le `structuredContent` du tool (contrat §4) — identique sur les deux hosts.

### 5.3 Contraintes de build (CSP des hosts)

- Bundle **Vite single-file** : JS/CSS inlinés, images en data-URI, **zéro requête réseau** (pas de CDN, pas de Google Fonts, pas de fetch d'API tierce). Les deux hosts sandboxent l'iframe avec une CSP stricte.
- Exception possible : un widget peut POST sur NOTRE API (même produit) avec un token court fourni par le tool — vérifier que l'origine est autorisée par la CSP du host ; sinon prévoir un fallback texte (le tool le propose).
- Poids cible < 300 Ko par bundle ; **jusqu'à ~600 Ko / gzip < 150 Ko assumé** quand le SDK `ext-apps` + des polices embarquées s'ajoutent (mesure réelle cv-preview : ~527 Ko). Si un rendu existe côté web (composant React), le widget importe **le même composant**, pas une copie.
- Bundles **inlinés dans un module généré** (`src/mcp/widgets/generated.ts`, produit par `widgets/build.mjs`) : servis en mémoire par le serveur — zéro lecture fs à runtime, zéro config de tracing Vercel.
- Thème : lire clair/sombre via le bridge, styler les deux. États loading / vide / erreur obligatoires.
- **Dégradation** : tout tool doit être pleinement utilisable sans widget (le `content` texte suffit). Le widget est un bonus d'ergonomie, jamais le seul canal d'information.

### 5.4 Matrice de test avant push (story taguée `mcp` + widgets)

| Check | Claude | ChatGPT (developer mode) |
|-------|--------|--------------------------|
| Tool visible + description correcte | ✅ | ✅ |
| Widget rendu (standard / alias) | `_meta.ui.resourceUri` → `text/html;profile=mcp-app` | `openai/outputTemplate` → `text/html+skybridge` |
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

## 7. Transport : stateless (défaut) ou stateful — ADR obligatoire au cadrage

**Stateless (le défaut du starter)** : Streamable HTTP **sans session** — pas de `Mcp-Session-Id` persisté, pas de Redis, chaque requête reconstruit le serveur (`disableSse: true`). Tout l'état métier est en Postgres ; l'état conversationnel appartient à l'host. Simple, scale-to-zero, parfait Vercel.
- Conséquences : pas de notifications server→client ni de subscriptions resources — ne PAS en introduire sans rouvrir l'ADR. Une opération longue tient dans la requête (`maxDuration` ajusté sur la route) ; si un jour > 60 s → pattern "job + tool de statut", pas du push.

**Stateful (si le produit l'exige)** : sessions `Mcp-Session-Id` + SSE via `redisUrl` dans la config mcp-handler (Redis Upstash/Vercel KV — y stocke sessions et flux entre invocations serverless). À choisir quand le produit a besoin de : notifications server→client, subscriptions de resources (updates temps réel, `listChanged` poussé), elicitation, état de session côté serveur.
- Conséquences : coût Redis, plus de scale-to-zero pur, gestion d'invalidation de session, tests plus lourds. Le bloc de config prêt est en commentaire dans la route du starter.

Le choix est **figé par ADR** (`docs/decisions/`) lors du cadrage — en changer = rouvrir l'ADR, pas un simple diff de config.

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
- **Smoke HTTP scripté** : `scripts/smoke-mcp.mjs` (fourni par le starter) — initialize + tools/list + tool d'appel contre `next start` local ou une URL de prod ; à lancer après chaque déploiement.
- **Manuel** : MCP Inspector sur `http://localhost:3000/api/mcp` (tools, auth, resources) + matrice §5.4.
- **Évolution** : ajouter un champ optionnel = OK. Renommer/supprimer un tool ou rendre un champ requis = **breaking** → ADR + dépréciation (le tool répond encore avec un message de migration) + notification `listChanged`. Bump `serverInfo.version` à chaque changement de surface.
- Descriptions/schemas **stables** (prompt caching des hosts) ; golden queries rejouées à chaque évolution (§8).
