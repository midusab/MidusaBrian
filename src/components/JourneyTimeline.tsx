import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EVOLUTION_STAGES } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';

export const JourneyTimeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="chapter-learning"
      aria-labelledby="learning-heading"
      className="relative bg-[#0B0D10] text-[#F5F5F5] py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="lg:col-span-8">
            <p className="chapter-label text-[#9297A1] mb-5">
              Learning — The Evolution
            </p>
            <h2
              id="learning-heading"
              className="editorial-headline text-[#F5F5F5]"
            >
              From writing single lines to designing complete systems.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="editorial-body text-[#9297A1]">
              Each stage expanded what I could reason about—moving from syntax in a terminal to
              databases, payment callbacks, and live production deployments.
            </p>
          </div>
        </div>

        {/* Clean Typographic Progression with Dynamic Hover Highlight */}
        <ul className="divide-y divide-white/[0.08]">
          {EVOLUTION_STAGES.map((stage, idx) => {
            const isDimmed = hoveredId !== null && hoveredId !== stage.id;
            return (
              <motion.li
                key={stage.id}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : Math.min(idx * 0.04, 0.16),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`py-8 md:py-11 px-4 -mx-4 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-baseline transition-all duration-200 hover:bg-white/[0.03] ${
                  isDimmed ? 'opacity-55' : 'opacity-100'
                }`}
              >
                <div className="lg:col-span-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-[-0.018em] text-[#F5F5F5] leading-[1.15]">
                    {stage.title}
                  </h3>
                </div>

                <div className="lg:col-span-6 lg:pl-6">
                  <p className="editorial-body text-[#9297A1]">
                    {stage.reflection}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
