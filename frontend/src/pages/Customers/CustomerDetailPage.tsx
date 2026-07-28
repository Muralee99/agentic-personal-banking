import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeftIcon,
  ShieldExclamationIcon,
  HeartIcon,
  BanknotesIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { InitialsAvatar } from "@/components/common/InitialsAvatar"
import { EmptyState } from "@/components/common/EmptyState"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCustomer } from "@/hooks/useCustomers"
import { cn } from "@/lib/utils"

function ScoreGauge({ label, value, icon: Icon, tone }: { label: string; value: number; icon: typeof HeartIcon; tone: "risk" | "health" }) {
  const good = tone === "risk" ? value < 40 : value >= 70
  const warn = tone === "risk" ? value >= 40 && value < 70 : value >= 40 && value < 70
  const color = good ? "text-success" : warn ? "text-warning" : "text-destructive"
  const ring = good ? "stroke-success" : warn ? "stroke-warning" : "stroke-destructive"
  const circumference = 2 * Math.PI * 28
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="glass-card flex items-center gap-4 rounded-xl p-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" strokeWidth="6" className="stroke-muted" />
          <circle
            cx="32" cy="32" r="28" fill="none" strokeWidth="6" strokeLinecap="round"
            className={ring}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">{value}</div>
      </div>
      <div>
        <div className={cn("flex items-center gap-1.5 text-xs font-medium", color)}>
          <Icon className="h-4 w-4" />
          {label}
        </div>
        <p className="text-xs text-muted-foreground">
          {tone === "risk" ? (good ? "Low risk" : warn ? "Moderate risk" : "High risk") : (good ? "Healthy" : warn ? "Fair" : "Needs attention")}
        </p>
      </div>
    </div>
  )
}

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: customer, isLoading } = useCustomer(id)

  if (isLoading || !customer) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-3 -ml-2 text-muted-foreground" onClick={() => navigate("/customers")}>
        <ArrowLeftIcon className="mr-1.5 h-4 w-4" /> Back to customers
      </Button>

      <PageHeader
        title={customer.name}
        description={`${customer.id} · Customer since ${customer.joinDate}`}
        actions={
          <div className="flex gap-2">
            <StatusBadge status={customer.status} />
            <StatusBadge status={customer.kycStatus} />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card flex items-center gap-3 rounded-xl p-4">
          <InitialsAvatar seed={customer.avatarSeed} name={customer.name} className="h-12 w-12" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{customer.email}</p>
            <p className="text-xs text-muted-foreground">{customer.phone}</p>
            <p className="mt-1 text-xs font-medium text-primary">{customer.segment} · {customer.country}</p>
          </div>
        </div>
        <ScoreGauge label="Risk Score" value={customer.riskScore} icon={ShieldExclamationIcon} tone="risk" />
        <ScoreGauge label="Financial Health" value={customer.financialHealthScore} icon={HeartIcon} tone="health" />
        <div className="glass-card flex items-center gap-3 rounded-xl p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <BanknotesIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Account Balance</p>
            <p className="text-lg font-semibold tabular-nums text-foreground">
              {customer.accountBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="journey" className="mt-6">
        <TabsList>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="behaviour">Behaviour Timeline</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="mt-4">
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col gap-0">
              {customer.journey.map((stage, i) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                        stage.status === "completed" && "border-success bg-success/15 text-success",
                        stage.status === "current" && "border-primary bg-primary/15 text-primary animate-pulse",
                        stage.status === "upcoming" && "border-border bg-muted text-muted-foreground",
                      )}
                    >
                      {stage.status === "completed" ? <CheckCircleIcon className="h-5 w-5" /> : <ClockIcon className="h-4 w-4" />}
                    </div>
                    {i < customer.journey.length - 1 && (
                      <div className={cn("my-1 h-10 w-0.5", stage.status === "completed" ? "bg-success" : "bg-border")} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="font-medium text-foreground">{stage.stage}</p>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                    {stage.date && <p className="mt-1 text-xs text-muted-foreground">{stage.date}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-4">
          {customer.aiRecommendations.length === 0 ? (
            <EmptyState icon={ShieldExclamationIcon} title="No recommendations yet" />
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {customer.aiRecommendations.map((r) => (
                <div key={r.id} className="glass-card rounded-xl p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <p className="font-medium text-foreground">{r.product}</p>
                    <StatusBadge status={r.priority} />
                  </div>
                  <p className="text-sm text-muted-foreground">{r.reason}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Triggered by {r.triggeredAgent}</span>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="behaviour" className="mt-4">
          <div className="glass-card rounded-xl p-4">
            <ul className="divide-y divide-border">
              {customer.behaviourTimeline.map((event) => (
                <li key={event.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground">{event.type} · {event.channel}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {event.date.replace("T", " ")}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <div className="glass-card overflow-hidden rounded-xl">
            <ul className="divide-y divide-border">
              {customer.transactionTimeline.map((txn) => (
                <li key={txn.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{txn.description}</p>
                    <p className="text-xs text-muted-foreground">{txn.date.replace("T", " ")}</p>
                  </div>
                  <p className={cn("font-medium tabular-nums", txn.direction === "credit" ? "text-success" : "text-foreground")}>
                    {txn.direction === "credit" ? "+" : "-"}{txn.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
