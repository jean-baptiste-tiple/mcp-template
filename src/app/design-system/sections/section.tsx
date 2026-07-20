import * as React from "react"

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      {/* Titre de section éditorial : tiret vertical mint + titre bold (pas de bandeau). */}
      <h2 className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
        <span aria-hidden className="h-5 w-1.5 rounded-full bg-primary" />
        {title}
      </h2>
      {children}
    </section>
  )
}
