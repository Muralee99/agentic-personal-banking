import random
from collections import Counter

from app.data.reference import COUNTRIES, SEGMENTS, BUSINESS_RULES, GUARDRAILS, COUNTRY_COORDS
from app.data.customers import CUSTOMERS
from app.data.recommendations import RECOMMENDATIONS
from app.data.agents import AGENTS_FULL

_rng = random.Random(11)

DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
HOURS = [0, 3, 6, 9, 12, 15, 18, 21]


def _build_stats() -> dict:
    accepted = sum(1 for r in RECOMMENDATIONS if r["status"] == "Accepted")
    rejected = sum(1 for r in RECOMMENDATIONS if r["status"] == "Rejected")
    decided = accepted + rejected
    success_rate = round((accepted / decided) * 100, 1) if decided else 0.0
    active_agents = sum(1 for a in AGENTS_FULL if a["status"] == "Active")
    guardrail_violations = sum(g["violationsCount"] for g in GUARDRAILS)
    active_customers = sum(1 for c in CUSTOMERS if c["status"] == "Active")
    satisfaction = round((active_customers / len(CUSTOMERS)) * 100 - 6.2, 1)
    return {
        "totalCustomers": len(CUSTOMERS),
        "segments": len(SEGMENTS),
        "countries": len(COUNTRIES),
        "aiRecommendations": len(RECOMMENDATIONS),
        "activeAgents": active_agents,
        "guardrailViolations": guardrail_violations,
        "businessRules": len(BUSINESS_RULES),
        "recommendationSuccessRate": success_rate,
        "customerSatisfaction": satisfaction,
    }


def _build_charts() -> dict:
    segment_counts = Counter(c["segment"] for c in CUSTOMERS)
    segment_pie = [{"label": s["name"], "value": segment_counts.get(s["name"], 0)} for s in SEGMENTS]

    country_reco_counts = Counter(r["country"] for r in RECOMMENDATIONS)
    reco_bar = [{"label": c["name"], "value": country_reco_counts.get(c["name"], 0)} for c in COUNTRIES]

    heat_map = [
        {"day": day, "hour": hour, "value": _rng.randint(2, 48)}
        for day in DAYS
        for hour in HOURS
    ]

    country_counts = Counter(c["country"] for c in CUSTOMERS)
    country_map = [
        {
            "code": c["code"],
            "name": c["name"],
            "lat": COUNTRY_COORDS[c["code"]][0],
            "lng": COUNTRY_COORDS[c["code"]][1],
            "customers": country_counts.get(c["name"], 0),
        }
        for c in COUNTRIES
    ]

    product_counts = Counter(r["product"] for r in RECOMMENDATIONS)
    top_products = [
        {"name": name, "count": count}
        for name, count in product_counts.most_common(6)
    ]

    return {
        "segmentPie": segment_pie,
        "recommendationsByCountryBar": reco_bar,
        "heatMap": heat_map,
        "countryMap": country_map,
        "topProducts": top_products,
    }


def get_dashboard_response() -> dict:
    return {"stats": _build_stats(), "charts": _build_charts()}
