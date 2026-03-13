# Aurasense Dashboard - AI Mental Health Integration

This is the integration of your beautiful Aurasense dashboard with the FastAPI mental health AI backend.

## 🚀 Features

- ✅ **Real-time AI Analysis**: Connects to FastAPI backend for sentiment prediction
- ✅ **Beautiful UI**: Preserves your existing shadcn/ui design
- ✅ **Smooth Animations**: Framer Motion powered interactions
- ✅ **Responsive Design**: Works on all devices
- ✅ **Error Handling**: Graceful error states and loading indicators

## 📋 Prerequisites

- Node.js 18+
- Your FastAPI backend running on `http://localhost:8000`
- Git (to clone your repository)

## 🔧 Integration Steps

### 1. Clone Your Repository
```bash
git clone https://github.com/Zorawarrr/aurasense-dashboard.git
cd aurasense-dashboard
```

### 2. Add API Service
Create `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface PredictionRequest {
  text: string;
}

export interface PredictionResponse {
  input: string;
  prediction: string;
}

export class ApiService {
  static async predictEmotion(text: string): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to connect to the AI service. Please try again.');
    }
  }
}
```

### 3. Update Analysis Component
Replace `src/pages/Analysis.tsx` with the integrated version (provided in this repo).

### 4. Update ChatPanel Component
Replace `src/components/ChatPanel.tsx` with the API-integrated version.

### 5. Add Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

### 6. Install Dependencies
```bash
npm install
```

### 7. Start Development
```bash
npm run dev
```

## 🎯 How to Use

1. **Start Backend**: Make sure FastAPI is running on `http://localhost:8000`
2. **Start Frontend**: Run `npm run dev` in the aurasense-dashboard directory
3. **Navigate**: Go to `http://localhost:5173/analysis`
4. **Test**: Type messages like "I feel happy today" or "I'm exhausted and stressed"

## 🔗 API Integration Details

### Backend Endpoints
- `GET /` - Health check
- `POST /predict` - Text sentiment analysis

### Request Format
```json
{
  "text": "I feel happy today"
}
```

### Response Format
```json
{
  "input": "I feel happy today",
  "prediction": "Positive"
}
```

## 🎨 What's Integrated

### ChatPanel Component
- ✅ Real-time text input
- ✅ Loading states during API calls
- ✅ Error handling for failed requests
- ✅ Message history display

### Analysis Page
- ✅ API integration for predictions
- ✅ Dynamic risk gauge updates
- ✅ Emotional radar chart updates
- ✅ Insights panel with real results

### Visual Components
- ✅ Prediction cards with actual AI results
- ✅ Risk assessment based on real predictions
- ✅ Emotional analysis visualization
- ✅ Smooth transitions and animations

## 🌍 Deployment

### Frontend Deployment (Vercel)
```bash
npm run build
vercel --prod
```

Set environment variable in Vercel:
```
VITE_API_URL=https://your-backend-url.com
```

### Backend Deployment
Your FastAPI backend can be deployed to:
- AWS EC2
- DigitalOcean
- Railway
- Render

## 🔧 Troubleshooting

### CORS Issues
Make sure your FastAPI backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Connection Issues
1. Check if backend is running: `curl http://localhost:8000`
2. Verify API URL in `.env` file
3. Check browser console for errors

## 🎉 Result

Your beautiful Aurasense dashboard now has real AI mental health analysis capabilities! Users can:
- Type natural language messages
- Get real-time sentiment predictions
- See visual risk assessments
- View emotional analysis charts
- Receive AI-powered insights

The integration preserves your existing design while adding powerful AI functionality.
