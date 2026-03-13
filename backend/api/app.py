from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI(title="Mental Health Early Warning System")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:8080", "http://localhost:8081", "http://localhost:8082", "http://localhost:8083", "http://localhost:8084"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("models/model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

class InputText(BaseModel):
    text:str


@app.get("/")
def home():
    return {"message":"Mental Health AI System Running"}


@app.post("/predict")
def predict(data:InputText):
    vec = vectorizer.transform([data.text])
    pred = model.predict(vec)[0]
    probs = model.predict_proba(vec)[0]
    
    # Assuming classes are [0, 4] for Sentiment140
    # probs[0] is probability of class 0 (Negative/Distress)
    # probs[1] is probability of class 4 (Positive)
    
    # Check if classes are just [0, 1] or [0, 4]
    class_indices = list(model.classes_)
    if 0 in class_indices:
        neg_idx = class_indices.index(0)
        prob_neg = probs[neg_idx]
    else:
        prob_neg = probs[0] # Fallback
        
    prob_pos = 1.0 - prob_neg

    if pred == 0:
        label = "Distress / Negative"
    elif pred == 4 or pred == 1:
        label = "Positive"
    else:
        label = "Neutral"

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
    if prob_neg > 0.7:
        insight = {
            "title": "High Distress Signals Detected",
            "body": f"The text contains severe patterns indicating emotional fatigue (Risk Score: {risk_level}/100). The semantic analysis shows an overwhelming negative sentiment correlation.",
            "recommendations": ["Seek immediate professional support", "Connect with a trusted loved one", "Prioritize immediate rest and self-care"],
            "type": "negative"
        }
    elif prob_neg > 0.5:
        insight = {
            "title": "Moderate Distress Signals",
            "body": f"The model detected some negative patterns indicating potential stress (Risk Score: {risk_level}/100). Vocabulary suggests emotional tension.",
            "recommendations": ["Consider talking to someone about your feelings", "Practice mindfulness or meditation", "Monitor these feelings over the next few days"],
            "type": "negative"
        }
    elif prob_pos > 0.7:
        insight = {
            "title": "Strong Positive Indicators",
            "body": f"The text shows clear signs of positive emotional expression (Positivity Score: {int(prob_pos*100)}/100). The language patterns suggest a very stable emotional state.",
            "recommendations": ["Continue your current healthy habits", "Share your positive energy with others", "Document this moment in a gratitude journal"],
            "type": "positive"
        }
    elif prob_pos > 0.5:
        insight = {
            "title": "Mild Positive Indicators",
            "body": f"The analysis leans towards a positive emotional baseline (Positivity Score: {int(prob_pos*100)}/100) with constructive language.",
            "recommendations": ["Maintain current routines", "Reflect on what made today good", "Continue expressing yourself openly"],
            "type": "positive"
        }
    else:
        insight = {
            "title": "Neutral Assessment",
            "body": f"The expression is highly balanced. The model found no extreme emotional volatility in either direction (Risk Score: {risk_level}/100).",
            "recommendations": ["Continue regular check-ins", "Maintain awareness of emotional shifts", "Stick to balanced daily routines"],
            "type": "neutral"
        }

    return {
        "input": data.text,
        "prediction": label,
        "risk_level": risk_level,
        "radar": radar,
        "insight": insight
    }