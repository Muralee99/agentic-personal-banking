// Categorical order is fixed — never cycled or re-sorted by rank.
// Validated CVD-safe (adjacent pairs) per the platform's dataviz palette.
export const CATEGORICAL_COLORS = [
  "var(--color-chart-1)", // blue
  "var(--color-chart-2)", // orange
  "var(--color-chart-3)", // aqua
  "var(--color-chart-4)", // yellow
  "var(--color-chart-5)", // magenta
  "var(--color-chart-6)", // green
  "var(--color-chart-7)", // violet
  "var(--color-chart-8)", // red
]

// Sequential single-hue ramp (blue), light -> dark, for magnitude encodings.
export const SEQUENTIAL_BLUE = [
  "#cde2fb",
  "#9ec5f4",
  "#6da7ec",
  "#3987e5",
  "#2a78d6",
  "#1c5cab",
  "#104281",
]

export const STATUS_COLORS = {
  good: "var(--color-success)",
  warning: "var(--color-warning)",
  serious: "var(--color-serious)",
  critical: "var(--color-destructive)",
}

export const chartGridProps = {
  stroke: "var(--color-chart-gridline)",
  strokeDasharray: "3 3",
}

export const chartAxisProps = {
  stroke: "var(--color-chart-baseline)",
  tick: { fill: "var(--color-chart-ink-muted)", fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: "var(--color-chart-baseline)" },
}

export const chartTooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    fontSize: 12,
    color: "var(--color-popover-foreground)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  labelStyle: { color: "var(--color-popover-foreground)", fontWeight: 600 },
  cursor: { fill: "var(--color-accent)", opacity: 0.4 },
}
