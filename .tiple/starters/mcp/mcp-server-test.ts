// Destination : tests/unit/mcp-server.test.ts
// Tests du serveur MCP via InMemoryTransport (mcp-patterns §10) : pas de HTTP, pas de mock
// du SDK — un vrai client connecté au vrai serveur. Vérifie le contrat AX : schéma,
// structuredContent, next_actions, et les DEUX clés de meta widget.
import { describe, it, expect, beforeAll } from "vitest"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"

import { registerServer, serverOptions } from "@/mcp/register"

describe("serveur MCP", () => {
  let client: Client

  beforeAll(async () => {
    const server = new McpServer(serverOptions.serverInfo, {
      capabilities: serverOptions.capabilities,
      instructions: serverOptions.instructions,
    })
    registerServer(server)

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
    client = new Client({ name: "test-client", version: "0.0.0" })
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])
  })

  it("expose get_status avec description au format imposé et metas widget (les DEUX clés)", async () => {
    const { tools } = await client.listTools()
    const tool = tools.find((t) => t.name === "get_status")

    expect(tool).toBeDefined()
    expect(tool?.description).toMatch(/^Returns/) // verbe d'abord (§3)
    expect(tool?.description).toContain("Use this when")
    expect(tool?.description).toContain("Do not use")
    expect(tool?.annotations?.readOnlyHint).toBe(true)
    // Dual-host §5.1 : standard + alias, toujours ensemble
    expect(tool?._meta?.["ui/resourceUri"]).toBe("ui://widgets/status-card.html")
    expect(tool?._meta?.["openai/outputTemplate"]).toBe("ui://widgets/status-card.html")
  })

  it("retourne les deux formes : content texte + structuredContent avec next_actions (§4)", async () => {
    const result = await client.callTool({ name: "get_status", arguments: { verbose: true } })

    expect(result.isError).toBeFalsy()
    const content = result.content as { type: string; text: string }[]
    expect(content[0]?.type).toBe("text")

    const structured = result.structuredContent as {
      product: string
      status: string
      next_actions: string[]
    }
    expect(structured.status).toBe("ok")
    expect(Array.isArray(structured.next_actions)).toBe(true)
  })

  it("liste la resource widget ui://", async () => {
    const { resources } = await client.listResources()
    const uris = resources.map((r) => r.uri)
    expect(uris).toContain("ui://widgets/status-card.html")
  })
})
