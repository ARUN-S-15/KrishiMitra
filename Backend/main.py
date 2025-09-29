import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS (allow Vite dev server and common localhost ports)
default_origins = {
    os.getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Vite dev server in this repo
    "http://localhost:8080",
    "http://127.0.0.1:8080",
}

# Allow override via comma-separated env var
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    allowed_origins = [o.strip() for o in env_origins.split(",") if o.strip()]
else:
    allowed_origins = sorted(default_origins)

allow_all = os.getenv("ALLOW_ALL_ORIGINS", "false").lower() == "true"
origin_regex = os.getenv("ALLOW_ORIGIN_REGEX")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all else allowed_origins,
    allow_origin_regex=origin_regex if (not allow_all and origin_regex) else None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@app.get("/")
async def read_root():
    return {"message": "Krishi Mitra backend is running"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(payload: ChatRequest):
    """
    Call Groq LLM with the user's message and return the assistant's reply.
    Requires GROQ_API_KEY in environment.
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured on server")

    # Simple topic filter: only allow agricultural queries; warn otherwise
    def is_agriculture_query(text: str) -> bool:
        t = text.lower()
        keywords = [
            # general
            "agriculture", "agricultural", "farming", "farm", "farmer", "field", "kerala",
            # crops and operations
            "crop", "crops", "soil", "seed", "sowing", "plough", "plow", "irrigation",
            "harvest", "harvesting", "fertilizer", "fertiliser", "manure", "compost",
            "mulch", "pesticide", "pest", "disease", "fungicide", "weed", "weeding",
            "yield", "spacing", "transplant", "nursery", "germination",
            # weather/region
            "monsoon", "rain", "rainfall", "humidity", "temperature", "weather",
            # common Kerala crops
            "rice", "paddy", "coconut", "arecanut", "banana", "plantain", "pepper",
            "cardamom", "rubber", "tea", "coffee", "cashew", "tapioca", "tomato",
            "vegetable", "vegetables",
        ]
        return any(k in t for k in keywords)

    if not is_agriculture_query(payload.message):
        warn = (
            "This assistant is only for agricultural purposes. "
            "Please ask farming-related questions (e.g., crops, soil, weather, pest management)."
        )
        return ChatResponse(reply=warn)

    try:
        # Lazy import to avoid import-time errors if not installed
        from groq import Groq

        client = Groq(api_key=api_key)

        system_prompt = (
            "You are Krishi Mitra, a helpful AI assistant focused on Kerala agriculture. "
            "Provide practical, concise, and actionable guidance about crops, weather, soil, and pest management. "
            "If unsure, ask clarifying questions. Keep responses user-friendly. "
            "Respond in Markdown using short sections (bold labels) and bullet lists when helpful."
        )

        completion = client.chat.completions.create(
            model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": payload.message},
            ],
            temperature=float(os.getenv("GROQ_TEMPERATURE", "0.3")),
            max_tokens=int(os.getenv("GROQ_MAX_TOKENS", "512")),
        )

        reply = completion.choices[0].message.content if completion.choices else ""
        if not reply:
            raise HTTPException(status_code=502, detail="Empty response from model")

        return ChatResponse(reply=reply)
    except HTTPException:
        raise
    except Exception as e:
        # Hide internal error details from client but log for server
        # In production, integrate proper logging here
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to generate response") from e

