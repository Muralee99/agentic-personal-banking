export interface SegmentRule {
  field: string
  operator: string
  value: string
}

export interface SegmentDetail {
  id: string
  name: string
  description: string
  icon: string
  color: string
  customersCount: number
  rules: SegmentRule[]
  enabledSkills: string[]
  recommendedProducts: string[]
  activatedAgents: string[]
}
