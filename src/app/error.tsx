"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <EmptyState
        icon={<AlertTriangle className="h-6 w-6" />}
        heading="Une erreur est survenue"
        description="Réessayer, ou revenir à l'accueil si le problème persiste."
        action={<Button onClick={reset}>Réessayer</Button>}
      />
    </div>
  )
}
