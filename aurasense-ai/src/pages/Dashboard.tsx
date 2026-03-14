import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import RiskGauge from "@/components/RiskGauge";
import ParticleBackground from "@/components/ParticleBackground";
import ChatPanel from "@/components/ChatPanel";
import PredictionCard from "@/components/PredictionCard";
import EmotionalRadar from "@/components/EmotionalRadar";
import InsightsPanel from "@/components/InsightsPanel";
import { Activity, Brain, Shield, Server, CheckCircle, Cpu } from "lucide-react";
import { ApiService } from "@/services/api";

const statusItems = [
  { label: "AI Engine", status: "Operational", icon: Brain, color: "text-neon-green" },
  { label: "API Server", status: "Online", icon: Server, color: "text-neon-green" },
  { label: "NLP Pipeline", status: "Ready", icon: Cpu, color: "text-neon-green" },
  { label: "Data Encryption", status: "Active", icon: Shield, color: "text-neon-green" },
];

const overviewCards = [
  { title: "Model Accuracy", value: "87.2%", description: "Logistic Regression with TF-IDF", icon: Activity, color: "text-neon-cyan" },
  { title: "Analyses Today", value: "0", description: "Navigate to Analysis to begin", icon: Brain, color: "text-neon-purple" },
  { title: "Avg Response Time", value: "<200ms", description: "FastAPI backend", icon: Cpu, color: "text-neon-green" },
];

const Dashboard = () => {
  const [prediction, setPrediction] = useState<string | undefined>();
  const [analysisText, setAnalysisText] = useState<string | undefined>();
  const [insightData, setInsightData] = useState<any>();
  const [riskLevel, setRiskLevel] = useState(25);
  const [radarData, setRadarData] = useState([
    { subject: "Stress", value: 30 },
    { subject: "Anxiety", value: 25 },
    { subject: "Fatigue", value: 40 },
    { subject: "Mood", value: 65 },
    { subject: "Energy", value: 55 },
  ]);

  const handlePrediction = useCallback(async (text: string) => {
    try {
      const result = await ApiService.predictEmotion(text);
      setPrediction(result.prediction);
      setAnalysisText(result.input);

      if (result.risk_level !== undefined) {
        setRiskLevel(result.risk_level);
      }

      if (result.radar) {
        setRadarData(Object.entries(result.radar).map(([subject, value]) => ({ subject, value: value as number })));
      }
      
      if (result.insight) {
        setInsightData(result.insight);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <main className="relative z-10">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
          {/* AI Chat Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              AI Mental Health <span className="text-primary neon-text-cyan">Assistant</span>
            </h2>
            <p className="text-muted-foreground text-sm">Share your thoughts and get real-time emotional analysis powered by AI.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <ChatPanel onPrediction={handlePrediction} />
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PredictionCard prediction={prediction} />
                <RiskGauge riskLevel={riskLevel} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmotionalRadar data={radarData} />
                <InsightsPanel prediction={prediction} text={analysisText} insightData={insightData} />
              </div>
            </motion.div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overviewCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl neon-border p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <span className="font-display text-xs font-semibold tracking-wide text-muted-foreground uppercase">{card.title}</span>
                </div>
                <p className={`font-display text-3xl font-black ${card.color} mb-1`}>{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl neon-border p-6"
          >
            <h3 className="font-display text-sm font-semibold tracking-wide text-foreground mb-6">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statusItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${item.color}`} />
                    <span className={`text-xs font-mono font-semibold ${item.color}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
