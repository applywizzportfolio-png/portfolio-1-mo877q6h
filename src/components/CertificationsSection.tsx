import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Award, ExternalLink } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";
import { parseCertifications } from "@/hooks/usePortfolioData";

interface CertificationsSectionProps {
  certificationsRaw: string;
}

const CertificationsSection = ({ certificationsRaw }: CertificationsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = parseCertifications(certificationsRaw);

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Professional" accent="Certifications" subtitle="Specializations" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certifications.map((cert, i) => (
            <ThreeDCard key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all group h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-secondary border border-white/10 group-hover:bg-primary/10 transition-colors">
                    <ThreeDIcon icon={Award} size={24} color="hsl(var(--primary))" />
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="font-heading font-black text-lg text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-auto">
                  {cert.issuer}
                </p>
              </motion.div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
