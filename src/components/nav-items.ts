import type { Icon } from "@phosphor-icons/react"
import { SquaresFour } from "@phosphor-icons/react"

// Navigation de l'app — source UNIQUE (sidebar desktop + nav mobile).
// PERSONNALISER par projet : ajouter les routes du produit (icônes Phosphor).
export interface NavItem {
  href: string
  label: string
  icon: Icon
}

/** Navigation principale (haut du sidebar) : le cœur produit. */
export const NAV_ITEMS_PRIMARY: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: SquaresFour },
]

/** Navigation secondaire (bas du sidebar — ex: Équipe, Connecter (MCP), Réglages). */
export const NAV_ITEMS_SECONDARY: NavItem[] = []

export const NAV_ITEMS: NavItem[] = [...NAV_ITEMS_PRIMARY, ...NAV_ITEMS_SECONDARY]

/** Item actif : correspondance exacte pour la racine, préfixe sinon. */
export function isNavItemActive(href: string, pathname: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}
