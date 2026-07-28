import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { chartAxisProps, chartGridProps, chartTooltipStyle } from "@/config/chartTheme"

interface RankedBarChartProps {
  data: { label: string; value: number }[]
  height?: number
  layout?: "horizontal" | "vertical"
  color?: string
}

export function RankedBarChart({ data, height = 260, layout = "vertical", color = "var(--color-chart-1)" }: RankedBarChartProps) {
  const isVertical = layout === "vertical"
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={isVertical ? "vertical" : "horizontal"}
        margin={{ top: 4, right: 12, left: isVertical ? 0 : -16, bottom: 0 }}
      >
        <CartesianGrid {...chartGridProps} horizontal={!isVertical} vertical={isVertical} />
        {isVertical ? (
          <>
            <XAxis type="number" {...chartAxisProps} />
            <YAxis type="category" dataKey="label" width={110} {...chartAxisProps} />
          </>
        ) : (
          <>
            <XAxis type="category" dataKey="label" {...chartAxisProps} />
            <YAxis type="number" {...chartAxisProps} />
          </>
        )}
        <Tooltip {...chartTooltipStyle} cursor={{ fill: "var(--color-accent)", opacity: 0.4 }} />
        <Bar dataKey="value" fill={color} radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  )
}
