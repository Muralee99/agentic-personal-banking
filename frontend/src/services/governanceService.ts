import { apiClient } from "./client"
import type { GovernancePolicy } from "@/types"

export interface GovernanceParams {
  country?: string
  enabled?: boolean
  riskLevel?: string
}

export async function fetchGovernancePolicies(params: GovernanceParams = {}): Promise<GovernancePolicy[]> {
  const { data } = await apiClient.get<GovernancePolicy[]>("/governance", { params })
  return data
}
