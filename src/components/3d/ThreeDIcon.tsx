import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ThreeDIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

export const ThreeDIcon: React.FC<ThreeDIconProps> = ({ 
  icon: Icon, 
  size = 24, 
  color = "currentColor",
  className = "" 
}) => {
  return (
    <motion.div
      whileHover={{ 
        rotateY: 180,
        z: 50,
        scale: 1.2
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
    >
      <Icon 
        size={size} 
        color={color} 
        className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
      />
      
      {/* Back side of the icon (mirrored effect) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ rotateY: 180, opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <Icon 
          size={size} 
          color={color} 
          className="opacity-50 blur-[1px]"
        />
      </motion.div>
    </motion.div>
  );
};
