from fastapi import APIRouter

from app.schemas.analytics import AnalyticsResponse
from app.data.analytics import get_analytics_response

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("", response_model=AnalyticsResponse)
def read_analytics() -> AnalyticsResponse:
    return get_analytics_response()
