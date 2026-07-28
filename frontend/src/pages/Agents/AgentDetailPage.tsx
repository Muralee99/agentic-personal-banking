import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowDownCircleIcon,
  ClockIcon,
  BoltIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAgent } from "@/hooks/useAgents"
import { resolveAgentIcon } from "@/config/agentIcons"

export function AgentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: agent, isLoading } = useAgent(id)

  if (isLoading || !agent) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  const Icon = resolveAgentIcon(agent.name)

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-3 -ml-2 text-muted-foreground" onClick={() => navigate("/agents")}>
        <ArrowLeftIcon className="mr-1.5 h-4 w-4" /> Back to agents
      </Button>

      <PageHeader
        title={agent.name}
        description={agent.role}
        actions={<StatusBadge status={agent.status} className="text-sm" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="glass-card flex items-center gap-3 rounded-xl p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-white">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Countries</p>
            <p className="text-sm font-medium text-foreground">{agent.countries.length} markets</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-xl p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-3 text-white">
            <ClockIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Execution Time</p>
            <p className="text-sm font-medium text-foreground">{agent.executionTimeMs}ms</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 rounded-xl p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-chart-4 to-chart-2 text-white">
            <BoltIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Confidence</p>
            <p className="text-sm font-medium text-foreground">{Math.round(agent.confidence * 100)}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-xl p-5 lg:col-span-3">
          <h3 className="mb-1.5 text-sm font-semibold text-foreground">Purpose</h3>
          <p className="text-sm text-muted-foreground">{agent.purpose}</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <ArrowRightCircleIcon className="h-4 w-4 text-primary" /> Input
          </h3>
          <p className="text-sm text-muted-foreground">{agent.input}</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <ArrowDownCircleIcon className="h-4 w-4 text-success" /> Output
          </h3>
          <p className="text-sm text-muted-foreground">{agent.output}</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <CircleStackIcon className="h-4 w-4 text-chart-5" /> Memory
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {agent.memory.map((m) => <li key={m}>· {m}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-4 glass-card rounded-xl p-5">
        <h3 className="mb-2 text-sm font-semibold text-foreground">Skills</h3>
        <div className="flex flex-wrap gap-1.5">
          {agent.skills.map((s) => <Badge key={s} className="bg-primary/15 text-primary hover:bg-primary/20">{s}</Badge>)}
        </div>
      </div>

      <div className="mt-4 glass-card overflow-hidden rounded-xl p-5">
        <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <WrenchScrewdriverIcon className="h-4 w-4" /> Recent Tool Calls
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Input</TableHead>
                <TableHead>Output</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agent.toolCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-mono text-xs">{call.tool}</TableCell>
                  <TableCell className="max-w-[220px] truncate font-mono text-xs text-muted-foreground">{call.input}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{call.output}</TableCell>
                  <TableCell className="text-right text-xs tabular-nums">{call.durationMs}ms</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{call.timestamp.replace("T", " ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
