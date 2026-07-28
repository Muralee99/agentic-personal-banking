export type RiskLevel = "Low" | "Medium" | "High" | "Critical"

export interface GovernancePolicy {
  id: string
  name: string
  country: string
  category: string
  enabled: boolean
  approvalRequired: boolean
  humanReview: boolean
  riskLevel: RiskLevel
  description: string
  lastUpdated: string
}
