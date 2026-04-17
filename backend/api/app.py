import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Add backend root to path to import src modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.predict import predict_text, load_model
from src.insights import get_dynamic_insight

app = FastAPI(title="Mental Health Early Warning System")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    text:str

@app.get("/")
def home():
    return {"message":"Mental Health AI System Running (Hybrid GNN)"}

@app.post("/predict")
def predict(data:InputText):
    # Run prediction using GNN
    pred_result = predict_text(data.text)
    
    prob_neg = pred_result['prob_neg']
    prob_pos = pred_result['prob_pos']
    pred = pred_result['prediction']
    label = pred_result['prediction_label']

    # Calculate dynamic metrics based on probabilities and text length/features
    risk_level = int(prob_neg * 100)
    
    text_len = min(len(data.text), 200) / 200.0
    
    radar = {
        "Stress": int(prob_neg * 80 + text_len * 20),
        "Anxiety": int(prob_neg * 70 + (1 - text_len) * 30),
        "Fatigue": int(prob_neg * 60 + text_len * 40),
        "Mood": int(prob_pos * 90 + 10),
        "Energy": int(prob_pos * 80 + (1 - text_len) * 20)
    }

    # Generate dynamic insight
    insight = get_dynamic_insight(prob_neg, prob_pos)

    return {
        "input": data.text,
        "prediction": label,
        "risk_level": risk_level,
        "radar": radar,
        "insight": insight
    }