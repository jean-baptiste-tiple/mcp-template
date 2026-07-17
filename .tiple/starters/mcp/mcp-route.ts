// Destination : src/app/api/mcp/route.ts
// Endpoint MCP — Streamable HTTP STATELESS (mcp-patterns §7) : pas de redisUrl donc pas de
// sessions SSE ; chaque requête reconstruit le serveur, l'état métier vit en Postgres.
// Ne pas introduire de sessions/push sans rouvrir l'ADR transport.
import { createMcpHandler } from "mcp-handler"

import { registerServer, serverOptions } from "@/mcp/register"

const handler = createMcpHandler(registerServer, serverOptions, {
  basePath: "/api", // → endpoint exposé sur /api/mcp
  maxDuration: 60, // opération plus longue → pattern "job + tool de statut", jamais du push (§7)
  verboseLogs: false,
})

// ── Auth OAuth 2.1 (activer avec le starter supabase-auth — voir README du starter mcp) ──
// TODO(S01) : décommenter après install de supabase-auth + config OAuth Server côté Supabase.
// `withMcpAuth` renvoie 401 + WWW-Authenticate (RFC 9728) sur toute requête non authentifiée,
// ce qui déclenche le flow OAuth chez Claude et ChatGPT (§6.2).
//
// import { withMcpAuth } from "mcp-handler"
// import { verifyToken } from "@/mcp/auth"
//
// const authHandler = withMcpAuth(handler, verifyToken, {
//   required: true, // jamais de "mode dégradé anonyme" (§6.2)
//   resourceMetadataPath: "/.well-known/oauth-protected-resource",
// })
// export { authHandler as GET, authHandler as POST, authHandler as DELETE }

export { handler as GET, handler as POST, handler as DELETE }
