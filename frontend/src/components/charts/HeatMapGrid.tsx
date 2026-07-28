import { Fragment, useMemo, useState } from "react"
import { SEQUENTIAL_BLUE } from "@/config/chartTheme"
import type { HeatMapCell } from "@/types"

export function HeatMapGrid({ data }: { data: HeatMapCell[] }) {
  const days = useMemo(() => Array.from(new Set(data.map((d) => d.day))), [data])
  const hours = useMemo(() => Array.from(new Set(data.map((d) => d.hour))).sort((a, b) => a - b), [data])
  const max = useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data])
  const [hovered, setHovered] = useState<HeatMapCell | null>(null)

  const cellColor = (value: number) => {
    const step = Math.min(SEQUENTIAL_BLUE.length - 1, Math.floor((value / max) * (SEQUENTIAL_BLUE.length - 1)))
    return SEQUENTIAL_BLUE[step]
  }

  return (
    <div className="relative">
      <div className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${hours.length}, 1fr)` }}>
        <div />
        {hours.map((h) => (
          <div key={h} className="text-center text-[10px] text-muted-foreground">
            {h}h
          </div>
        ))}
        {days.map((day) => (
          <Fragment key={day}>
            <div className="flex items-center text-[11px] font-medium text-muted-foreground">{day}</div>
            {hours.map((hour) => {
              const cell = data.find((d) => d.day === day && d.hour === hour)
              return (
                <button
                  key={`${day}-${hour}`}
                  onMouseEnter={() => setHovered(cell ?? null)}
                  onMouseLeave={() => setHovered(null)}
                  className="aspect-square w-full rounded-sm ring-1 ring-inset ring-black/5 transition-transform hover:scale-110 dark:ring-white/5"
                  style={{ background: cellColor(cell?.value ?? 0) }}
                  aria-label={`${day} ${hour}:00 — ${cell?.value ?? 0} events`}
                />
              )
            })}
          </Fragment>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{hovered ? `${hovered.day}, ${hovered.hour}:00 — ${hovered.value} events` : "Hover a cell for detail"}</span>
        <div className="flex items-center gap-1">
          <span>Low</span>
          {SEQUENTIAL_BLUE.map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
          ))}
          <span>High</span>
        </div>
      </div>
    </div>
  )
}
