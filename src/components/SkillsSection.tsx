import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Cloud, Cpu, GitBranch, Radio, Code, BarChart3 } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const skillCategories = [
  {
    layer: "Cloud & Data Platforms",
    color: "hsl(var(--primary))",
    icon: Cloud,
    skills: ["Azure Data Factory", "Azure Databricks", "ADLS Gen2", "Synapse Analytics", "Snowflake", "AWS S3", "AWS Glue", "Redshift"],
  },
  {
    layer: "Data Processing",
    color: "hsl(var(--teal))",
    icon: Cpu,
    skills: ["Apache Spark", "PySpark", "Spark SQL", "Hadoop", "Hive", "Delta Lake"],
  },
  {
    layer: "ETL & Orchestration",
    color: "hsl(var(--electric))",
    icon: GitBranch,
    skills: ["Azure Data Factory", "Apache Airflow", "dbt", "Change Data Capture", "Workflow Orchestration"],
  },
  {
    layer: "Streaming & Real-Time",
    color: "hsl(var(--accent))",
    icon: Radio,
    skills: ["Kafka", "Spark Structured Streaming", "Event-Driven Pipelines"],
  },
  {
    layer: "Programming & Data Modeling",
    color: "hsl(var(--primary))",
    icon: Code,
    skills: ["Python", "SQL", "Java", "Star Schema", "Snowflake Schema", "Dimensional Modeling"],
  },
  {
    layer: "DevOps & Analytics",
    color: "#00A8A8",
    icon: BarChart3,
    skills: ["CI/CD", "Git", "Azure DevOps", "Jenkins", "Power BI", "Data Visualization"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Tech" accent="Stack" subtitle="Precision Engineering" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((cat, i) => (
            <ThreeDCard key={cat.layer}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="h-full glass border border-white/5 rounded-2xl p-8 hover:border-primary/20 transition-all flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-secondary/50 border border-white/5 shadow-inner">
                    <ThreeDIcon icon={cat.icon} size={28} color={cat.color} />
                  </div>
                  <h3 className="text-lg font-heading font-black tracking-tight text-foreground">{cat.layer}</h3>
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

