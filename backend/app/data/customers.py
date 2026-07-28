"""Deterministically generated mock customers with rich detail sub-objects."""
import random
from datetime import datetime, timedelta

from app.data.reference import COUNTRIES, SEGMENTS, PRODUCTS, AGENT_NAMES

_rng = random.Random(42)

FIRST_NAMES = [
    "Aarav", "Vivaan", "Ishaan", "Ananya", "Priya", "Diya", "Rohan", "Kabir",
    "Emma", "Liam", "Olivia", "Noah", "Sophia", "James", "Ava", "William",
    "Amelia", "Harry", "Isla", "George", "Mei", "Wei", "Hui", "Jun",
    "Charlotte", "Jack", "Grace", "Oliver", "Chloe", "Ethan", "Mia", "Lucas",
    "Riya", "Arjun", "Sneha", "Karan", "Neha", "Aditya", "Pooja", "Rahul",
]
LAST_NAMES = [
    "Sharma", "Verma", "Patel", "Iyer", "Nair", "Khan", "Gupta", "Reddy",
    "Smith", "Johnson", "Brown", "Taylor", "Wilson", "Davies", "Evans",
    "Tan", "Lim", "Wong", "Lee", "Goh", "Ng",
    "Anderson", "Clarke", "Roberts", "Walker", "Mitchell", "Campbell",
]

CHANNELS = ["Mobile App", "Web Portal", "Branch", "Call Centre", "ATM"]
BEHAVIOUR_TYPES = [
    ("Login", "Logged into mobile app"),
    ("Search", "Searched for travel insurance products"),
    ("Search", "Browsed investment portfolio options"),
    ("Support", "Raised a support query about card limit"),
    ("Complaint", "Filed a complaint about delayed transfer"),
    ("Goal", "Set a new savings goal"),
    ("Update", "Updated KYC documents"),
    ("View", "Viewed personalised recommendation"),
    ("Click", "Clicked on Travel Rewards Card offer"),
    ("Feedback", "Rated the AI recommendation 4/5"),
]
TXN_CATEGORIES = [
    ("Groceries", "debit", "BigBasket"),
    ("Dining", "debit", "Starbucks"),
    ("Travel", "debit", "IndiGo Airlines"),
    ("Salary", "credit", "Employer Inc."),
    ("Utilities", "debit", "Electricity Board"),
    ("Shopping", "debit", "Amazon"),
    ("Entertainment", "debit", "Netflix"),
    ("Transfer", "credit", "Peer Transfer"),
    ("Fuel", "debit", "Shell"),
    ("Healthcare", "debit", "Apollo Pharmacy"),
    ("Investment", "debit", "Mutual Fund SIP"),
    ("Rent", "debit", "Landlord Payment"),
]
RECO_REASONS = [
    "Detected rising travel-related spend over the last 30 days",
    "Consistent monthly surplus identified for investment allocation",
    "Coverage gap found relative to number of dependents",
    "Credit score improvement qualifies customer for a premium product",
    "Repeated forex transactions indicate upcoming international travel",
    "Spend pattern matches high-affinity rewards category",
    "Idle balance above threshold suitable for fixed deposit",
    "Life-stage change detected suggesting new protection needs",
]


def _rand_date(days_back_min: int, days_back_max: int) -> str:
    days = _rng.randint(days_back_min, days_back_max)
    dt = datetime(2026, 7, 25) - timedelta(days=days)
    return dt.strftime("%Y-%m-%d")


def _rand_datetime(days_back_min: int, days_back_max: int) -> str:
    days = _rng.randint(days_back_min, days_back_max)
    dt = datetime(2026, 7, 25) - timedelta(days=days, hours=_rng.randint(0, 23), minutes=_rng.randint(0, 59))
    return dt.strftime("%Y-%m-%dT%H:%M:%S")


def _build_behaviour_timeline(cust_id: str) -> list[dict]:
    n = _rng.randint(5, 9)
    events = []
    for i in range(n):
        btype, desc = _rng.choice(BEHAVIOUR_TYPES)
        events.append({
            "id": f"{cust_id}-beh-{i}",
            "date": _rand_datetime(0, 60),
            "type": btype,
            "description": desc,
            "channel": _rng.choice(CHANNELS),
        })
    events.sort(key=lambda e: e["date"], reverse=True)
    return events


