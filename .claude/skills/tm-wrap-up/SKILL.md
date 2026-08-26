---
name: tm-wrap-up
description: "Capturer les apprentissages de la session (conventions, ADR, registry). Déclenche-toi quand l'utilisateur signale une fin de session/chantier : 'on a fini', 'c'est bouclé', 'wrap up', 'done', 'on termine', 'on arrête', 'on récapitule', OU après la clôture de plusieurs stories/fix dans la même session."
---

# tm-wrap-up — Capture d'apprentissages

Quand il s'active, suivre le process complet dans [`.claude/commands/tm-wrap-up.md`](.claude/commands/tm-wrap-up.md) — la command est la source de vérité. Les conventions, ADR et `CLAUDE.md` s'écrivent directement ; le récap final liste ce qui a été modifié et l'utilisateur annule ce qu'il ne veut pas.

## Quand NE PAS se déclencher

- Session exploratoire / lecture de code (rien n'a été modifié)
- Micro-modif (typo, rename d'une variable) — pas de méta à capturer
- L'utilisateur a déjà refusé dans la session en cours
