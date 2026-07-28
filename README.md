# Agentic Personal Banking Platform

An enterprise AI banking platform demo where multiple AI agents collaborate to
recommend banking products based on customer behaviour. FastAPI backend serving
mock data over REST; React frontend consuming it.

## Structure

- `backend/` — FastAPI (Python), serves mock data under `/api/v1`
- `frontend/` — React 19 + TypeScript + Vite, Tailwind v4, shadcn/ui, React Query,
  Zustand, React Router, React Flow, Framer Motion, Recharts

## Running the backend

```bash
cd backend
python -m venv .venv
./.venv/Scripts/activate   # Windows; use `source .venv/bin/activate` on macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

API docs: http://127.0.0.1:8000/docs

## Running the frontend

```bash
cd frontend
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if the backend runs elsewhere
npm run dev
```

App: http://localhost:5173

Data is in-memory and regenerated on backend restart — there is no database.
