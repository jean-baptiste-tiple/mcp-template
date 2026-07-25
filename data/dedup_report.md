# Rapport de dédoublonnage — ideas_raw.csv

Généré le 2026-07-25 depuis `data/sourcing/` (5 CSV).

## Volumes

| Source | Fichier | Lignes en entrée |
|---|---|---|
| Reddit (A) | `agent_a.csv` | 105 |
| Avis concurrents (B) | `agent_b.csv` | 80 |
| Communautés indie (C) | `agent_c.csv` | 65 |
| Offres d'emploi (D) | `agent_d.csv` | 60 |
| Catalogue Forward (E) | `agent_e.csv` | 101 |
| **Total entrée** | | **411** |

- Fusions opérées : **40** (absorbant **55** lignes)
- Lignes uniques en sortie : **356**

## Fusions opérées

Critère : même tâche douloureuse + même type d'acheteur. Dans le doute, les lignes sont restées séparées (ex. saisie factures en cabinet comptable D-006 gardée distincte de la saisie factures en PME D-001 ; recouvrement pur D-010 gardé distinct de la facturation+relances D-009).

- **D-001** ← D-005, D-045, D-046, D-056 (occ. cumulées : 44) — saisie de factures fournisseurs dans l'outil comptable (postes FR/US/UK + stagiaires) — même tâche, même acheteur PME
- **D-044** ← D-003, D-014, D-057, C-015 (occ. cumulées : 36) — opérateur de saisie de données généraliste (FR/US, télétravail, copier-coller inter-tableurs)
- **D-009** ← D-007, D-008, D-049 (occ. cumulées : 7) — facturation clients B2B + relances impayés par un gestionnaire dédié (D-049 = offre EDF déjà comptée dans D-008)
- **D-012** ← D-011, D-013 (occ. cumulées : 5) — assistant ADV : saisie commandes/devis/factures, même acheteur PME
- **D-037** ← D-050 (occ. cumulées : 6) — liasse documentaire export/douane (offre Quincié-en-Beaujolais commune aux deux lignes)
- **D-047** ← D-032 (occ. cumulées : 15) — appointment setter / téléprospecteur : caler des RDV commerciaux + saisie CRM
- **D-048** ← D-015 (occ. cumulées : 9) — saisie/diffusion d'annonces immobilières (MLS US / portails FR), acheteur = agence immobilière
- **D-025** ← D-026 (occ. cumulées : 4) — saisie des ordres de transport dans le TMS + édition des documents, acheteur = transporteur
- **D-033** ← D-060 (occ. cumulées : 5) — MAJ de tableaux de bord Excel / reporting (D-060 = offre Lyon 206KQZL déjà comptée dans D-033)
- **D-021** ← D-059 (occ. cumulées : 5) — assistant formation : convocations/inscriptions (D-059 = offre Gouvieux 207GQJD déjà comptée dans D-021)
- **D-023** ← D-024 (occ. cumulées : 6) — assistant gestion locative : quittancement, encaissements, impayés locataires
- **B-001** ← B-005 (occ. cumulées : 5) — coût total Bullhorn qui explose (implémentation, renouvellement, modules), même acheteur agences de staffing
- **B-065** ← A-024 (occ. cumulées : 3) — saisie des temps dans ConnectWise PSA vécue comme une torture par les techniciens MSP
- **B-020** ← A-065 (occ. cumulées : 4) — logiciel de property management hors de prix pour les petits bailleurs/gestionnaires
- **A-031** ← A-022 (occ. cumulées : 2) — MSP : consolider les données de plusieurs outils (RMM, backup, M365...) pour le reporting/audit
- **A-079** ← A-081 (occ. cumulées : 2) — agence marketing : reporting/consolidation multi-clients manuel
- **A-085** ← A-084 (occ. cumulées : 2) — agence/freelance : onboarding client sans process structuré
- **A-058** ← A-057 (occ. cumulées : 2) — artisan BTP : chiffrage des devis ligne par ligne / base de prix matériaux
- **A-051** ← A-049 (occ. cumulées : 3) — RH de PME sans SIRH : tout sur papier/spreadsheets, une seule personne
- **A-104** ← A-105 (occ. cumulées : 2) — indie founder : aucun moyen de valider la demande avant de construire
- **A-062** ← A-063 (occ. cumulées : 2) — petit investisseur locatif : suivi de la performance des biens sans outillage
- **A-035** ← C-034 (occ. cumulées : 2) — consolidation comptable multi-entités/multi-devises pour dirigeant multi-sociétés
- **A-042** ← E-024 (occ. cumulées : 2) — recruteur : messages d'approche candidats personnalisés un par un, ingérable à l'échelle
- **A-099** ← E-001 (occ. cumulées : 2) — founder : feedback utilisateur éparpillé multi-sources, tri manuel
- **C-042** ← C-043, C-047, B-075 (occ. cumulées : 7) — petit vendeur multicanal : sync d'inventaire entre canaux cassée -> surventes (B-075 = même douleur vue via avis Veeqo)
- **C-044** ← E-049 (occ. cumulées : 4) — petit commerçant : heures par jour à répondre aux mêmes questions clients répétitives
- **C-059** ← E-003 (occ. cumulées : 2) — vue de marché / étude concurrentielle = des jours/semaines de recherche manuelle
- **E-010** ← E-011 (occ. cumulées : 2) — construire une liste de prospects LinkedIn à la main (avec ou sans Sales Navigator)
- **E-069** ← E-012, E-002 (occ. cumulées : 3) — constituer la liste de comptes cibles ICP/ABM entreprise par entreprise
- **E-015** ← E-006, E-045 (occ. cumulées : 3) — fichier prospects / CRM incomplet à enrichir à la main
- **E-073** ← E-071, E-072 (occ. cumulées : 3) — trouver les coordonnées (emails, mobiles) des prospects une par une
- **E-004** ← E-007 (occ. cumulées : 2) — apprendre les mouvements des concurrents trop tard
- **E-098** ← E-101 (occ. cumulées : 2) — aucune visibilité/alerte sur les pubs des concurrents
- **E-099** ← E-100 (occ. cumulées : 2) — créa publicitaire à l'aveugle, sans banque de références de ce qui convertit
- **E-082** ← E-089 (occ. cumulées : 2) — identifier les influenceurs/créateurs de sa niche à la main (Instagram/TikTok)
- **E-084** ← E-086, E-090 (occ. cumulées : 3) — transcrire des vidéos (reels/TikTok/YouTube) à la main pour les exploiter en contenu
- **E-088** ← E-091 (occ. cumulées : 2) — surveiller les tendances/hashtags TikTok de sa niche en continu
- **E-092** ← E-093 (occ. cumulées : 2) — écouter/surveiller les subreddits de son marché
- **E-094** ← E-097 (occ. cumulées : 2) — analyser des centaines d'avis produits (dont avis négatifs concurrents) à la main
- **E-013** ← E-083 (occ. cumulées : 2) — récupérer les personnes engagées sur un post (LinkedIn/Instagram) en liste exploitable

