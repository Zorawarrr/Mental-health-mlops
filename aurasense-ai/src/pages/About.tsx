import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { Brain, Server, Layout, Shield, Code, Cpu } from "lucide-react";

  { name: "PyTorch + HuggingFace", description: "Deep learning libraries powering the Hybrid GNN and BERT embeddings", icon: Brain },
  { name: "FastAPI", description: "High-performance Python web framework for the prediction API", icon: Server },
  { name: "React + Tailwind", description: "Modern frontend stack with utility-first CSS", icon: Layout },
  { name: "Docker", description: "Containerized deployment for reproducibility", icon: Cpu },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <main className="relative z-10 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              About <span className="text-primary neon-text-cyan">the Project</span>
            </h1>
            <p className="text-muted-foreground text-sm">Learn more about the AI Mental Health Early Warning System.</p>
          </motion.div>

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl neon-border p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-sm font-semibold tracking-wide text-foreground">Project Overview</h2>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-semibold">AI Mental Health Early Warning System</span> is a machine learning application designed to detect emotional distress signals from textual input.
              </p>
              <p>
                The system analyzes user text using natural language processing and predicts emotional sentiment patterns. The backend is built using FastAPI and the model is containerized with Docker for reproducible deployment.
              </p>
              <p>
                The frontend dashboard visualizes predictions and emotional risk indicators, providing an intuitive interface for real-time sentiment analysis.
              </p>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl neon-border p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-display text-sm font-semibold tracking-wide text-foreground">Key Features</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Real-time text sentiment analysis using Hybrid GNN (GCN + BERT)",
                "Dynamic risk gauge visualization with animated transitions",
                "Emotional radar chart mapping stress, anxiety, fatigue, mood, and energy",
                "AI-generated insights with contextual recommendations",
                "Privacy-first design — no data stored on servers",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl neon-border p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-neon-green" />
              </div>
              <h2 className="font-display text-sm font-semibold tracking-wide text-foreground">Technology Stack</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  className="p-4 rounded-xl bg-muted/20 border border-border/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <tech.icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">{tech.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;
