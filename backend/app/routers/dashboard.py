from fastapi import APIRouter

from app.schemas.dashboard import DashboardResponse
from app.data.dashboard import get_dashboard_response

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("", response_model=DashboardResponse)
def read_dashboard() -> DashboardResponse:
    return get_dashboard_response()
