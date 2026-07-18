# /tm-audit — Revue totale : Code × UI/UX × AX

Lance une revue complète du produit en **3 passes parallèles par agents isolés** (regard neuf, sans biais d'implémentation), puis vérifie, corrige et re-valide. Ré-exécutable à chaque jalon (fin de vague, avant livraison). Chaque finding doit être VÉRIFIÉ contre le code avant correction — pas de correction sur simple plausibilité.

## Passe 1 — Code review (agent « auditeur »)

Dérouler `.tiple/checklists/code-review.md` point par point sur TOUT le code produit, avec les invariants (`docs/architecture.md`) et les ADRs comme lois :

1. **Sécurité** : RLS org-scopée partout, zéro `service_role` runtime, inputs Zod (tools + actions), pas d'erreur brute exposée, secrets serveur uniquement, SSRF/uploads/ilike (voir `security-patterns.md`), PII hors logs.
2. **Garde-fous prepare→save** (si MCP) : chaque `save_*` re-valide sans confiance au modèle ; paramètres d'audit re-dérivés serveur ; audit sur toute la surface ; parité web ↔ MCP.
3. **Correctness** : sémantique des merges/patchs, caps et paginations, cascades de suppression + purge Storage, résolutions 0/1/n, pas de N+1.
4. **Conventions/DRY/Tests** : seulement les vrais écarts.

Format : findings HIGH/MED/LOW, chacun avec `fichier:ligne`, défaut (1 phrase), scénario d'échec concret, fix proposé. Dimensions saines = 1 ligne.

## Passe 2 — UI/UX web + widgets (agent « designer critique »)

**Méthode : exercer l'UI pour de vrai, pas seulement lire le code.**

1. **Captures réelles** : build avec env factice, un script Node unique qui spawn `next start`, attend le ready, capture via Playwright les pages (clair ET sombre, desktop ET mobile 390px), tue le serveur. Widgets MCP : ouvrir les bundles `dist/*.html` en `file://` avec le tool output mocké injecté (fixtures = le `structuredContent` RÉEL de chaque tool qui déclare le widget) + l'état SANS données. Sauver dans `docs/review/screens/`.
2. **Grille (noter 1-5, justifier ≤3)** : hiérarchie/scannabilité · états (loading/empty/error) · feedback < 400 ms · cohérence tokens/dark · microcopy · a11y. Widgets en plus : glanceable (aperçu + 2-3 actions), lisible à 400px, poids.
3. **Parcours critiques déroulés sur pièces** : frictions, impasses, boutons morts, liens cassés.

Format : notes par écran/widget + findings (QUICK WIN ≤1h vs CHANTIER) priorisés impact/coût, captures à l'appui. Rapport dans `docs/review/ux-report.md`.

## Passe 3 — AX (agent « modèle routeur », si canal MCP)

**Méthode : se mettre À LA PLACE du modèle, qui ne voit QUE les métadonnées.**

1. **Simulation de routage** : pour CHAQUE golden query (`docs/mcp-golden-queries.md`), ne lire QUE name/title/description/inputSchema/annotations + instructions serveur, et prédire honnêtement le routage (tools, ordre, arguments). Erreur ou hésitation = finding avec LE champ fautif et la révision de texte prête à coller (un champ à la fois).
2. **Audit des contrats** : instructions statiques et complètes ; format « Use this when… / Do not use for… » ; `.describe()` partout ; graphe `next_actions` fermé ; erreurs actionnables (ambiguïté → candidats + « demandez ») ; annotations honnêtes ; dual-host (securitySchemes, double méta, dégradation texte).
3. **Anti-sur-déclenchement** : les golden queries négatives sont-elles protégées par les « Do not use for… » ?

Format : tableau routage prédit vs attendu (+ taux), findings HIGH (routage raté/impasse) / MED (hésitation, describe manquant, annotation fausse) / LOW.

## Arbitrage & correction (agent principal)

1. **Vérifier** chaque finding HIGH/MED contre le code (lire les lignes citées) — écarter les faux positifs en le notant.
2. **Corriger** tous les HIGH et MED vérifiés + les quick wins UI/UX au ratio impact/coût évident.
3. **Verrouiller** les corrections sensibles par des tests.
4. **Re-valider** : type-check + lint + tests + build (+ build widgets si touchés) — tout vert.
5. **Documenter** : changelog (findings → corrections → assumés), journal golden queries si métadonnées révisées.
6. **Commit + push** (`/commit-push`), rapport final : tableau des findings (verdict vérifié/écarté/corrigé), notes UI/UX, taux de routage AX, restes assumés.
