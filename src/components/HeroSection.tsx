import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Database, Zap, Server, BarChart3 } from "lucide-react";
import { ThreeDIcon } from "./3d/ThreeDIcon";
import { PortfolioData } from "@/hooks/usePortfolioData";

interface HeroSectionProps {
  data: PortfolioData;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const name = data.personal?.name || "Your Name";
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName  = nameParts.slice(1).join(" ");
  const role      = data.targetRole || "Portfolio";
  const summary   = data.summary || "";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-teal/10 rounded-full blur-[100px] animate-pulse" />

      <div className="max-w-4xl mx-auto px-6 w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* TOP BADGE */}
          <div className="flex justify-center items-center gap-4">
            <ThreeDIcon icon={Database} size={26} color="hsl(var(--primary))" />
            <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <span className="text-sm tracking-[0.4em] text-primary uppercase font-heading">
              {role}
            </span>
          </div>

          {/* NAME */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.9] tracking-tight">
            <span className="gradient-text">{firstName}</span>
            {lastName && (
              <>
                <br />
                <span className="text-foreground">{lastName}</span>
              </>
            )}
          </h1>

          {/* SUMMARY */}
          {summary && (
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
              {summary.length > 200 ? summary.substring(0, 200) + "…" : summary}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl gradient-bg text-white font-bold flex items-center gap-2"
            >
              <ThreeDIcon icon={Server} size={16} color="white" />
              Explore Projects
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-xl border border-primary text-primary font-bold flex items-center gap-2"
            >
              <ThreeDIcon icon={Download} size={16} color="hsl(var(--primary))" />
              Download Resume
            </motion.a>
          </div>

          {/* SKILLS PREVIEW STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border/10">
            {[
              { label: "Skills", value: String(data.skills?.length || 0) + "+", icon: Zap },
              { label: "Experience Roles", value: String(data.experiences?.length || 0), icon: BarChart3 },
              { label: "Certifications", value: String(
                data.certifications?.split("\n").filter(Boolean).length || 0
              ), icon: Database },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <ThreeDIcon icon={stat.icon} size={22} color="hsl(var(--primary))" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* SCROLL ICON */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-10 flex justify-center"
          >
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center">
              <ArrowDown size={18} className="text-primary" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
