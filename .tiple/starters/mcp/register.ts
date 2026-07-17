// Destination : src/mcp/register.ts
// Enregistrement du serveur MCP — partagé entre la route /api/mcp (mcp-handler) et les tests
// unit (InMemoryTransport). C'est le SEUL endroit qui liste tools, widgets et instructions.
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

import { registerGetStatusTool } from "@/mcp/tools/get-status"
import { registerWidget } from "@/mcp/helpers/widget-meta"

// serverInfo + instructions (mcp-patterns §2.1).
// instructions = le "system prompt" du serveur, injecté chez l'host : mission, entités,
// workflows, règles. En ANGLAIS (robustesse cross-host). JAMAIS de contenu variable
// (date, compteurs, données user) — ça casserait le prompt caching de l'host.
export const serverOptions = {
  serverInfo: {
    name: "my-product", // TODO(S01) : nom court, stable à jamais (les hosts s'y réfèrent)
    title: "Mon Produit", // affiché dans les UI des hosts, langue des utilisateurs
    version: "0.1.0", // bump à CHAQUE évolution de surface (tools, descriptions, schemas)
  },
  capabilities: {
    tools: {},
    resources: {}, // widgets MCP Apps (ui://)
    // prompts: {}, // TODO(S01) : exposer les parcours canoniques comme prompts MCP (§2.3)
  },
  instructions: `<Product> manages <entities> for <audience> (multi-tenant).

Core concepts:
- <central entity, its lifecycle, its invariants>
- Users refer to entities by name; tools accept names and resolve them to ids.

Typical workflows:
1. <workflow 1: tool chaining, e.g. search_x then get_x>
2. <workflow 2>

Rules:
- Prefer tool results' structuredContent.next_actions to decide what to propose next.
- Do not paste large entity JSON into the conversation; widgets display it.
- All operations are scoped to the authenticated user's organization.`,
}

export function registerServer(server: McpServer) {
  // 1 capacité métier = 1 service + 1 tool fin (§1). Ajouter chaque tool ici.
  registerGetStatusTool(server)

  // Widgets MCP Apps — resource ui://widgets/<nom>.html, bundle single-file (§5)
  registerWidget(server, "status-card")
}
