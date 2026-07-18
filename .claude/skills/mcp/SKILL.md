---
name: mcp
description: "MCP : tools serveur MCP, widgets MCP Apps, resources ui://, OAuth 2.1 connecteur, mcp-handler, inspector, pattern prepare/save (zéro IA serveur), éditions en deltas (ops), golden queries, AX. FR : tool MCP, widget dans Claude/ChatGPT, serveur MCP, canal MCP, bridge host, anonymisation/adaptation par le modèle, économie de tokens."
---

Consult [.tiple/conventions/mcp-patterns.md](.tiple/conventions/mcp-patterns.md) for the full patterns. Load it before writing MCP code (`src/mcp/`, `widgets/`).

Key invariants:
- Tool MCP = adaptateur fin : auth → validation Zod → `lib/services/` → mise en forme. Jamais de logique métier dans le tool.
- Client Supabase au nom de l'utilisateur (JWT OAuth) → RLS active. `service_role` interdit.
- **Zéro IA serveur par défaut** : opérations intelligentes = `prepare → modèle de l'host → save validé` (§4 bis). Le save re-dérive les paramètres d'audit côté serveur et audite TOUTE la surface (frontières de mots Unicode + accents). Parité des garde-fous avec le canal web.
- **Éditions = deltas** (§4 ter) : `ops` par section adressées par nom + patch deep-partial (`null` = suppression) ; jamais de renvoi de l'entité complète ; lecture partielle via `sections`.
- Annotations honnêtes (`readOnlyHint: true` sur les prepare purs) ; tool destructif jamais dans les `next_actions` ; `.describe()` sur chaque champ.
- Widget déclaré sur le tool dont le payload le nourrit ; URLs de POST absolues (iframe sandbox) ; deep links = routes réelles.
- Tout tool est utilisable sans widget (le texte suffit) ; le widget est un bonus d'ergonomie.
- Ne jamais renommer un tool publié — déprécier puis retirer (ADR).
