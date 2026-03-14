import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RiskGaugeProps {
  riskLevel: number; // 0-100
}

const RiskGauge = ({ riskLevel }: RiskGaugeProps) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLevel(riskLevel), 300);
    return () => clearTimeout(timer);
  }, [riskLevel]);

  const getColor = (level: number) => {
    if (level <= 40) return { label: "Healthy", color: "text-neon-green", stroke: "hsl(156, 100%, 50%)", glow: "neon-glow-green" };
    if (level <= 70) return { label: "Moderate", color: "text-yellow-400", stroke: "hsl(45, 100%, 60%)", glow: "" };
    return { label: "High Distress", color: "text-destructive", stroke: "hsl(0, 85%, 60%)", glow: "" };
  };

  const meta = getColor(animatedLevel);
  const circumference = 2 * Math.PI * 80;
  const dashOffset = circumference - (animatedLevel / 100) * circumference * 0.75; // 270deg arc

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl neon-border p-6 flex flex-col items-center"
    >
      <h3 className="font-display text-sm font-semibold tracking-wide text-foreground mb-6">Mental Health Risk Gauge</h3>

      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-[135deg]">
          {/* Background arc */}
          <circle
            cx="100" cy="100" r="80"
            fill="none"
            stroke="hsl(240, 15%, 18%)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <circle
            cx="100" cy="100" r="80"
            fill="none"
            stroke={meta.stroke}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out, stroke 0.5s" }}
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display text-4xl font-black ${meta.color}`}>
            {animatedLevel}
          </span>
          <span className={`text-xs font-semibold mt-1 ${meta.color}`}>{meta.label}</span>
        </div>
      </div>

      <div className="flex justify-between w-full mt-4 px-2 text-xs text-muted-foreground">
        <span className="text-neon-green">0 Healthy</span>
        <span className="text-yellow-400">50</span>
        <span className="text-destructive">100 Distress</span>
      </div>
    </motion.div>
  );
};

export default RiskGauge;
