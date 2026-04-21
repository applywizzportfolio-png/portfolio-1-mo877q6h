import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageTransition3D } from "@/components/3d/PageTransition3D";
import { ThreeDCard } from "@/components/3d/ThreeDCard";
import { ThreeDIcon } from "@/components/3d/ThreeDIcon";
import { AlertCircle, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition3D>
      <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <ThreeDCard className="max-w-md w-full px-6">
          <div className="glass rounded-3xl p-12 text-center border border-white/5 shadow-2xl relative overflow-hidden">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="p-6 rounded-2xl bg-secondary border border-white/10 shadow-inner">
                <ThreeDIcon icon={AlertCircle} size={64} color="hsl(var(--primary))" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-8xl font-heading font-black tracking-tighter gradient-text mb-4"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
            >
              404
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-muted-foreground font-heading font-bold mb-10"
            >
              System Route Not Found
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="/" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl gradient-bg text-accent-foreground font-heading font-black text-sm uppercase tracking-widest hover:shadow-xl hover:shadow-primary/20 transition-all group"
              >
                <ThreeDIcon icon={Home} size={18} color="white" /> Re-establish Uplink
              </a>
            </motion.div>
          </div>
        </ThreeDCard>
      </div>
    </PageTransition3D>
  );
};

export default NotFound;

