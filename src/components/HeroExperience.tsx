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
  const bgParallaxY = useTransform(smoothProgress, [0, 1], [0, 60]);
  const bgParallaxScale = useTransform(smoothProgress, [0, 1], [1.03, 1.1]);

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

      {/* Full-width dynamic flow background image */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: bgParallaxY, scale: bgParallaxScale }}
        className="pointer-events-none absolute inset-0 z-0 w-full h-full overflow-hidden select-none"
      >
        <motion.img
          src="/assets/portraits/background.jpg"
          alt=""
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1.02, 1.06, 1.02],
                  x: [0, -10, 0],
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className={`w-full h-full object-cover object-center transition-opacity duration-700 will-change-transform ${
            isDark
              ? 'opacity-35 brightness-[0.72] contrast-[1.08] saturate-[0.85]'
              : 'opacity-20 brightness-[1.05] contrast-[0.95]'
          }`}
        />

        {/* Camouflage overlays melting background smoothly into the page canvas */}
        {isDark ? (
          <>
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/70 to-[#0B0D10]/50"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_20%,rgba(11,13,16,0.65)_65%,rgba(11,13,16,0.98)_100%)]"
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_20%,rgba(255,255,255,0.75)_65%,rgba(255,255,255,0.98)_100%)]"
            />
          </>
        )}
      </motion.div>

      {/* Subtle DodgerBlue ambient glow disc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 lg:right-1/4 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full filter blur-[110px] opacity-25 z-[1]"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(30,144,255,0.3) 0%, rgba(30,144,255,0.06) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(30,144,255,0.2) 0%, rgba(30,144,255,0.04) 50%, transparent 80%)',
        }}
      />

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
                    ? 'border-white/15 text-[#F5F5F5] bg-white/[0.02]'
                    : 'border-black/15 text-[#0B0D10] bg-white'
                }`}
              >
                <span>See what I&apos;ve built</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] flex items-center justify-between gap-4 text-xs">
        <p className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
          Junior Software Engineer · Nairobi, Kenya
        </p>

        <span className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
          Scroll to explore ↓
        </span>
      </div>
    </section>
  );
};
