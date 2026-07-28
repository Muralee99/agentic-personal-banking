from app.data.reference import SEGMENTS
from app.data.customers import CUSTOMERS


def _build_segments() -> list[dict]:
    enriched = []
    for s in SEGMENTS:
        segment = dict(s)
        segment["customersCount"] = sum(1 for c in CUSTOMERS if c["segment"] == s["name"])
        enriched.append(segment)
    return enriched


SEGMENTS_FULL: list[dict] = _build_segments()
SEGMENTS_BY_ID: dict[str, dict] = {s["id"]: s for s in SEGMENTS_FULL}
