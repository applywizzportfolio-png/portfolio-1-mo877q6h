import React, { useState, useCallback } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import DataFlowBackground from "@/components/DataFlowBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import { PageTransition3D } from "@/components/3d/PageTransition3D";
import { ThreeDIcon } from "@/components/3d/ThreeDIcon";
import { Heart } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const PortfolioContent = () => {
  const [loaded, setLoaded] = useState(false);
  const onComplete = useCallback(() => setLoaded(true), []);
  const { data, loading } = usePortfolioData();

  // Keep loading screen until both the animation AND the data are ready
  const ready = loaded && !loading;

  return (
    <>
      {!ready && <LoadingScreen onComplete={onComplete} />}
      {ready && (
        <div className="relative min-h-screen">
          <Header name={data.personal.name} />
          <PageTransition3D>
            <div className="relative">
              <DataFlowBackground />
              <main className="relative z-10">
                <HeroSection data={data} />
                <AboutSection data={data} />
                <ExperienceSection experiences={data.experiences} />
                <ProjectsSection projectsRaw={data.projects} />
                <SkillsSection skills={data.skills} />
                <EducationSection educations={data.educations} />
                <CertificationsSection certificationsRaw={data.certifications} />
                <ContactSection contact={data.personal} />
                <footer className="py-12 px-6 border-t border-border/10 text-center bg-background/50 backdrop-blur-md">
                  <div className="flex flex-col items-center gap-4">
                    <ThreeDIcon icon={Heart} color="hsl(var(--primary))" size={32} className="mb-2" />
                    <p className="text-sm text-muted-foreground font-body tracking-wider">
                      © 2025 {data.personal.name || "Portfolio"} · Crafted with Precision
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
                  </div>
                </footer>
              </main>
            </div>
          </PageTransition3D>
        </div>
      )}
    </>
  );
};

const Index = () => (
  <ThemeProvider>
    <PortfolioContent />
  </ThemeProvider>
);

export default Index;
