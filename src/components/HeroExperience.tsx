import React, { useRef } from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import {
  motion,
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const headlineY = useTransform(smoothProgress, [0, 0.85], [0, -52]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.72], [1, 0.12]);
  const ambientBgY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const floatingAccentY = useTransform(smoothProgress, [0, 1], [0, -70]);

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

      {/* Subtle chromatic ambient background glow with parallax depth */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: ambientBgY }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 lg:right-1/4 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full filter blur-[100px] opacity-30 will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(30,144,255,0.25) 0%, rgba(239,68,68,0.14) 40%, rgba(16,185,129,0.12) 70%, transparent 85%)'
              : 'radial-gradient(circle, rgba(30,144,255,0.18) 0%, rgba(239,68,68,0.08) 40%, rgba(16,185,129,0.08) 70%, transparent 85%)',
          }}
        />
      </motion.div>

      {/* Floating dynamic accent geometry */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: floatingAccentY }}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-6 lg:left-20 w-48 h-48 rounded-full filter blur-[60px] opacity-20 will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(30,144,255,0.2) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(30,144,255,0.12) 60%, transparent 80%)',
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
              Every great thing begins with
              <span className="block">a question.</span>
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
                data-cursor="DISCOVER"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onScrollNext}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors duration-150 whitespace-nowrap shadow-[0_4px_20px_-4px_rgba(30,144,255,0.36)]"
              >
                <span>Begin the story</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </motion.button>
              <motion.button
                type="button"
                data-cursor="PROJECTS"
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

      {/* Bottom chapter demarcation line with subtle chromatic gradient */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] pt-4">
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-[#1E90FF]/35 to-transparent"
        />
      </div>
    </section>
  );
};
