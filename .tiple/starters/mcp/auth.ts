// Destination : src/mcp/auth.ts
// Validation des tokens OAuth 2.1 (Supabase = authorization server) — mcp-patterns §6.
// Signature vérifiée via JWKS, puis client Supabase construit AU JWT DE L'UTILISATEUR
// → RLS active dans les tools exactement comme au web. `service_role` INTERDIT ici.
import { createRemoteJWKSet, jwtVerify } from "jose"

// TODO(S01) : décommenter après install du starter supabase-auth.
// import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const ISSUER = `${SUPABASE_URL}/auth/v1`

// JWKS mis en cache au niveau module (réutilisé entre invocations serverless chaudes)
const jwks = createRemoteJWKSet(new URL(`${ISSUER}/.well-known/jwks.json`))

export interface AuthContext {
  userId: string
  orgId: string | null
  role: string
  // supabase: SupabaseClient // TODO(S01) : décommenter avec supabase-auth
}

// Signature attendue par `withMcpAuth` de mcp-handler : retourne les infos d'auth
// si le token est valide, `undefined` sinon (→ 401 + WWW-Authenticate géré par le wrapper).
// TODO(S01) : vérifier la signature exacte (AuthInfo) contre la version épinglée de mcp-handler.
export async function verifyToken(req: Request, bearerToken?: string) {
  if (!bearerToken) return undefined

  try {
    const { payload } = await jwtVerify(bearerToken, jwks, { issuer: ISSUER })

    // Claims custom (org_id, role) : injectés par le Custom Access Token Hook Supabase (§6.4)
    return {
      token: bearerToken,
      clientId: typeof payload.azp === "string" ? payload.azp : "unknown",
      scopes: typeof payload.scope === "string" ? payload.scope.split(" ") : [],
      extra: {
        userId: String(payload.sub),
        orgId: typeof payload.org_id === "string" ? payload.org_id : null,
        role: typeof payload.role === "string" ? payload.role : "authenticated",
      },
    }
  } catch {
    // Token invalide/expiré : undefined → le wrapper renvoie l'erreur actionnable au host
    return undefined
  }
}

// À appeler en tête de CHAQUE tool authentifié (§1) : reconstruit le contexte depuis
// l'authInfo posé par withMcpAuth, et fournit le client Supabase scoped utilisateur.
export function requireAuthContext(extra: { authInfo?: { token?: string; extra?: Record<string, unknown> } }): AuthContext {
  const info = extra.authInfo
  if (!info?.token || !info.extra?.userId) {
    // Erreur actionnable (§4) — le tool la transforme en résultat isError
    throw new Error("Authentication required. Connect your account to use this tool.")
  }

  return {
    userId: String(info.extra.userId),
    orgId: info.extra.orgId ? String(info.extra.orgId) : null,
    role: info.extra.role ? String(info.extra.role) : "authenticated",
    // TODO(S01) : client au JWT de l'utilisateur → RLS active (jamais service_role)
    // supabase: createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    //   global: { headers: { Authorization: `Bearer ${info.token}` } },
    //   auth: { persistSession: false },
    // }),
  }
}
