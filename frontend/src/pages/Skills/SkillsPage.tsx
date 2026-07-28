import { motion } from "framer-motion"
import { GlobeAltIcon, TagIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useSkills } from "@/hooks/useSkills"
import { resolveSkillIcon } from "@/config/skillIcons"

export function SkillsPage() {
  const { data: skills, isLoading } = useSkills()

  return (
    <div>
      <PageHeader title="Skills" description="Modular capabilities that agents compose to reason about customer needs" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)
          : skills?.map((skill, i) => {
              const Icon = resolveSkillIcon(skill.name)
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-3 text-white shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <StatusBadge status={skill.status} />
                  </div>
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{skill.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><GlobeAltIcon className="h-3.5 w-3.5" /> {skill.country}</span>
                    <span className="flex items-center gap-1"><TagIcon className="h-3.5 w-3.5" /> {skill.version}</span>
                  </div>
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Supported Agents</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.supportedAgents.map((a) => <Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>)}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{skill.usageCount.toLocaleString()} invocations (30d)</p>
                </motion.div>
              )
            })}
      </div>
    </div>
  )
}
