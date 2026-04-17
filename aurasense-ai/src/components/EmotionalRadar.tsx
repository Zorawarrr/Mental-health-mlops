import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

interface EmotionalRadarProps {
  data?: { subject: string; value: number }[];
}

const defaultData = [
  { subject: "Stress", value: 30 },
  { subject: "Anxiety", value: 25 },
  { subject: "Fatigue", value: 40 },
  { subject: "Mood", value: 65 },
  { subject: "Energy", value: 55 },
];

const EmotionalRadar = ({ data = defaultData }: EmotionalRadarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl neon-border p-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
    >
      <h3 className="font-display text-sm font-semibold tracking-wide text-foreground mb-4">Emotional Radar Analysis</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(180, 100%, 25%)" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(180, 100%, 75%)", fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-morphism border border-primary/30 p-2 rounded-lg shadow-xl">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">{payload[0].payload.subject}</p>
                      <p className="text-sm font-black text-primary">{payload[0].value}% Confidence</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Emotional Metrics"
              dataKey="value"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.2}
              strokeWidth={2}
              activeDot={{ r: 4, fill: "var(--primary)", stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EmotionalRadar;
