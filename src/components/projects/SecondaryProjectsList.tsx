import React, { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Project, ThemeMode } from '../../types/portfolio';
import { LazyImage } from '../LazyImage';

interface SecondaryProjectsListProps {
  projects: Project[];
  theme: ThemeMode;
  onSelect: (project: Project) => void;
}

export const SecondaryProjectsList = forwardRef<HTMLDivElement, SecondaryProjectsListProps>(
  ({ projects, theme, onSelect }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const isDark = theme === 'dark';

    return (
      <motion.div
        ref={ref}
        layout
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`pt-12 sm:pt-16 border-t ${
          isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
        }`}
      >
        <p className="chapter-label text-[#1E90FF] mb-8 sm:mb-12">
          Selected prototypes &amp; architecture studies
        </p>

        <div className={`divide-y ${isDark ? 'divide-white/[0.08]' : 'divide-black/[0.08]'}`}>
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-10 sm:py-12 md:py-16 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch"
            >
              <div
                className={`lg:col-span-5 overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10] ${
                  isDark ? 'bg-[#111419]' : 'bg-slate-200'
                }`}
              >
                <LazyImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackLabel={project.title}
                  isDark={isDark}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between gap-6 py-1">
                <div className="space-y-3 sm:space-y-4">
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.018em] leading-[1.14] ${
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
                  className={`pt-4 border-t flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4 ${
                    isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
                  }`}
                >
                  <span className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                    {project.stack.join(' · ')}
                  </span>
                  <motion.button
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                    onClick={() => onSelect(project)}
                    className={`group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                      isDark
                        ? 'border-white/15 text-[#F5F5F5]'
                        : 'border-black/15 text-[#0B0D10] bg-white'
                    }`}
                  >
                    <span>Read case study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    );
  }
);

SecondaryProjectsList.displayName = 'SecondaryProjectsList';
