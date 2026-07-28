from fastapi import APIRouter, HTTPException

from app.schemas.agent import Agent, SupervisorFlowEdge
from app.data.agents import AGENTS_FULL, AGENTS_BY_ID, SUPERVISOR_FLOW_EDGES

router = APIRouter(prefix="/agents", tags=["AI Agents"])


@router.get("", response_model=list[Agent])
def list_agents() -> list[Agent]:
    return AGENTS_FULL


@router.get("/flow-edges", response_model=list[SupervisorFlowEdge])
def get_flow_edges() -> list[SupervisorFlowEdge]:
    return SUPERVISOR_FLOW_EDGES


@router.get("/{agent_id}", response_model=Agent)
def get_agent(agent_id: str) -> Agent:
    agent = AGENTS_BY_ID.get(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent
