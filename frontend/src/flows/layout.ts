import type { Edge, Node } from "@xyflow/react"
import type { Agent, SupervisorFlowEdge } from "@/types"
import type { AgentNodeData } from "./AgentNode"

const NODE_STEP_X = 210
const ROW_Y = { supervisor: 0, middle: 170, aggregator: 340 }

export function buildAgentFlow(agents: Agent[], flowEdges: SupervisorFlowEdge[]) {
  const supervisor = agents.find((a) => a.order === 0)
  const middle = agents.filter((a) => a.order >= 1 && a.order <= 6).sort((a, b) => a.order - b.order)
  const aggregator = agents.find((a) => a.order === 7)

  const middleWidth = (middle.length - 1) * NODE_STEP_X
  const centerX = middleWidth / 2

  const nodes: Node<AgentNodeData>[] = []

  if (supervisor) {
    nodes.push({
      id: supervisor.id,
      type: "agentNode",
      position: { x: centerX - 94, y: ROW_Y.supervisor },
      data: {
        name: supervisor.name,
        role: supervisor.role,
        status: supervisor.status,
        confidence: supervisor.confidence,
        executionTimeMs: supervisor.executionTimeMs,
        isSupervisor: true,
      },
      draggable: false,
    })
  }

  middle.forEach((agent, i) => {
    nodes.push({
      id: agent.id,
      type: "agentNode",
      position: { x: i * NODE_STEP_X, y: ROW_Y.middle },
      data: {
        name: agent.name,
        role: agent.role,
        status: agent.status,
        confidence: agent.confidence,
        executionTimeMs: agent.executionTimeMs,
      },
      draggable: false,
    })
  })

  if (aggregator) {
    nodes.push({
      id: aggregator.id,
      type: "agentNode",
      position: { x: centerX - 94, y: ROW_Y.aggregator },
      data: {
        name: aggregator.name,
        role: aggregator.role,
        status: aggregator.status,
        confidence: aggregator.confidence,
        executionTimeMs: aggregator.executionTimeMs,
      },
      draggable: false,
    })
  }

  const edges: Edge[] = flowEdges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    type: "message",
    animated: false,
    label: e.label,
    labelStyle: { fill: "var(--color-muted-foreground)", fontSize: 10 },
    labelBgStyle: { fill: "var(--color-popover)" },
  }))

  return { nodes, edges }
}
