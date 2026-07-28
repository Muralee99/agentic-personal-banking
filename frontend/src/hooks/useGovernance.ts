import { useQuery } from "@tanstack/react-query"
import { fetchGovernancePolicies, type GovernanceParams } from "@/services/governanceService"
import { queryKeys } from "@/config/queryKeys"

export function useGovernancePolicies(params: GovernanceParams = {}) {
  return useQuery({
    queryKey: queryKeys.governance(params),
    queryFn: () => fetchGovernancePolicies(params),
  })
}
