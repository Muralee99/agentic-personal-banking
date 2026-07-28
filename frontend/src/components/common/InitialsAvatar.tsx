import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-fuchsia-500 to-indigo-600",
]

function hashSeed(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return hash
}

export function InitialsAvatar({ seed, name, className }: { seed: string; name: string; className?: string }) {
  const gradient = GRADIENTS[hashSeed(seed) % GRADIENTS.length]
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <Avatar className={className}>
      <AvatarFallback className={cn("bg-gradient-to-br text-white font-medium", gradient)}>{initials}</AvatarFallback>
    </Avatar>
  )
}
