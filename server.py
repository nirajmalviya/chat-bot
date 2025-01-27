from fastapi import FastAPI, Request
from gradio_client import Client
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set frontend's URL if not running locally
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Client("niraj128/chat-bot")

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    
    # Call Gradio client API
    result = client.predict(
        message=user_message,
        system_message="You are a friendly Chatbot.",
        max_tokens=512,
        temperature=0.7,
        top_p=0.95,
        api_name="/chat"
    )
    return {"response": result}
