from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import (
    dashboard,
    customers,
    segments,
    countries,
    agents,
    governance,
    guardrails,
    business_rules,
    skills,
    recommendations,
    analytics,
    settings as settings_router,
)

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix=settings.api_prefix)
app.include_router(customers.router, prefix=settings.api_prefix)
app.include_router(segments.router, prefix=settings.api_prefix)
app.include_router(countries.router, prefix=settings.api_prefix)
app.include_router(agents.router, prefix=settings.api_prefix)
app.include_router(governance.router, prefix=settings.api_prefix)
app.include_router(guardrails.router, prefix=settings.api_prefix)
app.include_router(business_rules.router, prefix=settings.api_prefix)
app.include_router(skills.router, prefix=settings.api_prefix)
app.include_router(recommendations.router, prefix=settings.api_prefix)
app.include_router(analytics.router, prefix=settings.api_prefix)
app.include_router(settings_router.router, prefix=settings.api_prefix)


@app.get("/")
def root():
    return {"name": settings.app_name, "docs": "/docs", "api": settings.api_prefix}


@app.get("/health")
def health():
    return {"status": "ok"}
