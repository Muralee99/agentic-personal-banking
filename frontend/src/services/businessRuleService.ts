import { apiClient } from "./client"
import type { BusinessRule } from "@/types"

export interface BusinessRuleParams {
  country?: string
  segment?: string
  status?: string
}

export async function fetchBusinessRules(params: BusinessRuleParams = {}): Promise<BusinessRule[]> {
  const { data } = await apiClient.get<BusinessRule[]>("/business-rules", { params })
  return data
}
