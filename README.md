# MCP Template — Tiple Method

Template Git pour bootstrapper un **produit MCP-first** avec la Tiple Method : un SaaS dont le canal principal est un **serveur MCP** consommé depuis Claude et ChatGPT (tools + widgets MCP Apps), avec une app web Next.js en canal secondaire.

C'est le Tiple Method Template de base (structure, templates de docs, checklists, conventions, slash commands Claude Code, design system) **spécialisé MCP** :

- **Conventions MCP** (`.tiple/conventions/mcp-patterns.md`, tag `mcp`) : parité web/MCP par services partagés, AX (découverte par l'agent), design des tools, widgets MCP Apps **dual-host Claude + ChatGPT**, auth OAuth 2.1 via Supabase, serveur stateless, golden queries
- **Section "Canal MCP"** dans le template d'architecture (`.tiple/templates/architecture.tmpl.md`) : tables tools / widgets / auth à remplir au cadrage
- **Template de golden queries** (`.tiple/templates/mcp-golden-queries.tmpl.md`) : l'éval anti-régression du routage des tools, à rejouer sur les deux hosts
- **Règles MCP dans `CLAUDE.md`** + skill `mcp` auto-déclenché dès qu'on touche `src/mcp/` ou `widgets/`

Stack : Next.js 15 (App Router) + TypeScript strict + Tailwind CSS + Shadcn/ui. Backend Supabase via starter (DB + RLS + Auth + Storage — c'est aussi l'authorization server OAuth 2.1 du canal MCP). Canal MCP : `@modelcontextprotocol/sdk` + `mcp-handler` (endpoint `/api/mcp`), widgets buildés par Vite en HTML single-file. IA optionnelle : Claude API (`@anthropic-ai/sdk`).

## Le canal MCP en bref

Les invariants que le template impose (détail dans `.tiple/conventions/mcp-patterns.md`) :

1. **Parité par services partagés** — toute capacité métier = 1 fonction dans `lib/services/` + 2 adaptateurs fins (Server Action web, tool MCP). Jamais de logique métier dans un tool.
2. **Dual-host day one** — widgets déclarés avec les deux metas (`ui/resourceUri` standard SEP-1865 + alias `openai/outputTemplate` pour ChatGPT) via un helper unique ; bridge unique `widgets/shared/bridge.ts` ; matrice de test des deux hosts avant push.
3. **Auth OAuth 2.1 avec Supabase en authorization server** — RFC 9728, 401 `WWW-Authenticate`, `securitySchemes` par tool, client Supabase au JWT de l'utilisateur → RLS active dans les tools. `service_role` interdit.
4. **Stateless** — Streamable HTTP sans session, tout l'état métier en Postgres. Compatible Vercel.
5. **AX mesurée** — `instructions` serveur maintenu, descriptions "Use this when… / Do not use for…", `next_actions` dans chaque résultat, golden queries rejouées à chaque évolution de tool.
6. **Dégradation** — tout tool fonctionne sans widget ; le widget est un bonus d'ergonomie.

## Design System

Un design system **violet corporate** complet est inclus, prêt à l'emploi :

- **Thème :** Violet profond corporate avec dark mode (class-based, next-themes)
- **34 composants Shadcn/ui** installés (style new-york) dans `src/components/ui/`
- **6 composants métier** : PageContainer, EmptyState, StatCard, DataTable, ThemeToggle, ThemeProvider
- **Preview interactive** : route `/design-system` pour voir tous les composants
- **Tokens complets** : couleurs (oklch), typographie (Inter), spacing, radius, shadows
- **Documentation** : `docs/design/system.md`

## Starters

Le template est minimal par défaut. Les starters dans `.tiple/starters/` ajoutent des fonctionnalités complètes. Ils sont identifiés par `/tm-plan` (Phase 0) et installés lors de la story de setup.

| Starter | Dossier | Ce qu'il ajoute |
|---------|---------|-----------------|
| **Canal MCP** | `.tiple/starters/mcp/` | Endpoint `/api/mcp` stateless, tool démo (`schema Zod → service → tool`), helpers dual-meta, auth OAuth 2.1 (RFC 9728), bridge widgets, widget exemple Vite single-file, test `InMemoryTransport` |
| **Supabase + Auth** | `.tiple/starters/supabase-auth/` | Base de données, auth (login/signup/reset), middleware, Server Actions, pages auth, CI migrations |

Pour un produit MCP-first, les deux starters vont ensemble : Supabase + Auth fournit la DB (RLS) et l'authorization server OAuth 2.1 du canal MCP ; le starter Canal MCP fournit le serveur, les widgets et le câblage auth (bloc à décommenter une fois Supabase en place).

## Quick Start

```bash
# 1. Créer un projet depuis le template ("Use this template" sur GitHub, ou clone)
git clone https://github.com/jean-baptiste-tiple/mcp-template mon-projet
cd mon-projet

# 2. Installer les dépendances
pnpm install

# 3. Lancer le dev server
pnpm dev

# 4. Lancer le cadrage dans Claude Code (brief → PRD → archi → epics/stories)
# /tm-plan
```

Le cadrage (`/tm-plan`) remplit la section "Canal MCP" de l'architecture (tools, widgets, auth), fige les décisions structurantes par ADR (authorization server, stateless) et crée `docs/mcp-golden-queries.md` depuis le template.

## Commandes

**Deux points d'entrée principaux, 5 modes auto-détectés** :

| Commande | Usage | Description |
|----------|-------|-------------|
| `/tm-plan` | **Toute planification** | Cadrage complet (brief → PRD → archi → design → epics/stories → gate). Détecte auto le mode **initial** (nouveau projet) vs **évolution** (V2, V3, grosse feature). |
| `/tm-dev` | **Toute action code** | 5 modes auto-détectés depuis l'argument : **story** (`E01-S01`/`next`), **fix** (bug/corrige/cassé), **feature** (ajoute/implémente), **refacto** (nettoie/factorise), **explore** (comprends/analyse, read-only). |
| `/tm-review` | Code review agent isolé | Agent autonome séparé passe `code-review.md` point par point. Appelé auto par `/tm-dev`. |
| `/tm-verify` | Vérification triple | `pnpm type-check` + `pnpm lint` + `pnpm test` (debug local). |
| `/tm-wrap-up` | Après un gros chantier | Capture les apprentissages méta (conventions, ADR, registry). Peut aussi être proposé auto par Claude. |
| `/commit-push` | Commit & push | Type-check + lint + tests + changelog + commit + push (OBLIGATOIRE pour tout push). |

**Commandes dépréciées** (alias rétro-compatibles, seront supprimés) : ~~`/tm-fix`~~ → `/tm-dev` (mode fix), ~~`/tm-feature`~~ → `/tm-plan` + `/tm-dev`.

### Les 5 modes de `/tm-dev`

| Mode | Déclencheur | Ce que ça fait |
|---|---|---|
| **Story** | ID (`E01-S01`) ou `next` | Flow complet piloté par la story : conventions auto-chargées, impl, type-check, review agent, finalisation (changelog, post-impl, registry, sprint status) |
| **Fix** | mots-clés : `bug`, `corrige`, `cassé`, `erreur`, `crash`, `ne marche pas`, `broken`, `régression` | Reproduire avant corriger, diff minimal, test de non-régression obligatoire |
| **Feature** | mots-clés : `ajoute`, `implémente`, `nouvelle feature`, `add` | Si non-trivial → propose `/tm-plan` pour cadrer d'abord. Sinon : respect registry/design system/a11y |
| **Refacto** | mots-clés : `refacto`, `nettoie`, `factorise`, `simplifie`, `DRY` | Pas de changement de comportement, tests identiques avant/après, diff minimal |
| **Explore** | mots-clés : `comprends`, `explique`, `analyse`, `audit`, `lis` | **Read-only** : aucune écriture. Retour structuré |

### Skills auto-déclenchés

`.claude/skills/` contient 23 skills "shim" (un par tag de `.tiple/conventions/_index.md`, dont `mcp`) qui s'auto-activent selon le contexte — même **hors** de `/tm-dev`. Exemple : toucher `src/mcp/` ou `widgets/` déclenche le skill `mcp` qui charge `.tiple/conventions/mcp-patterns.md`. Les descriptions sont bilingues FR+EN pour un trigger robuste.

## Structure

```
├── CLAUDE.md                    # Instructions Claude Code (Tiple Method + règles MCP)
├── .claude/
│   ├── commands/                # 8 slash commands (tm-plan, tm-dev, tm-review, tm-verify, tm-wrap-up, commit-push, ...)
│   ├── skills/                  # 23 skills shim (dont mcp) + tm-wrap-up
│   └── hooks/                   # enforce-bash-rules.sh
├── .tiple/
│   ├── templates/               # Templates de documents (dont architecture avec section MCP, golden queries)
│   ├── checklists/              # 5 checklists quality gates
│   ├── conventions/             # Conventions par tags (23 fichiers dont mcp-patterns.md + _index.md)
│   ├── starters/                # Starters optionnels (mcp, supabase-auth)
│   └── sprint/status.md         # Sprint tracking
├── docs/
│   ├── brief.md / prd.md / architecture.md   # Générés par /tm-plan
│   ├── changelog.md             # Journal des évolutions
│   ├── design/                  # Design system, maquettes, flows
│   ├── epics/ + stories/        # Backlog implémentable
│   └── decisions/               # ADRs (auth MCP, stateless, ... — créés au cadrage)
├── src/
│   ├── app/
│   │   ├── (dashboard)/         # Layout principal + page /dashboard placeholder
│   │   ├── design-system/       # Preview du design system
│   │   └── api/mcp/             # (starter mcp, installé en S01) Endpoint MCP — mcp-handler
│   ├── mcp/                     # (starter mcp, installé en S01) Serveur MCP : tools, auth, helpers
│   ├── components/              # ui/ (34 Shadcn) + composants métier
│   └── lib/                     # services/, schemas/, utils/
├── widgets/                     # (starter mcp, installé en S01) Sources MCP Apps — Vite single-file + bridge partagé
└── tests/                       # Unit, integration, e2e (smoke fournis)
```

Les dossiers marqués "starter mcp" ne sont pas pré-générés : le squelette complet vit dans `.tiple/starters/mcp/` et s'installe lors de la story de setup (mapping fichier par fichier dans son README), guidé par `.tiple/conventions/mcp-patterns.md`.

## Personnaliser le template

Après le clone :

1. **`CLAUDE.md`** — Section "Projet" : nom et description
2. **`docs/design/system.md`** — Ajuster les tokens si besoin (couleurs, radius)
3. **`.tiple/conventions/tech-stack.md`** — Figer les versions MCP et ajouter les libs spécifiques
4. **`package.json`** — Nom du projet

Puis lancer `/tm-plan` pour le cadrage (qui activera les starters et créera les ADRs nécessaires).

## Conventions par tags

Les conventions techniques sont dans `.tiple/conventions/` et chargées **automatiquement** selon le contexte :

- **Base (toujours chargées)** : `coding-standards.md`, `component-registry.md`, `tech-stack.md`
- **Par tags** : chaque story déclare ses tags (ex: `mcp`, `auth`, `database`) → les fichiers correspondants sont chargés
- **Index** : `.tiple/conventions/_index.md`

| Mode | Chargement des conventions |
|------|----------------------------|
| `/tm-dev E01-S01` | Tags déclarés dans le champ `Conventions` de la story |
| `/tm-dev` (libre) | Tags déduits des fichiers touchés (ex: `src/mcp/` → `mcp`, `lib/actions/` → `api`) |
| **Hors workflow** (édit libre, Q&A) | Skills de `.claude/skills/` auto-déclenchés par mots-clés FR+EN |

## Qualité & Déploiement

| Check | Où | Quand |
|---|---|---|
| `pnpm type-check` + `pnpm lint` + `pnpm test` | **Local** (via `/commit-push`) | Avant chaque push |
| `pnpm test:e2e` | **Local** (smoke Playwright fourni : redirect home + design system) | À la demande / avant release |
| `pnpm build` | **CI GitHub** (`.github/workflows/ci.yml`) | Après chaque push — validation Vercel + catch des erreurs Linux |

Pour les stories taguées `mcp` : en plus des checks ci-dessus, passer la **matrice de test dual-host** (§5.4 de `mcp-patterns.md`) et rejouer les **golden queries** sur Claude et ChatGPT (developer mode) si un tool ou une description a changé.

Un hook Claude Code (`.claude/hooks/enforce-bash-rules.sh`) garantit que les commandes sont exécutées correctement (foreground, sans pipe, sans redirection).

Le déploiement Vercel est automatique (connecter le repo). La CI migrations Supabase est ajoutée par le starter Supabase + Auth si activé.
