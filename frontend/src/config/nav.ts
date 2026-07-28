import {
  HomeIcon,
  UsersIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  CpuChipIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import type { ComponentType, SVGProps } from "react"

export interface NavItem {
  label: string
  to: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/", icon: HomeIcon },
      { label: "Customers", to: "/customers", icon: UsersIcon },
      { label: "Segmentation", to: "/segmentation", icon: Squares2X2Icon },
      { label: "Countries", to: "/countries", icon: GlobeAltIcon },
    ],
  },
  {
    label: "AI Orchestration",
    items: [
      { label: "AI Supervisor", to: "/ai-supervisor", icon: CpuChipIcon },
      { label: "AI Agents", to: "/agents", icon: RectangleGroupIcon },
      { label: "Skills", to: "/skills", icon: WrenchScrewdriverIcon },
    ],
  },
  {
    label: "Governance",
    items: [
      { label: "Governance", to: "/governance", icon: ShieldCheckIcon },
      { label: "Guard Rails", to: "/guardrails", icon: LockClosedIcon },
      { label: "Business Rules", to: "/business-rules", icon: AdjustmentsHorizontalIcon },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Recommendations", to: "/recommendations", icon: LightBulbIcon },
      { label: "Analytics", to: "/analytics", icon: ChartBarIcon },
      { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
    ],
  },
]
