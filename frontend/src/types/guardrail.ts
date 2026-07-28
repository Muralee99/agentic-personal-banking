export type GuardrailCategory =
  | "Prompt Validation"
  | "PII Detection"
  | "Compliance"
  | "Risk Rules"
  | "Fraud Rules"
  | "Product Eligibility"
  | "Investment Restrictions"
  | "Human Approval"

export interface Guardrail {
  id: string
  category: GuardrailCategory
  name: string
  description: string
  status: "Enabled" | "Disabled"
  severity: "Low" | "Medium" | "High" | "Critical"
  violationsCount: number
  countries: string[]
}
