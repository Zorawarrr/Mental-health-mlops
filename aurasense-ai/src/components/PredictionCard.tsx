import { motion } from "framer-motion";
import { AlertTriangle, Heart, Minus } from "lucide-react";

interface PredictionCardProps {
  prediction?: string;
}

const PredictionCard = ({ prediction }: PredictionCardProps) => {
  if (!prediction) return null;

  const lower = prediction.toLowerCase();
  const isDistress = lower.includes("distress") || lower.includes("negative");
  const isPositive = lower.includes("positive");

  const config = isDistress
    ? { icon: AlertTriangle, color: "text-destructive", glow: "shadow-[0_0_30px_rgba(239,68,68,0.2)]", border: "border-destructive/40", bg: "bg-destructive/5", label: "Distress Detected" }
    : isPositive
    ? { icon: Heart, color: "text-neon-green", glow: "shadow-[0_0_30px_rgba(0,255,162,0.2)]", border: "border-neon-green/40", bg: "bg-neon-green/5", label: "Positive Emotion" }
    : { icon: Minus, color: "text-neon-cyan", glow: "shadow-[0_0_30px_rgba(0,255,255,0.2)]", border: "border-neon-cyan/40", bg: "bg-neon-cyan/5", label: "Neutral State" };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`glass rounded-2xl p-6 border ${config.border} ${config.glow} ${config.bg}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <config.icon className={`w-6 h-6 ${config.color}`} />
        <span className={`font-display text-lg font-bold ${config.color}`}>{config.label}</span>
      </div>
      <p className="text-sm text-muted-foreground font-mono">{prediction}</p>
    </motion.div>
  );
};

export default PredictionCard;
