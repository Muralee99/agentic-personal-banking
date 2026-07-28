import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { chartAxisProps, chartGridProps, chartTooltipStyle } from "@/config/chartTheme"
import type { SeriesPoint } from "@/types"

export function AreaTrendChart({ data, height = 280 }: { data: SeriesPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...chartGridProps} vertical={false} />
        <XAxis dataKey="date" {...chartAxisProps} minTickGap={24} />
        <YAxis {...chartAxisProps} />
        <Tooltip {...chartTooltipStyle} cursor={{ stroke: "var(--color-chart-1)", strokeWidth: 1, strokeDasharray: "3 3" }} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--color-chart-1)"
          strokeWidth={2}
          fill="url(#trendFill)"
          activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--color-chart-surface)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
