# Scoring des clusters — Phase 3

Date : 2026-07-25. Barème : 5 axes /5 (total /25) + bonus fit MCP-first (+0 à +2, jamais éliminatoire). Seuil de présélection : ≥ 18/25 (bonus inclus).

Axes : **D** douleur (fréquence × coût actuel, pondérée par occurrences et postes salariés dédiés) · **W** willingness to pay (preuve de budget existant) · **F** faisabilité build < 20 h (méthode MCP + connecteurs standards) · **C** concurrence (5 = personne de crédible) · **I** spécificité ICP (trouvable par une requête LinkedIn simple).

## Tableau (tri décroissant)

| Rang | Cluster | D | W | F | C | I | /25 | Bonus MCP | Total | Origine |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | C01 — Studio candidats (cabinets de recrutement) | 4 | 4 | 5 | 3 | 5 | 21 | +2 | **23** | sourcé |
| 2 | C02 — Back-office syndic & gérance | 5 | 5 | 3 | 4 | 5 | 22 | +1 | **23** | sourcé |
| 3 | C06 — Devis & paperasse de chantier BTP | 4 | 4 | 4 | 3 | 5 | 20 | +2 | **22** | sourcé |
| 4 | C03 — Recouvrement & facturation PME | 5 | 5 | 4 | 2 | 4 | 20 | +1 | **21** | sourcé |
| 5 | C11 — Back-office agence d'intérim | 4 | 5 | 3 | 3 | 5 | 20 | +1 | **21** | sourcé |
| 6 | C17 — Back-office organisme de formation | 4 | 4 | 4 | 3 | 5 | 20 | +1 | **21** | extrapolé |
| 7 | C04 — Zéro ressaisie fournisseurs PME | 5 | 5 | 4 | 1 | 4 | 19 | +1 | **20** | sourcé |
| 8 | C05 — Clôture petits cabinets comptables | 4 | 4 | 4 | 2 | 5 | 19 | +1 | **20** | sourcé |
| 9 | C10 — Copilote WhatsApp du coach | 2 | 3 | 5 | 4 | 4 | 18 | +2 | **20** | sourcé (catalogue seul) |
| 10 | C18 — Liasse export PME | 4 | 4 | 3 | 4 | 4 | 19 | +1 | **20** | extrapolé |
| 11 | C07 — Cockpit facturable MSP | 4 | 4 | 3 | 3 | 4 | 18 | +1 | **19** | sourcé |
| 12 | C12 — Planning vivant SAAD/ménage | 5 | 4 | 2 | 3 | 5 | 19 | +0 | **19** | sourcé |
| 13 | C08 — Food cost restaurateur | 4 | 3 | 3 | 3 | 4 | 17 | +1 | **18** | sourcé |
| 14 | C19 — Garantie constructeur garage | 4 | 4 | 2 | 3 | 4 | 17 | +1 | **18** | extrapolé |
| 15 | C20 — Litiges & avoirs de livraison | 3 | 4 | 3 | 3 | 4 | 17 | +1 | **18** | extrapolé léger |
| 16 | C13 — Cockpit du bailleur privé | 3 | 3 | 4 | 3 | 3 | 16 | +1 | 17 | sourcé |
| 17 | C09 — SAV e-commerce Shopify | 4 | 3 | 4 | 1 | 4 | 16 | +1 | 17 | sourcé |
| 18 | C15 — Reporting client agence marketing | 3 | 3 | 3 | 2 | 5 | 16 | +1 | 17 | sourcé |
| 19 | C14 — Radar signaux d'achat B2B | 3 | 3 | 4 | 1 | 4 | 15 | +1 | 16 | sourcé |
| 20 | C16 — Veille & due diligence dirigeant | 2 | 3 | 4 | 2 | 4 | 15 | +1 | 16 | sourcé |

