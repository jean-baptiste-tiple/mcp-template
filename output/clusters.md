# Clusters d'opportunités micro-SaaS verticalisés MCP-first — Phase 2

**Date** : 2026-07-25

**Règle de clustering** : un cluster = 3-6 fiches, même acheteur, workflow contigu, mêmes connecteurs, une seule ligne budgétaire. Les fiches `generique` y jouent le rôle de features. Les clusters `origine: extrapolation` sont bâtis autour d'1-2 douleurs sourcées à fortes occurrences + cas d'usage extrapolés (à valider terrain).

**Décompte** : 20 clusters — 16 sourcés, 4 extrapolés (dont 1 extrapolation légère). 86 fiches couvertes / 356. 11 orphelines notables.

---

## C01 — Studio candidats pour cabinets de recrutement

**Acheteur** : gérant de cabinet de recrutement, 2-15 consultants (FR)
**Douleur principale** : la préparation des dossiers candidats (tri, mise en forme CV au format cabinet, approche) dévore le temps facturable
**Ligne budgétaire** : outillage du cabinet (ATS déjà 100-300 €/mois) + temps consultant
**Connecteurs** : ATS, parsing CV (PDF/Word), LinkedIn (Unipile), email
**Origine** : sourcé

### Cas d'usage (6)
- **D-043** (occ. 3, ancre) — trier les candidatures, compiler les dossiers et remettre chaque CV au format du cabinet avant envoi client, sans ressaisie
- **B-004** (occ. 3) — rattraper le parsing CV défaillant de l'ATS (Bullhorn) : extraction fiable et intégration propre des CV
- **A-042** (occ. 2) — générer des messages d'approche personnalisés candidat par candidat depuis le profil et le poste
- **E-022** (occ. 1) — sortir une shortlist de candidats LinkedIn en minutes au lieu d'heures de recherche manuelle
- **A-039** (occ. 1, feature, acheteur adjacent in-house) — rédiger des fiches de poste de qualité sans y passer des heures
- **E-026** (occ. 1) — suivre les candidats d'une offre sans jongler entre LinkedIn et l'ATS

### Verbatims sources
> « je paie un(e) assistant(e) d'agence de recrutement pour trier les candidatures, compiler les dossiers candidats et mettre en forme les CV avant envoi aux clients » — [source](https://fr.indeed.com/q-assistante-d'agence-emplois.html) (occ. 3)
> « Lenteurs, timeouts de session et parsing de CV défaillant reviennent en boucle dans les avis » — [source](https://www.leonar.app/blog/bullhorn-reviews/) (occ. 3)
> « Composer des messages d'approche personnalisés candidat par candidat est fastidieux et agaçant. » — [source](https://www.reddit.com/r/recruiting/comments/1cog1s5/) (occ. 2)
> « Sourcer une shortlist de candidats sur LinkedIn me prend des heures de recherche manuelle. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/unipile/) (occ. 1)
> « Écrire des fiches de poste me prend un temps fou et le résultat n'est jamais satisfaisant. » — [source](https://www.reddit.com/r/recruiting/comments/1g3homu/) (occ. 1)
> « Je dois jongler entre LinkedIn et mes outils pour suivre les candidats d'une offre. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/unipile/) (occ. 1)

### Notes
Recoupe exactement l'exemple « mcp-cv-editor ». interface: mixte, fit MCP fort. A-039 = feature avec acheteur adjacent (recruteur in-house).

---

## C02 — Back-office syndic & gérance pour cabinets d'administration de biens

**Acheteur** : gérant de cabinet de syndic / administration de biens FR, 2-30 collaborateurs
**Douleur principale** : AG, quittancement et demandes d'intervention absorbent des postes salariés entiers (2 900-3 100 € x13 observés)
**Ligne budgétaire** : masse salariale assistant syndic / assistant gestion locative (2 900-3 100 € x13 et 34-38 K€ observés)
**Connecteurs** : logiciel syndic/gérance (exports), email + AR24, compta, annuaire artisans
**Origine** : sourcé (features extrapolées à valider)

### Cas d'usage (3 + extrapolés)
- **D-038** (occ. 6, ancre) — préparer les convocations d'AG et diffuser les procès-verbaux pour chaque immeuble du portefeuille
- **D-023** (occ. 6) — automatiser quittancement, comptes locataires, révisions de loyer et suivi des relances
- **D-058** (occ. 2) — traiter les demandes d'intervention et de devis des copropriétaires (OS, suivi sinistres simples)
- *(extrapolé, à valider)* — réponses aux courriers copropriétaires
- *(extrapolé, à valider)* — préparation d'état daté
- *(extrapolé, à valider)* — suivi des décisions d'AG votées

