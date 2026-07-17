// Destination : widgets/shared/bridge.ts
// LE bridge unique (mcp-patterns §5.2) : les widgets n'importent QUE ce module, jamais
// window.openai ni postMessage directement. Deux dialectes derrière une API interne unique :
//   - standard MCP Apps SEP-1865 : JSON-RPC over postMessage (Claude, Goose, VS Code…)
//   - extensions Apps SDK : window.openai (ChatGPT), détecté et délégué quand présent
// TODO(S01) : valider les noms de méthodes standard contre la version épinglée du SDK
// (SEP-1865 en cours de stabilisation) — la matrice §5.4 sur les deux hosts fait foi.

type ToolOutput = Record<string, unknown>
type Theme = "light" | "dark"

// ── Dialecte ChatGPT (Apps SDK) — typage minimal, accès UNIQUEMENT depuis ce fichier ──
interface OpenAiHost {
  toolOutput?: ToolOutput
  theme?: string
  callTool?: (name: string, args: Record<string, unknown>) => Promise<unknown>
  sendFollowupMessage?: (opts: { prompt: string }) => Promise<void>
  openExternal?: (opts: { href: string }) => void
}

function openaiHost(): OpenAiHost | undefined {
  return (window as unknown as { openai?: OpenAiHost }).openai
}

// ── Dialecte standard — JSON-RPC over postMessage ──
interface JsonRpcResponse {
  jsonrpc: "2.0"
  id?: number
  result?: unknown
  error?: { code: number; message: string }
  method?: string
  params?: unknown
}

let rpcId = 0
const pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>()

let latestOutput: ToolOutput | null = null
let latestTheme: Theme = "light"
const outputListeners = new Set<(output: ToolOutput) => void>()
const themeListeners = new Set<(theme: Theme) => void>()

function rpcRequest(method: string, params?: unknown): Promise<unknown> {
  const id = ++rpcId
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    window.parent.postMessage({ jsonrpc: "2.0", id, method, params }, "*")
  })
}

function handleMessage(event: MessageEvent) {
  const msg = event.data as JsonRpcResponse
  if (!msg || msg.jsonrpc !== "2.0") return

  // Réponse à une de nos requêtes
  if (typeof msg.id === "number" && pending.has(msg.id)) {
    const p = pending.get(msg.id)
    pending.delete(msg.id)
    if (msg.error) p?.reject(new Error(msg.error.message))
    else p?.resolve(msg.result)
    return
  }

  // Notifications de l'host : données du tool (= structuredContent, contrat §4) et thème
  if (msg.method === "ui/notifications/tool-output" || msg.method === "ui/tool-output") {
    const params = msg.params as { toolOutput?: ToolOutput; structuredContent?: ToolOutput }
    latestOutput = params?.structuredContent ?? params?.toolOutput ?? null
    if (latestOutput) outputListeners.forEach((cb) => cb(latestOutput as ToolOutput))
  }
  if (msg.method === "ui/notifications/theme" || msg.method === "ui/theme") {
    const params = msg.params as { theme?: string }
    latestTheme = params?.theme === "dark" ? "dark" : "light"
    themeListeners.forEach((cb) => cb(latestTheme))
  }
}

// ── API publique du bridge (la seule que les widgets connaissent) ──

export async function initBridge(): Promise<void> {
  const oai = openaiHost()
  if (oai) {
    // ChatGPT : les données sont déjà exposées sur window.openai
    if (oai.toolOutput) latestOutput = oai.toolOutput
    latestTheme = oai.theme === "dark" ? "dark" : "light"
    return
  }
  window.addEventListener("message", handleMessage)
  try {
    const result = (await rpcRequest("ui/initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
    })) as { toolOutput?: ToolOutput; structuredContent?: ToolOutput; theme?: string } | undefined
    latestOutput = result?.structuredContent ?? result?.toolOutput ?? latestOutput
    if (result?.theme) latestTheme = result.theme === "dark" ? "dark" : "light"
  } catch {
    // Host sans handshake initialize : les notifications suffiront
  }
}

export function getToolOutput<T = ToolOutput>(): T | null {
  return (openaiHost()?.toolOutput as T | undefined) ?? (latestOutput as T | null)
}

export function onToolOutput(cb: (output: ToolOutput) => void): () => void {
  outputListeners.add(cb)
  return () => outputListeners.delete(cb)
}

export async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const oai = openaiHost()
  if (oai?.callTool) return oai.callTool(name, args)
  return rpcRequest("tools/call", { name, arguments: args })
}

export async function sendFollowupMessage(text: string): Promise<void> {
  const oai = openaiHost()
  if (oai?.sendFollowupMessage) return oai.sendFollowupMessage({ prompt: text })
  await rpcRequest("ui/message", { role: "user", content: [{ type: "text", text }] })
}

export function openExternal(url: string): void {
  const oai = openaiHost()
  if (oai?.openExternal) return oai.openExternal({ href: url })
  void rpcRequest("ui/open-external", { url })
}

export function getTheme(): Theme {
  const oai = openaiHost()
  if (oai) return oai.theme === "dark" ? "dark" : "light"
  return latestTheme
}

export function onThemeChange(cb: (theme: Theme) => void): () => void {
  themeListeners.add(cb)
  return () => themeListeners.delete(cb)
}
