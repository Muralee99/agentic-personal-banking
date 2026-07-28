import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchSettings, updateSettings } from "@/services/settingsService"
import { queryKeys } from "@/config/queryKeys"

export function useSettings() {
  return useQuery({ queryKey: queryKeys.settings, queryFn: fetchSettings })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.settings, data)
    },
  })
}
