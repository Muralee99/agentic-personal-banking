from typing import Literal
from pydantic import BaseModel


class RuleCondition(BaseModel):
    field: str
    operator: str
    value: str
    logicalOp: Literal["AND", "OR", None] = None


class BusinessRule(BaseModel):
    id: str
    name: str
    conditions: list[RuleCondition]
    action: str
    priority: int
    status: Literal["Active", "Inactive", "Draft"]
    executionCount: int
    country: str
    segment: str
    createdAt: str
