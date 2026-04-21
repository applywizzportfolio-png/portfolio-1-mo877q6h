import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { GraduationCap, Award } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";
import { ParsedEducation } from "@/hooks/usePortfolioData";

interface EducationSectionProps {
  educations: ParsedEducation[];
}

const EducationSection = ({ educations }: EducationSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (educations.length === 0) return null;

  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Academic" accent="Foundation" subtitle="Education" />

        <div className="space-y-8 mt-16">
          {educations.map((edu, idx) => (
            <ThreeDCard key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="glass rounded-[2rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-white/5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                
                <div className="w-24 h-24 rounded-3xl bg-secondary border border-white/10 flex items-center justify-center flex-shrink-0 shadow-2xl">
                  <ThreeDIcon icon={GraduationCap} size={48} color="hsl(var(--primary))" />
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <span className="text-[11px] font-heading font-black tracking-[0.2em] text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-6 inline-block">
                    {edu.year}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
                    {edu.degree}
                  </h3>
                  <p className="text-xl text-muted-foreground font-heading font-bold mb-6">
                    {edu.institution}
                  </p>
                  {edu.grade && (
                    <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-primary font-heading font-black uppercase tracking-widest">
                      <Award size={18} />
                      Grade: {edu.grade}
                    </div>
                  )}
                </div>
              </motion.div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
