import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Award, ExternalLink } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const certifications = [
  { name: "Databricks Fundamentals Accreditation", issuer: "Databricks" },
  { name: "Introduction to Large Language Models", issuer: "Google Cloud" },
  { name: "Google Cloud Data Engineering Professional Certificate", issuer: "Coursera" },
  { name: "Data Engineering on Google Cloud", issuer: "Coursera" },
  { name: "Azure Data Engineer Associate Learning Path", issuer: "LinkedIn Learning" },
  { name: "Learning Data Engineering Foundations", issuer: "LinkedIn Learning" },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Professional" accent="Certifications" subtitle="Specializations" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certifications.map((cert, i) => (
            <ThreeDCard key={cert.name}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-8 flex flex-col h-full border border-white/5 hover:border-primary/20 transition-all group shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 mb-8 group-hover:bg-primary/20 transition-colors shadow-inner">
                  <ThreeDIcon icon={Award} size={28} color="hsl(var(--primary))" />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] font-heading font-black tracking-[0.3em] text-primary uppercase mb-2">
                    {cert.issuer}
                  </span>
                  <p className="text-lg font-heading font-black text-muted-foreground group-hover:text-foreground transition-colors leading-tight mb-6 tracking-tight">
                    {cert.name}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-heading font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Verify Credential <ExternalLink size={14} />
                  </div>
                </div>
              </motion.div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};


export default CertificationsSection;
