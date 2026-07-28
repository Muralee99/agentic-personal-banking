"""Enriches static agent reference data with generated tool-call traces
and builds the React Flow edge list for the AI Supervisor screen."""
import random
from datetime import datetime, timedelta

from app.data.reference import AGENTS

_rng = random.Random(7)

TOOL_NAMES = [
    "fetch_customer_profile",
    "fetch_transaction_history",
    "score_risk_model",
    "query_product_catalogue",
    "check_guardrail_policy",
    "call_credit_bureau",
    "compute_cash_flow_forecast",
    "rank_recommendations",
]


def _build_tool_calls(agent_id: str, n: int) -> list[dict]:
    calls = []
    for i in range(n):
        tool = _rng.choice(TOOL_NAMES)
        ts = datetime(2026, 7, 25, 9, 0, 0) - timedelta(minutes=_rng.randint(0, 600))
        calls.append({
            "id": f"{agent_id}-tc-{i}",
            "tool": tool,
            "input": f"{{customerId: 'cust-{_rng.randint(1, 60):04d}'}}",
            "output": "200 OK · payload delivered",
            "durationMs": _rng.randint(20, 220),
            "timestamp": ts.strftime("%Y-%m-%dT%H:%M:%S"),
        })
    calls.sort(key=lambda c: c["timestamp"], reverse=True)
    return calls


def _build_agents() -> list[dict]:
    enriched = []
    for a in AGENTS:
        agent = dict(a)
        agent["toolCalls"] = _build_tool_calls(a["id"], _rng.randint(4, 8))
        agent["lastRun"] = agent["toolCalls"][0]["timestamp"] if agent["toolCalls"] else "2026-07-25T09:00:00"
        enriched.append(agent)
    return enriched


AGENTS_FULL: list[dict] = _build_agents()
AGENTS_BY_ID: dict[str, dict] = {a["id"]: a for a in AGENTS_FULL}

SUPERVISOR_FLOW_EDGES: list[dict] = [
    {"id": "e-sup-budget", "source": "agent-supervisor", "target": "agent-budget", "animated": True, "label": "context"},
    {"id": "e-sup-savings", "source": "agent-supervisor", "target": "agent-savings", "animated": True, "label": "context"},
    {"id": "e-sup-fraud", "source": "agent-supervisor", "target": "agent-fraud", "animated": True, "label": "context"},
    {"id": "e-sup-travel", "source": "agent-supervisor", "target": "agent-travel", "animated": True, "label": "context"},
    {"id": "e-sup-insurance", "source": "agent-supervisor", "target": "agent-insurance", "animated": True, "label": "context"},
    {"id": "e-sup-investment", "source": "agent-supervisor", "target": "agent-investment", "animated": True, "label": "context"},
    {"id": "e-budget-reco", "source": "agent-budget", "target": "agent-recommendation", "animated": True, "label": "output"},
    {"id": "e-savings-reco", "source": "agent-savings", "target": "agent-recommendation", "animated": True, "label": "output"},
    {"id": "e-fraud-reco", "source": "agent-fraud", "target": "agent-recommendation", "animated": True, "label": "output"},
    {"id": "e-travel-reco", "source": "agent-travel", "target": "agent-recommendation", "animated": True, "label": "output"},
    {"id": "e-insurance-reco", "source": "agent-insurance", "target": "agent-recommendation", "animated": True, "label": "output"},
    {"id": "e-investment-reco", "source": "agent-investment", "target": "agent-recommendation", "animated": True, "label": "output"},
]
