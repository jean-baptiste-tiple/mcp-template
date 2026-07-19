// Destination : src/mcp/tool-result.ts
// Mise en forme des résultats de tools — mcp-patterns §4 : TOUJOURS les deux formes.
// ⚠️ CONTRAT (retour agents) : le `content` texte est la SEULE voie fiable vers le
// modèle — certains hosts lui masquent `structuredContent` (qui alimente le widget).
// Tout ce que le modèle doit lire ou exécuter (consignes, données source d'un
// prepare, texte brut) va dans `text` ; dupliquer dans `structured` si le widget
// en a besoin.
import { widgetMeta, type WidgetName } from "./widget-meta"

interface ToolResultOptions {
  // Ce que le modèle LIT. Résultat simple : résumé 2-4 lignes. Tool "prepare" :
  // consignes complètes + données source (le modèle ne verra rien d'autre).
  text: string
  // Canal du WIDGET (+ citable quand l'host l'expose) : ids + résumé + next_actions.
  // JAMAIS l'entité complète si le widget l'affiche.
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