def _build_transaction_timeline(cust_id: str) -> list[dict]:
    n = _rng.randint(8, 14)
    txns = []
    for i in range(n):
        category, direction, merchant = _rng.choice(TXN_CATEGORIES)
        amount = round(_rng.uniform(200, 45000), 2) if direction == "debit" else round(_rng.uniform(20000, 120000), 2)
        txns.append({
            "id": f"{cust_id}-txn-{i}",
            "date": _rand_datetime(0, 90),
            "description": f"{category} - {merchant}",
            "category": category,
            "amount": amount,
            "direction": direction,
            "merchant": merchant,
        })
    txns.sort(key=lambda t: t["date"], reverse=True)
    return txns


def _build_journey(join_date: str) -> list[dict]:
    stages = [
        ("Onboarded", "Customer completed digital onboarding and KYC."),
        ("Engaged", "Customer actively using mobile app and web portal."),
        ("Segmented", "AI Supervisor assigned customer to a behavioural segment."),
        ("Recommended", "AI agents generated personalised product recommendations."),
        ("Converted", "Customer accepted a recommended product."),
    ]
    current_idx = _rng.randint(1, len(stages) - 1)
    result = []
    base = datetime.strptime(join_date, "%Y-%m-%d")
    for i, (stage, desc) in enumerate(stages):
        status = "completed" if i < current_idx else ("current" if i == current_idx else "upcoming")
        date = (base + timedelta(days=i * 12)).strftime("%Y-%m-%d") if status != "upcoming" else ""
        result.append({"stage": stage, "date": date, "status": status, "description": desc})
    return result


def _build_recommendations(cust_id: str, segment: dict) -> list[dict]:
    n = _rng.randint(2, 4)
    recs = []
    products = segment["recommendedProducts"] + [PRODUCTS[_rng.randint(0, len(PRODUCTS) - 1)]]
    agents = segment["activatedAgents"]
    for i in range(n):
        recs.append({
            "id": f"{cust_id}-reco-{i}",
            "product": _rng.choice(products),
            "priority": _rng.choice(["High", "Medium", "Low"]),
            "reason": _rng.choice(RECO_REASONS),
            "triggeredAgent": _rng.choice(agents) if agents else _rng.choice(AGENT_NAMES),
            "status": _rng.choice(["Pending", "Pending", "Accepted", "Rejected"]),
            "generatedAt": _rand_datetime(0, 30),
        })
    return recs


def _generate_customers(count: int = 60) -> list[dict]:
    customers = []
    used_names = set()
    for i in range(count):
        while True:
            name = f"{_rng.choice(FIRST_NAMES)} {_rng.choice(LAST_NAMES)}"
            if name not in used_names:
                used_names.add(name)
                break
        segment = _rng.choice(SEGMENTS)
        country = _rng.choice(COUNTRIES)
        cust_id = f"cust-{i + 1:04d}"
        join_date = _rand_date(30, 1200)
        balance_ranges = {
            "Student": (500, 8000),
            "Young Professional": (5000, 60000),
            "Family": (8000, 120000),
            "Business": (20000, 500000),
            "Retired": (15000, 300000),
            "High Net Worth": (500000, 8000000),
        }
        lo, hi = balance_ranges[segment["name"]]
        customer = {
            "id": cust_id,
            "name": name,
            "email": f"{name.lower().replace(' ', '.')}@mailbox.com",
            "phone": f"+{_rng.randint(1, 99)} {_rng.randint(700000000, 999999999)}",
            "avatarSeed": name.replace(" ", ""),
            "segment": segment["name"],
            "country": country["name"],
            "status": _rng.choices(["Active", "Inactive", "Dormant"], weights=[75, 15, 10])[0],
            "kycStatus": _rng.choices(["Verified", "Pending", "Rejected"], weights=[85, 12, 3])[0],
            "accountBalance": round(_rng.uniform(lo, hi), 2),
            "riskScore": _rng.randint(5, 95),
            "financialHealthScore": _rng.randint(30, 98),
            "joinDate": join_date,
        }
        customer["behaviourTimeline"] = _build_behaviour_timeline(cust_id)
        customer["transactionTimeline"] = _build_transaction_timeline(cust_id)
        customer["aiRecommendations"] = _build_recommendations(cust_id, segment)
        customer["journey"] = _build_journey(join_date)
        customers.append(customer)
    return customers


CUSTOMERS: list[dict] = _generate_customers(60)
CUSTOMERS_BY_ID: dict[str, dict] = {c["id"]: c for c in CUSTOMERS}
