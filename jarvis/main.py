from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pyttsx3
import threading

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize TTS Engine (Offline Voice)
engine = pyttsx3.init()
voices = engine.getProperty('voices')
# Try to find a good English voice
for voice in voices:
    if "EN-US" in voice.id.upper() or "ZIRA" in voice.id.upper() or "DAVID" in voice.id.upper():
        engine.setProperty('voice', voice.id)
        break
engine.setProperty('rate', 170)  # Slightly faster for AI feel

def speak_text(text):
    """Run TTS in a separate thread so it doesn't block the API"""
    def run_speech():
        # Re-initialize pyttsx3 in thread as it's not thread-safe
        local_engine = pyttsx3.init()
        local_engine.setProperty('rate', 170)
        local_engine.say(text)
        local_engine.runAndWait()
    
    t = threading.Thread(target=run_speech)
    t.start()

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    user_msg = req.message.lower()
    reply = ""

    # Mock Jarvis AI Logic (MVP)
    # In a full build, this is where we query Llama-3 locally using llama.cpp
    
    if "hello" in user_msg or "hi" in user_msg:
        reply = "Greetings, sir. All systems are operating at optimal capacity."
    elif "status" in user_msg:
        reply = "System core temperature is stable. Memory banks are intact. We are running entirely offline as requested."
    elif "who are you" in user_msg:
        reply = "I am AntiGravity Jarvis, a localized artificial intelligence designed to assist you."
    elif "open browser" in user_msg:
        reply = "I would normally open the browser now, sir. But system control modules are pending installation."
    else:
        reply = "I have processed your statement: '" + req.message + "'. However, my main neural network is still booting up. Please install the local LLM for full capability."

    # Trigger speech
    speak_text(reply)

    return {"reply": reply}

# Mount static files (the UI)
app.mount("/", StaticFiles(directory="public", html=True), name="public")

if __name__ == "__main__":
    import uvicorn
    print("Starting AntiGravity Jarvis Core...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
