from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.schemas.recommendation import Recommendation, RecommendationListResponse
from app.data.recommendations import RECOMMENDATIONS, RECOMMENDATIONS_BY_ID

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


@router.get("", response_model=RecommendationListResponse)
def list_recommendations(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    segment: Optional[str] = None,
    country: Optional[str] = None,
    triggeredAgent: Optional[str] = None,
    page: int = Query(1, ge=1),
    pageSize: int = Query(20, ge=1, le=200),
) -> RecommendationListResponse:
    items = RECOMMENDATIONS
    if status:
        items = [r for r in items if r["status"] == status]
    if priority:
        items = [r for r in items if r["priority"] == priority]
    if segment:
        items = [r for r in items if r["segment"] == segment]
    if country:
        items = [r for r in items if r["country"] == country]
    if triggeredAgent:
        items = [r for r in items if r["triggeredAgent"] == triggeredAgent]

    total = len(items)
    start = (page - 1) * pageSize
    return {"items": items[start: start + pageSize], "total": total}


@router.post("/{recommendation_id}/accept", response_model=Recommendation)
def accept_recommendation(recommendation_id: str) -> Recommendation:
    reco = RECOMMENDATIONS_BY_ID.get(recommendation_id)
    if not reco:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    reco["status"] = "Accepted"
    return reco


@router.post("/{recommendation_id}/reject", response_model=Recommendation)
def reject_recommendation(recommendation_id: str) -> Recommendation:
    reco = RECOMMENDATIONS_BY_ID.get(recommendation_id)
    if not reco:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    reco["status"] = "Rejected"
    return reco
