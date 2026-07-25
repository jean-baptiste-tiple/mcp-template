# Rapport de synthèse — Usine à verticaux MCP (sourcing → clustering → scoring)

Date : 2026-07-25.

## Méthode

5 agents de sourcing en parallèle (Reddit via archive PullPush, avis 1-3★ G2/Capterra/Trustpilot via snippets, communautés indie HN/IndieHackers/Acquire, offres d'emploi FR/US, catalogue Forward AI), puis fusion + dédoublonnage sémantique strict (fusion uniquement à confiance haute, occurrences additionnées), normalisation en fiches standard par 7 agents, clustering manuel sur la règle « 3-6 fiches, même acheteur, workflow contigu, mêmes connecteurs, une ligne budgétaire », scoring sur 5 axes /25 + bonus MCP non éliminatoire.

## Volumes

| Étape | Volume |
|---|---|
| Douleurs brutes collectées | 411 (Reddit 105, avis 80, indie 65, jobs 60, Forward 101) |
| Après dédoublonnage (40 fusions) | **356 douleurs uniques** (702 occurrences cumulées) |
| Fiches normalisées | 356 (`data/fiches.yaml`) |
| Clusters formés | 20 (16 sourcés, 4 extrapolés) — ~85 fiches en cluster, le reste orphelines ou réservoir de features |
| Clusters ≥ 18/25 | 15 |
| Top 5 retenus | C01 recrutement, C02 syndic, C06 BTP, C03 recouvrement, C11 intérim |

Chaque douleur a un verbatim + une URL + une date ; chaque cluster remonte à ses verbatims (`output/clusters.md`). Zéro douleur inventée ; les extrapolations sont flaguées `origine: extrapolation`.

## Biais identifiés (et corrections)

1. **Reddit sur-représente les indie hackers** : r/SaaS et r/microsaas quasi vides de signal réel (promo) — corrigé par le poids donné aux Agents B (plaintes payantes) et D (salaires = WTP prouvée). Les douleurs « énoncées par un builder » sont marquées « à revalider » dans les fiches.
2. **Le catalogue Forward n'est pas une preuve de douleur** : 101 cas d'usage à occ. 1, non corroborés (c'est le catalogue d'un vendeur d'API). Traités en features, pas en ancres — sauf C10 (coach WhatsApp), construit entièrement dessus et explicitement signalé comme à corroborer.
3. **Les avis 1-3★ expriment l'insatisfaction envers un outil, pas toujours une tâche automatisable** : reformulés du point de vue de l'acheteur ; les pures plaintes support/pricing pèsent sur l'axe Concurrence, pas sur Douleur.
4. **URLs France Travail périmables** (offres expirées ~50 %) : les références d'offres sont conservées dans les notes ; la donnée de fond (le poste existe, le salaire) reste valide.
5. **Accès bloqués** : Reddit direct (contourné via PullPush, dates ±1-2 mois), G2/Capterra/Trustpilot (snippets + agrégateurs), Indeed (snippets). r/Entrepreneur_France : 0 ligne (rate-limit) — le sourcing FR grand public est le point faible du corpus Reddit, compensé par l'Agent D très FR (85 %).
6. **Seuil ≥ 18 trop peu discriminant** (15/20 clusters) : mécanique, car le sourcing a privilégié des douleurs déjà budgétées. La coupe réelle est le top 5 ; le tableau complet reste dans `scoring.md`.

## Enseignements transverses

- **Le signal le plus dur du corpus** : les postes salariés dédiés à une tâche ressaisissable (Agent D) — la saisie fournisseurs (occ. 44) est la plus grosse douleur ET la pire opportunité (Dext/Pennylane installés). Douleur massive ≠ opportunité : l'axe Concurrence a tué C04, C09, C14, C15.
- **Patterns récurrents chez les outils installés** (Agent B) : pricing qui punit la croissance, reporting faible forçant l'export Excel, syncs cassées en silence, support injoignable — autant d'angles d'attaque « couche au-dessus » sans remplacer l'outil.
- **Les meilleurs clusters partagent** : un acheteur-décideur joignable en une requête Sales Nav, un salaire ou un abonnement détesté comme ligne budgétaire, et des connecteurs standards (email, OCR, exports, LinkedIn/WhatsApp via API tierces).

## Recommandation

1. **Lancer la validation design partners sur C01 (Studio candidats)** : meilleur score, fit MCP maximal, connecteurs maîtrisés, recoupe exactement mcp-cv-editor — l'avance technique existe déjà. Requête Sales Nav prête dans `top5.md`.
2. **En parallèle, 5 interviews C02 (syndic)** — le score est égal mais la faisabilité dépend des exports des logiciels syndic : à vérifier AVANT d'écrire une ligne de code. Le pilote ne se lance que si 3 cabinets confirment pouvoir sortir leurs données.
3. **C06 (BTP) en embuscade** : énorme volume d'ICP mais canal LinkedIn faible pour les artisans — à activer si un canal terrain (fédération, négoce, comptable prescripteur) se présente.
4. **Corroborer avant de croire** : C17 (organismes de formation) et C10 (coachs WhatsApp) ont de bons scores mais reposent sur une extrapolation ou une source unique — 5-10 interviews chacun avant toute décision de build.
5. **Ne pas construire** sur C04, C09, C14, C15 malgré le volume de douleur : leaders installés crédibles.

## Fichiers produits

```
data/ideas_raw.csv        356 douleurs sourcées (verbatim, URL, date, occurrences)
data/dedup_report.md      rapport de fusion (40 fusions détaillées)
data/fiches.yaml          356 fiches normalisées (+ data/fiches/ par batch)
data/fiches_index.csv     index compact pour le clustering
output/clusters.md        20 clusters avec verbatims et URLs + orphelines notables
output/scoring.md         tableau /25 complet, justifications, requêtes LinkedIn compactes
output/top5.md            5 fiches complètes : requête Sales Nav, one-pager, risques
output/rapport.md         ce document
```
