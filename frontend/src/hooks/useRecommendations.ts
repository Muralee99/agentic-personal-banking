import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  acceptRecommendation,
  fetchRecommendations,
  rejectRecommendation,
} from "@/services/recommendationService"
import { queryKeys } from "@/config/queryKeys"
import type { RecommendationListParams } from "@/types"

export function useRecommendations(params: RecommendationListParams = {}) {
  return useQuery({
    queryKey: queryKeys.recommendations(params),
    queryFn: () => fetchRecommendations(params),
    placeholderData: (prev) => prev,
  })
}

export function useRecommendationActions() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["recommendations"] })

  const accept = useMutation({
    mutationFn: acceptRecommendation,
    onSuccess: invalidate,
  })
  const reject = useMutation({
    mutationFn: rejectRecommendation,
    onSuccess: invalidate,
  })

  return { accept, reject }
}
