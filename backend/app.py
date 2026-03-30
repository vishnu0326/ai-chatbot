from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 IMPORTANT: base_url required for OpenRouter
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

chat_history = [
    {"role": "system", "content": "You are a helpful assistant."}
]

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        chat_history.append({"role": "user", "content": req.message})

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",
            messages=chat_history
        )

        reply = response.choices[0].message.content

        chat_history.append({"role": "assistant", "content": reply})

        return {"reply": reply}

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}