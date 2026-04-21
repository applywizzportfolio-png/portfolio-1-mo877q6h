import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Brain, Database, Radio, ExternalLink } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const projects = [
  {
    title: "AI Data Pipeline for LLM Monitoring",
    tag: "AI / ML Ops",
    icon: Brain,
    image: "/project-ai-pipeline.jpg",
    tech: ["Python", "PySpark", "Delta Lake", "Kafka", "Snowflake"],
    metrics: ["3,000+ LLM interactions processed", "Risk classification pipeline", "20-50% unsafe response reduction"],
    description: "Engineered a distributed pipeline processing LLM interactions with real-time ingestion via Kafka and Spark Structured Streaming.",
    color: "var(--primary)",
  },
  {
    title: "End-to-End Cloud Lakehouse Pipeline",
    tag: "Lakehouse",
    icon: Database,
    image: "/project-lakehouse.jpg",
    tech: ["ADLS Gen2", "ADF", "Databricks", "PySpark", "Snowflake"],
    metrics: ["CDC pipelines for continuous sync", "Batch + incremental processing", "Optimized BI reporting"],
    description: "Designed a lakehouse architecture enabling unified ingestion and transformation of structured and semi-structured data.",
    color: "var(--teal)",
  },
  {
    title: "Real-Time Transaction Analytics Platform",
    tag: "Streaming",
    icon: Radio,
    image: "/project-streaming.jpg",
    tech: ["Kafka", "Spark Streaming", "Azure Databricks", "Snowflake", "Power BI"],
    metrics: ["High-volume streaming data", "Near real-time analytics", "Faster dashboard refreshes"],
    description: "Built event-driven ingestion pipelines using Kafka and ADF, processing streaming data with Spark Structured Streaming.",
    color: "var(--electric)",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Featured" accent="Projects" subtitle="Data Engineering Excellence" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThreeDCard>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + index * 0.15, duration: 0.8, ease: "easeOut" }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="glass rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/20 transition-colors h-full flex flex-col"
      >
        {/* Project Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 right-4">
            <div className="p-2 rounded-xl glass border border-white/10 shadow-2xl">
              <ThreeDIcon icon={project.icon} size={20} color={project.color} />
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4">
            <span 
              className="text-[10px] font-heading font-black tracking-widest uppercase px-3 py-1.5 rounded-lg glass border border-white/10 shadow-xl"
              style={{ color: project.color }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <h3 className="font-heading font-black text-xl text-foreground mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
            {project.title}
            <ExternalLink size={18} className="translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
          </h3>

          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mt-auto space-y-6">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-[10px] font-heading font-black uppercase tracking-tighter px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground border border-white/5">
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <motion.div
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              initial={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-6 border-t border-white/5">
                {project.metrics.map((m) => (
                  <div key={m} className="flex items-center gap-3 text-xs text-muted-foreground font-heading font-medium">
                    <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{ background: project.color }} />
                    {m}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ThreeDCard>
  );
};

export default ProjectsSection;

