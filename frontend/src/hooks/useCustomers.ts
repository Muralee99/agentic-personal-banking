import { useQuery } from "@tanstack/react-query"
import { fetchCustomer, fetchCustomers } from "@/services/customerService"
import { queryKeys } from "@/config/queryKeys"
import type { CustomerListParams } from "@/types"

export function useCustomers(params: CustomerListParams) {
  return useQuery({
    queryKey: queryKeys.customers(params),
    queryFn: () => fetchCustomers(params),
    placeholderData: (prev) => prev,
  })
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.customer(id ?? ""),
    queryFn: () => fetchCustomer(id as string),
    enabled: Boolean(id),
  })
}
