import {
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon,
  BuildingOfficeIcon,
  SunIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import type { ComponentType, SVGProps } from "react"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export const SEGMENT_ICON_MAP: Record<string, IconComponent> = {
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon,
  BuildingOfficeIcon,
  SunIcon,
  SparklesIcon,
}

export function resolveSegmentIcon(name: string): IconComponent {
  return SEGMENT_ICON_MAP[name] ?? SparklesIcon
}
