import { useQuery } from "@tanstack/react-query"
import { fetchCountries, fetchCountry } from "@/services/countryService"
import { queryKeys } from "@/config/queryKeys"

export function useCountries() {
  return useQuery({ queryKey: queryKeys.countries, queryFn: fetchCountries })
}

export function useCountry(code: string | undefined) {
  return useQuery({
    queryKey: queryKeys.country(code ?? ""),
    queryFn: () => fetchCountry(code as string),
    enabled: Boolean(code),
  })
}
