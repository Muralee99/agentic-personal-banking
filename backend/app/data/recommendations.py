"""Global recommendation feed, flattened from per-customer AI recommendations."""
from app.data.customers import CUSTOMERS


def _build_recommendation_feed() -> list[dict]:
    feed = []
    for customer in CUSTOMERS:
        for reco in customer["aiRecommendations"]:
            feed.append({
                "id": reco["id"],
                "customerId": customer["id"],
                "customerName": customer["name"],
                "product": reco["product"],
                "priority": reco["priority"],
                "reason": reco["reason"],
                "triggeredAgent": reco["triggeredAgent"],
                "segment": customer["segment"],
                "country": customer["country"],
                "status": reco["status"],
                "generatedAt": reco["generatedAt"],
            })
    feed.sort(key=lambda r: r["generatedAt"], reverse=True)
    return feed


RECOMMENDATIONS: list[dict] = _build_recommendation_feed()
RECOMMENDATIONS_BY_ID: dict[str, dict] = {r["id"]: r for r in RECOMMENDATIONS}