### Verbatims sources
> « je paie 2900-3100€/mois x13 un assistant syndic pour préparer les convocations d'assemblées générales et diffuser les procès-verbaux » — [source](https://candidat.francetravail.fr/offres/recherche/detail/205FCRZ) (occ. 6)
> « je paie 34-38K€ un assistant de gestion locative pour le quittancement, les comptes locataires, les révisions de loyer et le suivi des relances » — [source](https://candidat.francetravail.fr/offres/recherche/detail/210LSXQ) (occ. 6)
> « je paie un gestionnaire de sinistres/assistant copro pour traiter les demandes d'intervention et de devis des copropriétaires » — [source](https://candidat.francetravail.fr/offres/recherche/detail/202MSCF) (occ. 2)

---

## C03 — Recouvrement & facturation sans relance manuelle pour PME

**Acheteur** : DAF ou dirigeant de PME B2B française, 20-200 salariés
**Douleur principale** : la chasse aux paiements occupe des salariés dédiés (postes de chargé de recouvrement observés)
**Ligne budgétaire** : poste de chargé de recouvrement / assistant ADV (temps plein observé)
**Connecteurs** : compta/facturation (balance âgée — Sage, Pennylane), email, banque, téléphone
**Origine** : sourcé

### Cas d'usage (6)
- **D-009** (occ. 7, ancre) — facturer les clients B2B chaque mois/trimestre et orchestrer les relances de paiement multi-canal sans salarié dédié
- **D-010** (occ. 5) — dérouler le recouvrement amiable dossier par dossier (relances écrites adaptées à l'ancienneté de la créance)
- **D-012** (occ. 5) — émettre 150-200 factures/mois, saisir les commandes et relancer les impayés sans assistant ADV
- **C-038** (occ. 1) — envoyer la facture au bon moment et au bon format pour ne pas retarder le paiement
- **A-016** (occ. 1) — gérer les paiements échelonnés avec relances automatiques à chaque échéance
- **C-039** (occ. 2, feature) — facturer et se faire payer sans impayés (déclinaison freelance/indépendant)

### Verbatims sources
> « je paie quelqu'un pour facturer mes clients B2B chaque mois/trimestre et courir après les paiements par mail, courrier et téléphone » — [source](https://www.welcometothejungle.com/fr/companies/foodles/jobs/xxx-f-h_clichy_FOODL_6rpa12j) (occ. 7)
> « je paie un chargé de recouvrement à temps plein pour relancer les impayés par téléphone et par écrit, dossier par dossier » — [source](https://candidat.francetravail.fr/offres/recherche/detail/211MBMW) (occ. 5)
> « je paie un assistant ADV pour émettre 150 à 200 factures par mois, saisir les commandes et relancer les impayés » — [source](https://candidat.francetravail.fr/offres/recherche/detail/209PLJF) (occ. 5)
> « The invoice arrives at the wrong moment in the relationship, in a format the client did not expect » — [source](https://www.indiehackers.com/post/i-thought-bookkeeping-software-problems-were-accounting-problems-i-was-wrong-25854191c9) (occ. 1)
> « Aucun outil de facturation ne gère bien les paiements échelonnés avec relances automatiques à chaque échéance. » — [source](https://www.reddit.com/r/smallbusiness/comments/1k641t1/) (occ. 1)
> « How to invoice (and not get stiffed) as a freelancer » — [source](https://www.indiehackers.com/post/how-to-invoice-and-not-get-stiffed-as-a-freelancer-159ac95174) (occ. 2)

---

## C04 — Zéro ressaisie fournisseurs pour PME

**Acheteur** : DAF/responsable comptable de PME FR, 10-100 salariés
**Douleur principale** : la ressaisie des factures fournisseurs dans l'ERP/compta occupe des salariés dédiés à temps plein (44 occurrences, plus de 2 000 offres Indeed FR)
**Ligne budgétaire** : poste d'opérateur de saisie / assistant achats (SMIC-14 €/h observé)
**Connecteurs** : email, OCR, ERP/compta
**Origine** : sourcé

### Cas d'usage (5)
- **D-001** (occ. 44, ancre) — supprimer la ressaisie des factures fournisseurs dans l'outil comptable/ERP (réception, saisie, imputation)
- **D-029** (occ. 3) — saisir et suivre les commandes fournisseurs et rapprocher automatiquement BL et factures
- **D-022** (occ. 2) — traiter les notes de frais et suivre les factures fournisseurs sans office manager dédié
- **D-002** (occ. 1) — reprendre les données de facturation lors d'un changement de logiciel sans intérimaire de ressaisie
- **C-033** (occ. 2, feature) — capturer et cataloguer les reçus sans corriger un OCR défaillant à la main

### Verbatims sources
> « je paie quelqu'un pour ressaisir les factures fournisseurs dans l'outil comptable / ERP toute la journée » — [source](https://fr.indeed.com/q-saisie-facture-emplois.html) (occ. 44)
> « je paie un assistant achats pour saisir et suivre les commandes fournisseurs et rapprocher bons de livraison et factures » — [source](https://candidat.francetravail.fr/offres/recherche/detail/196NMPK) (occ. 3)
> « je paie un office manager pour traiter les notes de frais dans le logiciel et suivre les factures fournisseurs » — [source](https://www.welcometothejungle.com/fr/companies/leasecom/jobs/office-manager-en-alternance-hf_merignac_LEASE_gaG7oqK) (occ. 2)
> « je paie un intérimaire 14-14,50€/h pour recréer les factures à la main après un changement de logiciel, en allant repêcher les prix et numéros de commande sur plusieurs serveurs puis en ressaisissant tout dans Excel » — [source](https://candidat.francetravail.fr/offres/recherche/detail/211MKKT) (occ. 1)
> « Taking a photo of every single receipt, waiting for image-to-text to fail and fixing+cataloguing it manually. No app does this right » — [source](https://news.ycombinator.com/item?id=38987334) (occ. 2)

### Notes
Douleur massive MAIS concurrence installée (Dext, Pennylane, iPaidThat) — le scoring tranche.

---

## C05 — Clôture sans relance pour petits cabinets comptables

**Acheteur** : gérant de petit cabinet comptable / bookkeeping, 1-10 collaborateurs (FR + anglo)
**Douleur principale** : collecte des justificatifs clients éparpillée (emails, SMS) et OCR défaillant à corriger
**Ligne budgétaire** : outillage cabinet (Dext facturé 235-850 $/mois observé) + temps collaborateur en saisie/pointage
**Connecteurs** : email, OCR, compta (QBO/Xero/ACD), SMS
**Origine** : sourcé

### Cas d'usage (6)
- **C-036** (occ. 3, ancre) — centraliser relances clients et justificatifs éparpillés (emails, SMS, tableurs, notes QBO) avant chaque clôture mensuelle
- **B-046** (occ. 3) — fiabiliser l'extraction des pièces : plus de montants mal placés à corriger après scan
- **B-047** (occ. 2) — remplacer un outil de collecte facturé 235-850 $/mois, hors de portée d'un petit cabinet
- **B-048** (occ. 2) — s'affranchir d'un outil de collecte au support médiocre et lent
- **D-053** (occ. 4) — internaliser la saisie comptable aujourd'hui externalisée à des opérateurs freelance payés à la tâche
- **D-006** (occ. 4) — saisir et pointer les pièces clients puis préparer les TVA, dossier après dossier, sans salarié dédié

### Verbatims sources
> « Chasing client replies, missing receipts, scattered communication... info spread across emails, texts, spreadsheets, QBO notes » — [source](https://www.indiehackers.com/post/i-thought-bookkeeping-software-problems-were-accounting-problems-i-was-wrong-25854191c9) (occ. 3)
> « Erreurs d'extraction sur les lignes : montants qui atterrissent au mauvais endroit après scan, OCR lent » — [source](https://fitsmallbusiness.com/dext-prepare-review/) (occ. 3)
> « Tarifs cabinets de 235 à 850$/mois : lourd pour un petit cabinet comptable » — [source](https://crm.org/news/dext-review) (occ. 2)
> « Support client jugé médiocre et lent par les cabinets » — [source](https://www.softwareadvice.com/accounting/receipt-bank-profile/) (occ. 2)
> « je paie un opérateur de saisie freelance pour la saisie comptable externalisée » — [source](https://fr.indeed.com/q-op%C3%A9rateur-saisie-comptable-freelance-emplois.html) (occ. 4)
> « je paie un salarié en cabinet comptable pour saisir et pointer les pièces des clients puis préparer les TVA, dossier après dossier » — [source](https://candidat.francetravail.fr/offres/recherche/detail/208HHBG) (occ. 4)

---

## C06 — Devis & paperasse de chantier pour artisans BTP

**Acheteur** : artisan / gérant de PME BTP française, 1-50 salariés
**Douleur principale** : le chiffrage ligne à ligne des devis est le premier poste de temps non facturable ; l'admin de chantier suit
**Ligne budgétaire** : poste d'assistant(e) BTP + temps du gérant/conducteur de travaux
**Connecteurs** : logiciel devis/facturation BTP, bibliothèque de prix, email, OCR, Chorus Pro, plateformes AO
**Origine** : sourcé

### Cas d'usage (6)
- **A-058** (occ. 2, ancre) — chiffrer un devis complet depuis une description de chantier, sans saisie ligne à ligne des prix unitaires
- **D-055** (occ. 2) — saisir devis et factures et pointer les règlements sans assistant(e) en TPE bâtiment
- **B-037** (occ. 1) — illustrer les ouvrages des devis avec des photos (manque des outils du marché)
- **D-027** (occ. 4) — suivre situations de travaux, bons de commande et sous-traitance chantier par chantier
- **D-028** (occ. 2) — monter les dossiers administratifs de réponse aux appels d'offres publics (pièces récurrentes)
- **A-055** (occ. 1) — classer automatiquement les pièces jointes email de chantier (RFI, avenants, certificats de paiement, plans)

### Verbatims sources
> « Taper les devis ligne par ligne avec les prix unitaires est ce qui me bouffe le plus de temps. » — [source](https://www.reddit.com/r/Construction/comments/1i19qcc/) (occ. 2)
> « je paie un(e) assistant(e) pour saisir les devis et factures et pointer les règlements dans une petite entreprise du bâtiment » — [source](https://candidat.francetravail.fr/offres/recherche/detail/206XWXF) (occ. 2)
> « Impossible d'ajouter des photos pour illustrer les ouvrages dans les devis » — [source](https://independant.io/avis/obat/) (occ. 1)
> « je paie un assistant travaux pour suivre les situations de travaux, les bons de commande et les contrats de sous-traitance chantier par chantier » — [source](https://candidat.francetravail.fr/offres/recherche/detail/202KZXQ) (occ. 4)
> « je paie un assistant pour monter les dossiers de réponse aux appels d'offres publics (pièces administratives récurrentes) » — [source](https://candidat.francetravail.fr/offres/recherche/detail/210TQGD) (occ. 2)
> « Gérer les pièces jointes email (RFI, avenants, certificats de paiement, plans) me bouffe un temps énorme. » — [source](https://www.reddit.com/r/Construction/comments/1abk6qe/) (occ. 1)

---

## C07 — Cockpit facturable pour MSP

**Acheteur** : dirigeant de MSP, 5-30 techniciens (marché anglo dominant)
**Douleur principale** : le temps facturable fuit de partout — saisie des temps repoussée au vendredi, reporting multi-outils manuel, refacturation cloud/licences source d'erreurs
**Ligne budgétaire** : outillage MSP (PSA/RMM déjà budgétés) + marge facturable récupérée
**Connecteurs** : PSA/RMM APIs (ConnectWise, Atera), Microsoft Partner Center, compta
**Origine** : sourcé

### Cas d'usage (6)
- **B-065** (occ. 3, ancre) — capter la saisie des temps facturables au fil de l'eau au lieu du batch du vendredi après-midi
- **A-031** (occ. 2) — produire le reporting de maintenance client sans exports Excel manuels multi-outils
- **B-070** (occ. 2) — obtenir du reporting custom fin que le RMM/PSA (Atera) ne sait pas produire
- **A-028** (occ. 1) — suivre et refacturer la consommation O365/Azure de nombreux petits clients sans y perdre sa marge
- **A-032** (occ. 1) — fiabiliser provisioning et refacturation des licences cloud/on-prem
- **A-023** (occ. 1) — générer des Statements of Work complets sans heures de rédaction ni oublis de périmètre

### Verbatims sources
> « Saisie des temps si pénible que les techs attendent le vendredi après-midi pour loguer leur semaine » — [source](https://rallied.ai/blog/connectwise-manage-review/) (occ. 3)
> « Le suivi de maintenance = exports Excel manuels depuis CyberCNS, RMM, backup et M365 — aucune vue centralisée. » — [source](https://www.reddit.com/r/msp/comments/1gemuz4/) (occ. 2)
> « Reporting faible de longue date : impossible d'obtenir du reporting custom fin » — [source](https://www.trustradius.com/products/atera/reviews/all) (occ. 2)
> « Suivre la facturation O365/Azure de plein de petits clients est douloureux et pas rentable. » — [source](https://www.reddit.com/r/msp/comments/18woggp/) (occ. 1)
> « Le provisioning manuel des licences cloud/on-prem crée des erreurs de facturation et des ratés d'équipe. » — [source](https://www.reddit.com/r/msp/comments/1i850gx/) (occ. 1)
> « Rédiger des Statements of Work détaillés à la main prend des heures et on oublie des éléments de périmètre. » — [source](https://www.reddit.com/r/msp/comments/1f1vopm/) (occ. 1)

---

## C08 — Food cost & pilotage pour restaurateurs indépendants

**Acheteur** : restaurateur indépendant, 1-3 établissements
**Douleur principale** : inventaire, food cost et suivi financier débordent le gérant — spreadsheets inefficaces, stack de 5 outils à réconcilier à la main
**Ligne budgétaire** : outillage de gestion restaurant (MarginEdge/MarketMan/R365 déjà évalués) + temps manager
**Connecteurs** : POS (Toast/Square/caisse FR), OCR factures fournisseurs, compta, planning
**Origine** : sourcé

### Cas d'usage (5)
- **A-090** (occ. 2, ancre) — suivre inventaire et food cost intégré au POS (Toast) sans casse-tête d'outils
- **A-092** (occ. 1) — absorber la saisie d'inventaire et de comptes multi-sites qui déborde le manager en rush
- **A-088** (occ. 1) — remplacer le suivi financier sur spreadsheets par un P&L / trésorerie lisible du restaurant
- **A-091** (occ. 1) — réconcilier automatiquement la stack (Square, Gusto, QuickBooks, MarginEdge, Uber Eats)
- **B-063** (occ. 1, feature RH adjacente) — gérer automatiquement les congés payés dans le planning RH restauration

### Verbatims sources
> « Suivre l'inventaire et le food cost avec intégration Toast : le choix d'outil est un casse-tête permanent. » — [source](https://www.reddit.com/r/restaurantowners/comments/1fkufar/) (occ. 2)
> « Avec deux restaurants, la saisie d'inventaire et de comptes déborde la capacité du manager en période de rush. » — [source](https://www.reddit.com/r/restaurantowners/comments/1beu20l/) (occ. 1)
> « Après 1 an et demi d'ouverture je n'arrive toujours pas à me payer — mon suivi financier sur spreadsheets ne marche pas. » — [source](https://www.reddit.com/r/restaurantowners/comments/1boihd3/) (occ. 1)
> « Notre stack pizza (Square, Gusto, QuickBooks, MarginEdge, Uber Eats) crée une vraie complexité opérationnelle. » — [source](https://www.reddit.com/r/restaurantowners/comments/1bna35z/) (occ. 1)
> « Pas de gestion automatisée des congés payés dans un outil de planning RH restauration » — [source](https://conseils-astuces-rh.fr/avis-combo-rh/) (occ. 1)

---

## C09 — SAV e-commerce autonome (Shopify)

**Acheteur** : e-commerçant Shopify, 1-10 personnes
**Douleur principale** : 2-3 h/jour de support répétitif (« où est ma commande », retours) sans continuité de contexte entre tickets ni visibilité sur les retours
**Ligne budgétaire** : budget support/helpdesk de la boutique
**Connecteurs** : Shopify, helpdesk, transporteurs, email/WhatsApp
**Origine** : sourcé

### Cas d'usage (5)
- **C-044** (occ. 4, ancre) — répondre automatiquement aux questions WISMO et politique de retours qui mangent 2-3 h/jour
- **C-045** (occ. 2) — laisser le marchand garder le contrôle sur remboursements et cas limites (contrainte d'adoption)
- **C-046** (occ. 1) — donner à celui qui répond le contexte complet des tickets précédents du même client
- **D-035** (occ. 3) — enregistrer les retours produits, arbitrer réparation/échange/avoir et monter les dossiers d'avoir
- **A-078** (occ. 1) — tracer les colis retournés chez le partenaire fulfillment (reverse logistics)

### Verbatims sources
> « Merchants spend 2-3 hours a day just answering 'where is my order' and return policy questions » — [source](https://www.indiehackers.com/post/i-want-to-build-an-ai-support-agent-for-shopify-stores-am-i-solving-a-real-problem-d009ab93b3) (occ. 4)
> « Merchants are hesitant when it comes to refunds or edge cases... people need to feel in control » — [source](https://www.indiehackers.com/post/i-want-to-build-an-ai-support-agent-for-shopify-stores-am-i-solving-a-real-problem-d009ab93b3) (occ. 2)
> « Ticket #3 from this customer about the same order. Whoever replies doesn't know » — [source](https://www.indiehackers.com/post/i-want-to-build-an-ai-support-agent-for-shopify-stores-am-i-solving-a-real-problem-d009ab93b3) (occ. 1)
> « je paie un assistant SAV pour enregistrer les retours produits, décider réparation/échange/avoir et monter les dossiers de demande d'avoir » — [source](https://candidat.francetravail.fr/offres/recherche/detail/210PBVL) (occ. 3)
> « Un colis marqué retourné à l'expéditeur a disparu : zéro visibilité sur ce que fait le partenaire de fulfillment. » — [source](https://www.reddit.com/r/ecommerce/comments/1ibsbv2/) (occ. 1)

### Notes
Gorgias et cie = concurrence frontale.

---

## C10 — Copilote WhatsApp du coach indépendant

**Acheteur** : coach indépendant (sportif, nutrition, business), solo à 5 coachs (FR)
**Douleur principale** : le suivi WhatsApp des coachés (check-ins, réponses aux avancements, notes vocales, préparation de séance) déborde le temps du coach
**Ligne budgétaire** : outillage du coach (abonnements 20-80 €/mois par fiche)
**Connecteurs** : WhatsApp Business API, transcription audio, Notion/Sheets
**Origine** : sourcé

### Cas d'usage (6)
- **E-060** (occ. 1, ancre) — répondre à chaque point d'avancement au bon moment, même envoyé à toute heure
- **E-059** (occ. 1) — envoyer un check-in régulier à chaque coaché pour éviter le décrochage entre séances
- **E-061** (occ. 1) — dérouler le programme au goutte-à-goutte malgré des dates de départ différentes par coaché
- **E-062** (occ. 1) — compiler le journal de bord d'un coaché avant sa séance au lieu de relire des jours de conversation
- **E-063** (occ. 1) — demander et collecter une preuve d'action concrète pour chaque exercice
- **E-064** (occ. 1) — transformer les notes vocales des coachés en résumés exploitables

### Verbatims sources
> « Mes coachés m'envoient leur avancement à toute heure et une réponse qui tarde casse la dynamique. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/whatsapp/) (occ. 1)
> « Mes coachés décrochent entre deux séances faute d'un rappel régulier. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/whatsapp/) (occ. 1)
> « Je veux dérouler mon programme jour après jour mais chaque coaché commence à une date différente. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/whatsapp/) (occ. 1)
> « Avant chaque séance je relis des jours de conversation WhatsApp pour me rappeler où en est le coaché. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/whatsapp/) (occ. 1)
> « Mes coachés disent avoir fait leur exercice mais je n'ai aucune preuve concrète. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/whatsapp/) (occ. 1)
> « Mes coachés me parlent en notes vocales et réécouter chaque message de deux minutes me coûte un temps fou. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/whatsapp/) (occ. 1)

### Notes
Cluster homogène par construction MAIS source unique catalogue forward (occ 1 partout) — douleur à corroborer terrain avant tout build.

---

## C11 — Back-office d'agence d'intérim indépendante

**Acheteur** : directeur d'agence d'intérim indépendante FR, 2-10 permanents
**Douleur principale** : contrats de mission, relevés d'heures, DPAE saisis chaque semaine à la main
**Ligne budgétaire** : poste d'assistant d'agence (2 000 € brut + variables observé)
**Connecteurs** : logiciel d'intérim (exports), OCR relevés d'heures, URSSAF/net-entreprises (DPAE), email, paie
**Origine** : sourcé

### Cas d'usage (4)
- **D-039** (occ. 5, ancre) — établir les contrats de mission et saisir les relevés d'heures des intérimaires chaque semaine sans assistant dédié
- **D-040** (occ. 4, acheteur adjacent : RH de PME utilisatrice) — automatiser DPAE, saisie des heures d'intérim et contrôle des factures d'agence côté entreprise utilisatrice
- **A-046** (occ. 1) — unifier les opérations de staffing éclatées sur six outils non intégrés
- **A-040** (occ. 1, corroboration US) — suivre 75-100 candidats et leurs credentials avec relances hebdomadaires sans charge admin écrasante

### Verbatims sources
> « je paie 2000€ brut + variables un assistant d'agence d'intérim pour établir les contrats de mission et saisir les relevés d'heures des intérimaires » — [source](https://candidat.francetravail.fr/offres/recherche/detail/209MYJJ) (occ. 5)
> « je paie un assistant RH pour les DPAE, la saisie des heures d'intérim, le contrôle des factures d'agence et le classement des dossiers du personnel » — [source](https://candidat.francetravail.fr/offres/recherche/detail/211BMSZ) (occ. 4)
> « Notre staffing médical tourne sur Deputy + Zoho + Google Sheets + Jotform + SignNow + OpenPhone — l'éclatement nous ralentit. » — [source](https://www.reddit.com/r/recruiting/comments/1j55hr9/) (occ. 1)
> « Je suis 75-100 candidats avec 15-20 credentials chacun et des relances hebdo — la charge admin est écrasante. » — [source](https://www.reddit.com/r/recruiting/comments/1k7orxv/) (occ. 1)

---

## C12 — Planning vivant pour services à la personne

**Acheteur** : directeur de SAAD FR (20-100 intervenants) ; adjacent : gérants d'entreprises de ménage
**Douleur principale** : la mise à jour continue des plannings d'intervenants et la gestion des remplacements mobilisent un poste dédié
**Ligne budgétaire** : poste de gestionnaire de planning
**Connecteurs** : planning métier (Octime/Ximi), SMS/téléphonie, RH
**Origine** : sourcé

### Cas d'usage (4)
- **D-016** (occ. 10, ancre) — mettre à jour en continu les plannings des intervenants à domicile et orchestrer les remplacements (absences, congés)
- **A-070** (occ. 1) — outiller bookings, intervenantes et organisation d'une entreprise de ménage en croissance
- **A-072** (occ. 1) — structurer dispatch et gestion de sous-traitants au passage de solo à équipe
- **A-071** (occ. 1) — sécuriser la prise de réservations face aux pannes de l'outil de booking

### Verbatims sources
> « je paie un gestionnaire de planning pour mettre à jour en continu les plannings des intervenants à domicile et gérer les remplacements » — [source](https://fr.indeed.com/q-gestionnaire-planning-aide-a-domicile-emplois.html) (occ. 10)
> « Ma boîte de ménage grossit et je ne sais pas quel stack gérer bookings, intervenantes et organisation. » — [source](https://www.reddit.com/r/sweatystartup/comments/1k5zwp0/) (occ. 1)
> « Passer de solo à un modèle avec sous-traitants : je n'ai ni logiciel ni process pour gérer une équipe. » — [source](https://www.reddit.com/r/sweatystartup/comments/1ivn28a/) (occ. 1)
> « BookingKoala est tombé 4h30 : les clients ne pouvaient plus réserver, revenus perdus. » — [source](https://www.reddit.com/r/sweatystartup/comments/1je9t70/) (occ. 1)

### Notes
Temps réel + dashboard requis, fit MCP faible — gardé, le scoring tranche.

---

## C13 — Cockpit du bailleur privé

**Acheteur** : bailleur privé / SCI FR, 2-20 lots
**Douleur principale** : pilotage du patrimoine locatif éclaté — cashflow multi-biens hors de portée des outils mono-bien (comptable à 390 € la simulation), rapprochement des loyers et baux mal couverts
**Ligne budgétaire** : dépenses de gestion du bailleur (logiciel de gestion locative + honoraires comptables ponctuels)
**Connecteurs** : agrégation bancaire, gestion locative, indices INSEE, paramètres fiscaux FR
**Origine** : sourcé

### Cas d'usage (5)
- **A-095** (occ. 1, ancre) — modéliser le cashflow d'un patrimoine locatif multi-biens avec paramètres fiscaux FR, sans simulation comptable à 390 €
- **B-022** (occ. 2) — gérer baux commerciaux et portefeuilles >10 lots (indexation ILC/ILAT) au-delà des outils grand public
- **B-023** (occ. 2) — fiabiliser le rapprochement bancaire des loyers encaissés
- **A-060** (occ. 2, corroboration US) — analyser une acquisition locative en testant des hypothèses, au-delà d'un Excel rigide
- **A-062** (occ. 2, corroboration US) — suivre la performance réelle (P&L) par bien entre vacance et charges

### Verbatims sources
> « Modéliser le cashflow de plusieurs biens locatifs : les outils sont mono-bien et mon comptable facture 390 euros la simulation. » — [source](https://www.reddit.com/r/vosfinances/comments/1ghuzay/) (occ. 1)
> « Ne gère pas les baux commerciaux et manque de fonctions avancées pour les gros portefeuilles » — [source](https://www.rentilot.fr/avis/rentila/) (occ. 2)
> « Synchronisation bancaire capricieuse et support client perfectible » — [source](https://lgpimmo.fr/rentila/) (occ. 2)
> « Analyser une acquisition locative dans un tableur Excel basique est trop rigide pour tester des hypothèses. » — [source](https://www.reddit.com/r/realestateinvesting/comments/1j4y6vc/) (occ. 2)
> « Suivre la performance réelle de mon duplex entre vacance locative et changements d'escrow est laborieux. » — [source](https://www.reddit.com/r/realestateinvesting/comments/1hb60v2/) (occ. 2)

---

## C14 — Radar signaux d'achat pour PME B2B

**Acheteur** : responsable commercial/growth de PME B2B FR, 5-30 salariés
**Douleur principale** : prospection indifférenciée — énergie gaspillée sur des comptes sans intention d'achat, faute de signaux et de contexte sur les interlocuteurs
**Ligne budgétaire** : budget outils sales/prospection de la PME
**Connecteurs** : LinkedIn, SIRENE/Pappers, offres d'emploi/job boards, enrichissement (Airscale), recherche web, CRM
**Origine** : sourcé

### Cas d'usage (6)
- **E-070** (occ. 1, ancre) — prioriser les comptes en signal d'achat au lieu de démarcher tout le monde au même moment
- **E-074** (occ. 1) — constituer la fiche compte enrichie (firmographie + bons interlocuteurs) sans dix onglets ouverts
- **E-076** (occ. 1) — identifier qui se cache derrière un email ou un numéro entrant (reverse lookup)
- **E-023** (occ. 1) — repérer les entreprises qui recrutent un poste cible (signal d'embauche)
- **E-005** (occ. 1, partagée avec C16) — vérifier rapidement un client ou partenaire avant engagement
- **E-009** (occ. 1, partagée avec C16) — arriver préparé à chaque rendez-vous avec un brief interlocuteur + entreprise

### Verbatims sources
> « Je démarche tout le monde au même moment et je gaspille mon énergie sur des comptes qui n'achètent pas maintenant. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/airscale/) (occ. 1)
> « Avant une approche ABM, rassembler la firmographie et les bons interlocuteurs, c'est dix onglets ouverts par compte. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/airscale/) (occ. 1)
> « Un formulaire entrant ne me laisse qu'un email, un appel manqué qu'un numéro, sans aucun contexte sur qui est derrière. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/airscale/) (occ. 1)
> « Je n'ai aucun moyen simple de repérer les entreprises qui recrutent le poste que je cible. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/unipile/) (occ. 1)
> « Je décide sur un client, un partenaire ou un recrutement clé sans avoir le temps de vraiment vérifier. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/linkup/) (occ. 1)
> « J'enchaîne les rendez-vous sans avoir le temps de me renseigner sur qui j'ai en face. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/linkup/) (occ. 1)

### Notes
Contre-signal C-056 (créneau leadgen saturé, churn élevé) — à afficher : « No-code B2B outreach automation tool founded 2024, $500K TTM revenue — reason for selling: pivot to new project » — [source](https://blog.acquire.com/top-startups-listings-on-acquire-com-october-edition/) (occ. 1).

---

## C15 — Reporting client sans vendredi sacrifié pour agences marketing

**Acheteur** : dirigeant d'agence marketing/web, 5-30 salariés
**Douleur principale** : le reporting client manuel prend plus d'une semaine par mois, et la relation client (propositions, feedback, retards) reste sans traçabilité
**Ligne budgétaire** : outillage agence (AgencyAnalytics jugé cher) + temps non facturable
**Connecteurs** : GA4/Meta/Google Ads, outils SEO, PM (Asana/ClickUp), email
**Origine** : sourcé

### Cas d'usage (5)
- **A-079** (occ. 2, ancre) — produire le reporting mensuel de 35 clients hétérogènes sans y passer plus d'une semaine
- **C-016** (occ. 1) — automatiser une production de rapports clients encore artisanale (impression, découpage, photocopie)
- **C-050** (occ. 1) — centraliser le feedback client dans un portail white-label accessible sans compte
- **C-051** (occ. 2) — tracer l'ouverture et la lecture des propositions commerciales envoyées par email
- **A-083** (occ. 2) — objectiver l'attribution des retards de projet aux clients (preuve horodatée)

### Verbatims sources
> « Le reporting client manuel me prend plus d'une semaine chaque mois pour 35 clients aux services hétérogènes. » — [source](https://www.reddit.com/r/agency/comments/1aeqtru/) (occ. 2)
> « They had us printing a report from an HTML document, cutting out portions with scissors, and photocopying... to mail to the client » — [source](https://news.ycombinator.com/item?id=13337024) (occ. 1)
> « Where's the client portal? How do I white-label this? Can my clients comment without creating accounts? » — [source](https://www.indiehackers.com/post/i-spent-6-months-building-for-indie-hackers-my-first-real-customer-taught-me-i-was-wrong-c4c6ac27fc) (occ. 1)
> « We send proposals just in email and don't know what happens with it. Did the client open and read it (and which parts)? » — [source](https://www.indiehackers.com/post/how-do-you-send-proposals-to-your-clients-9d60d3ecaa) (occ. 2)
> « Les clients nous reprochent les retards alors qu'ils viennent d'eux — aucune preuve objective d'attribution des délais. » — [source](https://www.reddit.com/r/agency/comments/1dseo4k/) (occ. 2)

---

## C16 — Veille & due diligence du dirigeant de PME

**Acheteur** : dirigeant de PME FR, 5-50 salariés
**Douleur principale** : décisions engageantes prises sans vérification et veille (concurrents, réglementaire, marché) subie faute de temps
**Ligne budgétaire** : budget veille/outillage du dirigeant
**Connecteurs** : recherche web (LinkUp), registres entreprises (Pappers/SIRENE), Légifrance/JO, presse, LinkedIn
**Origine** : sourcé

### Cas d'usage (5)
- **E-005** (occ. 1, ancre, partagée avec C14) — dérouler une due diligence légère avant tout engagement (client, partenaire, recrutement clé)
- **E-008** (occ. 1) — être alerté des nouvelles obligations réglementaires avant l'échéance, pas après
- **E-004** (occ. 2) — détecter lancements et levées des concurrents en temps utile, pas trois mois trop tard
- **E-009** (occ. 1, partagée avec C14) — recevoir un brief automatique sur chaque interlocuteur avant rendez-vous
- **C-059** (occ. 2) — remplacer trois semaines de collecte Excel manuelle par étude de marché

### Verbatims sources
> « Je décide sur un client, un partenaire ou un recrutement clé sans avoir le temps de vraiment vérifier. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/linkup/) (occ. 1)
> « Je découvre une nouvelle obligation réglementaire une fois le délai déjà passé. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/linkup/) (occ. 1)
> « J'apprends les lancements et les levées de mes concurrents trois mois trop tard, par hasard. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/linkup/) (occ. 2)
> « J'enchaîne les rendez-vous sans avoir le temps de me renseigner sur qui j'ai en face. » — [source](https://www.forward-ai.fr/cas-d-usage/famille/linkup/) (occ. 1)
> « I built an AI to kill the 3-week Excel research grind. It got 8 PH upvotes » — [source](https://www.indiehackers.com/post/i-built-an-ai-to-kill-the-3-week-excel-research-grind-it-got-8-ph-upvotes-what-did-i-do-wrong-49c9b1c7d1) (occ. 2)

### Notes
Douleurs faibles individuellement, panier de features plus que produit.

---

## C17 — Back-office d'organisme de formation (Qualiopi/CPF)

**Acheteur** : dirigeant d'organisme de formation FR, 2-20 salariés
**Douleur principale** : l'administration de chaque session (inscriptions, conventions, convocations, dossiers stagiaires) absorbe un poste d'assistant formation
**Ligne budgétaire** : poste d'assistant formation
**Connecteurs** : Digiforma/logiciel OF, EDOF/CPF, email, facturation, calendrier
**Origine** : extrapolation

### Cas d'usage (1 sourcé + extrapolés)
- **D-021** (occ. 5, ancre) — gérer inscriptions, conventions, convocations et dossiers stagiaires de chaque session sans assistant dédié
- *(extrapolé, à valider)* — préparation d'audit Qualiopi (preuves)
- *(extrapolé, à valider)* — BPF annuel
- *(extrapolé, à valider)* — relances OPCO/EDOF
- *(extrapolé, à valider)* — émargements et attestations

### Verbatims sources
> « je paie un assistant formation pour gérer inscriptions, conventions, convocations et dossiers stagiaires de chaque session » — [source](https://candidat.francetravail.fr/offres/recherche/detail/207RHZW) (occ. 5)

---

## C18 — Liasse export sans transitaire de secours

**Acheteur** : dirigeant/ADV de PME exportatrice FR, 10-100 salariés
**Douleur principale** : la préparation et la vérification de la liasse documentaire export (factures commerciales, déclarations douane, certificats d'origine, BL) mobilisent un assistant à chaque expédition
**Ligne budgétaire** : poste d'assistant import-export
**Connecteurs** : ERP, douane (Delta — accès difficile), transitaires, email, OCR
**Origine** : extrapolation

### Cas d'usage (1 sourcé + extrapolés)
- **D-037** (occ. 6, ancre) — préparer, vérifier et saisir la liasse documentaire export à chaque expédition sans assistant dédié
- *(extrapolé, à valider)* — génération incoterms/factures proforma
- *(extrapolé, à valider)* — classement HS codes
- *(extrapolé, à valider)* — suivi certificats d'origine

### Verbatims sources
> « je paie un assistant import-export pour préparer et vérifier la liasse documentaire (factures commerciales, déclarations douane, certificats d'origine, BL) et la saisir dans le logiciel » — [source](https://candidat.francetravail.fr/offres/recherche/detail/204WYPH) (occ. 6)

### Notes
Connecteur douane exotique — pénalité faisabilité.

---

## C19 — Garantie constructeur & après-vente garage

**Acheteur** : patron de garage/concession FR, 5-50 salariés
**Douleur principale** : ouverture, suivi et clôture des ordres de réparation et saisie des dossiers de garantie constructeur mobilisent une secrétaire après-vente
**Ligne budgétaire** : poste de secrétaire après-vente
**Connecteurs** : DMS atelier, portails garantie constructeurs (fermés — pénalité), facturation
**Origine** : extrapolation

### Cas d'usage (1 sourcé + extrapolés)
- **D-031** (occ. 6, ancre) — ouvrir, suivre et clôturer les ordres de réparation et saisir les dossiers de garantie sans secrétaire APV dédiée
- *(extrapolé, à valider)* — montage des dossiers de garantie
- *(extrapolé, à valider)* — relances constructeur
- *(extrapolé, à valider)* — OR pré-remplis depuis RDV

### Verbatims sources
> « je paie une secrétaire après-vente pour ouvrir, suivre et clôturer les ordres de réparation dans le logiciel et saisir les dossiers de garantie constructeur » — [source](https://candidat.francetravail.fr/offres/recherche/detail/196RNTF) (occ. 6)

---

## C20 — Litiges & avoirs de livraison pour distribution

**Acheteur** : responsable service clients de PME distribution/e-commerce FR, 50-200 salariés
**Douleur principale** : enregistrement des réclamations livraison (retards, casse, erreurs) et suivi des avoirs/indemnisations faits à la main jusqu'à résolution
**Ligne budgétaire** : poste d'assistant service clients
**Connecteurs** : ERP/OMS, portails transporteurs, email, compta
**Origine** : extrapolation légère

### Cas d'usage (3 sourcés + extrapolé)
- **D-036** (occ. 1, ancre) — enregistrer les réclamations livraison et suivre avoirs et indemnisations jusqu'à résolution
- **B-072** (occ. 3) — contrôler la facturation transport : erreurs, surcharges inattendues, remboursements lents
- **D-035** (occ. 3, partagée avec C09) — gérer retours produits (RMA) et montage des dossiers d'avoir
- *(extrapolé, à valider)* — constitution automatique des dossiers d'indemnisation transporteur

### Verbatims sources
> « je paie un assistant pour enregistrer les réclamations livraison (retards, casse, erreurs) et suivre avoirs et indemnisations jusqu'à résolution » — [source](https://candidat.francetravail.fr/offres/recherche/detail/210WXXM) (occ. 1)
> « Erreurs de facturation, charges inattendues et remboursements lents ou absents » — [source](https://checkthat.ai/brands/shipstation/reviews) (occ. 3)
> « je paie un assistant SAV pour enregistrer les retours produits, décider réparation/échange/avoir et monter les dossiers de demande d'avoir » — [source](https://candidat.francetravail.fr/offres/recherche/detail/210PBVL) (occ. 3)

---

## Orphelines notables

- **D-019 / D-020 / D-052** (médical FR) : écartées — réglementaire santé lourd (HDS), hors garde-fous.
  > « je paie une secrétaire médicale uniquement pour taper les comptes rendus dictés par les médecins » — [source](https://candidat.francetravail.fr/offres/recherche/detail/192NNJH) (occ. 3)
  > « je paie une télésecrétaire pour prendre les rendez-vous de plusieurs cabinets et saisir les informations rapidement » — [source](https://candidat.francetravail.fr/offres/recherche/detail/208DWXK) (occ. 2)
  > « je paie une secrétaire médicale de médecine du travail pour planifier les visites et convocations des salariés des entreprises adhérentes » — [source](https://candidat.francetravail.fr/offres/recherche/detail/207MKNC) (occ. 1)
- **D-047** (occ. 15, appointment setting) : marché saturé d'outils + voix = hors périmètre build <20h.
  > « I pay an appointment setter $16-30/hour to make 8-10 outbound calls per hour, schedule sales appointments and log everything in the CRM » — [source](https://www.indeed.com/q-Hourly-Appointment-Setter-jobs.html) (occ. 15)
- **D-044** (occ. 36, data entry générique) : trop transverse pour un vertical, réservoir de features.
  > « I pay a data entry clerk $19.66/hour to transfer data from physical documents into our online database and keep spreadsheets updated » — [source](https://www.indeed.com/career/data-entry-clerk/salaries) (occ. 36)
- **D-048** (MLS US, occ. 9) : données MLS fermées, hors marché FR.
  > « I pay a listing coordinator to enter property listings and changes into the MLS and maintain sales records for our agents » — [source](https://www.indeed.com/q-real-estate-mls-listing-coordinator-jobs.html) (occ. 9)
- **C-023** (VBA desk options) : cycle de vente compliance incompatible micro-SaaS.
  > « A portion of option dealing was run on MS Office VBA, the oldest code dated from 1998 » — [source](https://news.ycombinator.com/item?id=33611431) (occ. 1)
- **A-051, A-052, C-019, C-020** : acheteurs ETI/enterprise hors ICP micro-SaaS.
  > « On gère 600+ salariés sur 10 sites avec des dossiers papier et zéro SIRH. » — [source](https://www.reddit.com/r/humanresources/comments/1gkdlax/) (occ. 3)
  > « Notre process de rémunération (augmentations, bonus) pour 700 personnes tourne sur des formules Excel maison. » — [source](https://www.reddit.com/r/humanresources/comments/1axf7i6/) (occ. 1)
  > « I work in manufacturing and I see Excel everywhere... share with accounting, purchasing, warehouse, shop floor, sales, and a vendor » — [source](https://news.ycombinator.com/item?id=33611431) (occ. 1)
  > « JPM had over 20k MS Access databases on their file servers. The company I worked for had over 12k » — [source](https://news.ycombinator.com/item?id=33611431) (occ. 1)
