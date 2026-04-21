import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cog, Zap, Building2, RefreshCw, ShieldCheck } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    { icon: Cog, title: "ETL/ELT Expertise", text: "4+ years designing and building production-grade ETL/ELT pipelines using Azure Data Factory, Databricks, and PySpark, processing millions of records across batch and incremental workflows." },
    { icon: Zap, title: "Spark & PySpark Processing", text: "Deep expertise in distributed data processing using Apache Spark, optimizing partitioning strategies and join logic to achieve 25% faster execution times." },
    { icon: Building2, title: "Lakehouse Architecture", text: "Designed end-to-end lakehouse architectures on ADLS Gen2 with Delta Lake, enabling unified ingestion and transformation of structured and semi-structured data." },
    { icon: RefreshCw, title: "Real-Time Pipelines", text: "Built event-driven streaming pipelines using Kafka and Spark Structured Streaming, enabling real-time data processing for fraud detection and compliance." },
    { icon: ShieldCheck, title: "Data Quality Systems", text: "Implemented comprehensive data validation frameworks using Python and SQL, identifying duplicates and schema issues — improving data accuracy by 35%." },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader title="About" accent="Me" subtitle="The Architect" />
          
          <ThreeDCard>
            <div className="glass rounded-3xl p-10 md:p-16 space-y-10 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -z-10" />
              
              <div className="grid gap-8">
                {items.map((item, i) => (
                  <motion.div
                    key={item.title}
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

