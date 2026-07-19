# Design System — Tiple (Vert Mint)

> Preview interactive : `/design-system` (route Next.js)
> Aligné sur le design system tiple.io (repo `website-tiple`). Version éprouvée dans mcp-cv-editor.

## Identité visuelle

- **Couleur primaire :** Vert mint Tiple `#06f5a2` (oklch 0.87 0.19 162) — fills, bordures, états actifs.
- **Vert-accent texte :** `--primary-dark` (`#00b47c` en light, `#06f5a2` en dark) — le mint échoue AA en petit texte sur blanc, ce token le remplace pour le TEXTE-accent.
- **Neutres :** chauds (teinte oklch 80), pas froids. Fond light `#fefefe`, dark quasi-noirs `#0F0F0F` (fond) / `#202020` (cartes).
- **Fonts :** Instrument Sans (corps) + JetBrains Mono (labels, chiffres, méta) — `next/font/google`, variables `--font-instrument` / `--font-jetbrains`.
- **Icônes :** Phosphor (`@phosphor-icons/react`) pour les icônes applicatives (`/dist/ssr` en Server Component) ; lucide-react reste utilisé en interne par les composants Shadcn.
- **Radius :** surfaces (cards, inputs, popovers) en `0.25rem` (net, éditorial) ; **boutons & badges en pilule** (`rounded-full`, comme les CTA/tags de tiple.io).
- **Style :** éditorial Tiple — coins nets sur les surfaces, CTA/tags en pilule, labels mono uppercase, `hover-lift`, touches `text-stroke`/`noise-overlay`.
- **Logo :** `AppLogo` (`src/components/logo.tsx`) — donut quasi-noir sur fond mint dégradé ; favicon `src/app/icon.svg` (même motif en aplat).
- **Dark mode :** Oui (class-based via `@custom-variant dark` dans `globals.css` ; toggle ou system) ; light par défaut, dark soigné.

## Tokens

