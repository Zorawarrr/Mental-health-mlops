import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { Brain, Database, Layers, BarChart3, Target, Percent, TrendingUp, Award } from "lucide-react";

const metrics = [
  { label: "Accuracy", value: "87.2%", icon: Target, color: "text-neon-cyan" },
  { label: "Precision", value: "85.8%", icon: Percent, color: "text-neon-green" },
  { label: "Recall", value: "86.4%", icon: TrendingUp, color: "text-neon-purple" },
  { label: "F1 Score", value: "86.1%", icon: Award, color: "text-primary" },
];

const pipelineSteps = [
  { step: "1", title: "Text Preprocessing", description: "Tokenization, lowercasing, stopword removal, and text normalization to clean raw input data.", icon: Layers },
  { step: "2", title: "TF-IDF Vectorization", description: "Convert text into numerical feature vectors using Term Frequency-Inverse Document Frequency weighting.", icon: BarChart3 },
  { step: "3", title: "Logistic Regression", description: "Binary classification using logistic regression to predict emotional sentiment from vectorized features.", icon: Brain },
];

const ModelInsights = () => {
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
              Model <span className="text-primary neon-text-cyan">Insights</span>
            </h1>
            <p className="text-muted-foreground text-sm">Understanding the machine learning pipeline behind the analysis engine.</p>
          </motion.div>

          {/* Model Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl neon-border p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">Model Architecture</h3>
                  <p className="text-xs text-muted-foreground">Core classification engine</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <p className="text-xs text-muted-foreground uppercase font-mono mb-1">Model Type</p>
                  <p className="text-sm font-semibold text-foreground">Logistic Regression with TF-IDF Features</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <p className="text-xs text-muted-foreground uppercase font-mono mb-1">Dataset</p>
                  <p className="text-sm font-semibold text-foreground">Sentiment140</p>
                  <p className="text-xs text-muted-foreground mt-1">1.6 million labeled tweets for sentiment classification</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <p className="text-xs text-muted-foreground uppercase font-mono mb-1">Backend</p>
                  <p className="text-sm font-semibold text-foreground">FastAPI + Docker</p>
                  <p className="text-xs text-muted-foreground mt-1">Containerized for reproducible deployment</p>
                </div>
              </div>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl neon-border p-6"
            >
              <h3 className="font-display text-sm font-semibold tracking-wide text-foreground mb-5">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="p-5 rounded-xl bg-muted/20 border border-border/30 text-center"
                  >
                    <metric.icon className={`w-6 h-6 mx-auto mb-3 ${metric.color}`} />
                    <p className={`font-display text-2xl font-black ${metric.color}`}>{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl neon-border p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">ML Pipeline</h3>
                <p className="text-xs text-muted-foreground">End-to-end processing flow</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                  className="relative p-5 rounded-xl bg-muted/20 border border-border/30"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-display text-xs font-bold text-primary">
                      {step.step}
                    </div>
                    <step.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  {i < pipelineSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-center text-muted-foreground/50 font-mono">→</div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ModelInsights;
