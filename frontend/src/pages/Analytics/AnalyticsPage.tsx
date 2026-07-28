import { PageHeader } from "@/components/common/PageHeader"
import { ChartCard } from "@/components/charts/ChartCard"
import { DonutChart } from "@/components/charts/DonutChart"
import { RankedBarChart } from "@/components/charts/RankedBarChart"
import { AreaTrendChart } from "@/components/charts/AreaTrendChart"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAnalytics } from "@/hooks/useAnalytics"

export function AnalyticsPage() {
  const { data, isLoading } = useAnalytics()

  if (isLoading || !data) {
    return (
      <div>
        <PageHeader title="Analytics" description="Platform-wide performance across recommendations, segments and agents" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Analytics" description="Platform-wide performance across recommendations, segments and agents" />

      <ChartCard title="Recommendations Over Time" subtitle="Last 30 days" className="mb-4">
        <AreaTrendChart data={data.recommendationsOverTime} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Segment Distribution" subtitle="Recommendations by behavioural segment">
          <DonutChart data={data.segmentDistribution} />
        </ChartCard>
        <ChartCard title="Country Distribution" subtitle="Recommendations by market">
          <DonutChart data={data.countryDistribution} />
        </ChartCard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Business Rule Usage" subtitle="Execution count per rule">
          <RankedBarChart
            data={data.businessRuleUsage.slice(0, 8).map((r) => ({ label: r.name, value: r.count }))}
            color="var(--color-chart-1)"
          />
        </ChartCard>
        <ChartCard title="Guardrail Violations" subtitle="By category (30 days)">
          <RankedBarChart
            data={data.guardrailViolations.map((g) => ({ label: g.name, value: g.count }))}
            color="var(--color-chart-8)"
          />
        </ChartCard>
      </div>

      <ChartCard title="Top AI Agents" subtitle="Ranked by execution volume" className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead className="text-right">Executions</TableHead>
              <TableHead className="text-right">Success Rate</TableHead>
              <TableHead className="text-right">Avg. Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.topAgents.map((agent) => (
              <TableRow key={agent.agent}>
                <TableCell className="font-medium text-foreground">{agent.agent}</TableCell>
                <TableCell className="text-right tabular-nums">{agent.executions.toLocaleString()}</TableCell>
                <TableCell className="text-right tabular-nums">{agent.successRate}%</TableCell>
                <TableCell className="text-right tabular-nums">{Math.round(agent.avgConfidence * 100)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  )
}
