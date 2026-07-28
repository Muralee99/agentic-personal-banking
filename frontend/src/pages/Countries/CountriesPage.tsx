import { useState } from "react"
import { motion } from "framer-motion"
import {
  LanguageIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  AdjustmentsHorizontalIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useCountries } from "@/hooks/useCountries"
import { cn } from "@/lib/utils"

function Section({ icon: Icon, title, items, tone = "secondary" }: {
  icon: typeof LanguageIcon
  title: string
  items: string[]
  tone?: "secondary" | "outline" | "primary"
}) {
  return (
    <div className="glass-card rounded-xl p-4">
      <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <Icon className="h-4 w-4" /> {title}
        <span className="ml-auto rounded-full bg-muted px-1.5 text-[10px] font-normal text-muted-foreground">{items.length}</span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge
            key={item}
            variant={tone === "primary" ? undefined : (tone as "secondary" | "outline")}
            className={tone === "primary" ? "bg-primary/15 text-primary hover:bg-primary/20" : undefined}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function CountriesPage() {
  const { data: countries, isLoading } = useCountries()
  const [selectedCode, setSelectedCode] = useState<string | undefined>(undefined)
  const active = countries?.find((c) => c.code === selectedCode) ?? countries?.[0]

  return (
    <div>
      <PageHeader title="Country Configuration" description="Per-market controls for skills, agents, governance and products" />

      {isLoading || !active || !countries ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
            {countries.map((country, i) => (
              <motion.button
                key={country.code}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCode(country.code)}
                className={cn(
                  "glass-card flex min-w-[220px] shrink-0 items-center gap-3 rounded-xl p-4 text-left transition-shadow hover:shadow-lg lg:min-w-0",
                  active.code === country.code && "ring-2 ring-primary",
                )}
              >
                <span className="text-3xl leading-none">{country.flag}</span>
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{country.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <UsersIcon className="h-3 w-3" /> {country.customersCount} customers
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={active.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl leading-none">{active.flag}</span>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{active.name}</h2>
                  <p className="text-sm text-muted-foreground">{active.customersCount} customers on this market</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs">
                  <LanguageIcon className="h-3.5 w-3.5" /> {active.languages.join(", ")}
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs">
                  <BanknotesIcon className="h-3.5 w-3.5" /> {active.currencies.join(", ")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Section icon={WrenchScrewdriverIcon} title="Enabled Skills" items={active.enabledSkills} tone="primary" />
              <Section icon={CpuChipIcon} title="Enabled Agents" items={active.enabledAgents} tone="secondary" />
              <Section icon={AdjustmentsHorizontalIcon} title="Business Rules" items={active.businessRules} tone="outline" />
              <Section icon={LockClosedIcon} title="Guardrails" items={active.guardrails} tone="outline" />
              <Section icon={ShieldCheckIcon} title="Governance Policies" items={active.governancePolicies} tone="outline" />
              <Section icon={CubeIcon} title="Products" items={active.products} tone="secondary" />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
