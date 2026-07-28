from pydantic import BaseModel


class UserProfile(BaseModel):
    name: str
    email: str
    role: str
    avatarSeed: str


class NotificationPrefs(BaseModel):
    emailAlerts: bool
    guardrailViolationAlerts: bool
    weeklyDigest: bool
    recommendationAlerts: bool


class PlatformConfig(BaseModel):
    defaultCountry: str
    defaultLanguage: str
    theme: str
    autoApproveLowRisk: bool
    supervisorPollingIntervalSec: int


class SettingsResponse(BaseModel):
    profile: UserProfile
    notifications: NotificationPrefs
    platform: PlatformConfig
