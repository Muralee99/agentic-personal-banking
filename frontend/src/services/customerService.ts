import { apiClient } from "./client"
import type { CustomerDetail, CustomerListParams, CustomerListResponse } from "@/types"

export async function fetchCustomers(params: CustomerListParams): Promise<CustomerListResponse> {
  const { data } = await apiClient.get<CustomerListResponse>("/customers", { params })
  return data
}

export async function fetchCustomer(id: string): Promise<CustomerDetail> {
  const { data } = await apiClient.get<CustomerDetail>(`/customers/${id}`)
  return data
}
