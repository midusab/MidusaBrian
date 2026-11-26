import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { ThemeMode } from '../types/portfolio';

interface GlobalPointerLightProps {
  theme: ThemeMode;
}

export const GlobalPointerLight: React.FC<GlobalPointerLightProps> = ({ theme }) => {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';
  const hasPointerMovedRef = useRef(false);

  const initialX = typeof window !== 'undefined' ? window.innerWidth * 0.58 : 720;
  const initialY = typeof window !== 'undefined' ? window.innerHeight * 0.44 : 360;

  const targetX = useMotionValue(initialX);
  const targetY = useMotionValue(initialY);

  const smoothX = useSpring(targetX, { stiffness: 105, damping: 24, mass: 0.65 });
  const smoothY = useSpring(targetY, { stiffness: 105, damping: 24, mass: 0.65 });

  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 140, damping: 28 });

  // Subtle inertial lag and organic orbital drift driven by scroll across the entire document
  const scrollLagY = useTransform(smoothVelocity, [-2400, 0, 2400], [44, 0, -44]);
  const scrollWaveX = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 3) * 28);
  const scrollScale = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [1.14, 1, 1.14]
  );

  const combinedX = useTransform([smoothX, scrollWaveX], ([x, wave]: number[]) => x + wave);
  const combinedY = useTransform([smoothY, scrollLagY], ([y, lag]: number[]) => y + lag);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isFinePointer) return;
      hasPointerMovedRef.current = true;
      targetX.set(e.clientX);
      targetY.set(e.clientY);
    };

    const handleScrollDrift = () => {
      if (hasPointerMovedRef.current) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      targetX.set(vw * (0.58 + Math.sin(progress * Math.PI * 2.5) * 0.22));
      targetY.set(vh * (0.44 + Math.cos(progress * Math.PI * 2) * 0.14));
    };

    const handleResize = () => {
      if (!hasPointerMovedRef.current) {
        handleScrollDrift();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScrollDrift, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScrollDrift);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldReduceMotion, targetX, targetY]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[25] overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 will-change-transform"
        style={{
          x: combinedX,
          y: combinedY,
          scale: scrollScale,
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[560px] lg:h-[560px] rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(30,144,255,0.16) 0%, rgba(30,144,255,0.045) 44%, rgba(11,13,16,0) 74%)'
              : 'radial-gradient(circle, rgba(30,144,255,0.11) 0%, rgba(30,144,255,0.025) 44%, rgba(255,255,255,0) 74%)',
          }}
        />
        <div
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1E90FF]/90"
          style={{
            boxShadow: '0 0 28px 8px rgba(30, 144, 255, 0.32)',
          }}
        />
      </motion.div>
    </div>
  );
};
