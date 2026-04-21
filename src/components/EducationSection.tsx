import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Academic" accent="Foundation" subtitle="Education" />

        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass rounded-[2rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
            
            <div className="w-24 h-24 rounded-3xl bg-secondary border border-white/10 flex items-center justify-center flex-shrink-0 shadow-2xl">
              <ThreeDIcon icon={GraduationCap} size={48} color="hsl(var(--primary))" />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-xs font-heading font-black tracking-[0.3em] text-primary uppercase">Postgraduate</span>
              </div>
              <h3 className="font-heading font-black text-4xl text-foreground tracking-tighter mb-2">Master of Science in Computer Science</h3>
              <p className="text-2xl text-muted-foreground font-heading font-bold mb-4">Texas A&M University · Corpus Christi, TX</p>
              
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-heading font-black tracking-widest text-muted-foreground uppercase mb-1">Duration</p>
                  <p className="text-sm font-heading font-bold text-foreground">Jan 2024 – Dec 2025</p>
                </div>
                <div className="w-px h-8 bg-white/5 hidden sm:block" />
                <div>
                  <p className="text-[10px] font-heading font-black tracking-widest text-muted-foreground uppercase mb-1">Status</p>
                  <p className="text-sm font-heading font-bold text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Active Enrollment
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </ThreeDCard>
      </div>
    </section>
  );
};

export default EducationSection;


