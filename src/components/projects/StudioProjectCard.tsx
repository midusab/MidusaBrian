import React, { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Project, ThemeMode } from '../../types/portfolio';
import { LazyImage } from '../LazyImage';

interface StudioProjectCardProps {
  project: Project;
  theme: ThemeMode;
  onSelect: (project: Project) => void;
}

export const StudioProjectCard = forwardRef<HTMLElement, StudioProjectCardProps>(
  ({ project, theme, onSelect }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const isDark = theme === 'dark';

    return (
      <motion.article
        ref={ref}
        layout
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`mb-20 sm:mb-24 md:mb-32 pt-14 sm:pt-20 border-t ${
          isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between gap-6 sm:gap-8 py-1 sm:py-2">
            <div className="space-y-4 sm:space-y-5">
              <h3
                className={`editorial-subheadline ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                {project.title}
              </h3>
              <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                {project.narrative}
              </p>
            </div>

            <div
              className={`space-y-5 pt-5 sm:pt-6 border-t ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <p className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                {project.stack.join(' · ')}
              </p>
              <div>
                <motion.button
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  onClick={() => onSelect(project)}
                  className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                    isDark
                      ? 'border-white/15 text-[#F5F5F5]'
                      : 'border-black/15 text-[#0B0D10] bg-white'
                  }`}
                >
                  <span>Explore the complete case study</span>
                  <ArrowRight className="w-4 h-4 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-7 order-1 lg:order-2 overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10] ${
              isDark ? 'bg-[#111419]' : 'bg-slate-200'
            }`}
          >
            <LazyImage
              src={project.image}
              alt={project.imageAlt}
              fallbackLabel={project.title}
              isDark={isDark}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
          </div>
        </div>
      </motion.article>
    );
  }
);

StudioProjectCard.displayName = 'StudioProjectCard';
