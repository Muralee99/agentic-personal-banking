export interface ChartPoint {
  label: string
  value: number
}

export interface SeriesPoint {
  date: string
  value: number
}

export interface NamedCount {
  name: string
  count: number
}

export type Priority = "High" | "Medium" | "Low"