Source unique : `src/app/globals.css` (Tailwind v4 CSS-first — il n'y a PAS de `tailwind.config.ts` ; plugins et keyframes vivent aussi dans le CSS via `@plugin` / `@theme`).

### Couleurs

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--primary` | oklch(0.87 0.19 162) | oklch(0.87 0.19 162) | Fills, bordures, états actifs (mint) |
| `--primary-foreground` | oklch(0.15 0.005 80) | oklch(0.15 0.005 80) | Texte sur primary (foncé sur mint clair) |
| `--primary-dark` | #00b47c | #06f5a2 | **Texte-accent** lisible (AA) sur fond clair |
| `--secondary` | oklch(0.968 0.003 80) | oklch(0.255 0.004 80) | Boutons secondaires, badges |
| `--muted` | oklch(0.968 0.003 80) | oklch(0.235 0.003 80) | Fonds neutres, zones inactives |
| `--accent` | oklch(0.93 0.005 80) | oklch(0.28 0.005 80) | Hover, sélection, surbrillance |
| `--destructive` | oklch(0.577 0.245 27.3) | oklch(0.62 0.22 27.3) | Erreurs, actions irréversibles |
| `--success` | oklch(0.62 0.15 158) | oklch(0.72 0.17 160) | Succès, validations |
| `--warning` | oklch(0.72 0.16 75) | oklch(0.78 0.15 75) | Avertissements |
| `--card` | oklch(1 0 0) | oklch(0.205 0.003 80) | Fond des cards (#202020 en dark) |
| `--popover` | oklch(1 0 0) | oklch(0.205 0.003 80) | Fond des popovers/dropdowns |
| `--border` | oklch(0.9 0.004 80) | oklch(0.275 0.004 80) | Bordures |
| `--input` | oklch(0.9 0.004 80) | oklch(0.275 0.004 80) | Bordure des inputs |
| `--ring` | = primary | = primary | Focus ring (3px) |
| `--background` | oklch(0.99 0.002 80) | oklch(0.145 0.002 80) | Fond (#fefefe / #0F0F0F) |

**Contraste (a11y) :** `--primary` (mint) sert aux **fills/bordures/gros titres**, jamais au texte fin sur blanc (échoue AA). Pour du texte-accent → `--primary-dark` (`text-primary-dark`).

#### Couleurs Sidebar

| Token | Usage |
|-------|-------|
| `--sidebar` | Fond du sidebar |
| `--sidebar-foreground` | Texte du sidebar |
| `--sidebar-accent` | Hover/actif dans le sidebar |
| `--sidebar-border` | Bordures du sidebar |

#### Couleurs Charts (5 niveaux)

`--chart-1` à `--chart-5` — mint en tête puis neutres chauds (lecture « data », pas arc-en-ciel).

### Typographie

| Style | Classes Tailwind | Usage |
|-------|------------------|-------|
| H1 | `text-2xl font-bold tracking-tight` | Titres de page (rendu par `PageContainer`) |
| H2 | `text-3xl font-semibold tracking-tight` | Sections |
| H3 | `text-2xl font-semibold tracking-tight` | Sous-sections |
| H4 | `text-xl font-medium` | Sous-titres |
| Body | `text-base leading-7` | Corps de texte |
| Small | `text-sm text-muted-foreground` | Descriptions, labels |
| Caption | `text-xs text-muted-foreground` | Métadonnées, timestamps |
| Labels/méta | `font-mono text-xs uppercase tracking-wide` | Signature éditoriale Tiple (labels, chiffres, KPI) |
| Fonts | Instrument Sans (`font-sans`) + JetBrains Mono (`font-mono`) | `next/font/google` |

### Spacing

Utilise l'échelle Tailwind standard (multiples de 4px) :

| Token | Valeur | Tailwind |
|-------|--------|----------|
| space-1 | 4px | `p-1`, `gap-1` |
| space-2 | 8px | `p-2`, `gap-2` |
| space-3 | 12px | `p-3`, `gap-3` |
| space-4 | 16px | `p-4`, `gap-4` |
| space-6 | 24px | `p-6`, `gap-6` |
| space-8 | 32px | `p-8`, `gap-8` |
| space-10 | 40px | `p-10`, `gap-10` |
| space-12 | 48px | `p-12`, `gap-12` |

### Radius

| Token | Valeur | Tailwind | Usage |
|-------|--------|----------|-------|
| `--radius` | 0.25rem (4px) | `rounded-lg` | Surfaces : cards, inputs, popovers (net, éditorial) |
| sm | radius - 2px | `rounded-sm` | Petits éléments |
| md | radius - 1px | `rounded-md` | Inputs |
| lg | radius | `rounded-lg` | Cards, modals |
| xl | radius + 4px | `rounded-xl` | Panels larges |
| full | 9999px | `rounded-full` | **Boutons, badges (pilules)**, avatars |

### Utilitaires éditoriaux (globals.css)

| Classe | Effet |
|--------|-------|
| `hover-lift` | La carte se soulève au survol (micro-interaction) |
| `text-stroke` | Titre « outline » (contour, remplissage transparent) |
| `noise-overlay` | Grain fin superposé (texture, SVG inline — zéro requête) |

### Shadows

Utilise les shadows Tailwind standards :

| Classe | Usage |
|--------|-------|
| `shadow-sm` | Boutons, badges |
| `shadow` | Cards surélevées |
| `shadow-md` | Dropdowns, popovers |
| `shadow-lg` | Modals, sheets |

### Breakpoints

| Nom | Valeur | Usage |
|-----|--------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablette |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

## Composants UI (Shadcn/ui)

Tous installés dans `src/components/ui/`. Style **new-york**.

### Formulaires
| Composant | Fichier | Notes |
|-----------|---------|-------|
| Button | `button.tsx` | 6 variants (default, secondary, destructive, outline, ghost, link), 4 sizes — **pilule** (`rounded-full`), link en `text-primary-dark` |
| Input | `input.tsx` | Focus ring mint |
| Textarea | `textarea.tsx` | Multi-lignes |
| Select | `select.tsx` | Radix Select complet |
| Checkbox | `checkbox.tsx` | Radix Checkbox |
| Switch | `switch.tsx` | Radix Switch |
| RadioGroup | `radio-group.tsx` | Radix RadioGroup — `primary-dark` |
| Label | `label.tsx` | Radix Label |
| Form | `form.tsx` | Intégration react-hook-form |
| Slider | `slider.tsx` | Range input stylisé |
| Calendar | `calendar.tsx` | react-day-picker v9 |

### Layout & Navigation
| Composant | Fichier | Notes |
|-----------|---------|-------|
| Card | `card.tsx` | Header, Title, Description, Content, Footer |
| Separator | `separator.tsx` | Horizontal/vertical |
| Tabs | `tabs.tsx` | Radix Tabs |
| Accordion | `accordion.tsx` | Radix Accordion, animation chevron |
| Breadcrumb | `breadcrumb.tsx` | Navigation fil d'ariane |
| ScrollArea | `scroll-area.tsx` | Radix ScrollArea |

### Feedback
| Composant | Fichier | Notes |
|-----------|---------|-------|
| Badge | `badge.tsx` | 6 variants — **pilule mono uppercase** (tag éditorial) |
| Alert | `alert.tsx` | Default + destructive |
| Progress | `progress.tsx` | Barre animée, couleur primary |
| Skeleton | `skeleton.tsx` | Pulse animation |
| Spinner | `spinner.tsx` | SVG animé, 3 tailles, `text-primary-dark` |
| Sonner | `sonner.tsx` | Toast notifications (thème-aware) |

### Overlays
| Composant | Fichier | Notes |
|-----------|---------|-------|
| Dialog | `dialog.tsx` | Radix Dialog modal |
| AlertDialog | `alert-dialog.tsx` | Confirmation destructive |
| Sheet | `sheet.tsx` | Panneau latéral (4 directions) |
| DropdownMenu | `dropdown-menu.tsx` | Radix DropdownMenu complet |
| Popover | `popover.tsx` | Radix Popover |
| Tooltip | `tooltip.tsx` | Radix Tooltip |
| Command | `command.tsx` | Palette de commandes (cmdk) |

### Data Display
| Composant | Fichier | Notes |
|-----------|---------|-------|
| Table | `table.tsx` | HTML table wrappers stylisés |
| Avatar | `avatar.tsx` | Radix Avatar avec fallback |
| Toggle | `toggle.tsx` | Bouton toggle |
| ToggleGroup | `toggle-group.tsx` | Groupe de toggles |

## Composants métier réutilisables

Dans `src/components/` (hors `ui/`) :

| Composant | Fichier | Props | Usage |
|-----------|---------|-------|-------|
| ThemeProvider | `theme-provider.tsx` | children, attribute, defaultTheme | Provider next-themes |
| ThemeToggle | `theme-toggle.tsx` | — | Bouton toggle light/dark (Phosphor) |
| PageContainer | `page-container.tsx` | heading?, description?, children | Wrapper de page avec max-width |
| EmptyState | `empty-state.tsx` | icon?, heading, description?, action? | État vide (listes, tables) |
| StatCard | `stat-card.tsx` | label, value, description?, icon?, trend? | KPI dashboard — hover-lift, valeur mono |
| DataTable | `data-table.tsx` | columns, data, emptyMessage? | Table de données générique |
| CopyButton | `copy-button.tsx` | value, label?, size?, variant? | Copie presse-papiers + feedback 2 s |
| AppLogo | `logo.tsx` | size?, label?, className? | Logo Tiple (SVG mint) — personnaliser `label` par produit |

## Patterns UI récurrents

### Page standard
```tsx
<PageContainer heading="Titre" description="Description">
  {/* contenu */}
</PageContainer>
```

### Dashboard avec stats
```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <StatCard label="..." value="..." trend={{...}} icon={...} />
</div>
```

### Liste avec empty state
```tsx
{data.length === 0 ? (
  <EmptyState heading="..." action={<Button>Ajouter</Button>} />
) : (
  <DataTable columns={...} data={data} />
)}
```

### Formulaire avec validation
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField control={form.control} name="..." render={({field}) => (
      <FormItem>
        <FormLabel>...</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  </form>
</Form>
```
