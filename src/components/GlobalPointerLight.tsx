import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
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
  const [cursorBadge, setCursorBadge] = useState<string | null>(null);

  const initialX = typeof window !== 'undefined' ? window.innerWidth * 0.58 : 720;
  const initialY = typeof window !== 'undefined' ? window.innerHeight * 0.44 : 360;

  const targetX = useMotionValue(initialX);
  const targetY = useMotionValue(initialY);

  // Pure DodgerBlue smooth spring tracking
  const smoothX = useSpring(targetX, { stiffness: 120, damping: 24, mass: 0.6 });
  const smoothY = useSpring(targetY, { stiffness: 120, damping: 24, mass: 0.6 });

  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 140, damping: 28 });

  // Subtle inertial lag and organic wave driven by document scroll
  const scrollLagY = useTransform(smoothVelocity, [-2400, 0, 2400], [36, 0, -36]);
  const scrollWaveX = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 3) * 22);
  const scrollScale = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [1.1, 1, 1.1]
  );

  const combinedX = useTransform([smoothX, scrollWaveX], ([x, wave]: number[]) => x + wave);
  const combinedY = useTransform([smoothY, scrollLagY], ([y, lag]: number[]) => y + lag);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      hasPointerMovedRef.current = true;
      targetX.set(e.clientX);
      targetY.set(e.clientY);

      // Context-aware cursor badge detection
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      const cursorTarget = targetElement?.closest('[data-cursor]');
      if (cursorTarget) {
        const badgeLabel = cursorTarget.getAttribute('data-cursor');
        if (badgeLabel && badgeLabel.trim()) {
          setCursorBadge(badgeLabel.trim());
          return;
        }
      }
      setCursorBadge(null);
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
        {/* Restrained Red ambient glow disc */}
        <div
          className="-translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(239,68,68,0.13) 0%, rgba(239,68,68,0.035) 45%, rgba(11,13,16,0) 72%)'
              : 'radial-gradient(circle, rgba(239,68,68,0.09) 0%, rgba(239,68,68,0.02) 45%, rgba(255,255,255,0) 72%)',
          }}
        />

        {/* Refined Red focal bead with modest shadow */}
        <div
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#EF4444] pointer-events-none transition-transform duration-200"
          style={{
            boxShadow: '0 0 16px 3px rgba(239, 68, 68, 0.45)',
          }}
        />

        {/* Context-Aware Dynamic Cursor Badge Pill */}
        <AnimatePresence>
          {cursorBadge && (
            <motion.div
              key={cursorBadge}
              initial={{ opacity: 0, scale: 0.75, y: -4, x: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 14 }}
              exit={{ opacity: 0, scale: 0.8, y: -2, x: 10 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 -translate-y-1/2 pointer-events-none select-none z-30"
            >
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase border shadow-lg backdrop-blur-md whitespace-nowrap ${
                  isDark
                    ? 'bg-[#0B0D10]/95 border-[#EF4444]/60 text-white shadow-black/80'
                    : 'bg-white/95 border-[#EF4444]/60 text-[#0B0D10] shadow-black/10'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                <span className="text-[#EF4444]">{cursorBadge}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
