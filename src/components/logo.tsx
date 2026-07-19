// Logo de l'app : donut coupé quasi-noir sur fond vert mint Tiple arrondi avec
// dégradé (profondeur). Glyphe sombre sur mint (le blanc ne contraste pas assez).
// La favicon (src/app/icon.svg) reprend le même motif en aplat.
// Personnaliser `label` (nom du produit) par projet.

interface AppLogoProps {
  /** Taille en px (carré). */
  size?: number
  /** Nom accessible du produit (aria-label). */
  label?: string
  className?: string
}

export function AppLogo({ size = 32, label = "Tiple", className }: AppLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      className={className}
    >
      <defs>
        <linearGradient id="app-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3ffcb9" />
          <stop offset="55%" stopColor="#06f5a2" />
          <stop offset="100%" stopColor="#00c286" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#app-logo-bg)" />
      {/* Donut coupé : anneau quasi-noir ouvert (gap en bas à droite) */}
      <circle
        cx="32"
        cy="32"
        r="15"
        fill="none"
        stroke="#0f0f0f"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="75 100"
        transform="rotate(120 32 32)"
      />
    </svg>
  )
}
