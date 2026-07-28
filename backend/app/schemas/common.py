from pydantic import BaseModel


class ChartPoint(BaseModel):
    label: str
    value: float


class SeriesPoint(BaseModel):
    date: str
    value: float


class NamedCount(BaseModel):
    name: str
    count: int
