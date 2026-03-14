import { motion } from "framer-motion";
import { Activity, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated bg elements */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse-neon" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-neon" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border text-xs font-mono text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-neon" />
            AI-Powered Sentiment Analysis Engine v2.0
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            <span className="text-foreground">AI Mental Health</span>
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-neon-green to-neon-purple bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Early Warning System
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Detect emotional distress signals using AI-powered sentiment analysis.
            Real-time monitoring with clinical-grade accuracy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: Activity, label: "Real-time Analysis", color: "text-neon-cyan" },
            { icon: Shield, label: "Privacy-First", color: "text-neon-green" },
            { icon: Zap, label: "Instant Results", color: "text-neon-purple" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
