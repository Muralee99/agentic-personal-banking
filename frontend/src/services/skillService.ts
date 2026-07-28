import { apiClient } from "./client"
import type { Skill } from "@/types"

export interface SkillParams {
  country?: string
  status?: string
}

export async function fetchSkills(params: SkillParams = {}): Promise<Skill[]> {
  const { data } = await apiClient.get<Skill[]>("/skills", { params })
  return data
}
