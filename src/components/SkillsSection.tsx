import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Cloud, Cpu, GitBranch, Radio, Code, BarChart3, Database } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface SkillsSectionProps {
  skills: string[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Distribute skills into categories or just show a grid
  // Simple heuristic: if we have lots of skills, split them. Otherwise just one block.
  const categories = [
    {
      layer: "Core Expertise",
      color: "hsl(var(--primary))",
      icon: Code,
      skills: skills.slice(0, 10),
    },
    {
      layer: "Additional Tools",
      color: "hsl(var(--teal))",
      icon: Cpu,
      skills: skills.slice(10),
    }
  ].filter(c => c.skills.length > 0);

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Technical" accent="Arsenal" subtitle="Skill Architecture" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {categories.map((cat, i) => (
            <ThreeDCard key={cat.layer}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                className="glass rounded-3xl p-8 border border-white/5 h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-secondary border border-white/10 shadow-xl">
                    <ThreeDIcon icon={cat.icon} size={24} color={cat.color} />
                  </div>
                  <h3 className="font-heading font-black text-xl text-foreground tracking-tight">{cat.layer}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 + i * 0.1 + si * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        z: 20,
                        backgroundColor: "hsl(var(--primary))",
                        color: "white"
                      }}
                      className="text-[11px] font-heading font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-muted/40 text-muted-foreground border border-white/5 transition-all cursor-pointer select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
