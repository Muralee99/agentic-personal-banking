import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline"
import { ThemeToggle } from "./ThemeToggle"
import { InitialsAvatar } from "@/components/common/InitialsAvatar"
import { Input } from "@/components/ui/input"
import { useSettings } from "@/hooks/useSettings"

export function Topbar() {
  const { data: settings } = useSettings()

  return (
    <header className="glass sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b px-4 sm:px-6">
      <div className="relative w-full max-w-sm">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search customers, agents, rules…" className="pl-9" />
      </div>
      <div className="flex items-center gap-2">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>
        <ThemeToggle />
        <div className="ml-1 flex items-center gap-2 border-l pl-3">
          <InitialsAvatar seed={settings?.profile.avatarSeed ?? "User"} name={settings?.profile.name ?? "User"} className="h-8 w-8" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-foreground">{settings?.profile.name ?? "Loading…"}</p>
            <p className="text-xs leading-tight text-muted-foreground">{settings?.profile.role ?? ""}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
