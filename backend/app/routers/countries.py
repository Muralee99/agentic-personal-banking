from fastapi import APIRouter, HTTPException

from app.schemas.country import CountryConfig
from app.data.countries import COUNTRY_CONFIGS, COUNTRY_CONFIGS_BY_CODE

router = APIRouter(prefix="/countries", tags=["Country Configuration"])


@router.get("", response_model=list[CountryConfig])
def list_countries() -> list[CountryConfig]:
    return COUNTRY_CONFIGS


@router.get("/{code}", response_model=CountryConfig)
def get_country(code: str) -> CountryConfig:
    country = COUNTRY_CONFIGS_BY_CODE.get(code.upper())
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")
    return country
