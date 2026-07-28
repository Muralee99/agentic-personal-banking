import {
  UsersIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  LightBulbIcon,
  CpuChipIcon,
  ShieldExclamationIcon,
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatCard } from "@/components/common/StatCard"
import { ChartCard } from "@/components/charts/ChartCard"
import { DonutChart } from "@/components/charts/DonutChart"
import { RankedBarChart } from "@/components/charts/RankedBarChart"
import { HeatMapGrid } from "@/components/charts/HeatMapGrid"
import { CountryBubbleMap } from "@/components/charts/CountryBubbleMap"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboard } from "@/hooks/useDashboard"

export function DashboardPage() {
  const { data, isLoading } = useDashboard()

  if (isLoading || !data) {
    return (
      <div>
        <PageHeader title="Dashboard" description="Real-time view of the agentic banking platform" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const { stats, charts } = data

  const statCards = [
    { label: "Total Customers", value: stats.totalCustomers.toLocaleString(), icon: UsersIcon, gradient: "from-sky-500 to-blue-600" },
    { label: "Segments", value: stats.segments, icon: Squares2X2Icon, gradient: "from-violet-500 to-purple-600" },
    { label: "Countries", value: stats.countries, icon: GlobeAltIcon, gradient: "from-emerald-500 to-teal-600" },
    { label: "AI Recommendations", value: stats.aiRecommendations.toLocaleString(), icon: LightBulbIcon, gradient: "from-amber-500 to-orange-600" },
    { label: "Active Agents", value: stats.activeAgents, icon: CpuChipIcon, gradient: "from-fuchsia-500 to-indigo-600" },
    { label: "Guardrail Violations", value: stats.guardrailViolations, icon: ShieldExclamationIcon, gradient: "from-rose-500 to-pink-600" },
    { label: "Business Rules", value: stats.businessRules, icon: AdjustmentsHorizontalIcon, gradient: "from-cyan-500 to-sky-600" },
    { label: "Recommendation Success", value: `${stats.recommendationSuccessRate}%`, icon: CheckBadgeIcon, gradient: "from-lime-500 to-emerald-600" },
    { label: "Customer Satisfaction", value: `${stats.customerSatisfaction}%`, icon: FaceSmileIcon, gradient: "from-orange-500 to-amber-600" },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" description="Real-time view of the agentic banking platform" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} index={i} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Segment Distribution" subtitle="Customers by behavioural segment">
          <DonutChart data={charts.segmentPie} />
        </ChartCard>
        <ChartCard title="Recommendations by Country" subtitle="AI-generated recommendations per market">
          <RankedBarChart data={charts.recommendationsByCountryBar} color="var(--color-chart-1)" />
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Activity Heat Map" subtitle="Customer engagement by day &amp; hour">
          <HeatMapGrid data={charts.heatMap} />
        </ChartCard>
        <ChartCard title="Customer Distribution" subtitle="Customers by country (bubble size = volume)">
          <CountryBubbleMap data={charts.countryMap} />
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <ChartCard title="Top Recommended Products" subtitle="Most frequently recommended products across all agents">
          <RankedBarChart
            data={charts.topProducts.map((p) => ({ label: p.name, value: p.count }))}
            color="var(--color-chart-2)"
            height={280}
          />
        </ChartCard>
      </div>
    </div>
  )
}
