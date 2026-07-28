from typing import Literal
from pydantic import BaseModel

GuardrailCategory = Literal[
    "Prompt Validation",
    "PII Detection",
    "Compliance",
    "Risk Rules",
    "Fraud Rules",
    "Product Eligibility",
    "Investment Restrictions",
    "Human Approval",
]


class Guardrail(BaseModel):
    id: str
    category: GuardrailCategory
    name: str
    description: str
    status: Literal["Enabled", "Disabled"]
    severity: Literal["Low", "Medium", "High", "Critical"]
    violationsCount: int
    countries: list[str]
