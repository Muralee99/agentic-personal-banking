from typing import Optional

from fastapi import APIRouter

from app.schemas.business_rule import BusinessRule
from app.data.reference import BUSINESS_RULES

router = APIRouter(prefix="/business-rules", tags=["Business Rules"])


@router.get("", response_model=list[BusinessRule])
def list_business_rules(
    country: Optional[str] = None,
    segment: Optional[str] = None,
    status: Optional[str] = None,
) -> list[BusinessRule]:
    items = BUSINESS_RULES
    if country:
        items = [r for r in items if r["country"] == country]
    if segment:
        items = [r for r in items if r["segment"] == segment]
    if status:
        items = [r for r in items if r["status"] == status]
    return items
