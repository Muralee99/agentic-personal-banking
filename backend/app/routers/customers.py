from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.schemas.customer import CustomerDetail, CustomerListResponse
from app.data.customers import CUSTOMERS, CUSTOMERS_BY_ID

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("", response_model=CustomerListResponse)
def list_customers(
    search: Optional[str] = None,
    segment: Optional[str] = None,
    country: Optional[str] = None,
    status: Optional[str] = None,
    kycStatus: Optional[str] = None,
    page: int = Query(1, ge=1),
    pageSize: int = Query(10, ge=1, le=100),
) -> CustomerListResponse:
    items = CUSTOMERS
    if search:
        q = search.lower()
        items = [c for c in items if q in c["name"].lower() or q in c["email"].lower() or q in c["id"].lower()]
    if segment:
        items = [c for c in items if c["segment"] == segment]
    if country:
        items = [c for c in items if c["country"] == country]
    if status:
        items = [c for c in items if c["status"] == status]
    if kycStatus:
        items = [c for c in items if c["kycStatus"] == kycStatus]

    total = len(items)
    start = (page - 1) * pageSize
    page_items = items[start: start + pageSize]
    return {"items": page_items, "total": total, "page": page, "pageSize": pageSize}


@router.get("/{customer_id}", response_model=CustomerDetail)
def get_customer(customer_id: str) -> CustomerDetail:
    customer = CUSTOMERS_BY_ID.get(customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
