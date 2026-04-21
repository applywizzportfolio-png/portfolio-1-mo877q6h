import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cog, Zap, Building2, RefreshCw, ShieldCheck, User } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";
import { PortfolioData, parseLines } from "@/hooks/usePortfolioData";

interface AboutSectionProps {
  data: PortfolioData;
}

const AboutSection = ({ data }: AboutSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Use summary for the primary text if possible, otherwise use experience/project bits
  const summaryLines = parseLines(data.summary);
  
  // Default items if no summary lines found, or map summary areas to icons
  const icons = [Cog, Zap, Building2, RefreshCw, ShieldCheck];
  const items = summaryLines.length > 0 
    ? summaryLines.slice(0, 5).map((text, i) => ({
        icon: icons[i % icons.length],
        title: `Expertise Area ${i + 1}`,
        text: text
      }))
    : [
        { icon: User, title: "Professional Profile", text: data.summary || "Highly skilled professional with extensive experience in the field." }
      ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader title="About" accent={data.personal.name?.split(' ')[0] || "Me"} subtitle="Professional Profile" />
          
          <ThreeDCard>
            <div className="glass rounded-3xl p-10 md:p-16 space-y-10 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -z-10" />
              
              <div className="grid gap-8">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    className="flex gap-6 group hover:translate-x-2 transition-transform"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-4 rounded-2xl bg-secondary/50 border border-white/5 group-hover:bg-primary/10 transition-colors">
                        <ThreeDIcon icon={item.icon} size={28} color="hsl(var(--primary))" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">{item.title}</h3>
                      <p className="text-base text-muted-foreground font-body leading-relaxed max-w-3xl">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </section>
  );
};

export const SectionHeader = ({ title, accent, subtitle }: { title: string; accent?: string; subtitle: string }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-transparent" />
      <span className="text-xs font-heading font-black tracking-[0.4em] text-primary uppercase">{subtitle}</span>
    </div>
    <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-none">
      <span className="text-foreground">{title}</span>
      {accent && <span className="gradient-text"> {accent}</span>}
    </h2>
  </div>
);

export default AboutSection;
