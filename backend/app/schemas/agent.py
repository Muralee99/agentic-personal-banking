from typing import Literal
from pydantic import BaseModel

AgentStatus = Literal["Active", "Idle", "Error"]


class ToolCall(BaseModel):
    id: str
    tool: str
    input: str
    output: str
    durationMs: int
    timestamp: str


class Agent(BaseModel):
    id: str
    name: str
    role: str
    order: int
    purpose: str
    input: str
    output: str
    status: AgentStatus
    memory: list[str]
    skills: list[str]
    toolCalls: list[ToolCall]
    executionTimeMs: int
    confidence: float
    lastRun: str
    countries: list[str]


class SupervisorFlowEdge(BaseModel):
    id: str
    source: str
    target: str
    animated: bool
    label: str
