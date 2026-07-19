"use client"

import { useState } from "react"
import { Check, Copy } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  value: string
  label?: string
  size?: "default" | "sm" | "icon"
  variant?: "default" | "outline" | "ghost" | "secondary"
}

/** Bouton "copier dans le presse-papiers" avec feedback visuel (2 s). */
export function CopyButton({
  value,
  label,
  size = "sm",
  variant = "outline",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      aria-label={label ?? (copied ? "Copié" : "Copier dans le presse-papiers")}
    >
      {copied ? <Check className="text-success" /> : <Copy />}
      {label ? <span>{copied ? "Copié" : label}</span> : null}
    </Button>
  )
}
