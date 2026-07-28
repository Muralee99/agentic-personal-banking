import { motion } from "framer-motion"
import type { ComponentType, SVGProps } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  icon: ComponentType<SVGProps<SVGSVGElement>>
  gradient?: string
  trend?: { value: string; positive: boolean }
  index?: number
}

export function StatCard({ label, value, icon: Icon, gradient = "from-primary to-chart-2", trend, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="glass-card relative overflow-hidden rounded-xl p-5"
    >
      <div className={cn("absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl", gradient)} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          {trend && (
            <p className={cn("mt-1 text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
              {trend.positive ? "▲" : "▼"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg", gradient)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  )
}
