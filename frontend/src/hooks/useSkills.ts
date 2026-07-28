import { useQuery } from "@tanstack/react-query"
import { fetchSkills, type SkillParams } from "@/services/skillService"
import { queryKeys } from "@/config/queryKeys"

export function useSkills(params: SkillParams = {}) {
  return useQuery({
    queryKey: queryKeys.skills(params),
    queryFn: () => fetchSkills(params),
  })
}
