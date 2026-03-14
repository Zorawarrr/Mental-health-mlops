// Simple test to verify API connection
const API_BASE_URL = 'http://localhost:8000';

export const testConnection = async () => {
  console.log('Testing API connection to:', API_BASE_URL);
  
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: 'test message' }),
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Test connection failed:', error);
    throw error;
  }
};
