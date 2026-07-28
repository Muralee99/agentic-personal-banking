from app.data.reference import (
    COUNTRIES, SKILLS, AGENT_NAMES, BUSINESS_RULES, GUARDRAILS,
    GOVERNANCE_POLICIES, PRODUCTS,
)
from app.data.customers import CUSTOMERS


def _build_country_configs() -> list[dict]:
    configs = []
    for country in COUNTRIES:
        name = country["name"]
        customers_count = sum(1 for c in CUSTOMERS if c["country"] == name)
        enabled_skills = [s["name"] for s in SKILLS if s["country"] in ("Global", name)]
        business_rules = [r["name"] for r in BUSINESS_RULES if r["country"] == name]
        guardrails = [g["name"] for g in GUARDRAILS if name in g["countries"]]
        governance_policies = [p["name"] for p in GOVERNANCE_POLICIES if p["country"] == name]
        # Vary product catalogue slightly per country for realism
        offset = COUNTRIES.index(country)
        products = PRODUCTS[offset:] + PRODUCTS[:offset]
        products = products[: len(PRODUCTS) - 2]
        configs.append({
            "code": country["code"],
            "name": name,
            "flag": country["flag"],
            "customersCount": customers_count,
            "enabledSkills": enabled_skills,
            "enabledAgents": AGENT_NAMES,
            "languages": country["languages"],
            "currencies": country["currencies"],
            "businessRules": business_rules,
            "guardrails": guardrails,
            "governancePolicies": governance_policies,
            "products": products,
        })
    return configs


COUNTRY_CONFIGS: list[dict] = _build_country_configs()
COUNTRY_CONFIGS_BY_CODE: dict[str, dict] = {c["code"]: c for c in COUNTRY_CONFIGS}
