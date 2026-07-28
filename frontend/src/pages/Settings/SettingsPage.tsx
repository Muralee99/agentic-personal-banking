import { useEffect, useState } from "react"
import { toast } from "sonner"
import { UserCircleIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { InitialsAvatar } from "@/components/common/InitialsAvatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSettings, useUpdateSettings } from "@/hooks/useSettings"
import { useThemeStore } from "@/store/themeStore"
import type { SettingsResponse } from "@/types"

const COUNTRIES = ["India", "USA", "UK", "Singapore", "Australia"]
const LANGUAGES = ["English", "Hindi", "Mandarin", "Malay", "Spanish"]

export function SettingsPage() {
  const { data, isLoading } = useSettings()
  const updateSettings = useUpdateSettings()
  const { setTheme } = useThemeStore()
  const [form, setForm] = useState<SettingsResponse | null>(null)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  if (isLoading || !form) {
    return (
      <div>
        <PageHeader title="Settings" description="Profile, notifications and platform configuration" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
        </div>
      </div>
    )
  }

  function handleSave() {
    if (!form) return
    updateSettings.mutate(form, {
      onSuccess: () => toast.success("Settings saved"),
      onError: () => toast.error("Failed to save settings"),
    })
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Profile, notifications and platform configuration"
        actions={<Button onClick={handleSave} disabled={updateSettings.isPending}>{updateSettings.isPending ? "Saving…" : "Save Changes"}</Button>}
      />

      <div className="space-y-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <UserCircleIcon className="h-4.5 w-4.5" /> Profile
          </h3>
          <div className="flex items-center gap-4">
            <InitialsAvatar seed={form.profile.avatarSeed} name={form.profile.name} className="h-16 w-16 text-lg" />
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 text-xs text-muted-foreground">Name</Label>
                <Input value={form.profile.name} onChange={(e) => setForm({ ...form, profile: { ...form.profile, name: e.target.value } })} />
              </div>
              <div>
                <Label className="mb-1.5 text-xs text-muted-foreground">Email</Label>
                <Input value={form.profile.email} onChange={(e) => setForm({ ...form, profile: { ...form.profile, email: e.target.value } })} />
              </div>
              <div>
                <Label className="mb-1.5 text-xs text-muted-foreground">Role</Label>
                <Input value={form.profile.role} disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <BellIcon className="h-4.5 w-4.5" /> Notifications
          </h3>
          <div className="space-y-4">
            {[
              { key: "emailAlerts" as const, label: "Email alerts", description: "Receive email notifications for critical platform events" },
              { key: "guardrailViolationAlerts" as const, label: "Guardrail violation alerts", description: "Notify when a guardrail is triggered" },
              { key: "weeklyDigest" as const, label: "Weekly digest", description: "Summary of recommendations and agent performance" },
              { key: "recommendationAlerts" as const, label: "New recommendation alerts", description: "Notify when AI agents generate a new recommendation" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={form.notifications[item.key]}
                  onCheckedChange={(checked) => setForm({ ...form, notifications: { ...form.notifications, [item.key]: checked } })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Cog6ToothIcon className="h-4.5 w-4.5" /> Platform Configuration
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 text-xs text-muted-foreground">Default Country</Label>
              <Select
                value={form.platform.defaultCountry}
                onValueChange={(v) => setForm({ ...form, platform: { ...form.platform, defaultCountry: v } })}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 text-xs text-muted-foreground">Default Language</Label>
              <Select
                value={form.platform.defaultLanguage}
                onValueChange={(v) => setForm({ ...form, platform: { ...form.platform, defaultLanguage: v } })}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>{LANGUAGES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 text-xs text-muted-foreground">Theme</Label>
              <Select
                value={form.platform.theme}
                onValueChange={(v) => {
                  setForm({ ...form, platform: { ...form.platform, theme: v } })
                  if (v === "light" || v === "dark") setTheme(v)
                }}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 text-xs text-muted-foreground">Supervisor Polling Interval (seconds)</Label>
              <Input
                type="number"
                min={1}
                max={60}
                value={form.platform.supervisorPollingIntervalSec}
                onChange={(e) =>
                  setForm({ ...form, platform: { ...form.platform, supervisorPollingIntervalSec: Number(e.target.value) } })
                }
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-approve low risk recommendations</p>
              <p className="text-xs text-muted-foreground">Skip human review for recommendations below the risk threshold</p>
            </div>
            <Switch
              checked={form.platform.autoApproveLowRisk}
              onCheckedChange={(checked) => setForm({ ...form, platform: { ...form.platform, autoApproveLowRisk: checked } })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
