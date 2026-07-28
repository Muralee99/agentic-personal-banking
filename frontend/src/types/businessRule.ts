export interface RuleCondition {
  field: string
  operator: string
  value: string
  logicalOp: "AND" | "OR" | null
}

export interface BusinessRule {
  id: string
  name: string
  conditions: RuleCondition[]
  action: string
  priority: number
  status: "Active" | "Inactive" | "Draft"
  executionCount: number
  country: string
  segment: string
  createdAt: string
}
