import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const TONE_MAP: Record<string, string> = {
  // positive / active
  Active: "bg-success/15 text-success border-success/30",
  Enabled: "bg-success/15 text-success border-success/30",
  Accepted: "bg-success/15 text-success border-success/30",
  Verified: "bg-success/15 text-success border-success/30",
  Completed: "bg-success/15 text-success border-success/30",
  Low: "bg-success/15 text-success border-success/30",
  // neutral / pending
  Pending: "bg-warning/15 text-warning border-warning/30",
  Idle: "bg-warning/15 text-warning border-warning/30",
  Beta: "bg-warning/15 text-warning border-warning/30",
  Draft: "bg-warning/15 text-warning border-warning/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  // negative / disabled
  Inactive: "bg-muted text-muted-foreground border-border",
  Disabled: "bg-muted text-muted-foreground border-border",
  Dormant: "bg-muted text-muted-foreground border-border",
  Rejected: "bg-destructive/15 text-destructive border-destructive/30",
  Error: "bg-destructive/15 text-destructive border-destructive/30",
  Deprecated: "bg-destructive/15 text-destructive border-destructive/30",
  High: "bg-destructive/15 text-destructive border-destructive/30",
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium", TONE_MAP[status] ?? "bg-secondary text-secondary-foreground", className)}>
      {status}
    </Badge>
  )
}
