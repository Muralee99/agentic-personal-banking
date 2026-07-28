import type { ChartPoint, NamedCount } from "./common"

export interface DashboardStats {
  totalCustomers: number
  segments: number
  countries: number
  aiRecommendations: number
  activeAgents: number
  guardrailViolations: number
  businessRules: number
  recommendationSuccessRate: number
  customerSatisfaction: number
}

export interface CountryMapPoint {
  code: string
  name: string
  lat: number
  lng: number
  customers: number
}

export interface HeatMapCell {
  day: string
  hour: number
  value: number
}

export interface DashboardCharts {
  segmentPie: ChartPoint[]
  recommendationsByCountryBar: ChartPoint[]
  heatMap: HeatMapCell[]
  countryMap: CountryMapPoint[]
  topProducts: NamedCount[]
}

export interface DashboardResponse {
  stats: DashboardStats
  charts: DashboardCharts
}
