import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Briefcase, TrendingUp, Clock, Target, ChevronRight } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  metrics: { label: string; value: string; color: string; icon: typeof TrendingUp }[];
  highlights: string[];
}

const jobs: Job[] = [
  {
    title: "Data Engineer",
    company: "Tata Consultancy Services",
    location: "Hyderabad, India",
    period: "Nov 2021 – Oct 2023",
    metrics: [
      { label: "Transactions Processed", value: "4M+", color: "hsl(var(--teal))", icon: Target },
      { label: "Data Availability", value: "+30%", color: "hsl(var(--primary))", icon: TrendingUp },
      { label: "Manual Effort Reduced", value: "-40%", color: "hsl(var(--accent))", icon: Clock },
      { label: "Data Accuracy", value: "+35%", color: "hsl(var(--electric))", icon: Target },
    ],
    highlights: [
      "Engineered scalable ETL pipelines using ADF and Databricks on ADLS Gen2 with medallion architecture",
      "Optimized PySpark and Spark SQL transformations, reducing execution time by 25%",
      "Designed analytical data models in Snowflake using star schema for Power BI dashboards",
      "Integrated Kafka streaming with Azure Databricks for real-time analytics",
      "Automated CI/CD deployments using Git and Azure DevOps",
    ],
  },
  {
    title: "Data Platform Engineer",
    company: "Tata Consultancy Services",
    location: "Mumbai, India",
    period: "May 2019 – Oct 2021",
    metrics: [
      { label: "Datasets Processed", value: "3M+", color: "hsl(var(--teal))", icon: Target },
      { label: "Manual Effort Reduced", value: "-45%", color: "hsl(var(--primary))", icon: Clock },
      { label: "Data Quality Improved", value: "+25%", color: "hsl(var(--accent))", icon: TrendingUp },
    ],
    highlights: [
      "Developed scalable data validation frameworks using Python and SQL for clinical datasets",
      "Built reusable profiling modules to identify missing values and schema inconsistencies",
      "Implemented reconciliation logic comparing source and target systems",
      "Generated data quality reports using SQL and Power BI",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Work" accent="Experience" subtitle="Architectural Journey" />

        <div className="relative mt-20">
          {/* Pipeline connector line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-teal to-electric opacity-20 transform lg:-translate-x-1/2" />

          <div className="space-y-24">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.3, duration: 0.8, ease: "easeOut" }}
                className="relative grid lg:grid-cols-2 gap-12"
              >
                {/* Timeline node */}
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 top-0 z-20">
                  <motion.div
                    className="w-16 h-16 rounded-2xl border-2 border-primary/20 bg-secondary backdrop-blur-xl flex items-center justify-center shadow-2xl"
                    initial={{ rotate: -45, scale: 0 }}
                    animate={inView ? { rotate: 0, scale: 1 } : {}}
                    transition={{ delay: 0.5 + idx * 0.3, type: "spring" }}
                  >
                    <ThreeDIcon icon={Briefcase} size={24} color="hsl(var(--primary))" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`ml-24 lg:ml-0 ${idx % 2 === 1 ? "lg:col-start-2" : "lg:text-right"}`}>
                  <ThreeDCard>
                    <div className="glass rounded-3xl p-8 border border-white/5 hover:border-primary/20 transition-all">
                      <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 0 ? "lg:justify-end" : ""}`}>
                        <span className="text-[11px] font-heading font-black tracking-[0.2em] text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                          {job.period}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-heading font-black text-foreground mb-1">{job.title}</h3>
                      <p className="text-base text-muted-foreground font-heading font-bold mb-8 italic">
                        {job.company} · {job.location}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {job.metrics.map((m) => (
                          <div key={m.label} className="rounded-2xl bg-secondary/40 p-5 border border-white/5 hover:bg-secondary/60 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                              <ThreeDIcon icon={m.icon} size={20} color={m.color} />
                              <p className="text-2xl font-heading font-black tracking-tighter" style={{ color: m.color }}>{m.value}</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-heading font-bold uppercase tracking-widest">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <ul className={`space-y-3 ${idx % 2 === 0 ? "lg:text-right" : ""}`}>
                        {job.highlights.map((h, i) => (
                          <li key={i} className={`flex gap-3 text-sm text-muted-foreground font-body leading-relaxed ${idx % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                            <ChevronRight size={16} className={`text-primary mt-1 flex-shrink-0 ${idx % 2 === 0 ? "rotate-180" : ""}`} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ThreeDCard>
                </div>

                {idx % 2 === 0 && <div className="hidden lg:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

