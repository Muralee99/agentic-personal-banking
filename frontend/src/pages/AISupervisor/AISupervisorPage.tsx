import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  type Node,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { PageHeader } from "@/components/common/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { useAgents, useFlowEdges } from "@/hooks/useAgents"
import { AgentNode } from "@/flows/AgentNode"
import { AnimatedMessageEdge } from "@/flows/AnimatedMessageEdge"
import { buildAgentFlow } from "@/flows/layout"

const nodeTypes = { agentNode: AgentNode }
const edgeTypes = { message: AnimatedMessageEdge }

function SupervisorFlow() {
  const navigate = useNavigate()
  const { data: agents, isLoading: agentsLoading } = useAgents()
  const { data: flowEdges, isLoading: edgesLoading } = useFlowEdges()

  const { nodes, edges } = useMemo(() => {
    if (!agents || !flowEdges) return { nodes: [], edges: [] }
    return buildAgentFlow(agents, flowEdges)
  }, [agents, flowEdges])

  if (agentsLoading || edgesLoading) {
    return <Skeleton className="h-[560px] w-full rounded-xl" />
  }

  return (
    <div className="glass-card h-[560px] overflow-hidden rounded-xl">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_, node) => navigate(`/agents/${node.id}`)}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--color-border)" />
        <Controls showInteractive={false} className="!rounded-lg !border !border-border !bg-popover !shadow-lg" />
      </ReactFlow>
    </div>
  )
}

export function AISupervisorPage() {
  return (
    <div>
      <PageHeader
        title="AI Supervisor"
        description="Live orchestration graph — the Supervisor routes customer context to specialist agents, which feed the Recommendation Agent"
      />
      <ReactFlowProvider>
        <SupervisorFlow />
      </ReactFlowProvider>
      <p className="mt-3 text-center text-xs text-muted-foreground">Click any agent to view its detail page · dots trace live message passing</p>
    </div>
  )
}
