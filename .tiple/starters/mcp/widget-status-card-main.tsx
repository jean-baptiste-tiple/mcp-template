// Destination : widgets/status-card/main.tsx
// Widget DÉMO — montre le contrat d'un widget MCP Apps (mcp-patterns §5.2, §5.3) :
//   - données d'entrée = le structuredContent du tool (identique Claude/ChatGPT)
//   - n'importe QUE le bridge (jamais window.openai)
//   - états loading / vide / erreur OBLIGATOIRES, thème clair/sombre
// Rappel §5.3 : si un rendu existe côté web, le widget importe le MÊME composant React.
import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import {
  callTool,
  getTheme,
  getToolOutput,
  initBridge,
  onThemeChange,
  onToolOutput,
} from "../shared/bridge"

// = structuredContent de get_status (contrat §4 — voir src/mcp/tools/get-status.ts)
interface StatusOutput {
  product: string
  version: string
  status: "ok" | "degraded"
  components?: { name: string; status: string }[]
  next_actions?: string[]
}

function StatusCard() {
  const [output, setOutput] = useState<StatusOutput | null>(null)
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    let cancelled = false
    const offOutput = onToolOutput((o) => setOutput(o as unknown as StatusOutput))
    const offTheme = onThemeChange((t) => {
      document.documentElement.dataset.theme = t
    })

    initBridge()
      .then(() => {
        if (cancelled) return
        document.documentElement.dataset.theme = getTheme()
        setOutput(getToolOutput<StatusOutput>())
        setPhase("ready")
      })
      .catch(() => !cancelled && setPhase("error"))

    return () => {
      cancelled = true
      offOutput()
      offTheme()
    }
  }, [])

  async function refresh() {
    setRefreshing(true)
    try {
      // Action widget → tool call via le bridge (matrice §5.4)
      await callTool("get_status", { verbose: true })
    } finally {
      setRefreshing(false)
    }
  }

  if (phase === "loading") return <p style={styles.muted}>Chargement…</p>
  if (phase === "error") return <p style={styles.muted}>Impossible de contacter l&apos;host.</p>
  if (!output) return <p style={styles.muted}>Aucune donnée — lancer le tool get_status.</p>

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <span style={styles.dot(output.status === "ok")} />
        <strong>{output.product}</strong>
        <span style={styles.mutedInline}>v{output.version}</span>
      </div>
      {output.components?.map((c) => (
        <div key={c.name} style={styles.component}>
          {c.name} — {c.status}
        </div>
      ))}
      <button style={styles.button} onClick={refresh} disabled={refreshing}>
        {refreshing ? "…" : "Rafraîchir"}
      </button>
    </div>
  )
}

const styles = {
  card: { padding: 16, display: "grid", gap: 8 } as const,
  row: { display: "flex", alignItems: "center", gap: 8 } as const,
  muted: { padding: 16, color: "var(--muted)" } as const,
  mutedInline: { color: "var(--muted)", fontSize: 13 } as const,
  component: { fontSize: 13, color: "var(--muted)", paddingLeft: 18 } as const,
  dot: (ok: boolean) =>
    ({
      width: 10,
      height: 10,
      borderRadius: 999,
      background: ok ? "#22c55e" : "#f59e0b",
    }) as const,
  button: {
    justifySelf: "start",
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--accent)",
    cursor: "pointer",
    font: "inherit",
  } as const,
}

createRoot(document.getElementById("root") as HTMLElement).render(<StatusCard />)
