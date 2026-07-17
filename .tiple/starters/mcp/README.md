# Starter : Canal MCP (serveur + widgets dual-host)

Ce starter installe le squelette complet du canal MCP : endpoint `/api/mcp` (Streamable HTTP stateless), un tool démo câblé selon les patterns (`schema Zod partagé → service → adaptateur tool → résultat structuré`), le helper dual-meta widgets, le bridge unique, un widget exemple buildé par Vite en single-file, et le test unit `InMemoryTransport`.

Il est activé par `/tm-plan` (Phase 0) pour tout produit MCP-first et installé lors de la story E01-S01.
Chaque fichier implémente une section de `.tiple/conventions/mcp-patterns.md` — lire les deux en parallèle.

## Ce que ce starter installe

### Dépendances

```bash
pnpm add @modelcontextprotocol/sdk mcp-handler jose
pnpm add -D vite vite-plugin-singlefile
```

> Figer les versions exactes dans `.tiple/conventions/tech-stack.md` après install (S01).
> `zod`, `react` et `@vitejs/plugin-react` sont déjà dans le template.
> `jose` : validation JWKS des tokens Supabase (activé avec le starter supabase-auth).

### Fichiers copiés

| Source (starter) | Destination | Pattern (mcp-patterns.md) |
|-----------------|-------------|---------------------------|
| `mcp-route.ts` | `src/app/api/mcp/route.ts` | Endpoint stateless (§7) + point d'activation auth (§6) |
| `register.ts` | `src/mcp/register.ts` | `serverInfo` + `instructions` (§2.1), enregistrement tools/widgets |
| `auth.ts` | `src/mcp/auth.ts` | Validation JWT JWKS Supabase → `{userId, orgId, role, supabase}` (§6) |
| `helpers-widget-meta.ts` | `src/mcp/helpers/widget-meta.ts` | Dual-meta `ui/resourceUri` + `openai/outputTemplate` (§5.1) |
| `helpers-tool-result.ts` | `src/mcp/helpers/tool-result.ts` | Résultats deux formes + erreurs actionnables (§4) |
| `tool-get-status.ts` | `src/mcp/tools/get-status.ts` | Tool démo : description "Use this when…", annotations, `next_actions` (§3, §4) |
| `schema-status.ts` | `src/lib/schemas/status.ts` | Schema Zod partagé = source de vérité (règle MCP 2) |
| `service-status.ts` | `src/lib/services/status-service.ts` | Parité par services partagés (§1) |
| `oauth-protected-resource-route.ts` | `src/app/.well-known/oauth-protected-resource/route.ts` | Metadata RFC 9728 (§6.1) |
| `widgets-vite.config.ts` | `widgets/vite.config.ts` | Build single-file, zéro requête externe (§5.3) |
| `widgets-bridge.ts` | `widgets/shared/bridge.ts` | Bridge unique, deux dialectes (§5.2) |
| `widget-status-card-index.html` | `widgets/status-card/index.html` | Widget exemple |
| `widget-status-card-main.tsx` | `widgets/status-card/main.tsx` | Widget exemple : états loading/vide/erreur, thème (§5.3) |
| `mcp-server-test.ts` | `tests/unit/mcp-server.test.ts` | Test tools via `InMemoryTransport` (§10) |

### Scripts package.json à ajouter

```json
"widgets:build": "WIDGET=status-card vite build --config widgets/vite.config.ts",
"mcp:inspect": "npx @modelcontextprotocol/inspector"
```

> Un widget = un run de build (variable `WIDGET`). Plusieurs widgets : chaîner les runs
> (`WIDGET=a vite build … && WIDGET=b vite build …`). Sous Windows, préfixer avec `cross-env`.
> Les bundles sortent dans `public/widgets/<nom>/index.html` — servis par la resource
> `ui://widgets/<nom>.html` ET prévisualisables au navigateur sur `/widgets/<nom>/index.html`.

### next.config.ts à compléter (Vercel)

Les resources widgets sont lues depuis `public/widgets/` par la route `/api/mcp` :

```ts
outputFileTracingIncludes: {
  "/api/mcp": ["./public/widgets/**/*"],
},
```

### Variables d'environnement (.env.local)

```
MCP_RESOURCE_URL=http://localhost:3000/api/mcp   # URL canonique (prod : https://<domaine>/api/mcp)
```

## Auth OAuth 2.1 — activation (avec le starter supabase-auth)

Le starter démarre **auth désactivée** (dev local, MCP Inspector sans token). L'activation est un
bloc commenté dans `mcp-route.ts` (`withMcpAuth` + `verifyToken` de `src/mcp/auth.ts`) :

1. Installer le starter `supabase-auth` (Supabase = authorization server OAuth 2.1, DCR activé).
2. Décommenter le bloc auth de `src/app/api/mcp/route.ts` et le `securitySchemes` du tool démo.
3. Renseigner l'URL du serveur d'auth dans `src/app/.well-known/oauth-protected-resource/route.ts`.
4. Dashboard Supabase : activer OAuth Server + DCR, autoriser les redirect URIs
   `https://claude.ai/api/mcp/auth_callback` et `https://chatgpt.com/connector/oauth/*`.
5. Figer le choix par ADR (`docs/decisions/`) — exigé par la règle MCP 4.

**Ne jamais** livrer un serveur MCP public en "mode dégradé anonyme" : 401 + `WWW-Authenticate` partout.

## Vérification après install (S01)

1. `pnpm type-check` + `pnpm lint` + `pnpm test` — le test `mcp-server.test.ts` doit passer.
2. `pnpm widgets:build` — bundle single-file généré dans `public/widgets/status-card/`.
3. `pnpm dev` puis `pnpm mcp:inspect` → connecter `http://localhost:3000/api/mcp` :
   tool `get_status` visible, appel OK, `structuredContent.next_actions` présent, resource widget listée.
4. Matrice dual-host (mcp-patterns §5.4) sur Claude + ChatGPT developer mode.
5. Créer `docs/mcp-golden-queries.md` depuis `.tiple/templates/mcp-golden-queries.tmpl.md` (§8).

## Après le squelette

Remplacer le domaine démo "status" par les vrais tools du projet : dupliquer la chaîne
`schema → service → tool` par capacité métier, enregistrer dans `register.ts`, maintenir
`instructions` et bump `serverInfo.version` à chaque évolution de surface (§10).

> Les APIs `mcp-handler` / SDK évoluent vite : à l'install, vérifier les signatures contre la
> version épinglée (les fichiers du starter ciblent mcp-handler 1.x + SDK 1.x et signalent
> par `TODO(S01)` chaque point à valider).
