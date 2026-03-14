import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

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
      className="glass rounded-2xl neon-border p-6"
    >
      <h3 className="font-display text-sm font-semibold tracking-wide text-foreground mb-4">Emotional Radar Analysis</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(240, 15%, 18%)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11, fontFamily: "Inter" }}
            />
            <Radar
              name="Emotions"
              dataKey="value"
              stroke="hsl(180, 100%, 50%)"
              fill="hsl(180, 100%, 50%)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EmotionalRadar;
