import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ClockIcon, BoltIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAgents } from "@/hooks/useAgents"
import { resolveAgentIcon } from "@/config/agentIcons"

export function AgentsPage() {
  const navigate = useNavigate()
  const { data: agents, isLoading } = useAgents()

  return (
    <div>
      <PageHeader title="AI Agents" description="Specialist agents orchestrated by the Supervisor to generate recommendations" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)
          : agents
              ?.slice()
              .sort((a, b) => a.order - b.order)
              .map((agent, i) => {
                const Icon = resolveAgentIcon(agent.name)
                return (
                  <motion.button
                    key={agent.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => navigate(`/agents/${agent.id}`)}
                    className="glass-card rounded-xl p-5 text-left transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-2 text-white shadow-lg shadow-primary/25">
                        <Icon className="h-5.5 w-5.5" />
                      </div>
                      <StatusBadge status={agent.status} />
                    </div>
                    <h3 className="font-semibold text-foreground">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{agent.purpose}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {agent.skills.slice(0, 3).map((s) => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
                      {agent.skills.length > 3 && <Badge variant="outline" className="text-[10px]">+{agent.skills.length - 3}</Badge>}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" /> {agent.executionTimeMs}ms</span>
                      <span className="flex items-center gap-1 font-medium text-primary"><BoltIcon className="h-3.5 w-3.5" /> {Math.round(agent.confidence * 100)}% confidence</span>
                    </div>
                  </motion.button>
                )
              })}
      </div>
    </div>
  )
}
