import { apiClient } from "./client"
import type { Recommendation, RecommendationListParams, RecommendationListResponse } from "@/types"

export async function fetchRecommendations(
  params: RecommendationListParams = {},
): Promise<RecommendationListResponse> {
  const { data } = await apiClient.get<RecommendationListResponse>("/recommendations", { params })
  return data
}

export async function acceptRecommendation(id: string): Promise<Recommendation> {
  const { data } = await apiClient.post<Recommendation>(`/recommendations/${id}/accept`)
  return data
}

export async function rejectRecommendation(id: string): Promise<Recommendation> {
  const { data } = await apiClient.post<Recommendation>(`/recommendations/${id}/reject`)
  return data
}
