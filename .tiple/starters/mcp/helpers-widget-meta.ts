// Destination : src/mcp/helpers/widget-meta.ts
// SEUL endroit du code qui manipule les clés de liaison tool ↔ widget (mcp-patterns §5.1).
// Quand ChatGPT aura fini sa convergence vers le standard SEP-1865, l'alias se supprime ICI.
import { readFile } from "node:fs/promises"
import path from "node:path"

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

// Un type fermé = impossible de référencer un widget qui n'existe pas
export type WidgetName = "status-card"

export function widgetUri(name: WidgetName) {
  return `ui://widgets/${name}.html`
}

// À poser dans le `_meta` du tool ET de ses résultats (§4)
export function widgetMeta(name: WidgetName) {
  return {
    "ui/resourceUri": widgetUri(name), // standard SEP-1865 (Claude & ChatGPT)
    "openai/outputTemplate": widgetUri(name), // alias legacy Apps SDK (ChatGPT)
  }
}

// Enregistre la resource ui:// servant le bundle single-file buildé par Vite.
// Le bundle est lu depuis public/widgets/<nom>/index.html — pour Vercel, déclarer
// outputFileTracingIncludes dans next.config.ts (voir README du starter).
export function registerWidget(server: McpServer, name: WidgetName) {
  server.registerResource(
    `widget-${name}`,
    widgetUri(name),
    {
      title: `Widget ${name}`,
      // mimeType standard text/html. Si ChatGPT exige encore la variante
      // "text/html+skybridge", la gérer ici (et uniquement ici) — §5.1.
      mimeType: "text/html",
    },
    async () => {
      const file = path.join(process.cwd(), "public", "widgets", name, "index.html")
      const html = await readFile(file, "utf-8")
      return {
        contents: [{ uri: widgetUri(name), mimeType: "text/html", text: html }],
      }
    }
  )
}
