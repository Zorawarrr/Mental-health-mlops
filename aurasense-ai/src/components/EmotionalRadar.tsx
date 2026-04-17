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
            <PolarGrid stroke="rgba(0, 242, 255, 0.2)" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#00f2ff", fontSize: 12, fontWeight: 700 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/90 border border-[#00f2ff] p-3 rounded-xl shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                      <p className="text-[10px] uppercase tracking-widest text-[#00f2ff] font-black mb-1">{payload[0].payload.subject}</p>
                      <p className="text-lg font-black text-white">{payload[0].value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Emotional Metrics"
              dataKey="value"
              stroke="#00f2ff"
              fill="#00f2ff"
              fillOpacity={0.4}
              strokeWidth={3}
              activeDot={{ r: 6, fill: "#00f2ff", stroke: "#fff", strokeWidth: 2 }}
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
