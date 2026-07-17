# Changelog

<!-- Ce fichier est mis à jour à chaque commit via /tm-dev.
     Format de chaque entrée :

## [Date] — [Scope]
**Quoi :** Ce qui a été fait
**Pourquoi :** La raison / la story / le bug
**Problèmes :** Ce qui a bloqué et comment c'a été résolu (si applicable)
**Fichiers :** Liste des fichiers créés/modifiés
-->

## [2026-07-17] — Starter Canal MCP + tests smoke + error.tsx + hook durci
**Quoi :**
- Nouveau starter `.tiple/starters/mcp/` (15 fichiers) : endpoint `/api/mcp` stateless (mcp-handler), chaîne démo complète `schema Zod partagé → service → tool get_status`, helpers `widget-meta` (dual-meta `ui/resourceUri` + `openai/outputTemplate`) et `tool-result` (deux formes + erreurs actionnables), `auth.ts` OAuth 2.1 (JWKS Supabase, à activer avec supabase-auth), route RFC 9728, bridge widgets unique deux dialectes, widget exemple `status-card` (états + thème) buildé par Vite single-file, test unit `InMemoryTransport`. Chaque fichier référence la section de `mcp-patterns.md` qu'il implémente, avec `TODO(S01)` sur les points à valider contre les versions épinglées.
- Tests smoke ajoutés : `tests/e2e/smoke.spec.ts` (redirect home → /dashboard + design system, valide la config Playwright) et `tests/integration/dashboard-page.test.tsx` (RTL + jsdom + jest-dom). `tests/setup.ts` existait mais n'était pas branché — `setupFiles` câblé dans `vitest.config.ts`.
- `src/app/error.tsx` global ajouté (EmptyState + Button, reset).
- Hook `enforce-bash-rules.sh` durci : l'extraction de `tool_input.command` gérait mal les guillemets échappés (une commande avec `"…"` tronquait l'extraction au premier `\"` → un pipe interdit passait). Extraction via jq, fallback perl, dernier recours historique. Vérifié sur 3 cas (pipe caché par guillemets bloqué, commande propre OK, pipe dans `description` seule OK).
- `commit-push.md` : trailer co-author neutre (plus de modèle hardcodé).
- Docs synchronisées : README (table starters, structure, checks), CLAUDE.md (starter MCP), tech-stack.md (jose, vite-plugin-singlefile), mcp-patterns.md (pointeur starter).

**Pourquoi :** suite de l'audit boilerplate — le cœur MCP du template ("mcp-template") était entièrement "à créer en S01" à chaque projet. Le starter fait gagner la story de setup et fixe les patterns par l'exemple.

**Fichiers :**
- `.tiple/starters/mcp/` (15 nouveaux fichiers)
- `tests/e2e/smoke.spec.ts`, `tests/integration/dashboard-page.test.tsx`, `vitest.config.ts`
- `src/app/error.tsx`
- `.claude/hooks/enforce-bash-rules.sh`, `.claude/commands/commit-push.md`
- `README.md`, `CLAUDE.md`, `.tiple/conventions/tech-stack.md`, `.tiple/conventions/mcp-patterns.md`

