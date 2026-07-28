import type { Priority } from "./common"

export type Segment =
  | "Student"
  | "Young Professional"
  | "Family"
  | "Business"
  | "Retired"
  | "High Net Worth"

export type Country = "India" | "USA" | "UK" | "Singapore" | "Australia"
export type CustomerStatus = "Active" | "Inactive" | "Dormant"
export type KycStatus = "Verified" | "Pending" | "Rejected"

export interface BehaviourEvent {
  id: string
  date: string
  type: string
  description: string
  channel: string
}

export interface TransactionEvent {
  id: string
  date: string
  description: string
  category: string
  amount: number
  direction: "credit" | "debit"
  merchant: string
}

export interface JourneyStage {
  stage: string
  date: string
  status: "completed" | "current" | "upcoming"
  description: string
}

export interface CustomerRecommendation {
  id: string
  product: string
  priority: Priority
  reason: string
  triggeredAgent: string
  status: "Pending" | "Accepted" | "Rejected"
  generatedAt: string
}

export interface CustomerSummary {
  id: string
  name: string
  email: string
  phone: string
  avatarSeed: string
  segment: Segment
  country: Country
  status: CustomerStatus
  kycStatus: KycStatus
  accountBalance: number
  riskScore: number
  financialHealthScore: number
  joinDate: string
}

export interface CustomerDetail extends CustomerSummary {
  behaviourTimeline: BehaviourEvent[]
  transactionTimeline: TransactionEvent[]
  aiRecommendations: CustomerRecommendation[]
  journey: JourneyStage[]
}

export interface CustomerListResponse {
  items: CustomerSummary[]
  total: number
  page: number
  pageSize: number
}

export interface CustomerListParams {
  search?: string
  segment?: string
  country?: string
  status?: string
  kycStatus?: string
  page?: number
  pageSize?: number
}
