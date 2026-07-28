from typing import Literal, Optional
from pydantic import BaseModel

Segment = Literal[
    "Student", "Young Professional", "Family", "Business", "Retired", "High Net Worth"
]
Country = Literal["India", "USA", "UK", "Singapore", "Australia"]
CustomerStatus = Literal["Active", "Inactive", "Dormant"]
KycStatus = Literal["Verified", "Pending", "Rejected"]


class BehaviourEvent(BaseModel):
    id: str
    date: str
    type: str
    description: str
    channel: str


class TransactionEvent(BaseModel):
    id: str
    date: str
    description: str
    category: str
    amount: float
    direction: Literal["credit", "debit"]
    merchant: str


class JourneyStage(BaseModel):
    stage: str
    date: str
    status: Literal["completed", "current", "upcoming"]
    description: str


class CustomerRecommendation(BaseModel):
    id: str
    product: str
    priority: Literal["High", "Medium", "Low"]
    reason: str
    triggeredAgent: str
    status: Literal["Pending", "Accepted", "Rejected"]
    generatedAt: str


class CustomerSummary(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    avatarSeed: str
    segment: Segment
    country: Country
    status: CustomerStatus
    kycStatus: KycStatus
    accountBalance: float
    riskScore: int
    financialHealthScore: int
    joinDate: str


class CustomerDetail(CustomerSummary):
    behaviourTimeline: list[BehaviourEvent]
    transactionTimeline: list[TransactionEvent]
    aiRecommendations: list[CustomerRecommendation]
    journey: list[JourneyStage]


class CustomerListResponse(BaseModel):
    items: list[CustomerSummary]
    total: int
    page: int
    pageSize: int
