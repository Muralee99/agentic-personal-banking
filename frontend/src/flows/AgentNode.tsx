import { Handle, Position, type NodeProps } from "@xyflow/react"
import { resolveAgentIcon } from "@/config/agentIcons"
import { cn } from "@/lib/utils"

export interface AgentNodeData {
  name: string
  role: string
  status: string
  confidence: number
  executionTimeMs: number
  isSupervisor?: boolean
  [key: string]: unknown
}

export function AgentNode({ data }: NodeProps) {
  const d = data as AgentNodeData
  const Icon = resolveAgentIcon(d.name)
  const active = d.status === "Active"

  return (
    <div
      className={cn(
        "glass-card w-[188px] rounded-xl border p-3 shadow-md",
        d.isSupervisor && "border-primary/50 shadow-lg shadow-primary/20",
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white",
            d.isSupervisor ? "bg-gradient-to-br from-primary to-chart-2" : "bg-gradient-to-br from-chart-1 to-chart-3",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">{d.name}</p>
          <div className="flex items-center gap-1">
            <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-success animate-supervisor-pulse" : "bg-muted-foreground")} />
            <span className="text-[10px] text-muted-foreground">{d.status}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{d.executionTimeMs}ms</span>
        <span className="font-medium text-primary">{Math.round(d.confidence * 100)}% conf.</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  )
}
