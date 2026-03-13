import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ChatPanel from "@/components/ChatPanel";
import RiskGauge from "@/components/RiskGauge";
import EmotionalRadar from "@/components/EmotionalRadar";
import InsightsPanel from "@/components/InsightsPanel";
import PredictionCard from "@/components/PredictionCard";
import ParticleBackground from "@/components/ParticleBackground";
import { ApiService } from "@/services/api";

const Analysis = () => {
  const [prediction, setPrediction] = useState<string | undefined>();
  const [analysisText, setAnalysisText] = useState<string | undefined>();
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

      const pred = result.prediction.toLowerCase();
      if (pred.includes("distress") || pred.includes("negative")) {
        setRiskLevel(85);
        setRadarData([
          { subject: "Stress", value: 75 + Math.random() * 20 },
          { subject: "Anxiety", value: 70 + Math.random() * 25 },
          { subject: "Fatigue", value: 80 + Math.random() * 15 },
          { subject: "Mood", value: 15 + Math.random() * 20 },
          { subject: "Energy", value: 10 + Math.random() * 20 },
        ]);
      } else if (pred.includes("positive")) {
        setRiskLevel(25);
        setRadarData([
          { subject: "Stress", value: 10 + Math.random() * 15 },
          { subject: "Anxiety", value: 10 + Math.random() * 15 },
          { subject: "Fatigue", value: 15 + Math.random() * 15 },
          { subject: "Mood", value: 75 + Math.random() * 20 },
          { subject: "Energy", value: 70 + Math.random() * 25 },
        ]);
      } else {
        setRiskLevel(50);
        setRadarData([
          { subject: "Stress", value: 35 + Math.random() * 20 },
          { subject: "Anxiety", value: 30 + Math.random() * 20 },
          { subject: "Fatigue", value: 40 + Math.random() * 20 },
          { subject: "Mood", value: 45 + Math.random() * 20 },
          { subject: "Energy", value: 40 + Math.random() * 20 },
        ]);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
      // You could show an error toast here
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <main className="relative z-10 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Emotion <span className="text-primary neon-text-cyan">Analysis</span>
            </h1>
            <p className="text-muted-foreground text-sm">Enter text to analyze emotional patterns using AI-powered sentiment detection.</p>
          </motion.div>

          <div className="space-y-8">
            {/* Chat + Prediction */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChatPanel onPrediction={handlePrediction} />
              <div className="space-y-6">
                <PredictionCard prediction={prediction} />
                <RiskGauge riskLevel={riskLevel} />
              </div>
            </div>

            {/* Radar + Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EmotionalRadar data={radarData} />
              <InsightsPanel prediction={prediction} text={analysisText} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
