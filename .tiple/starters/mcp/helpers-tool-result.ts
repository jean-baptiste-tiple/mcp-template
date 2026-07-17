// Destination : src/mcp/helpers/tool-result.ts
// Mise en forme des résultats de tools — mcp-patterns §4 : TOUJOURS les deux formes
// (content texte pour le modèle, structuredContent pour le modèle ET le widget).
import { widgetMeta, type WidgetName } from "@/mcp/helpers/widget-meta"

interface ToolResultOptions {
  // Résumé 2-4 lignes max : ce que le modèle lit. Le widget affiche le détail.
  text: string
  // LA donnée : ids + résumé + next_actions. JAMAIS l'entité complète si le widget l'affiche.
  structured: Record<string, unknown> & { next_actions?: string[] }
  widget?: WidgetName
}

export function toToolResult({ text, structured, widget }: ToolResultOptions) {
  return {
    content: [{ type: "text" as const, text }],
    structuredContent: structured,
    ...(widget ? { _meta: widgetMeta(widget) } : {}),
  }
}

// Erreur actionnable (§4) : une instruction de récupération pour l'agent, pas un stack trace.
// Ex : toolError("Aucun document trouvé pour 'X'. Utiliser search_documents pour lister.")
export function toolError(message: string, options?: { wwwAuthenticate?: string }) {
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: message }],
    // Exigence ChatGPT pour afficher l'UI de connexion quand le token manque (§6.3)
    ...(options?.wwwAuthenticate
      ? { _meta: { "mcp/www_authenticate": options.wwwAuthenticate } }
      : {}),
  }
}
