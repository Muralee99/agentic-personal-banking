export interface UserProfile {
  name: string
  email: string
  role: string
  avatarSeed: string
}

export interface NotificationPrefs {
  emailAlerts: boolean
  guardrailViolationAlerts: boolean
  weeklyDigest: boolean
  recommendationAlerts: boolean
}

export interface PlatformConfig {
  defaultCountry: string
  defaultLanguage: string
  theme: string
  autoApproveLowRisk: boolean
  supervisorPollingIntervalSec: number
}

export interface SettingsResponse {
  profile: UserProfile
  notifications: NotificationPrefs
  platform: PlatformConfig
}
