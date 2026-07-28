from typing import Optional

from fastapi import APIRouter

from app.schemas.guardrail import Guardrail
from app.data.reference import GUARDRAILS

router = APIRouter(prefix="/guardrails", tags=["Guard Rails"])


@router.get("", response_model=list[Guardrail])
def list_guardrails(
    category: Optional[str] = None,
    status: Optional[str] = None,
    country: Optional[str] = None,
) -> list[Guardrail]:
    items = GUARDRAILS
    if category:
        items = [g for g in items if g["category"] == category]
    if status:
        items = [g for g in items if g["status"] == status]
    if country:
        items = [g for g in items if country in g["countries"]]
    return items
