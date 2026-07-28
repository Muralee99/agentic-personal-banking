from typing import Literal
from pydantic import BaseModel


class Skill(BaseModel):
    id: str
    name: str
    description: str
    country: str
    version: str
    status: Literal["Active", "Beta", "Deprecated"]
    supportedAgents: list[str]
    usageCount: int
