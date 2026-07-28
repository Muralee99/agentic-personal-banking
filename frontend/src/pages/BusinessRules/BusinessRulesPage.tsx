import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { AdjustmentsHorizontalIcon, BoltIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { EmptyState } from "@/components/common/EmptyState"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBusinessRules } from "@/hooks/useBusinessRules"
import { cn } from "@/lib/utils"
import type { BusinessRule } from "@/types"

const COUNTRIES = ["India", "USA", "UK", "Singapore", "Australia"]
const STATUSES = ["Active", "Inactive", "Draft"]
const ALL = "__all__"

function RuleVisual({ rule }: { rule: BusinessRule }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="rounded bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">IF</span>
      {rule.conditions.map((c, i) => (
        <span key={`${c.field}-${i}`} className="flex items-center gap-2">
          {i > 0 && <Badge variant="outline" className="bg-accent text-accent-foreground">{c.logicalOp}</Badge>}
          <span className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {c.field} <span className="text-primary">{c.operator}</span> {c.value}
          </span>
        </span>
      ))}
      <span className="rounded bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">THEN</span>
      <span className="rounded-lg border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
        {rule.action}
      </span>
    </div>
  )
}

export function BusinessRulesPage() {
  const [country, setCountry] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  const { data: rules, isLoading } = useBusinessRules({
    country: country === ALL ? undefined : country,
    status: status === ALL ? undefined : status,
  })

  const sorted = useMemo(() => rules?.slice().sort((a, b) => a.priority - b.priority), [rules])
  const active = sorted?.find((r) => r.id === selectedId) ?? sorted?.[0]

  return (
    <div>
      <PageHeader title="Business Rule Builder" description="Deterministic IF / AND / THEN logic layered on top of AI recommendations" />

      <div className="glass-card mb-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center">
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Countries</SelectItem>
            {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Skeleton className="h-32 w-full rounded-xl" />
      ) : active ? (
        <div className="glass-card mb-6 rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Visual Rule Builder — {active.name}</h3>
            <div className="flex items-center gap-2">
              <StatusBadge status={active.status} />
              <Badge variant="outline">Priority {active.priority}</Badge>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
            <RuleVisual rule={active} />
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <BoltIcon className="h-3.5 w-3.5" /> Executed {active.executionCount.toLocaleString()} times · {active.country} · {active.segment} segment
          </p>
        </div>
      ) : null}

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : !sorted || sorted.length === 0 ? (
        <EmptyState icon={AdjustmentsHorizontalIcon} title="No business rules match these filters" />
      ) : (
        <div className="space-y-3">
          {sorted.map((rule, i) => (
            <motion.button
              key={rule.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedId(rule.id)}
              className={cn(
                "glass-card w-full rounded-xl p-4 text-left transition-shadow hover:shadow-md",
                active?.id === rule.id && "ring-2 ring-primary",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {rule.priority}
                  </span>
                  <p className="font-medium text-foreground">{rule.name}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <StatusBadge status={rule.status} />
                  <span>{rule.executionCount.toLocaleString()} executions</span>
                </div>
              </div>
              <div className="mt-2">
                <RuleVisual rule={rule} />
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
