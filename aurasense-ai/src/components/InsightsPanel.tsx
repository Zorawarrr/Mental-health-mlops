import { motion } from "framer-motion";
import { Brain, AlertTriangle, Heart, TrendingDown } from "lucide-react";

interface InsightsPanelProps {
  prediction?: string;
  text?: string;
  insightData?: {
    title: string;
    body: string;
    recommendations: string[];
    type: string;
  };
}

const getInsight = (prediction?: string, text?: string, insightData?: InsightsPanelProps['insightData']) => {
  if (insightData) {
    let icon = TrendingDown;
    let color = "text-neon-cyan";
    let borderColor = "border-neon-cyan/30";
    let bgColor = "bg-neon-cyan/5";

    if (insightData.type === 'negative') {
       icon = AlertTriangle;
       color = "text-destructive";
       borderColor = "border-destructive/30";
       bgColor = "bg-destructive/5";
    } else if (insightData.type === 'positive') {
       icon = Heart;
       color = "text-neon-green";
       borderColor = "border-neon-green/30";
       bgColor = "bg-neon-green/5";
    }

    return {
      icon,
      color,
      borderColor,
      bgColor,
      title: insightData.title,
      body: insightData.body,
      recommendations: insightData.recommendations
    };
  }

  if (!prediction) return null;
  const lower = (prediction || "").toLowerCase();
  if (lower.includes("distress") || lower.includes("negative")) {
    return {
      icon: AlertTriangle,
      color: "text-destructive",
      borderColor: "border-destructive/30",
      bgColor: "bg-destructive/5",
      title: "Distress Signals Detected",
      body: `The text contains patterns indicating emotional fatigue and isolation. These signals often correlate with distress-related sentiment. Key indicators include negative self-assessment language and expressions of exhaustion.`,
      recommendations: [
        "Consider connecting with a trusted individual",
        "Professional support is recommended",
        "Monitor for recurring patterns",
      ],
    };
  }
  if (lower.includes("positive")) {
    return {
      icon: Heart,
      color: "text-neon-green",
      borderColor: "border-neon-green/30",
      bgColor: "bg-neon-green/5",
      title: "Positive Indicators",
      body: `The text shows signs of positive emotional expression and healthy coping mechanisms. The language patterns suggest a stable emotional state with constructive self-reflection.`,
      recommendations: [
        "Continue maintaining positive habits",
        "Document what's working well",
        "Share positive experiences with others",
      ],
    };
  }
  return {
    icon: TrendingDown,
    color: "text-neon-cyan",
    borderColor: "border-neon-cyan/30",
    bgColor: "bg-neon-cyan/5",
    title: "Neutral Assessment",
    body: `The text presents a balanced emotional state without strong positive or negative indicators. Continued monitoring is recommended to detect any emerging trends.`,
    recommendations: [
      "Continue regular check-ins",
      "Maintain awareness of emotional shifts",
      "Practice mindfulness exercises",
    ],
  };
};

const InsightsPanel = ({ prediction, text, insightData }: InsightsPanelProps) => {
  const insight = getInsight(prediction, text, insightData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl neon-border p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Brain className="w-4 h-4 text-accent" />
        </div>
        <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">AI Insights Engine</h3>
      </div>

      {!insight ? (
        <div className="text-center py-8 text-muted-foreground">
          <Brain className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm">Submit a text analysis to generate AI insights</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className={`flex items-center gap-2 ${insight.color}`}>
            <insight.icon className="w-5 h-5" />
            <span className="font-semibold text-sm">{insight.title}</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{insight.body}</p>

          <div className={`rounded-xl p-4 border ${insight.borderColor} ${insight.bgColor}`}>
            <p className="text-xs font-semibold text-foreground mb-2">Recommendations</p>
            <ul className="space-y-1.5">
              {insight.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${insight.color.replace("text-", "bg-")} flex-shrink-0`} />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InsightsPanel;
