import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, UsersIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { InitialsAvatar } from "@/components/common/InitialsAvatar"
import { EmptyState } from "@/components/common/EmptyState"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { useCustomers } from "@/hooks/useCustomers"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

const SEGMENTS = ["Student", "Young Professional", "Family", "Business", "Retired", "High Net Worth"]
const COUNTRIES = ["India", "USA", "UK", "Singapore", "Australia"]
const STATUSES = ["Active", "Inactive", "Dormant"]
const PAGE_SIZE = 10

const ALL = "__all__"

function ScoreBar({ value, tone }: { value: number; tone: "risk" | "health" }) {
  const color = tone === "risk"
    ? value >= 70 ? "bg-destructive" : value >= 40 ? "bg-warning" : "bg-success"
    : value >= 70 ? "bg-success" : value >= 40 ? "bg-warning" : "bg-destructive"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground">{value}</span>
    </div>
  )
}

export function CustomersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [segment, setSegment] = useState(ALL)
  const [country, setCountry] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebouncedValue(search, 300)

  const params = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      segment: segment === ALL ? undefined : segment,
      country: country === ALL ? undefined : country,
      status: status === ALL ? undefined : status,
      page,
      pageSize: PAGE_SIZE,
    }),
    [debouncedSearch, segment, country, status, page],
  )

  const { data, isLoading, isFetching } = useCustomers(params)
  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1

  function resetToFirstPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v)
      setPage(1)
    }
  }

  return (
    <div>
      <PageHeader
        title="Customer Management"
        description={data ? `${data.total.toLocaleString()} customers across all segments and markets` : "Loading customers…"}
      />

      <div className="glass-card mb-4 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or ID…"
            className="pl-9"
            value={search}
            onChange={(e) => resetToFirstPage(setSearch)(e.target.value)}
          />
        </div>
        <Select value={segment} onValueChange={resetToFirstPage(setSegment)}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Segment" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Segments</SelectItem>
            {SEGMENTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={country} onValueChange={resetToFirstPage(setCountry)}>
          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Countries</SelectItem>
            {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={resetToFirstPage(setStatus)}>
          <SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden rounded-xl">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={UsersIcon} title="No customers match these filters" description="Try adjusting search or filter criteria." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>KYC</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Financial Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={isFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
              {data.items.map((c) => (
                <TableRow key={c.id} className="cursor-pointer" onClick={() => navigate(`/customers/${c.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <InitialsAvatar seed={c.avatarSeed} name={c.name} className="h-8 w-8" />
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{c.segment}</TableCell>
                  <TableCell>{c.country}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell><StatusBadge status={c.kycStatus} /></TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {c.accountBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell><ScoreBar value={c.riskScore} tone="risk" /></TableCell>
                  <TableCell><ScoreBar value={c.financialHealthScore} tone="health" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {data && data.total > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {data.page} of {totalPages} · {data.total.toLocaleString()} customers
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
