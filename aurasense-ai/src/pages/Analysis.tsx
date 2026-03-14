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
              <InsightsPanel prediction={prediction} text={analysisText} insightData={insightData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
