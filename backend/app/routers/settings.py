from fastapi import APIRouter

from app.schemas.settings import SettingsResponse
from app.data.settings import SETTINGS

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("", response_model=SettingsResponse)
def get_settings() -> SettingsResponse:
    return SETTINGS


@router.put("", response_model=SettingsResponse)
def update_settings(payload: SettingsResponse) -> SettingsResponse:
    SETTINGS["profile"] = payload.profile.model_dump()
    SETTINGS["notifications"] = payload.notifications.model_dump()
    SETTINGS["platform"] = payload.platform.model_dump()
    return SETTINGS
