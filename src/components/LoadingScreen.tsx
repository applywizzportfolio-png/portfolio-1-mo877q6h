import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Initializing Data Pipelines…",
  "Loading Lakehouse Architecture…",
  "Syncing Real-Time Streams…",
  "Connecting to Data Platform…",
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowName(true), 300);
          setTimeout(() => setExit(true), 2000);
          setTimeout(onComplete, 2600);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Animated pipeline lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-teal to-transparent"
                style={{ top: `${15 + i * 15}%`, width: "100%" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
              />
            ))}
          </div>

          {!showName ? (
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Pipeline loading dots */}
              <div className="flex gap-2 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-teal"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-body tracking-widest text-muted-foreground uppercase"
                >
                  {messages[msgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 text-center"
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold gradient-text tracking-tight">
                SOWJANYA ALLAM
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-sm tracking-[0.3em] text-muted-foreground uppercase font-body"
              >
                Data Engineer
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
