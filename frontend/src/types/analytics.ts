import type { ChartPoint, NamedCount, SeriesPoint } from "./common"

export interface AgentPerformance {
  agent: string
  executions: number
  successRate: number
  avgConfidence: number
}

export interface AnalyticsResponse {
  recommendationsOverTime: SeriesPoint[]
  segmentDistribution: ChartPoint[]
  countryDistribution: ChartPoint[]
  businessRuleUsage: NamedCount[]
  guardrailViolations: NamedCount[]
  topAgents: AgentPerformance[]
}
