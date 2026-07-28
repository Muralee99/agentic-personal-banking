from pydantic import BaseModel


class SegmentRule(BaseModel):
    field: str
    operator: str
    value: str


class Segment(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    color: str
    customersCount: int
    rules: list[SegmentRule]
    enabledSkills: list[str]
    recommendedProducts: list[str]
    activatedAgents: list[str]
