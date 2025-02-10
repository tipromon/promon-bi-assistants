import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
}

export function ShinyText({ text, className = '' }: ShinyTextProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <span className="bg-gradient-to-r from-blue-900 via-orange-500 to-blue-900 text-transparent bg-clip-text font-bold">
          {text}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
          }}
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </motion.div>
  );
}