from pydantic import BaseModel


class CountryConfig(BaseModel):
    code: str
    name: str
    flag: str
    customersCount: int
    enabledSkills: list[str]
    enabledAgents: list[str]
    languages: list[str]
    currencies: list[str]
    businessRules: list[str]
    guardrails: list[str]
    governancePolicies: list[str]
    products: list[str]
