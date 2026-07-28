import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { CATEGORICAL_COLORS, chartTooltipStyle } from "@/config/chartTheme"
import type { ChartPoint } from "@/types"

export function DonutChart({ data, height = 260 }: { data: ChartPoint[]; height?: number }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius="60%"
          outerRadius="85%"
          paddingAngle={2}
          cornerRadius={4}
          strokeWidth={2}
          stroke="var(--color-chart-surface)"
        >
          {data.map((entry, i) => (
            <Cell key={entry.label} fill={CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          {...chartTooltipStyle}
          formatter={(value, name) => {
            const numeric = Number(value ?? 0)
            const pct = total ? Math.round((numeric / total) * 100) : 0
            return [`${numeric} (${pct}%)`, name]
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: "var(--color-muted-foreground)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
