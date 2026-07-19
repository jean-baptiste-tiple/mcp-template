import { cn } from "@/lib/utils/cn"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: { value: number; positive: boolean }
}

export function StatCard({
  label,
  value,
  description,
  icon,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "hover-lift rounded-lg border bg-card p-6 text-card-foreground hover:border-primary/40 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {icon && <div className="text-primary-dark">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="font-mono text-3xl font-bold tabular-nums tracking-tight">{value}</p>
        {trend && (
          <span
            className={cn(
              "font-mono text-xs font-medium tabular-nums",
              trend.positive ? "text-primary-dark" : "text-destructive"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
