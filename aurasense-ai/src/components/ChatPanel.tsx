import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { ApiService } from "@/services/api";


interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  prediction?: string;
}


const predictionToMeta = (pred: string) => {
  const lower = pred.toLowerCase();
  if (lower.includes("distress") || lower.includes("negative"))
    return { color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", emoji: "🔴" };
  if (lower.includes("positive"))
    return { color: "text-neon-green", bg: "bg-neon-green/10 border-neon-green/30", emoji: "🟢" };
  return { color: "text-neon-cyan", bg: "bg-neon-cyan/10 border-neon-cyan/30", emoji: "🟡" };
};

interface ChatPanelProps {
  onPrediction?: (text: string) => void;
}

const ChatPanel = ({ onPrediction }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      console.log('Making API call using ApiService...');
      console.log('User message:', userMsg.text);
      
      const data = await ApiService.predictEmotion(userMsg.text);
      console.log('Response data:', data);
      
      const prediction = data.prediction || "Unknown";
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: `Analysis complete. The detected sentiment is:`,
        prediction,
      };
      setMessages((prev) => [...prev, aiMsg]);
      onPrediction?.(userMsg.text);
    } catch (error) {
      console.error('API Error:', error);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: `⚠️ API Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your connection.`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl neon-border flex flex-col h-[500px]">
      <div className="px-5 py-4 border-b border-border/30 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground tracking-wide">AI Analysis Console</h3>
          <p className="text-xs text-muted-foreground">Enter text to analyze emotional patterns</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-neon" />
          <span className="text-xs text-neon-green font-mono">ONLINE</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Bot className="w-12 h-12 mb-3 text-primary/30" />
            <p className="text-sm">Enter a message to begin AI sentiment analysis</p>
            <p className="text-xs mt-1 text-muted-foreground/60">e.g., "I feel overwhelmed and tired of everything."</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary/15 text-foreground rounded-br-md"
                    : "bg-muted/50 text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                {msg.prediction && (
                  <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${predictionToMeta(msg.prediction).bg} ${predictionToMeta(msg.prediction).color}`}>
                    <span>{predictionToMeta(msg.prediction).emoji}</span>
                    {msg.prediction}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <User className="w-4 h-4 text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground font-mono">Analyzing emotional patterns...</span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe how you're feeling..."
            className="flex-1 bg-muted/30 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:neon-glow-cyan transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
