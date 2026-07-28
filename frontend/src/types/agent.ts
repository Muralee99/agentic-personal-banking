export type AgentStatus = "Active" | "Idle" | "Error"

export interface ToolCall {
  id: string
  tool: string
  input: string
  output: string
  durationMs: number
  timestamp: string
}

export interface Agent {
  id: string
  name: string
  role: string
  order: number
  purpose: string
  input: string
  output: string
  status: AgentStatus
  memory: string[]
  skills: string[]
  toolCalls: ToolCall[]
  executionTimeMs: number
  confidence: number
  lastRun: string
  countries: string[]
}

export interface SupervisorFlowEdge {
  id: string
  source: string
  target: string
  animated: boolean
  label: string
}
