import { SparklesIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "./PageHeader"
import { EmptyState } from "./EmptyState"

export function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <PageHeader title={title} description="This module is under active construction." />
      <EmptyState icon={SparklesIcon} title="Coming online shortly" description="This screen is being wired up to the API." />
    </div>
  )
}
