import random
from collections import Counter
from datetime import datetime, timedelta

from app.data.reference import COUNTRIES, SEGMENTS, BUSINESS_RULES, GUARDRAILS, AGENT_NAMES
from app.data.recommendations import RECOMMENDATIONS
from app.data.agents import AGENTS_FULL

_rng = random.Random(23)


def _recommendations_over_time() -> list[dict]:
    today = datetime(2026, 7, 25)
    series = []
    for i in range(29, -1, -1):
        date = (today - timedelta(days=i)).strftime("%Y-%m-%d")
        base = 18 + int(10 * abs(((i % 7) - 3) / 3))
        series.append({"date": date, "value": base + _rng.randint(-4, 9)})
    return series


def get_analytics_response() -> dict:
    segment_counts = Counter(r["segment"] for r in RECOMMENDATIONS)
    segment_distribution = [{"label": s["name"], "value": segment_counts.get(s["name"], 0)} for s in SEGMENTS]

    country_counts = Counter(r["country"] for r in RECOMMENDATIONS)
    country_distribution = [{"label": c["name"], "value": country_counts.get(c["name"], 0)} for c in COUNTRIES]

    business_rule_usage = sorted(
        [{"name": r["name"], "count": r["executionCount"]} for r in BUSINESS_RULES],
        key=lambda x: x["count"],
        reverse=True,
    )

    guardrail_category_counts: dict[str, int] = {}
    for g in GUARDRAILS:
        guardrail_category_counts[g["category"]] = guardrail_category_counts.get(g["category"], 0) + g["violationsCount"]
    guardrail_violations = sorted(
        [{"name": k, "count": v} for k, v in guardrail_category_counts.items()],
        key=lambda x: x["count"],
        reverse=True,
    )

    agent_reco_counts = Counter(r["triggeredAgent"] for r in RECOMMENDATIONS)
    top_agents = []
    for a in AGENTS_FULL:
        executions = agent_reco_counts.get(a["name"], 0) + _rng.randint(50, 400)
        top_agents.append({
            "agent": a["name"],
            "executions": executions,
            "successRate": round(_rng.uniform(78, 98), 1),
            "avgConfidence": a["confidence"],
        })
    top_agents.sort(key=lambda x: x["executions"], reverse=True)

    return {
        "recommendationsOverTime": _recommendations_over_time(),
        "segmentDistribution": segment_distribution,
        "countryDistribution": country_distribution,
        "businessRuleUsage": business_rule_usage,
        "guardrailViolations": guardrail_violations,
        "topAgents": top_agents,
    }
