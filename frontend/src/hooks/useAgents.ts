import { useQuery } from "@tanstack/react-query"
import { fetchAgent, fetchAgents, fetchFlowEdges } from "@/services/agentService"
import { queryKeys } from "@/config/queryKeys"

export function useAgents() {
  return useQuery({ queryKey: queryKeys.agents, queryFn: fetchAgents })
}

export function useAgent(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.agent(id ?? ""),
    queryFn: () => fetchAgent(id as string),
    enabled: Boolean(id),
  })
}

export function useFlowEdges() {
  return useQuery({ queryKey: queryKeys.flowEdges, queryFn: fetchFlowEdges })
}
