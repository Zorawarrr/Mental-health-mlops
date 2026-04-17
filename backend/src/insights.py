import random

# Response pools for different sentiment ranges
INSIGHT_POOLS = {
    "extreme_negative": {
        "titles": [
            "Critical Emotional Distress Detected",
            "Urgent: High Negative Indicators",
            "Severe Emotional Strain Identified",
            "Acute Distress Pattern Recognized"
        ],
        "bodies": [
            "The model detected severe patterns (Risk: {risk}/100) indicating significant emotional weight. The language shows strong correlation with acute distress.",
            "Our GNN analysis indicates a high-intensity negative emotional state ({risk}/100). The semantic structure suggests a need for immediate intervention.",
            "Textual analysis reveals a critical level of emotional fatigue ({risk}/100). There is a consistent pattern of severe negative sentiment nodes."
        ],
        "type": "negative"
    },
    "high_negative": {
        "titles": [
            "Significant Distress Signals",
            "Strong Negative Baseline Detected",
            "Elevated Emotional Risk",
            "Warning: High Burnout Patterns"
        ],
        "bodies": [
            "The text shows significant emotional strain (Risk: {risk}/100). Vocabulary choices point towards high levels of anxiety or stress.",
            "Model confidence is high for negative emotional patterns ({risk}/100). The analysis suggests an elevated state of psychological tension.",
            "Pattern recognition identified strong distress markers ({risk}/100). The semantic flow indicates persistent emotional difficulty."
        ],
        "type": "negative"
    },
    "moderate_negative": {
        "titles": [
            "Moderate Distress Detected",
            "Emotional Imbalance Warning",
            "Symptoms of Growing Stress",
            "Negative Sentiment Baseline"
        ],
        "bodies": [
            "The model detected patterns indicating moderate stress (Risk: {risk}/100). There are emerging signs of emotional fatigue.",
            "Sentiment analysis shows a lean towards negative emotional clusters (Risk: {risk}/100). The vocabulary suggests some current strain.",
            "Analysis identified moderate risk markers ({risk}/100). The text indicates some psychological pressure or sadness."
        ],
        "type": "negative"
    },
    "neutral": {
        "titles": [
            "Balanced Emotional State",
            "Neutral Assessment",
            "Stable Sentiment Profile",
            "Equilibrium Detected"
        ],
        "bodies": [
            "The expression is highly balanced. No extreme emotional volatility was found (Risk: {risk}/100).",
            "Model found a neutral baseline (Risk: {risk}/100). The language patterns are stable and objective.",
            "Sentiment equilibrium reached ({risk}/100). The text lacks significant positive or negative emotional peaks."
        ],
        "type": "neutral"
    },
    "mild_positive": {
        "titles": [
            "Mild Positive Indicators",
            "Constructive Sentiment Profile",
            "Emerging Positive Momentum",
            "Healthy Emotional Baseline"
        ],
        "bodies": [
            "The analysis leans towards a positive emotional baseline (Positivity: {pos}/100). The language is largely constructive.",
            "Indicators suggest a healthy, mild positive state ({pos}/100). The semantic nodes show emerging positivity.",
            "Positive growth detected in sentiment patterns ({pos}/100). The structure reflects a generally calm and hopeful state."
        ],
        "type": "positive"
    },
    "high_positive": {
        "titles": [
            "Strong Positive Indicators",
            "High Emotional Resilience",
            "Significant Joyful Patterns",
            "Vibrant Emotional State"
        ],
        "bodies": [
            "The text shows clear signs of positive emotional expression (Positivity: {pos}/100). Highly stable and joyful state detected.",
            "Strong positive sentiment correlation ({pos}/100). The language patterns suggest a very resilient and happy state.",
            "Significant positivity clusters identified ({pos}/100). The semantic analysis shows an overwhelming positive outlook."
        ],
        "type": "positive"
    },
    "extreme_positive": {
        "titles": [
            "Exceptional Emotional State",
            "Peak Positivity Detected",
            "Profoundly Optimistic Profile",
            "Radiant Sentiment Analysis"
        ],
        "bodies": [
            "Analysis reveals an exceptionally high positive baseline (Positivity: {pos}/100). The language is profoundly hopeful and energized.",
            "Textual analysis shows peak optimism and joy ({pos}/100). The model found virtually no negative distress markers.",
            "Profound positive resonance identified ({pos}/100). This indicates a state of extreme emotional well-being and clarity."
        ],
        "type": "positive"
    }
}

RECOMMENDATION_POOL = {
    "negative": [
        "Reach out to a trusted friend or family member today.",
        "Consider scheduling a session with a licensed counselor.",
        "Practice 10 minutes of deep, mindful breathing.",
        "Prioritize 8 hours of quality sleep tonight.",
        "Try a light physical activity like a 15-minute walk.",
        "Write down three things that are bothering you to clear your head.",
        "Step away from digital screens for at least an hour.",
        "Engage in a hobby that makes you feel relaxed and safe.",
        "Remember that it's okay to not be okay. Be kind to yourself.",
        "If things feel overwhelming, don't hesitate to use a crisis helpline."
    ],
    "neutral": [
        "Continue your daily mindfulness practice.",
        "Stay aware of any subtle shifts in your mood.",
        "Maintain a consistent daily routine for stability.",
        "Take a moment to check in with yourself every few hours.",
        "Stay hydrated and maintain balanced nutrition.",
        "Reflect on what made your day stable today.",
        "Try to incorporate one small positive activity today."
    ],
    "positive": [
        "Celebrate this positive moment—you've earned it!",
        "Share your positive energy with someone who might need it.",
        "Document what contributed to this feeling in a gratitude journal.",
        "Keep up the healthy habits that are supporting your mood.",
        "Look for opportunities to try something new today.",
        "Reinforce this feeling by reflecting on your recent accomplishments.",
        "Take a 'mental snapshot' of this feeling to recall later.",
        "Spread the positivity by giving someone a sincere compliment."
    ]
}

def get_dynamic_insight(prob_neg, prob_pos):
    risk = int(prob_neg * 100)
    pos = int(prob_pos * 100)
    
    # Determine category
    if prob_neg > 0.8:
        cat = "extreme_negative"
    elif prob_neg > 0.6:
        cat = "high_negative"
    elif prob_neg > 0.4:
        cat = "moderate_negative"
    elif prob_pos > 0.8:
        cat = "extreme_positive"
    elif prob_pos > 0.6:
        cat = "high_positive"
    elif prob_pos > 0.4:
        cat = "mild_positive"
    else:
        cat = "neutral"
        
    pool = INSIGHT_POOLS[cat]
    
    # Select random elements
    title = random.choice(pool["titles"])
    body_template = random.choice(pool["bodies"])
    body = body_template.format(risk=risk, pos=pos)
    
    # Select 3 random recommendations from the appropriate pool
    rec_type = pool["type"]
    recs = random.sample(RECOMMENDATION_POOL[rec_type], k=min(3, len(RECOMMENDATION_POOL[rec_type])))
    
    return {
        "title": title,
        "body": body,
        "recommendations": recs,
        "type": rec_type
    }
