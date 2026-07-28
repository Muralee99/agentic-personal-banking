from typing import Optional

from fastapi import APIRouter

from app.schemas.governance import GovernancePolicy
from app.data.reference import GOVERNANCE_POLICIES

router = APIRouter(prefix="/governance", tags=["Governance"])


@router.get("", response_model=list[GovernancePolicy])
def list_governance_policies(
    country: Optional[str] = None,
    enabled: Optional[bool] = None,
    riskLevel: Optional[str] = None,
) -> list[GovernancePolicy]:
    items = GOVERNANCE_POLICIES
    if country:
        items = [p for p in items if p["country"] == country]
    if enabled is not None:
        items = [p for p in items if p["enabled"] == enabled]
    if riskLevel:
        items = [p for p in items if p["riskLevel"] == riskLevel]
    return items
