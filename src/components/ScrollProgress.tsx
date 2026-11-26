import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ThemeMode } from './Navigation';

interface ScrollProgressProps {
  theme: ThemeMode;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none"
    >
      <motion.div
        className="h-full bg-[#1E90FF] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
