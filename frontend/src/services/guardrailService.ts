import { apiClient } from "./client"
import type { Guardrail } from "@/types"

export interface GuardrailParams {
  category?: string
  status?: string
  country?: string
}

export async function fetchGuardrails(params: GuardrailParams = {}): Promise<Guardrail[]> {
  const { data } = await apiClient.get<Guardrail[]>("/guardrails", { params })
  return data
}
