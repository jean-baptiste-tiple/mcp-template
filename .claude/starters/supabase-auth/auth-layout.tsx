export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Même fond que les pages du dashboard : halo mint léger + croix + grain fin.
    <div className="page-canvas noise-overlay flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  )
}
