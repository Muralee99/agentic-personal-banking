from pydantic import BaseModel
from app.schemas.common import ChartPoint, SeriesPoint, NamedCount


class AgentPerformance(BaseModel):
    agent: str
    executions: int
    successRate: float
    avgConfidence: float


class AnalyticsResponse(BaseModel):
    recommendationsOverTime: list[SeriesPoint]
    segmentDistribution: list[ChartPoint]
    countryDistribution: list[ChartPoint]
    businessRuleUsage: list[NamedCount]
    guardrailViolations: list[NamedCount]
    topAgents: list[AgentPerformance]
