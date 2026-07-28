from typing import Literal
from pydantic import BaseModel

RiskLevel = Literal["Low", "Medium", "High", "Critical"]


class GovernancePolicy(BaseModel):
    id: str
    name: str
    country: str
    category: str
    enabled: bool
    approvalRequired: bool
    humanReview: bool
    riskLevel: RiskLevel
    description: str
    lastUpdated: str
