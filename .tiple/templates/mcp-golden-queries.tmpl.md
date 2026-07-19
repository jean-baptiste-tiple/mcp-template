# Golden Queries — éval AX du canal MCP

> Jeu de prompts anti-régression du routage des tools. Règles d'usage : `.tiple/conventions/mcp-patterns.md` §8.
> À rejouer sur **Claude ET ChatGPT (developer mode)** à chaque évolution de tool/description. Un champ de métadonnée corrigé à la fois ; noter chaque révision dans le journal en bas.
> Seed : reprendre les prompts d'exemple du brief produit, puis enrichir story par story.

## Directs (nomment l'action — doivent router, dans l'ordre)

| # | Prompt | Attendu |
|---|--------|---------|
| D1 | <!-- prompt utilisateur qui nomme l'action --> | <!-- tool(s) attendus, dans l'ordre --> |
| D2 | | |

## Indirects (décrivent le résultat — doivent quand même router)

| # | Prompt | Attendu |
|---|--------|---------|
| I1 | <!-- prompt qui décrit le besoin sans nommer l'action --> | <!-- tool(s) attendus --> |
| I2 | | |

## Négatifs (ne doivent PAS déclencher nos tools)

| # | Prompt | Attendu |
|---|--------|---------|
| N1 | <!-- prompt proche du domaine mais hors périmètre --> | Aucun tool |
| N2 | | |

## Journal des révisions de métadonnées

> ⚠️ Les hosts CACHENT instructions et descriptions : déconnecter/reconnecter le connecteur avant de tester une révision, sinon on évalue l'ancienne version.

| Date | Champ modifié | Raison (quel prompt échouait) | Résultat |
|------|---------------|-------------------------------|----------|
| — | — | — | — |

## Rapports de frictions agent (mcp-patterns §8)

> Après chaque évolution significative : demander à l'agent hôte un rapport structuré — déroulé step-by-step, points de blocage/ressenti, hypothèses de cause, repro minimale — sur les DEUX hosts. Coller ici la synthèse et les actions décidées.

| Date | Host | Friction observée | Cause | Action |
|------|------|-------------------|-------|--------|
| — | — | — | — | — |
