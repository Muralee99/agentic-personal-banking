import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { LockClosedIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { EmptyState } from "@/components/common/EmptyState"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useGuardrails } from "@/hooks/useGuardrails"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "Prompt Validation",
  "PII Detection",
  "Compliance",
  "Risk Rules",
  "Fraud Rules",
  "Product Eligibility",
  "Investment Restrictions",
  "Human Approval",
]
const ALL = "All"

export function GuardrailsPage() {
  const [category, setCategory] = useState(ALL)
  const { data: guardrails, isLoading } = useGuardrails()

  const filtered = useMemo(
    () => (category === ALL ? guardrails : guardrails?.filter((g) => g.category === category)),
    [guardrails, category],
  )

  const totalViolations = guardrails?.reduce((sum, g) => sum + g.violationsCount, 0) ?? 0

  return (
    <div>
      <PageHeader
        title="Guard Rails"
        description="Safety, compliance and risk controls enforced on every AI agent action"
        actions={
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive">
            <ExclamationTriangleIcon className="h-4 w-4" /> {totalViolations} violations (30d)
          </div>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {[ALL, ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              category === c
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-secondary text-secondary-foreground hover:bg-accent",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <EmptyState icon={LockClosedIcon} title="No guardrails in this category" />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-white">
                  <LockClosedIcon className="h-4.5 w-4.5" />
                </div>
                <StatusBadge status={g.status} />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{g.category}</p>
              <h3 className="font-semibold text-foreground">{g.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={g.severity} />
                <span className={cn("text-xs font-medium", g.violationsCount > 10 ? "text-destructive" : g.violationsCount > 0 ? "text-warning" : "text-muted-foreground")}>
                  {g.violationsCount} violations
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {g.countries.slice(0, 3).map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
                {g.countries.length > 3 && <Badge variant="outline" className="text-[10px]">+{g.countries.length - 3}</Badge>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
