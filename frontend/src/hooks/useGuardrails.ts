import { useQuery } from "@tanstack/react-query"
import { fetchGuardrails, type GuardrailParams } from "@/services/guardrailService"
import { queryKeys } from "@/config/queryKeys"

export function useGuardrails(params: GuardrailParams = {}) {
  return useQuery({
    queryKey: queryKeys.guardrails(params),
    queryFn: () => fetchGuardrails(params),
  })
}
