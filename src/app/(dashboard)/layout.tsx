// Route group principal — renommer selon le projet (ex: (app), (admin), etc.)
// IMPORTANT : un route group avec layout DOIT avoir au moins un page.tsx,
// sinon le build Next.js échoue (missing client-reference-manifest).
import { AppLogo } from "@/components/logo"
import { SidebarNav } from "@/components/sidebar-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar FIXE : sticky pleine hauteur, ne défile jamais avec le contenu.
          Panneau SOMBRE dans les deux thèmes (tokens --sidebar) — signature Tiple.
          Pas de séparateurs internes : les zones respirent par l'espacement seul. */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
          <AppLogo size={34} />
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight">Mon App</div>
            <div className="text-[11px] text-sidebar-foreground/55">Sous-titre</div>
          </div>
        </div>
        <SidebarNav />
        {/* Bas du sidebar : bouton Déconnexion une fois le starter supabase-auth installé */}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barre mobile (sidebar masqué < md) — même panneau sombre. Nav mobile
            (Sheet + nav-items partagés) à implémenter par projet. */}
        <header className="flex h-14 items-center gap-2 border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground md:hidden">
          <AppLogo size={26} />
          <span className="font-semibold">Mon App</span>
        </header>
        {/* Corps de page : halo mint léger + semis de croix + grain fin. */}
        <main className="page-canvas noise-overlay flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
