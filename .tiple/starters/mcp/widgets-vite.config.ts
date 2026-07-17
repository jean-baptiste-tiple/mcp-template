// Destination : widgets/vite.config.ts
// Build des widgets MCP Apps en HTML single-file (mcp-patterns §5.3) : JS/CSS inlinés,
// images en data-URI, ZÉRO requête externe (CSP stricte des hosts — pas de CDN, pas de fonts).
// Un widget = un run : WIDGET=status-card vite build --config widgets/vite.config.ts
// Sortie : public/widgets/<nom>/index.html (servi par la resource ui:// + prévisualisable au browser).
import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const widget = process.env.WIDGET ?? "status-card"

export default defineConfig({
  root: path.resolve(dirname, widget),
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: path.resolve(dirname, "..", "public", "widgets", widget),
    emptyOutDir: true,
    // Poids cible < 300 Ko par bundle (§5.3) — surveiller à chaque ajout de dépendance
    chunkSizeWarningLimit: 300,
  },
})
