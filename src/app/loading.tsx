import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="h-6 w-6 text-muted-foreground" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}
