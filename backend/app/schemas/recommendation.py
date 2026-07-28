from typing import Literal
from pydantic import BaseModel

RecommendationStatus = Literal["Pending", "Accepted", "Rejected"]


class Recommendation(BaseModel):
    id: str
    customerId: str
    customerName: str
    product: str
    priority: Literal["High", "Medium", "Low"]
    reason: str
    triggeredAgent: str
    segment: str
    country: str
    status: RecommendationStatus
    generatedAt: str


class RecommendationListResponse(BaseModel):
    items: list[Recommendation]
    total: int
