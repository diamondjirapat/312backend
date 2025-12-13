# BACKEND

## 312backend — Word Validation API (FastAPI)

FastAPI-based backend that proxies sentence validation requests to an n8n workflow. Packaged for local development and containerized deployment with Docker Compose.

## Tech Stack
- Python 3.11+ (FastAPI, httpx, pydantic)
- Uvicorn ASGI server
- Docker + Docker Compose (optional)

## Project Layout
```
api/
  Dockerfile
  requirements.txt
  app/
    main.py                 # FastAPI app and router wiring
    routers/
      validate.py           # POST /api/validate-sentence (proxies to n8n)
      words.py              # Example word list route (not mounted by default)
docker-compose.yml          # Runs api service with live-reload
```

## Prerequisites
- Option A (Docker): Docker Desktop 4.x or newer
- Option B (Local): Python 3.11+, pip, and optionally a virtual environment tool (venv/conda)

## Quick Start

### Run with Docker Compose (recommended)
1. From the project root:
   ```bash
   docker compose up --build
   ```
2. Open the app:
   - API root: http://localhost:8000/
   - Interactive docs (Swagger UI): http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

The API runs with live-reload thanks to the mounted volume (`./api:/app`).

### Run locally (without Docker)
1. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   # Windows PowerShell
   .venv\Scripts\Activate.ps1
   # macOS/Linux
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r api/requirements.txt
   ```
3. Start the server from within the `api` folder or by setting the working directory appropriately:
   ```bash
   cd api
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
4. Visit http://localhost:8000/ and the docs at http://localhost:8000/docs

# FRONTEND

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
