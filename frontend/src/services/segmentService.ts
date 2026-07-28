import { apiClient } from "./client"
import type { SegmentDetail } from "@/types"

export async function fetchSegments(): Promise<SegmentDetail[]> {
  const { data } = await apiClient.get<SegmentDetail[]>("/segments")
  return data
}

export async function fetchSegment(id: string): Promise<SegmentDetail> {
  const { data } = await apiClient.get<SegmentDetail>(`/segments/${id}`)
  return data
}
