const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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

  static async healthCheck(): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend service is not available');
    }
  }
}
