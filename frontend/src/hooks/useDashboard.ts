import { useQuery } from "@tanstack/react-query"
import { fetchDashboard } from "@/services/dashboardService"
import { queryKeys } from "@/config/queryKeys"

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: fetchDashboard,
    refetchInterval: 30000,
  })
}
