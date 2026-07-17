#!/bin/bash
# .claude/hooks/enforce-bash-rules.sh
# Bloque les violations des règles d'exécution Bash (CLAUDE.md)
# Hook PreToolUse — s'exécute AVANT chaque appel Bash
# Exit 0 = autorisé, Exit 2 = bloqué (message affiché à Claude)
# Compatible macOS + Windows (Git Bash) : jq si disponible, sinon perl

INPUT=$(cat)

# --- Règle 1 : JAMAIS de run_in_background ---
if echo "$INPUT" | grep -qE '"run_in_background"\s*:\s*true'; then
  echo "BLOQUÉ: run_in_background=true est INTERDIT. Relance en foreground avec timeout: 120000 (ou jusqu'à 600000 pour les builds longs). Voir CLAUDE.md règle 1." >&2
  exit 2
fi

# --- Extraction de tool_input.command ---
# Doit gérer les guillemets échappés : une commande comme `grep "x" f | wc -l` arrive en JSON
# sous la forme "command":"grep \"x\" f | wc -l" — une extraction naïve [^"]* s'arrête au
# premier \" et laisse passer tout ce qui suit (pipe non détecté).
if command -v jq >/dev/null 2>&1; then
  COMMAND=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')
elif command -v perl >/dev/null 2>&1; then
  COMMAND=$(printf '%s' "$INPUT" | perl -0777 -ne '
    if (/"command"\s*:\s*"((?:\\.|[^"\\])*)"/s) {
      my $c = $1;
      $c =~ s/\\n/\n/g;
      $c =~ s/\\t/\t/g;
      $c =~ s/\\(.)/$1/g;
      print $c;
    }')
else
  # Dernier recours (comportement historique, best effort sur commandes sans guillemets)
  COMMAND=$(echo "$INPUT" | grep -o '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/"command"[[:space:]]*:[[:space:]]*"//;s/"$//')
fi

# --- Règle 2 : Aucun pipe vers des commandes de troncature/filtrage ---
if echo "$COMMAND" | grep -qE '\|\s*(tail|head|grep|wc|tee|less|more|awk|sed)\b'; then
  echo "BLOQUÉ: Pipe interdit. Exécuter la commande brute sans '|'. Voir CLAUDE.md règle 2." >&2
  exit 2
fi

# --- Règle 3 : Aucune redirection fichier pour les commandes build/check ---
if echo "$COMMAND" | grep -qE '(pnpm|npm|npx|tsc|node)\b.*\s+(>|>>|2>&1\s*>)\s'; then
  echo "BLOQUÉ: Redirection de sortie interdite. La sortie doit aller dans le terminal. Voir CLAUDE.md règle 3." >&2
  exit 2
fi

# --- Règle 4 : Aucune boucle d'attente / polling ---
if echo "$COMMAND" | grep -qE 'while\s+(true|:)\s*;|watch\s+|until\s+.*;\s*do'; then
  echo "BLOQUÉ: Boucle d attente/polling interdite. Voir CLAUDE.md règle 4." >&2
  exit 2
fi

# Tout OK
exit 0
