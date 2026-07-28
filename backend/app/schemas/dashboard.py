from pydantic import BaseModel
from app.schemas.common import ChartPoint, NamedCount


class DashboardStats(BaseModel):
    totalCustomers: int
    segments: int
    countries: int
    aiRecommendations: int
    activeAgents: int
    guardrailViolations: int
    businessRules: int
    recommendationSuccessRate: float
    customerSatisfaction: float


class CountryMapPoint(BaseModel):
    code: str
    name: str
    lat: float
    lng: float
    customers: int


class HeatMapCell(BaseModel):
    day: str
    hour: int
    value: int


class DashboardCharts(BaseModel):
    segmentPie: list[ChartPoint]
    recommendationsByCountryBar: list[ChartPoint]
    heatMap: list[HeatMapCell]
    countryMap: list[CountryMapPoint]
    topProducts: list[NamedCount]


class DashboardResponse(BaseModel):
    stats: DashboardStats
    charts: DashboardCharts
