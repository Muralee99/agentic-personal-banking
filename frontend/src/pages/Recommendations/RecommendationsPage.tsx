import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  LightBulbIcon,
  CheckIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { EmptyState } from "@/components/common/EmptyState"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRecommendationActions, useRecommendations } from "@/hooks/useRecommendations"
import { cn } from "@/lib/utils"

const SEGMENTS = ["Student", "Young Professional", "Family", "Business", "Retired", "High Net Worth"]
const COUNTRIES = ["India", "USA", "UK", "Singapore", "Australia"]
const STATUSES = ["Pending", "Accepted", "Rejected"]
const PRIORITIES = ["High", "Medium", "Low"]
const ALL = "__all__"
const PAGE_SIZE = 12

export function RecommendationsPage() {
  const [status, setStatus] = useState(ALL)
  const [priority, setPriority] = useState(ALL)
  const [segment, setSegment] = useState(ALL)
  const [country, setCountry] = useState(ALL)
  const [page, setPage] = useState(1)

  const params = useMemo(
    () => ({
      status: status === ALL ? undefined : status,
      priority: priority === ALL ? undefined : priority,
      segment: segment === ALL ? undefined : segment,
      country: country === ALL ? undefined : country,
      page,
      pageSize: PAGE_SIZE,
    }),
    [status, priority, segment, country, page],
  )

  const { data, isLoading } = useRecommendations(params)
  const { accept, reject } = useRecommendationActions()
  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v)
      setPage(1)
    }
  }

  return (
    <div>
      <PageHeader
        title="Recommendations"
        description={data ? `${data.total.toLocaleString()} AI-generated recommendations` : "Loading…"}
      />

      <div className="glass-card mb-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Select value={status} onValueChange={resetPage(setStatus)}>
          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={priority} onValueChange={resetPage(setPriority)}>
          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Priorities</SelectItem>
            {PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={segment} onValueChange={resetPage(setSegment)}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Segment" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Segments</SelectItem>
            {SEGMENTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={country} onValueChange={resetPage(setCountry)}>
          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Countries</SelectItem>
            {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState icon={LightBulbIcon} title="No recommendations match these filters" />
      ) : (
        <div className="relative space-y-4 pl-6">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
          {data.items.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative"
            >
              <span
                className={cn(
                  "absolute -left-6 top-5 h-3.5 w-3.5 rounded-full border-2 border-background",
                  r.status === "Accepted" && "bg-success",
                  r.status === "Rejected" && "bg-destructive",
                  r.status === "Pending" && "bg-warning",
                )}
              />
              <div className="glass-card rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{r.product}</p>
                      <StatusBadge status={r.priority} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.reason}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>{r.customerName}</span>
                    <span>·</span>
                    <span>Triggered by {r.triggeredAgent}</span>
                    <span>·</span>
                    <span>{r.segment}</span>
                    <span>·</span>
                    <span>{r.country}</span>
                    <span>·</span>
                    <span>{r.generatedAt.replace("T", " ")}</span>
                  </div>
                  {r.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 border-success/40 text-success hover:bg-success/10"
                        disabled={accept.isPending}
                        onClick={() => accept.mutate(r.id, { onSuccess: () => toast.success(`Accepted: ${r.product}`) })}
                      >
                        <CheckIcon className="h-3.5 w-3.5" /> Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 border-destructive/40 text-destructive hover:bg-destructive/10"
                        disabled={reject.isPending}
                        onClick={() => reject.mutate(r.id, { onSuccess: () => toast.error(`Rejected: ${r.product}`) })}
                      >
                        <XMarkIcon className="h-3.5 w-3.5" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {data && data.total > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {page} of {totalPages} · {data.total.toLocaleString()} recommendations</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
