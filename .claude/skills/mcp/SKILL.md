---
name: mcp
description: "MCP : tools serveur MCP, widgets MCP Apps, resources ui://, OAuth 2.1 connecteur, mcp-handler, inspector. FR : tool MCP, widget dans Claude/ChatGPT, serveur MCP, canal MCP, bridge host."
---

Consult [.tiple/conventions/mcp-patterns.md](.tiple/conventions/mcp-patterns.md) for the full patterns. Load it before writing MCP code (`src/mcp/`, `widgets/`).

Key invariants:
- Tool MCP = adaptateur fin : auth → validation Zod → `lib/services/` → mise en forme. Jamais de logique métier dans le tool.
- Client Supabase au nom de l'utilisateur (JWT OAuth) → RLS active. `service_role` interdit.
- Tout tool est utilisable sans widget (le texte suffit) ; le widget est un bonus d'ergonomie.
- Ne jamais renommer un tool publié — déprécier puis retirer (ADR).
