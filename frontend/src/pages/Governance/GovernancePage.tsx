import { useState } from "react"
import { ShieldCheckIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { EmptyState } from "@/components/common/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGovernancePolicies } from "@/hooks/useGovernance"

const COUNTRIES = ["India", "USA", "UK", "Singapore", "Australia"]
const RISK_LEVELS = ["Low", "Medium", "High", "Critical"]
const ALL = "__all__"

function BoolIcon({ value }: { value: boolean }) {
  return value ? <CheckCircleIcon className="h-4 w-4 text-success" /> : <XCircleIcon className="h-4 w-4 text-muted-foreground" />
}

export function GovernancePage() {
  const [country, setCountry] = useState(ALL)
  const [riskLevel, setRiskLevel] = useState(ALL)
  const [enabled, setEnabled] = useState(ALL)

  const { data: policies, isLoading } = useGovernancePolicies({
    country: country === ALL ? undefined : country,
    riskLevel: riskLevel === ALL ? undefined : riskLevel,
    enabled: enabled === ALL ? undefined : enabled === "enabled",
  })

  return (
    <div>
      <PageHeader title="Governance" description="Regulatory and compliance policies governing AI agent behaviour per market" />

      <div className="glass-card mb-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center">
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Countries</SelectItem>
            {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={riskLevel} onValueChange={setRiskLevel}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Risk Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Risk Levels</SelectItem>
            {RISK_LEVELS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={enabled} onValueChange={setEnabled}>
          <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Statuses</SelectItem>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : !policies || policies.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={ShieldCheckIcon} title="No policies match these filters" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approval Required</TableHead>
                  <TableHead>Human Review</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="text-right">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="max-w-xs truncate text-xs text-muted-foreground">{p.description}</p>
                    </TableCell>
                    <TableCell>{p.country}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.category}</TableCell>
                    <TableCell><StatusBadge status={p.enabled ? "Enabled" : "Disabled"} /></TableCell>
                    <TableCell><BoolIcon value={p.approvalRequired} /></TableCell>
                    <TableCell><BoolIcon value={p.humanReview} /></TableCell>
                    <TableCell><StatusBadge status={p.riskLevel} /></TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{p.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
