import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ApiService } from "@/services/api";

const SimpleChat = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'ai'}>>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputText("");
    setIsLoading(true);

    try {
      console.log('Sending request to API service...');
      console.log('Request body:', JSON.stringify({ text: userMessage }));

      const data = await ApiService.predictEmotion(userMessage);
      console.log('Response data:', data);

      setMessages(prev => [...prev, { 
        text: `Prediction: ${data.prediction} (Input: "${data.input}")`, 
        sender: 'ai' 
      }]);

    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, { 
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`, 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Simple AI Chat Test</h2>
      
      <div className="h-64 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-gray-800">
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1"
          rows={2}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !inputText.trim()}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Open browser console (F12) to see detailed API logs
      </div>
    </Card>
  );
};

export default SimpleChat;
