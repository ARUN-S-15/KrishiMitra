# KrishiMitra

An AI-powered assistant for Kerala agriculture. The app helps farmers with crop guidance, weather-aware advice, soil and pest management tips, and more. It has:

- Frontend: React + Vite + TypeScript + Tailwind (shadcn/ui)
- Backend: FastAPI proxy to Groq Chat Completions API

The chatbot responds in clean, readable Markdown in the UI.

## Features

- Ask farming questions (crops, soil, weather, pest, fertilizer, spacing, etc.)
- Non‑agricultural queries receive a friendly warning
- Cleanly rendered Markdown responses (bold sections, bullet points)
- Local dev via Vite proxy to FastAPI (no CORS issues)

---

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- A Groq API key (GROQ_API_KEY)

Optional tools:
- PowerShell (Windows) for the commands shown here

---

## Setup

### 1) Backend (FastAPI)

Location: `Backend/`

Install dependencies (ideally in a virtual environment):

```powershell
# In Backend folder
python -m venv .venv ; venv\Scripts\activate
pip install -r requirements.txt
```

Environment variables (create a `.env` file in `Backend/`):

```
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional (sensible defaults are used if omitted)
GROQ_MODEL=llama-3.1-8b-instant
GROQ_TEMPERATURE=0.3
GROQ_MAX_TOKENS=512

# CORS controls (for development)
# Allow comma-separated origins (defaults include http://localhost:8080 etc.)
ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080
# Permit all origins (dev only)
# ALLOW_ALL_ORIGINS=true
# Or use regex (example): ^https?://localhost:\\d+$
# ALLOW_ORIGIN_REGEX=^https?://localhost:\\d+$
```

Run the backend:

```powershell
# In Backend folder
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API endpoints:
- `GET /` – basic health
- `POST /chat` – proxy to Groq (body: `{ "message": "your text" }`)

### 2) Frontend (Vite React)

Location: `Frontend/`

Install dependencies:

```powershell
# In Frontend folder
npm install
```

Environment variables:

- For development, the Vite dev server proxies `/api` to the backend at `http://127.0.0.1:8000`. No `.env` is required.
- To override the backend URL for the proxy:

Create `Frontend/.env` (optional):
```
# Only if your backend runs on a non-default URL/port
VITE_BACKEND_URL=http://127.0.0.1:8000
```

- To bypass the proxy and call backend directly (e.g., production/staging), set:
```
VITE_API_BASE_URL=https://your-backend.example.com
```

Run the frontend:

```powershell
# In Frontend folder
npm run dev
```

Open the URL printed by Vite (default: http://localhost:8080) and navigate to the Chatbot page.

---

## Development Notes

- The UI renders bot replies as Markdown using `react-markdown` and `remark-gfm`.
- The backend blocks non-agricultural queries and returns a friendly warning; agricultural queries are passed to Groq.
- CORS is flexible via `ALLOWED_ORIGINS`, `ALLOW_ALL_ORIGINS`, or `ALLOW_ORIGIN_REGEX`.

---

## Troubleshooting

- 500 from `/chat`:
  - Ensure `groq` package is installed (it’s in `requirements.txt`).
  - Verify `GROQ_API_KEY` is set and valid in the environment where uvicorn runs.
- CORS issues:
  - In dev, prefer using the frontend proxy (`/api`). If calling backend directly, make sure backend CORS allows your frontend origin.
- Frontend can’t reach backend:
  - Confirm backend is running at `http://127.0.0.1:8000`.
  - If you changed ports, update `VITE_BACKEND_URL` or `VITE_API_BASE_URL` accordingly.

---

## Scripts

- Frontend
  - `npm run dev` – Start Vite dev server (port 8080)
  - `npm run build` – Production build
  - `npm run preview` – Preview production build

- Backend
  - `uvicorn main:app --reload` – Start FastAPI with auto-reload (default port 8000)

---

## License

This project is for educational and demonstration purposes.