**Présélection ≥ 18 : 15 clusters.** Le seuil est atteint largement parce que le sourcing (Agent D surtout) a privilégié des douleurs déjà budgétées ; la vraie coupe est le top 5 (voir `top5.md`). Les clusters 16-20 sont écartés : concurrence installée frontale (Gorgias pour C09, Clay/Pharow pour C14, AgencyAnalytics pour C15), douleur diffuse (C16) ou ICP injoignable sur LinkedIn (C13).

## Justifications (clusters ≥ 18)

### C01 — Studio candidats pour cabinets de recrutement — 23
- **D 4** : occ. cumulées ~11, quotidien, temps consultant non facturable ; postes d'assistants de recherche observés (Agent D).
- **W 4** : ATS déjà payé 100-300 €/mois et détesté (Bullhorn +20 % au renouvellement) ; assistants payés pour la mise en forme.
- **F 5** : parsing CV + templates + LinkedIn via API tierce = connecteurs standards ; recoupe la méthode mcp-cv-editor déjà maîtrisée.
- **C 3** : ATS installés mais aucun ne fait bien la mise en forme au format cabinet + anonymisation ; pas de leader sur ce créneau précis.
- **I 5** : « fondateur OR gérant, secteur Dotation et recrutement, France, 2-50 salariés » — requête évidente, milliers de résultats.
- **Bonus +2** : reformater/anonymiser/rédiger en conversation = cas MCP idéal.
- ⚠️ Requête LinkedIn compacte : Sales Nav → fonction *Propriétaire/Associé* + secteur *Dotation et recrutement de personnel* + géo *France* + effectif *2-10, 11-50*.
- Risques : parsing de CV scannés hétérogènes ; attente du marché que ça vive dans l'ATS (intégrations à séquencer).

