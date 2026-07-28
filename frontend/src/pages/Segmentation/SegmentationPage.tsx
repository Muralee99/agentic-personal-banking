import { useState } from "react"
import { motion } from "framer-motion"
import { UsersIcon, CpuChipIcon, TagIcon, CubeIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSegments } from "@/hooks/useSegments"
import { resolveSegmentIcon } from "@/config/iconMap"
import { cn } from "@/lib/utils"

function RuleChips({ rules }: { rules: { field: string; operator: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {rules.map((rule, i) => (
        <div key={`${rule.field}-${i}`} className="flex items-center gap-2">
          {i > 0 && <Badge variant="outline" className="bg-accent text-accent-foreground">AND</Badge>}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            <span>{rule.field}</span>
            <span className="text-primary">{rule.operator}</span>
            <span>{rule.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SegmentationPage() {
  const { data: segments, isLoading } = useSegments()
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  const activeSegment = segments?.find((s) => s.id === selectedId) ?? segments?.[0]

  return (
    <div>
      <PageHeader
        title="Segmentation"
        description="Behavioural segments that drive AI agent targeting and product recommendations"
      />

      <div className="glass-card mb-6 rounded-xl p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Visual Segment Builder</h3>
            <p className="text-xs text-muted-foreground">Inspect the rule logic behind each segment</p>
          </div>
          {segments && (
            <Select value={activeSegment?.id} onValueChange={setSelectedId}>
              <SelectTrigger className="w-full sm:w-[220px]"><SelectValue placeholder="Select a segment" /></SelectTrigger>
              <SelectContent>
                {segments.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>

        {isLoading || !activeSegment ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="rounded bg-primary/15 px-2 py-0.5 text-primary">IF</span>
              {activeSegment.name} matches
            </div>
            <RuleChips rules={activeSegment.rules} />
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="rounded bg-success/15 px-2 py-0.5 text-success">THEN</span>
              Activate {activeSegment.activatedAgents.length} agents · Enable {activeSegment.enabledSkills.length} skills
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)
          : segments?.map((segment, i) => {
              const Icon = resolveSegmentIcon(segment.icon)
              return (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedId(segment.id)}
                  className={cn(
                    "glass-card cursor-pointer overflow-hidden rounded-xl transition-shadow hover:shadow-lg",
                    activeSegment?.id === segment.id && "ring-2 ring-primary",
                  )}
                >
                  <div className={cn("bg-gradient-to-br p-5 text-white", segment.color)}>
                    <div className="flex items-center justify-between">
                      <Icon className="h-8 w-8" />
                      <div className="text-right">
                        <p className="text-2xl font-semibold">{segment.customersCount}</p>
                        <p className="text-xs opacity-90">customers</p>
                      </div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{segment.name}</h3>
                    <p className="text-xs opacity-90">{segment.description}</p>
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <TagIcon className="h-3.5 w-3.5" /> Enabled Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {segment.enabledSkills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <CubeIcon className="h-3.5 w-3.5" /> Recommended Products
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {segment.recommendedProducts.map((p) => <Badge key={p} variant="outline">{p}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                        <CpuChipIcon className="h-3.5 w-3.5" /> Activated Agents
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {segment.activatedAgents.map((a) => (
                          <Badge key={a} className="bg-primary/15 text-primary hover:bg-primary/20">{a}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                      <UsersIcon className="h-3.5 w-3.5" /> {segment.customersCount} customers in this segment
                    </div>
                  </div>
                </motion.div>
              )
            })}
      </div>
    </div>
  )
}
