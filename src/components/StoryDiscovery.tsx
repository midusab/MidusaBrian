import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { GrainOverlay } from './GrainOverlay';
import { LazyImage } from './LazyImage';
import { ThemeMode } from './Navigation';

interface StoryDiscoveryProps {
  theme: ThemeMode;
  onExploreEvolution: () => void;
}

export const StoryDiscovery: React.FC<StoryDiscoveryProps> = ({
  theme,
  onExploreEvolution,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const imageScale = useTransform(smoothProgress, [0, 0.55, 1], [1.07, 1.0, 1.03]);
  const imageY = useTransform(smoothProgress, [0, 1], [18, -18]);

  return (
    <section
      id="chapter-beginning"
      ref={sectionRef}
      aria-labelledby="beginning-heading"
      className={`relative py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0D10] text-[#F5F5F5] border-white/[0.06]'
          : 'bg-[#F8FAFC] text-[#0B0D10] border-black/[0.06]'
      }`}
    >
      {isDark && <GrainOverlay />}
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Editorial Prose */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-10 py-2"
          >
            <div className="space-y-8">
              <h2
                id="beginning-heading"
                className={`editorial-statement ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                I started with curiosity. The desire to understand how websites worked, how
                applications were built, and how technology could solve problems.
              </h2>

              <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                From Kenya, studying Computer Science turned that curiosity into daily craft—asking
                what happens beneath every button click, database write, and network request until
                software stops feeling like magic and starts feeling buildable.
              </p>
            </div>

            <div
              className={`pt-6 border-t flex flex-wrap items-center justify-between gap-6 ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <p
                className={`text-sm leading-relaxed max-w-[48ch] ${
                  isDark ? 'text-[#9297A1]' : 'text-[#525866]'
                }`}
              >
                Every system I build today traces back to wanting to know why things work—and
                building tools people can actually rely on.
              </p>
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onExploreEvolution}
                className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border text-xs font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                  isDark
                    ? 'border-white/15 text-[#F5F5F5]'
                    : 'border-black/15 text-[#0B0D10]'
                }`}
              >
                <span>Follow the journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Editorial Portrait Spread — Lazy Loaded with Spring Parallax */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <figure className="h-full flex flex-col justify-between gap-3">
              <div
                className={`relative flex-1 min-h-[360px] lg:min-h-[480px] overflow-hidden rounded-2xl ${
                  isDark ? 'bg-[#111419]' : 'bg-slate-200'
                }`}
              >
                <LazyImage
                  src="/assets/aistudio/25122_bbef501b.jpg"
                  alt="Monochrome studio portrait of Midusa"
                  isDark={isDark}
                  motionStyle={{ scale: imageScale, y: imageY }}
                  className="w-full h-full object-cover object-[50%_14%]"
                />
                {isDark && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D10]/75 via-transparent to-transparent"
                  />
                )}
              </div>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
