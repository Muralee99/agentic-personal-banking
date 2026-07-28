import { useQuery } from "@tanstack/react-query"
import { fetchAnalytics } from "@/services/analyticsService"
import { queryKeys } from "@/config/queryKeys"

export function useAnalytics() {
  return useQuery({ queryKey: queryKeys.analytics, queryFn: fetchAnalytics })
}