### C02 — Back-office syndic & gérance — 23
- **D 5** : occ. 6+6+2 ; postes dédiés 2 900-3 100 € ×13 (Paris) observés dans les offres.
- **W 5** : le salaire EST le budget ; logiciels syndic déjà payés cher.
- **F 3** : logiciels syndic fermés (pas d'API) — on travaille sur exports + email + AR24 ; faisable mais friction.
- **C 4** : éditeurs syndic légacy sans couche IA crédible ; pas d'attaquant sérieux sur la préparation d'AG.
- **I 5** : « gérant OR directeur + syndic de copropriété + France ».
- Risques : conformité loi de 1965 sur les convocations (copilote avec validation humaine obligatoire) ; accès aux données enfermées dans le logiciel métier.

### C06 — Devis & paperasse de chantier BTP — 22
- **D 4** : « taper les devis ligne par ligne est ce qui me bouffe le plus de temps » + situations de travaux (occ. 4) + assistants saisie devis/factures payés.
- **W 4** : Obat/Batappli payés, assistants payés, AO publics = CA en jeu.
- **F 4** : génération de devis conversationnelle sur bibliothèque de prix = cœur MCP ; Chorus Pro/AO en 2e vague.
- **C 3** : Obat/Batappli bien notés (4.8-4.9) mais sans couche conversationnelle ; Handoff (US) a échoué chez l'utilisateur sourcé.
- **I 5** : « gérant, secteur Construction, France, 2-50 » — volume énorme.
- Risques : import initial des bibliothèques de prix ; cohabiter avec l'outil de facturation installé plutôt que le remplacer.

### C03 — Recouvrement & facturation PME — 21
- **D 5** : occ. 7+5+5 ; chargés de recouvrement temps plein observés.
- **W 5** : salaire dédié + volume d'impayés = budget explicite.
- **F 4** : balance âgée (exports compta) + email + banque = standard.
- **C 2** : Upflow, Clearnox, GCollect installés en FR — il faut un angle (PME 20-100 sous-équipées, copilote conversationnel).
- **I 4** : « DAF France » = requête simple mais large ; filtrer par taille.

### C11 — Back-office agence d'intérim — 21
- **D 4** : occ. 5+4, hebdomadaire, réglementaire (DPAE).
- **W 5** : permanents dédiés à la saisie ; marge d'agence directement impactée.
- **F 3** : OCR relevés d'heures OK ; DPAE/net-entreprises sans vraie API publique, logiciels d'intérim fermés.
- **C 3** : éditeurs intérim installés (Evolia, Tempo) sans couche IA ; réseaux intégrés hors cible.
- **I 5** : « directeur d'agence + intérim OR travail temporaire + France » en excluant les grands réseaux.

### C17 — Back-office organisme de formation — 21 (extrapolé)
- Sourcé : D-021 (occ. 5). Extrapolé : preuves Qualiopi, BPF, relances OPCO/EDOF — plausibles mais NON corroborées : 5 interviews avant tout build.
- **I 5** : « dirigeant organisme de formation France » — ICP très joignable, marché structuré par la réglementation (Qualiopi = douleur récurrente par construction).
- Risques : Digiforma occupe le terrain (C 3) ; EDOF sans API.

### C04 — Zéro ressaisie fournisseurs — 20
- **D 5 / W 5** : la plus grosse douleur du corpus (occ. 44, 2 000+ offres Indeed « saisie facture »).
- **C 1** : Dext, Pennylane, Tiime, iPaidThat — marché servi par des leaders bien financés. C'est le contre-exemple type : douleur massive ≠ opportunité. Écarté du top 5 malgré son score.

### C05 — Clôture petits cabinets comptables — 20
- Collecte de pièces multi-canal (email/SMS) mal servie (Dext cher et mal noté sur ce segment) ; **C 2** car le marché est encombré. Angle : cabinet 1-5 collaborateurs FR.

### C10 — Copilote WhatsApp du coach — 20
- Cluster homogène par construction (6 fiches, même acheteur, même connecteur) et fit MCP maximal, MAIS **source unique = catalogue Forward (occ. 1 partout)** : aucune corroboration indépendante. D 2 le reflète. À corroborer (10 interviews coachs) avant d'y croire.

### C18 — Liasse export — 20 (extrapolé)
- D-037 occ. 6, postes dédiés. Faisabilité 3 : générer la liasse SANS intégration Delta (dépôt manuel) est faisable ; l'intégration douane est hors <20 h. Concurrence 4 : les solutions existantes (Conex, TradeEasy) visent l'enterprise.

### C07 — Cockpit MSP — 19
- Douleurs riches et récurrentes (r/msp) mais marché anglo dominant — hors réseau LinkedIn FR de JB (les MSP français existent mais le corpus sourcé est US). I 4 plutôt indulgent.

### C12 — Planning SAAD — 19
- Occ. 10 + 300+ offres : douleur énorme. Mais temps réel, téléphonie, remplacements de dernière minute = dashboard + intégrations lourdes (F 2, bonus 0). Pas un build < 20 h.

### C08 / C19 / C20 — 18
- Au seuil. C08 : budget restaurateur serré, POS hétérogènes. C19 : portails garantie constructeurs fermés (F 2). C20 : douleur moyennement corroborée. Gardés en réserve, pas prioritaires.

## Requêtes LinkedIn compactes (clusters ≥ 18 hors top 5)
- C17 : titre (dirigeant OR fondateur OR directeur) + mots-clés entreprise « organisme de formation » + France + 2-50.
- C04 : DAF OR RAF + France + 11-200 (mais cluster écarté — concurrence).
- C05 : (expert-comptable OR gérant) + « cabinet d'expertise comptable » + France + 1-10.
- C10 : (coach sportif OR coach nutrition OR business coach) + France + solo (préférer Instagram pour cet ICP — limite LinkedIn).
- C18 : (dirigeant OR responsable ADV OR responsable export) + secteurs industrie/négoce + mots-clés « export » + France + 10-200.
- C07 : (CEO OR founder) + « managed services provider » (marché anglo — hors réseau FR).
- C12 : (directeur OR gérant) + « aide à domicile OR SAAD » + France.
- C08 : (gérant OR propriétaire) + restauration + France (ICP peu actif sur LinkedIn — limite).
- C19 : (gérant OR directeur) + « garage OR concession automobile » + France.
- C20 : (responsable service clients OR responsable ADV) + distribution/e-commerce + France + 50-200.
