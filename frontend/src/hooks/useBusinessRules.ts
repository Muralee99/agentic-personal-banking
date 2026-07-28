import { useQuery } from "@tanstack/react-query"
import { fetchBusinessRules, type BusinessRuleParams } from "@/services/businessRuleService"
import { queryKeys } from "@/config/queryKeys"

export function useBusinessRules(params: BusinessRuleParams = {}) {
  return useQuery({
    queryKey: queryKeys.businessRules(params),
    queryFn: () => fetchBusinessRules(params),
  })
}
