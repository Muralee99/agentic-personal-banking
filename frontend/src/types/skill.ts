export interface Skill {
  id: string
  name: string
  description: string
  country: string
  version: string
  status: "Active" | "Beta" | "Deprecated"
  supportedAgents: string[]
  usageCount: number
}
