import React from 'react';
import { motion } from 'framer-motion';

interface PageTransition3DProps {
  children: React.ReactNode;
}

const variants = {
  initial: {
    opacity: 0,
    rotateY: -15,
    x: -50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    rotateY: 15,
    x: 50,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const PageTransition3D: React.FC<PageTransition3DProps> = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
      style={{ perspective: 1500 }}
    >
      {children}
    </motion.div>
  );
};

export const MotionSection = motion.section;
export const MotionDiv = motion.div;
