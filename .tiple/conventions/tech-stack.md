# Stack Technique

> Dernière MAJ : [date init]

| Techno | Version | Rôle | Justification |
|--------|---------|------|---------------|
| Next.js | 15 (App Router) | Framework fullstack | SSR/SSG, Server Components, Server Actions, routing fichiers |
| TypeScript | ~5.8.3 (strict mode) | Typage | Sécurité du code, autocomplétion, refactoring. **Épinglé 5.8.x** — les versions 5.9+ causent des hangs de `tsc --noEmit`. |
| Supabase | Cloud | Backend-as-a-Service | Auth, DB PostgreSQL, RLS, Realtime, Storage |
| Tailwind CSS | 4.x | Styling | Utility-first, design system via config, purge auto |
| Shadcn/ui | latest | Composants UI | Copy-paste, personnalisables, accessibles, basés sur Radix |
| Zod | 3.x | Validation | Schemas partagés front/back, inférence TypeScript |
| React Hook Form | 7.x | Formulaires | Performance, intégration Zod via resolver |
| Vitest | latest | Tests unit/integ | Rapide, compatible ESM, API Jest-like |
| Testing Library | latest | Tests composants | Test du comportement user, pas de l'implémentation |
| Playwright | latest | Tests E2E | Cross-browser, fiable, auto-wait |
| pnpm | 9.x | Package manager | Rapide, strict, disk-efficient |

<!-- PERSONNALISER : ajouter les libs spécifiques au projet (ex: @tanstack/query, date-fns, etc.) -->

## Canal MCP (si le produit expose un serveur MCP)

> Squelette prêt : `.tiple/starters/mcp/` (endpoint, tool démo, widgets, bridge, test) — installé en S01.
> Versions `1.x` / `latest` à figer lors de l'installation (story S01 Setup) — mettre à jour ce tableau avec les versions exactes.

| Techno | Version | Rôle | Justification |
|--------|---------|------|---------------|
| @modelcontextprotocol/sdk | 1.x | Serveur MCP (tools, resources) | SDK TypeScript officiel |
| mcp-handler | 1.x | Endpoint MCP dans Next.js (`/api/mcp`) | Transport Streamable HTTP sur route handler, compatible Vercel |
| MCP Apps (SEP-1865) / @mcp-ui/* | latest | Widgets visuels dans Claude/ChatGPT | Bundles HTML `ui://`, double méta (`ui/resourceUri` + alias `openai/outputTemplate`), bridge unique `widgets/shared/bridge.ts` |
| @anthropic-ai/sdk | latest | IA (si besoin : parsing, génération, adaptation) | PDF natif en entrée, structured outputs (Zod), prompt caching |
| Vite + vite-plugin-singlefile | latest | Build des widgets en HTML single-file | CSP des hosts = zéro requête externe, tout inliné |
| jose | latest | Validation JWT (JWKS Supabase) dans `src/mcp/auth.ts` | OAuth 2.1 resource server, RLS au JWT utilisateur |
| playwright-core + @sparticuz/chromium | latest | Génération PDF (HTML → PDF), si applicable | Un seul composant React pour web / partage / widget / PDF |

<!-- PERSONNALISER : modèles IA par défaut par opération (lib/ai/config.ts) — ex: extraction → claude-haiku-4-5 ; génération/traduction → claude-sonnet-5. Logger les coûts. -->
