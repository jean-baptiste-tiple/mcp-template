"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils/cn"
import {
  NAV_ITEMS_PRIMARY,
  NAV_ITEMS_SECONDARY,
  isNavItemActive,
  type NavItem,
} from "@/components/nav-items"

function NavLinks({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <div className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = isNavItemActive(href, pathname)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Icon className="h-[18px] w-[18px]" weight={active ? "fill" : "regular"} />
            {label}
          </Link>
        )
      })}
    </div>
  )
}

/** Liens du sidebar sombre : primaires en haut, secondaires poussés en bas
 * (au-dessus d'un éventuel « Se déconnecter »). Item actif = pill mint pleine.
 * Client pour usePathname (état actif). Items : `@/components/nav-items`. */
export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-1 flex-col overflow-y-auto p-3 pt-4">
      <NavLinks items={NAV_ITEMS_PRIMARY} pathname={pathname} />
      {NAV_ITEMS_SECONDARY.length > 0 && (
        <div className="mt-auto pt-4">
          <NavLinks items={NAV_ITEMS_SECONDARY} pathname={pathname} />
        </div>
      )}
    </nav>
  )
}