## [2026-07-17] — Audit boilerplate : 3 fixes (route `/` 404, config Tailwind morte, lint du build output)
**Quoi :**
- Route `/dashboard` créée : `src/app/(dashboard)/page.tsx` → `src/app/(dashboard)/dashboard/page.tsx`. Avant, cette page résolvait vers `/` (un route group ne crée pas de segment d'URL), était silencieusement masquée par `src/app/page.tsx`, et le `redirect("/dashboard")` de la home aboutissait à un 404 out of the box.
- `@config "../../tailwind.config.ts"` ajouté dans `globals.css`. Tailwind v4 ne lit aucun fichier config sans cette directive : `darkMode: "class"` était inactif (les `dark:` du ThemeToggle et d'Alert suivaient l'OS au lieu de la classe next-themes), le plugin `tailwindcss-animate` n'était pas chargé (animations des 8 composants overlay = no-op) et les keyframes accordion absents. Vérifié dans le CSS buildé : `@keyframes enter`, `@keyframes accordion-*`, `:is(.dark …)` présents.
- `ignores` (`.next/`, `out/`, `build/`, `next-env.d.ts`) ajouté dans `eslint.config.mjs` : `eslint .` lintait le build output dès qu'un `pnpm build` local avait eu lieu → des centaines d'erreurs et `/commit-push` cassé.

**Pourquoi :** audit "le template est-il prêt à démarrer un projet immédiatement" — les 4 checks (type-check, lint, test, build) passaient mais la home 404ait, le design system tournait sans animations ni dark mode class-based, et le lint cassait après un build local.

**Fichiers :**
- `src/app/(dashboard)/dashboard/page.tsx` (déplacé depuis `src/app/(dashboard)/page.tsx`)
- `src/app/globals.css`
- `eslint.config.mjs`

## [2026-05-02] — CLAUDE.md : ajout section "Avant de coder (CRITIQUE)"
**Quoi :** Ajout d'une section "Avant de coder" en tête du CLAUDE.md avec 4 règles : surfacer les hypothèses (pas trancher en silence), edits chirurgicaux (chaque ligne trace à la demande), critères de succès vérifiables, push back quand justifié. Suppression de la référence orpheline à "Règles d'exécution Bash" dans "Règles avant push" (section déjà retirée).
**Pourquoi :** cadrer le comportement de Claude en amont du code : éviter les implémentations trop larges, les refactos non demandés, et le "make it work" flou. Pousse l'agent à clarifier au lieu d'inventer.
**Fichiers :**
- `CLAUDE.md`

## [2026-05-02] — Tests rapatriés en local : CI = build only
**Quoi :**
- `/commit-push` exécute désormais 3 checks locaux : type-check + lint + tests (au lieu de 2).
- CI GitHub réduite à `pnpm build` uniquement (validation Vercel + erreurs Linux). Plus de duplication local/CI.
- CLAUDE.md "Règles avant push" mises à jour : suppression de l'interdiction "Ne JAMAIS lancer pnpm test localement".

**Pourquoi :** la séparation "lint/test sur CI uniquement" n'avait plus de sens depuis que l'environnement local est stable (TS 5.8.3 pin + hook PreToolUse). Lancer les tests en local accélère le feedback (plus besoin d'attendre la CI pour voir un test cassé), simplifie le mental model, et la CI reste un filet de sécurité Linux/build via `pnpm build`.

**Fichiers :**
- `.claude/commands/commit-push.md`
- `.github/workflows/ci.yml` (renommé "CI — Build", suppression des steps lint/tests)
- `CLAUDE.md` (section "Règles avant push")

## [2026-04-30] — CLAUDE.md : retrait de la section "Règles d'exécution Bash"
**Quoi :** Suppression de la section "Règles d'exécution Bash (TOUTES les commandes)" du CLAUDE.md (7 règles : pas de background, pas de pipe, pas de redirection, pas de boucle d'attente…).
**Pourquoi :** ces règles sont désormais appliquées par le hook `PreToolUse` (`.claude/hooks/enforce-bash-rules.sh`) au niveau système, plus besoin de les répéter dans le prompt. Réduit le bruit au chargement de chaque conversation et évite la duplication source de divergence.
**Fichiers :**
- `CLAUDE.md`

## [2026-04-30] — CLAUDE.md : règle de style de réponse (concis, pas de récap)
**Quoi :** Ajout d'une section "Style de réponse (CRITIQUE)" en tête du CLAUDE.md imposant des réponses courtes, sans récap qui répète l'user, sans tableaux décoratifs ni emojis non demandés, sans phrases d'intro/transition.
**Pourquoi :** réduire le bruit dans les réponses Claude pendant les workflows Tiple Method, particulièrement utile dans les sessions longues où chaque tour répétait inutilement le contexte.
**Fichiers :**
- `CLAUDE.md` (nouvelle section au début)

## [2026-04-19] — Consolidation : /tm-dev absorbe /tm-fix et /tm-feature, ajoute modes refacto et explore
**Quoi :**
- `/tm-dev` devient le **point d'entrée unique** pour toute action code avec 5 modes auto-détectés depuis l'argument : **story** (ID/`next`), **fix** (bug/corrige/cassé…), **feature** (ajoute/implémente…), **refacto** (nettoie/factorise, tests identiques avant/après), **explore** (comprends/analyse, **read-only**).
- `/tm-fix` et `/tm-feature` deviennent des **alias rétro-compatibles dépréciés** qui affichent un warning et exécutent le bon workflow de `/tm-dev`. Seront supprimés dans une prochaine version.
- CLAUDE.md et README.md mis à jour : nouvelle table commandes (2 points d'entrée principaux + 5 modes), table dépréciation, détail des 5 modes.

**Pourquoi :** retirer les redondances (tm-fix ≡ tm-dev libre, tm-feature ≡ tm-plan évolution) et combler les trous (mode refacto avec garde-fous "tests identiques", mode explore read-only). Une heuristique simple pour l'utilisateur : *docs → `/tm-plan`, code → `/tm-dev`*.

**Fichiers :**
- `.claude/commands/tm-dev.md` (refonte avec 5 modes + détection auto)
- `.claude/commands/tm-fix.md` (alias déprécié avec warning)
- `.claude/commands/tm-feature.md` (alias déprécié avec warning)
- `CLAUDE.md` (table commandes + ajustement "Mode libre")
- `README.md` (table commandes, table dépréciation, section "Les 5 modes de /tm-dev")

## [2026-04-19] — /tm-plan gère le mode évolution (V2) + README synchronisé
**Quoi :**
- `/tm-plan` détecte automatiquement si c'est un cadrage initial (pas de `docs/prd.md`) ou une évolution versionnée (V2/V3). En mode évolution : Edit > Write sur les docs existants, ADR obligatoire par invariant touché, création des nouveaux epics/stories uniquement, gate avec `prd-evolution.md` en plus du readiness-gate.
- README mis à jour : table des commandes complétée (ajout de `tm-feature`, `tm-wrap-up`, `commit-push` qui manquaient), `/tm-plan` décrit comme couvrant les deux modes, structure `.claude/` détaillée (commands/skills/hooks), section Qualité corrigée (type-check + lint local via `/commit-push`, tests sur CI GitHub).

**Pourquoi :** combler le trou méthodologique pour les grosses évolutions versionnées sans introduire un `/tm-plan-v2` redondant, et aligner le README sur l'état réel du framework (3 commandes + skills auto-déclenchés n'y figuraient pas).

**Fichiers :**
- `.claude/commands/tm-plan.md` (ajout de la section "Mode : initial ou évolution")
- `README.md` (table commandes, structure, section qualité, section V2)

## [2026-04-19] — Template : triggers bilingues, argument-hints, nouveau skill/command tm-wrap-up
**Quoi :**
- `argument-hint` ajoutés aux 3 slash commands qui prennent des arguments (tm-dev, tm-fix, tm-feature).
- Descriptions des 22 skills `.claude/skills/*/SKILL.md` enrichies avec des triggers bilingues FR+EN (mots-clés métier en français pour améliorer le déclenchement automatique).
- Nouveau workflow `/tm-wrap-up` (hybride) : command `.claude/commands/tm-wrap-up.md` pour le process complet + skill shim `.claude/skills/tm-wrap-up/` qui auto-propose à l'utilisateur de capturer les apprentissages méta (conventions, ADR, registry) à la fin d'un chantier. La règle : proposer, jamais exécuter silencieusement.

**Pourquoi :** inspiré de l'analyse du repo AlexisLaporte/claude-skills. L'objectif est (a) de fiabiliser le déclenchement automatique des conventions hors des workflows `/tm-dev` (les triggers FR couvrent la langue de travail), et (b) d'introduire un mécanisme de capture des **apprentissages méta** du projet, que le couple changelog+code ne couvre pas aujourd'hui.

**Fichiers :**
- `.claude/commands/tm-dev.md`, `tm-fix.md`, `tm-feature.md` (frontmatter)
- `.claude/commands/tm-wrap-up.md` (nouveau)
- `.claude/skills/tm-wrap-up/SKILL.md` (nouveau)
- `.claude/skills/{a11y,api,auth,database,datetime,deploy,feedback,flags,forms,i18n,monitoring,nextjs,performance,realtime,security,seo,state,supabase,tables,testing,typescript,uploads}/SKILL.md` (descriptions bilingues)
- `CLAUDE.md` (ajout de `/tm-wrap-up` dans la table des commandes)

## [2026-04-19] — Template : skills "shim" pour conventions
**Quoi :** Ajout de 22 skills Claude Code (un par tag de `.tiple/conventions/_index.md`) dans `.claude/skills/`. Chaque skill est un shim ~8 lignes (frontmatter `name`+`description` + pointeur vers `.tiple/conventions/<file>.md` + 2-3 invariants-clés).
**Pourquoi :** Les conventions étaient chargées uniquement par `/tm-dev` / `/tm-fix` via déduction de tags manuelle. Hors de ces workflows (édit libre, Q&A), elles étaient ignorées. Les skills permettent à Claude de les auto-déclencher contextuellement sans toucher à la source de vérité (`.tiple/conventions/` inchangé) ni aux slash commands.
**Fichiers :**
- `.claude/skills/{auth,database,supabase,api,forms,realtime,security,nextjs,typescript,state,feedback,performance,tables,uploads,seo,a11y,i18n,datetime,monitoring,flags,deploy,testing}/SKILL.md` (22 nouveaux shims)
- `.gitignore` : whitelist `!.claude/skills/`
