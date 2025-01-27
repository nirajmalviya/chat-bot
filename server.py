from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client

app = FastAPI()

# Enable CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://chat-bot-one-blush.vercel.app"],  # Adjust according to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Client("niraj128/chat-bot")

@app.post("/chat")  # This should be the correct route
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
