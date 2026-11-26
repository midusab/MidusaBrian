import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ThemeMode } from '../types/portfolio';
import { LazyImage } from './LazyImage';
import { SectionShell } from './ui/SectionShell';

interface MindsetSectionProps {
  theme: ThemeMode;
}

export const MindsetSection: React.FC<MindsetSectionProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const portraitY = useTransform(smoothProgress, [0, 1], [16, -16]);

  return (
    <SectionShell
      id="chapter-mind"
      labelledBy="mind-heading"
      theme={theme}
      surface="primary"
      sectionRef={sectionRef}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mb-10 sm:mb-14 md:mb-20"
      >
        <h2
          id="mind-heading"
          className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}
        >
          I don&apos;t want to write code just to make things work. I want to understand why they
          work.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-stretch">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-7 flex flex-col justify-between gap-7 sm:gap-8 py-1 sm:py-2 ${
            isDark ? 'text-[#D1D5DB]' : 'text-[#3B4049]'
          }`}
        >
          <div className="space-y-6 sm:space-y-7 editorial-body">
            <p>
              Curiosity starts the work, but discipline finishes it. When a payment callback times
              out or a layout shifts on a small screen, the real engineering happens in tracing the
              root cause rather than patching over symptoms.
            </p>
            <p>
              Studying Computer Science while building live products keeps my perspective grounded.
              Every database schema, API endpoint, and user interface belongs to one connected
              system—and the clearest code comes from understanding the human problem before
              reaching for a framework.
            </p>
          </div>

          <p
            className={`pt-6 border-t editorial-body font-medium ${
              isDark
                ? 'border-white/[0.08] text-[#F5F5F5]'
                : 'border-black/[0.08] text-[#0B0D10]'
            }`}
          >
            I am still early in my engineering career, and I treat that honestly: learning with
            intention, paying attention to details, and building software meant to be useful.
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col"
        >
          <figure className="h-full flex flex-col justify-between gap-3">
            <div
              className={`relative flex-1 aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[420px] overflow-hidden rounded-2xl border transition-all duration-500 group ${
                isDark ? 'bg-[#0B0D10] border-white/[0.04]' : 'bg-[#E5E7EB] border-black/10'
              }`}
            >
              <LazyImage
                src="/images/developer/mindset-portrait.jpg"
                alt="Portrait of Midusa outdoors"
                isDark={isDark}
                motionStyle={{ y: portraitY, scale: 1.04 }}
                className="w-full h-full object-cover object-top picture-camouflage-portrait transition-transform duration-700 ease-out hover:scale-[1.06]"
              />
              {isDark && (
                <>
                  {/* Camouflage radial edge feathering matching #0B0D10 */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_38%,rgba(11,13,16,0.48)_72%,rgba(11,13,16,0.96)_100%)] z-10 transition-opacity duration-700 group-hover:opacity-85"
                  />
                  {/* Bottom dissolution gradient */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/75 to-transparent z-10"
                  />
                  {/* Top subtle fade */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B0D10]/50 to-transparent z-10"
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
