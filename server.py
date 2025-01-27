from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client

app = FastAPI()

# CORS configuration to allow frontend to make requests
app.add_middleware(
    CORSMiddleware,
 allow_origins=["https://chat-bot-one-blush.vercel.app", "http://localhost:3000"]
)

client = Client("niraj128/chat-bot")

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    
try:
    result = client.predict(
        message=user_message,
        system_message="You are a friendly Chatbot.",
        max_tokens=512,
        temperature=0.7,
        top_p=0.95,
        api_name="/chat"
    )
except Exception as e:
    return {"error": str(e)}

