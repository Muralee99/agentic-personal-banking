import {
  CpuChipIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ShieldExclamationIcon,
  PaperAirplaneIcon,
  HeartIcon,
  ChartBarIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline"
import type { ComponentType, SVGProps } from "react"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export const AGENT_ICON_MAP: Record<string, IconComponent> = {
  Supervisor: CpuChipIcon,
  "Budget Agent": BanknotesIcon,
  "Savings Agent": ArrowTrendingUpIcon,
  "Fraud Agent": ShieldExclamationIcon,
  "Travel Agent": PaperAirplaneIcon,
  "Insurance Agent": HeartIcon,
  "Investment Agent": ChartBarIcon,
  "Recommendation Agent": LightBulbIcon,
}

export function resolveAgentIcon(name: string): IconComponent {
  return AGENT_ICON_MAP[name] ?? CpuChipIcon
}
