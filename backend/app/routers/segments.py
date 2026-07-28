from fastapi import APIRouter, HTTPException

from app.schemas.segment import Segment
from app.data.segments import SEGMENTS_FULL, SEGMENTS_BY_ID

router = APIRouter(prefix="/segments", tags=["Segmentation"])


@router.get("", response_model=list[Segment])
def list_segments() -> list[Segment]:
    return SEGMENTS_FULL


@router.get("/{segment_id}", response_model=Segment)
def get_segment(segment_id: str) -> Segment:
    segment = SEGMENTS_BY_ID.get(segment_id)
    if not segment:
        raise HTTPException(status_code=404, detail="Segment not found")
    return segment
