import { useQuery } from "@tanstack/react-query"
import { fetchSegment, fetchSegments } from "@/services/segmentService"
import { queryKeys } from "@/config/queryKeys"

export function useSegments() {
  return useQuery({ queryKey: queryKeys.segments, queryFn: fetchSegments })
}

export function useSegment(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.segment(id ?? ""),
    queryFn: () => fetchSegment(id as string),
    enabled: Boolean(id),
  })
}
