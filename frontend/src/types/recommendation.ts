import type { Priority } from "./common"

export type RecommendationStatus = "Pending" | "Accepted" | "Rejected"

export interface Recommendation {
  id: string
  customerId: string
  customerName: string
  product: string
  priority: Priority
  reason: string
  triggeredAgent: string
  segment: string
  country: string
  status: RecommendationStatus
  generatedAt: string
}

export interface RecommendationListResponse {
  items: Recommendation[]
  total: number
}

export interface RecommendationListParams {
  status?: string
  priority?: string
  segment?: string
  country?: string
  triggeredAgent?: string
  page?: number
  pageSize?: number
}
