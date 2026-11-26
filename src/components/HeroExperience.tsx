import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ThemeMode } from '../types/portfolio';
import { GrainOverlay } from './GrainOverlay';

interface HeroExperienceProps {
  theme: ThemeMode;
  onScrollNext: () => void;
  onJumpToProjects: () => void;
}

export const HeroExperience: React.FC<HeroExperienceProps> = ({
  theme,
  onScrollNext,
  onJumpToProjects,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const pointerX = useMotionValue(58);
  const pointerY = useMotionValue(44);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.6 });
  const orbLeft = useMotionTemplate`${smoothX}%`;
  const orbTop = useMotionTemplate`${smoothY}%`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const headlineY = useTransform(smoothProgress, [0, 0.85], [0, -48]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.72], [1, 0.14]);
  const orbScale = useTransform(smoothProgress, [0, 0.75], [1, 1.35]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (e.clientY > rect.bottom) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      pointerX.set(Math.max(18, Math.min(84, x)));
      pointerY.set(Math.max(18, Math.min(82, y)));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [shouldReduceMotion, pointerX, pointerY]);

  return (
    <section
      id="chapter-opening"
      ref={containerRef}
      aria-labelledby="hero-headline"
      className={`relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-16 transition-colors duration-300 ${
        isDark ? 'bg-[#0B0D10] text-[#F5F5F5]' : 'bg-white text-[#0B0D10]'
      }`}
    >
      {isDark && <GrainOverlay />}

      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { scale: orbScale }}
        className="pointer-events-none absolute inset-0 origin-center"
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[560px] lg:h-[560px] rounded-full will-change-[left,top]"
          style={{
            left: orbLeft,
            top: orbTop,
            background: isDark
              ? 'radial-gradient(circle, rgba(30,144,255,0.2) 0%, rgba(30,144,255,0.05) 44%, rgba(11,13,16,0) 74%)'
              : 'radial-gradient(circle, rgba(30,144,255,0.14) 0%, rgba(30,144,255,0.03) 44%, rgba(255,255,255,0) 74%)',
          }}
        />
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1E90FF] will-change-[left,top]"
          style={{
            left: orbLeft,
            top: orbTop,
            boxShadow: '0 0 28px 8px rgba(30, 144, 255, 0.35)',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px]" />

      <motion.div
        style={shouldReduceMotion ? undefined : { y: headlineY, opacity: headlineOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] my-auto py-8 sm:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.h1
              id="hero-headline"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`editorial-hero-headline ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
              }`}
            >
              Every great thing begins with a question.
            </motion.h1>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-6 lg:pb-2"
          >
            <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              I&apos;m Midusa. A Computer Science student exploring how ideas become software.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onScrollNext}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors duration-150 whitespace-nowrap"
              >
                <span>Begin the story</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onJumpToProjects}
                className={`group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                  isDark
                    ? 'border-white/15 text-[#F5F5F5]'
                    : 'border-black/15 text-[#0B0D10]'
                }`}
              >
                <span>See what I&apos;ve built</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px]" />
    </section>
  );
};
