# Top 5 — fiches complètes

Date : 2026-07-25. Sélection : les 5 meilleurs scores de `scoring.md`, tous intégralement sourcés (C17, extrapolé, arrive 6e — voir note de fin). Détail des verbatims et URLs dans `clusters.md`.

---

## 1. C01 — Studio candidats pour cabinets de recrutement — 23/25

**Acheteur** : gérant de cabinet de recrutement, 2-15 consultants, France.
**Douleur** : la préparation des dossiers candidats (tri des candidatures, mise en forme des CV au format cabinet, anonymisation, messages d'approche) dévore le temps facturable des consultants ; des assistants sont payés pour ça (D-043, occ. 3 ; B-004 ; A-042 ; E-022 ; E-026).
**Cas d'usage** : reformatage + anonymisation de CV à la charte du cabinet · tri/qualification des candidatures entrantes · shortlists LinkedIn depuis le brief · messages d'approche personnalisés · fiches de poste (feature) · synchro LinkedIn↔ATS.
**Connecteurs** : ATS, parsing CV (PDF/Word), LinkedIn (API tierce type Unipile), email.
**Interface** : mixte (conversationnel + partage en ligne des CV avec stats).

**Requête LinkedIn Sales Nav** :
`Fonction : Propriétaire / Associé / Direction générale · Secteur : « Dotation et recrutement de personnel » · Géographie : France · Effectif entreprise : 2-10 et 11-50`
Variante mots-clés : titre contient (« fondateur » OR « gérant » OR « directeur associé ») AND entreprise contient (« recrutement » OR « chasse de têtes » OR « executive search »). Volume attendu : plusieurs milliers — 50+ design partners triviaux.

**One-pager (draft)**
> **Vos dossiers candidats au format cabinet, anonymisés et envoyés en 10 minutes — pas en une demi-journée.**
> - Un CV source (PDF, Word, LinkedIn) devient un dossier à votre charte, anonymisé et prêt à partager en ligne, avec statistiques de consultation par le client.
> - Shortlist et messages d'approche générés depuis le brief du poste, dans votre ton, reliés à votre ATS — zéro double saisie.
> - Pilotable depuis Claude/ChatGPT (vos consultants restent dans leur conversation) ou depuis le web.
>
> **Offre pilote : 99 €/mois**, 2 calls de feedback/mois inclus, résiliable à tout moment. 5 places.

**Risques**
- *Technique* : qualité du parsing sur CV hétérogènes (scans, mises en page exotiques) — prévoir un mode correction rapide plutôt que promettre 100 % d'automatisme.
- *Marché* : les cabinets équipés attendent que ça vive DANS leur ATS (Bullhorn, Recruit CRM…) ; commencer par le flux fichier/email qui contourne l'intégration, intégrer ensuite.

---

## 2. C02 — Back-office syndic & gérance — 23/25

**Acheteur** : gérant de cabinet de syndic / administration de biens, 2-30 collaborateurs, France.
**Douleur** : préparation des AG (convocations, PV, diffusion — D-038, occ. 6), quittancement/relances (D-023, occ. 6) et demandes d'intervention des copropriétaires (D-058) absorbent des postes salariés entiers — 2 900-3 100 € ×13 observés à Paris.
**Cas d'usage** : dossier d'AG assemblé + convocations conformes (délais, AR24) · PV rédigés et diffusés · quittancement et relances · tri des demandes d'intervention + ordres de service artisans · (extrapolé, à valider) réponses courriers copropriétaires, état daté.
**Connecteurs** : logiciel syndic (exports), email + AR24, compta, annuaire artisans.

**Requête LinkedIn Sales Nav** :
`Titre : (gérant OR directeur OR président) · Mots-clés entreprise : « syndic » OR « administration de biens » · Géographie : France · Effectif : 2-10, 11-50`
Compléter par l'annuaire ANGC/UNIS pour les cabinets indépendants. Volume : centaines de cabinets indépendants — 50+ atteignable.

**One-pager (draft)**
> **Les convocations d'AG, PV et relances de votre cabinet préparés en heures — sans embaucher un assistant de plus.**
> - Dossier d'AG assemblé et convocations générées dans les délais légaux, prêtes pour AR24 ; PV rédigé depuis vos notes de séance.
> - Quittancement, relances d'impayés et réponses aux copropriétaires pré-rédigés sur l'historique réel du dossier.
> - Demandes d'intervention triées, ordres de service générés vers vos artisans.
>
> **Offre pilote : 99 €/mois** par cabinet, 2 calls de feedback/mois inclus. 5 cabinets pilotes.

**Risques**
- *Technique* : logiciels syndic fermés (pas d'API) — dépendance aux exports ; le pilote doit valider que l'import de données est vivable.
- *Marché* : conformité loi de 1965 (formalisme des convocations) — se positionner copilote avec validation humaine systématique, jamais autopilote ; une erreur de délai = AG annulable.

---

## 3. C06 — Devis & paperasse de chantier pour artisans BTP — 22/25

**Acheteur** : artisan / gérant de PME BTP, 1-50 salariés, France.
**Douleur** : « taper les devis ligne par ligne est ce qui me bouffe le plus de temps » (A-058) ; assistants payés pour saisir devis/factures (D-055) ; situations de travaux et sous-traitance suivies à la main (D-027, occ. 4) ; dossiers d'AO publics montés par un assistant (D-028).
**Cas d'usage** : devis chiffré généré par conversation (description du chantier + bibliothèque de prix, photos des ouvrages) · situations de travaux · dossiers AO publics (pièces administratives, attestations à jour) · classement des pièces jointes de chantier.
**Connecteurs** : logiciel devis/facturation BTP (Obat, Batappli, EBP — exports), bibliothèque de prix, email, OCR, Chorus Pro, plateformes AO.

**Requête LinkedIn Sales Nav** :
`Fonction : Propriétaire / Direction générale · Secteur : Construction · Géographie : France · Effectif : 2-10, 11-50`
Volume : dizaines de milliers. Angle réseau : commencer par les corps d'état techniques (élec, CVC, menuiserie) où le devis est le plus structuré.

**One-pager (draft)**
> **Dictez le chantier, recevez le devis chiffré dans votre bibliothèque de prix — prêt à envoyer.**
> - Un devis structuré en minutes depuis une description orale ou des photos, avec vos ouvrages et vos prix, illustré.
> - Situations de travaux et suivi de sous-traitance tenus à jour sans ressaisie.
> - Dossier d'appel d'offres public assemblé avec vos attestations à jour.
>
> **Offre pilote : 49 €/mois**, 2 calls de feedback/mois inclus. 5 artisans pilotes.

**Risques**
- *Technique* : import initial des bibliothèques de prix (formats hétérogènes, BatiChiffrage sous licence).
- *Marché* : Obat/Batappli très bien notés — se placer AU-DESSUS de l'outil installé (génération + import), pas en remplacement ; ICP peu présent sur LinkedIn, prévoir un canal terrain (fédérations, négoces).

---

## 4. C03 — Recouvrement & facturation PME — 21/25

**Acheteur** : DAF ou dirigeant de PME B2B, 20-200 salariés, France.
**Douleur** : facturation récurrente + chasse aux paiements par mail/courrier/téléphone (D-009, occ. 7) ; chargés de recouvrement temps plein (D-010, occ. 5) ; 150-200 factures/mois avec relances (D-012, occ. 5).
**Cas d'usage** : relances multi-canal séquencées par profil payeur depuis la balance âgée · pré-rédaction des réponses aux litiges avec pièces retrouvées · facturation à jalons avec relances par échéance · reporting DSO simple.
**Connecteurs** : compta/facturation (exports balance âgée — Sage, Cegid, Pennylane), email, banque, téléphone.

**Requête LinkedIn Sales Nav** :
`Titre : (DAF OR « Directeur Administratif et Financier » OR RAF) · Géographie : France · Effectif : 21-50, 51-200`
Volume : milliers. Filtrer par secteurs à impayés élevés (services B2B, BTP, transport).

**One-pager (draft)**
> **Votre balance âgée se vide sans y passer vos journées : relances personnalisées, escalade maîtrisée, cash encaissé plus vite.**
> - Séquences de relance email/courrier/téléphone générées depuis votre balance âgée, adaptées à chaque client.
> - Litiges traités en minutes : réponse pré-rédigée, pièces justificatives retrouvées et jointes.
> - DSO et prévision d'encaissement lisibles en une question.
>
> **Offre pilote : 99 €/mois**, 2 calls de feedback/mois inclus. 5 PME pilotes.

**Risques**
- *Technique* : hétérogénéité des exports de balance âgée selon l'outil comptable.
- *Marché* : Upflow/Clearnox/GCollect installés — attaquer le segment 20-100 salariés sous-équipé avec l'angle copilote conversationnel, sinon bataille frontale perdue.

---

## 5. C11 — Back-office d'agence d'intérim indépendante — 21/25

**Acheteur** : directeur d'agence d'intérim indépendante, 2-10 permanents, France.
**Douleur** : contrats de mission et relevés d'heures saisis chaque semaine (D-039, occ. 5) ; DPAE, contrôle des factures d'agence, dossiers du personnel (D-040, occ. 4) ; corroboré US : staffing médical sur 6 outils non intégrés (A-046).
**Cas d'usage** : relevés d'heures lus (photo/OCR) et rapprochés des contrats · contrats de mission et renouvellements générés · DPAE préparées et suivies · préparation paie/facturation sans double saisie.
**Connecteurs** : logiciel d'intérim (exports), OCR, URSSAF/net-entreprises (DPAE), email, paie.

**Requête LinkedIn Sales Nav** :
`Titre : « directeur d'agence » OR gérant · Mots-clés entreprise : (intérim OR « travail temporaire ») · Géographie : France · Exclure : Adecco, Manpower, Randstad, Synergie, Actual, Crit`
Volume : centaines d'agences indépendantes — 50+ atteignable.

**One-pager (draft)**
> **Contrats de mission, relevés d'heures et DPAE traités le jour même — sans ressaisie, sans lundi noir.**
> - Une photo du relevé d'heures suffit : lecture, rapprochement contrat, préparation paie et facturation.
> - Contrats et renouvellements générés depuis la commande client, DPAE préparées dans les temps.
> - Alertes sur les fins de mission et les pièces manquantes.
>
> **Offre pilote : 99 €/mois** par agence, 2 calls de feedback/mois inclus. 5 agences pilotes.

**Risques**
- *Technique* : DPAE sans API publique exploitable simplement (net-entreprises) ; logiciels d'intérim fermés.
- *Marché* : ICP étroit (agences indépendantes vs réseaux intégrés qui ont leurs outils groupe) — le volume de design partners est là, le volume de marché total est à vérifier.

---

## Note — 6e place

**C17 — Back-office organisme de formation (21, extrapolé)** manque le top 5 uniquement par principe de prudence : une seule douleur sourcée (D-021, occ. 5), le reste (preuves Qualiopi, BPF, relances OPCO) est extrapolé. ICP très joignable (« dirigeant organisme de formation France ») et marché structuré par la réglementation. Si les interviews C01-C03 déçoivent, corroborer celui-ci en priorité (5 interviews suffisent).
