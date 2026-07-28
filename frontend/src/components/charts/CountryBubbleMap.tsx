import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts"
import type { CountryMapPoint } from "@/types"

export function CountryBubbleMap({ data, height = 280 }: { data: CountryMapPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <XAxis type="number" dataKey="lng" domain={[-180, 180]} hide />
        <YAxis type="number" dataKey="lat" domain={[-60, 80]} hide />
        <ZAxis type="number" dataKey="customers" range={[400, 2400]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const p = payload[0].payload as CountryMapPoint
            return (
              <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
                <p className="font-semibold text-popover-foreground">{p.name}</p>
                <p className="text-muted-foreground">{p.customers} customers</p>
              </div>
            )
          }}
        />
        <Scatter data={data} fill="var(--color-chart-1)" fillOpacity={0.75} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
