import {
  PaperAirplaneIcon,
  ChartBarIcon,
  ReceiptPercentIcon,
  ShieldExclamationIcon,
  BanknotesIcon,
  GiftIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline"
import type { ComponentType, SVGProps } from "react"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export const SKILL_ICON_MAP: Record<string, IconComponent> = {
  "Travel Recommendation": PaperAirplaneIcon,
  Investment: ChartBarIcon,
  Tax: ReceiptPercentIcon,
  Fraud: ShieldExclamationIcon,
  Budget: BanknotesIcon,
  Rewards: GiftIcon,
  Insurance: HeartIcon,
  "Cash Flow": ArrowsRightLeftIcon,
}

export function resolveSkillIcon(name: string): IconComponent {
  return SKILL_ICON_MAP[name] ?? ChartBarIcon
}
