import { apiClient } from "./client"
import type { CountryConfig } from "@/types"

export async function fetchCountries(): Promise<CountryConfig[]> {
  const { data } = await apiClient.get<CountryConfig[]>("/countries")
  return data
}

export async function fetchCountry(code: string): Promise<CountryConfig> {
  const { data } = await apiClient.get<CountryConfig>(`/countries/${code}`)
  return data
}
