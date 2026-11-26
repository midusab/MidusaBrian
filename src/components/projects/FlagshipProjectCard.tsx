import React, { forwardRef, useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { Project, ThemeMode } from '../../types/portfolio';
import { LazyImage } from '../LazyImage';

interface FlagshipProjectCardProps {
  project: Project;
  theme: ThemeMode;
  onSelect: (project: Project) => void;
}

export const FlagshipProjectCard = forwardRef<HTMLElement, FlagshipProjectCardProps>(
  ({ project, theme, onSelect }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isDark = theme === 'dark';

    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ['start end', 'end start'],
    });

    const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
    const imageY = useTransform(smoothY, [0, 1], [-28, 28]);
    const imageScale = useTransform(smoothY, [0, 0.5, 1], [1.05, 1.09, 1.05]);

    return (
      <motion.article
        ref={ref}
        layout
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 sm:mb-28 md:mb-36"
      >
        <div ref={cardRef} className="relative">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(project);
              }
            }}
            aria-label={`Explore case study for ${project.title}`}
            className={`relative w-full overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] border transition-all duration-500 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E90FF] ${
              isDark ? 'bg-[#0E1217] border-white/[0.06] hover:border-white/20' : 'bg-slate-200 border-black/[0.08] hover:border-black/20'
            }`}
          >
            <LazyImage
              src={project.image}
              alt={project.imageAlt}
              fallbackLabel={project.title}
              isDark={isDark}
              motionStyle={{ y: imageY, scale: imageScale }}
              className="w-full h-full object-cover picture-camouflage-project transition-transform duration-700 ease-out hover:scale-[1.09]"
            />
            {isDark && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E1217]/60 via-transparent to-[#0E1217]/25 z-10 transition-opacity duration-700 group-hover:opacity-75"
              />
            )}
          </div>

          <div className="mt-7 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
              <h3
                className={`editorial-subheadline ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                {project.title}
              </h3>
              <p className={`pt-1 tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                {project.stack.join(' · ')}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className={`editorial-body ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                {project.narrative}
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <motion.button
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  onClick={() => onSelect(project)}
                  className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors duration-150 whitespace-nowrap"
                >
                  <span>Explore the complete case study</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>

                {project.liveUrl && (
                  <motion.a
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                      isDark
                        ? 'border-white/15 text-[#F5F5F5]'
                        : 'border-black/15 text-[#0B0D10]'
                    }`}
                  >
                    <span>Visit live project</span>
                    <ExternalLink className="w-4 h-4 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }
);

FlagshipProjectCard.displayName = 'FlagshipProjectCard';
