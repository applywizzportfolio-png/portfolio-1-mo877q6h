import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Brain, Database, Radio, ExternalLink, Code } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";
import { parseProjects } from "@/hooks/usePortfolioData";

interface ProjectsSectionProps {
  projectsRaw: string;
}

const ProjectsSection = ({ projectsRaw }: ProjectsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const parsedProjects = parseProjects(projectsRaw);
  
  const icons = [Brain, Database, Radio, Code];
  const colors = ["var(--primary)", "var(--teal)", "var(--electric)", "var(--accent)"];

  const projects = parsedProjects.map((p, i) => ({
    ...p,
    tag: "Featured Project",
    icon: icons[i % icons.length],
    color: colors[i % colors.length],
    image: `https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop`, // Generic tech image
    metrics: ["Successfully Completed", "Innovative Solution"],
  }));

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Featured" accent="Projects" subtitle="Portfolio Gallery" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, inView }: { project: any; index: number; inView: boolean }) => {
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
              {project.tech.map((t: string) => (
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
                {project.metrics.map((m: string) => (
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
