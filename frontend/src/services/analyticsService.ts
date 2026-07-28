import { apiClient } from "./client"
import type { AnalyticsResponse } from "@/types"

export async function fetchAnalytics(): Promise<AnalyticsResponse> {
  const { data } = await apiClient.get<AnalyticsResponse>("/analytics")
  return data
}
