import joblib

model = joblib.load("models/model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

def predict_text(text):

    vec = vectorizer.transform([text])

    pred = model.predict(vec)[0]

    if pred == 0:
        return "Distress / Negative Emotion"

    elif pred == 4:
        return "Positive Emotion"

    else:
        return "Neutral"