// Destination : src/app/.well-known/oauth-protected-resource/route.ts
// Metadata RFC 9728 — LE point d'entrée de la découverte auth des deux hosts (mcp-patterns §6.1).
// Le 401 + WWW-Authenticate renvoyé par /api/mcp pointe vers cette URL ; l'host lit ici
// où se trouve l'authorization server (Supabase) et lance le flow OAuth 2.1.
// TODO(S01) : activer avec le starter supabase-auth (sans auth, cette route peut attendre).
import { protectedResourceHandler, metadataCorsOptionsRequestHandler } from "mcp-handler"

const handler = protectedResourceHandler({
  // Supabase Auth = authorization server OAuth 2.1 (OAuth Server + DCR activés au dashboard)
  authServerUrls: [`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`],
  // TODO(S01) : vérifier que la version épinglée expose bien resource/scopes/documentation ;
  // sinon, servir le JSON RFC 9728 à la main :
  // { resource: process.env.MCP_RESOURCE_URL, authorization_servers: [...],
  //   scopes_supported: [...], resource_documentation: "https://<domaine>/connect" }
})

export { handler as GET, metadataCorsOptionsRequestHandler as OPTIONS }
