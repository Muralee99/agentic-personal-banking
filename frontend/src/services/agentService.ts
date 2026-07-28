import { apiClient } from "./client"
import type { Agent, SupervisorFlowEdge } from "@/types"

export async function fetchAgents(): Promise<Agent[]> {
  const { data } = await apiClient.get<Agent[]>("/agents")
  return data
}

export async function fetchAgent(id: string): Promise<Agent> {
  const { data } = await apiClient.get<Agent>(`/agents/${id}`)
  return data
}

export async function fetchFlowEdges(): Promise<SupervisorFlowEdge[]> {
  const { data } = await apiClient.get<SupervisorFlowEdge[]>("/agents/flow-edges")
  return data
}