## Top 15 des douleurs les plus corroborées

| # | id | occ. | source | verbatim |
|---|---|---|---|---|
| 1 | D-001 | 44 | jobs | je paie quelqu'un pour ressaisir les factures fournisseurs dans l'outil comptable / ERP toute la journée |
| 2 | D-044 | 36 | jobs | I pay a data entry clerk $19.66/hour to transfer data from physical documents into our online database and keep spreadsheets updated |
| 3 | D-047 | 15 | jobs | I pay an appointment setter $16-30/hour to make 8-10 outbound calls per hour, schedule sales appointments and log everything in the CRM |
| 4 | D-016 | 10 | jobs | je paie un gestionnaire de planning pour mettre à jour en continu les plannings des intervenants à domicile et gérer les remplacements |
| 5 | D-048 | 9 | jobs | I pay a listing coordinator to enter property listings and changes into the MLS and maintain sales records for our agents |
| 6 | C-042 | 7 | indie | Someone sells an item in person or on another channel, forgets to update Shopify, and it gets sold again online — refund, apology, unhappy customer |
| 7 | D-009 | 7 | jobs | je paie quelqu'un pour facturer mes clients B2B chaque mois/trimestre et courir après les paiements par mail, courrier et téléphone |
| 8 | D-023 | 6 | jobs | je paie 34-38K€ un assistant de gestion locative pour le quittancement, les comptes locataires, les révisions de loyer et le suivi des relances |
| 9 | D-031 | 6 | jobs | je paie une secrétaire après-vente pour ouvrir, suivre et clôturer les ordres de réparation dans le logiciel et saisir les dossiers de garantie constructeur |
| 10 | D-037 | 6 | jobs | je paie un assistant import-export pour préparer et vérifier la liasse documentaire (factures commerciales, déclarations douane, certificats d'origine, BL) et la saisir dans le logiciel |
| 11 | D-038 | 6 | jobs | je paie 2900-3100€/mois x13 un assistant syndic pour préparer les convocations d'assemblées générales et diffuser les procès-verbaux |
| 12 | B-001 | 5 | reviews | Un des ATS les plus chers du marché : implémentation coûteuse en customisations et +20% exigés au renouvellement |
| 13 | D-010 | 5 | jobs | je paie un chargé de recouvrement à temps plein pour relancer les impayés par téléphone et par écrit, dossier par dossier |
| 14 | D-012 | 5 | jobs | je paie un assistant ADV pour émettre 150 à 200 factures par mois, saisir les commandes et relancer les impayés |
| 15 | D-018 | 5 | jobs | je paie un gestionnaire de paie pour collecter et saisir les variables de paie de chaque salarié tous les mois |
