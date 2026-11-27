import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ThemeMode } from '../types/portfolio';
import { LazyImage } from './LazyImage';
import { SectionShell } from './ui/SectionShell';

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
    <SectionShell
      id="chapter-beginning"
      labelledBy="beginning-heading"
      theme={theme}
      surface="secondary"
      sectionRef={sectionRef}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-stretch">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between gap-8 sm:gap-10 py-1 sm:py-2"
        >
          <div className="space-y-6 sm:space-y-8">
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
            className={`pt-6 border-t flex items-center justify-end ${
              isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
            }`}
          >
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { x: 2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={onExploreEvolution}
              className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-lg border text-xs font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
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

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <figure className="h-full flex flex-col justify-between gap-3">
            <div
              className={`relative flex-1 aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[460px] overflow-hidden rounded-2xl border transition-all duration-500 group ${
                isDark ? 'bg-[#0E1217] border-white/[0.04]' : 'bg-slate-200 border-black/10'
              }`}
            >
              <LazyImage
                src="/images/developer/story-portrait.jpg"
                alt="Monochrome studio portrait of Midusa"
                isDark={isDark}
                motionStyle={{ scale: imageScale, y: imageY }}
                className="w-full h-full object-cover object-[50%_14%] picture-camouflage-portrait transition-transform duration-700 ease-out hover:scale-[1.05]"
              />
              {isDark && (
                <>
                  {/* Camouflage radial edge feathering matching #0E1217 */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_38%,rgba(14,18,23,0.5)_72%,rgba(14,18,23,0.96)_100%)] z-10 transition-opacity duration-700 group-hover:opacity-85"
                  />
                  {/* Bottom dissolution gradient */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0E1217] via-[#0E1217]/75 to-transparent z-10"
                  />
                  {/* Top subtle fade */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0E1217]/50 to-transparent z-10"
                  />
                </>
              )}
            </div>
          </figure>
        </motion.div>
      </div>
    </SectionShell>
  );
};
