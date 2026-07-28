from typing import Optional

from fastapi import APIRouter

from app.schemas.skill import Skill
from app.data.reference import SKILLS

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("", response_model=list[Skill])
def list_skills(country: Optional[str] = None, status: Optional[str] = None) -> list[Skill]:
    items = SKILLS
    if country:
        items = [s for s in items if s["country"] in (country, "Global")]
    if status:
        items = [s for s in items if s["status"] == status]
    return items
