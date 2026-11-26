import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';
import { LazyImage } from './LazyImage';
import { ThemeMode } from './Navigation';

interface ProjectShowcaseProps {
  theme: ThemeMode;
  onSelectProject: (project: Project) => void;
}

type CategoryFilter = 'All' | 'Platform' | 'Brand & Studio' | 'Client & Demo';
const FILTERS: CategoryFilter[] = ['All', 'Platform', 'Brand & Studio', 'Client & Demo'];

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  theme,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const flagship = PROJECTS[0];
  const studio = PROJECTS[1];
  const secondary = PROJECTS.slice(2);

  const showFlagship = filter === 'All' || filter === 'Platform';
  const showStudio = filter === 'All' || filter === 'Brand & Studio';
  const visibleSecondary =
    filter === 'All' || filter === 'Client & Demo' ? secondary : [];

  return (
    <section
      id="chapter-building"
      aria-labelledby="building-heading"
      className={`relative py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0D10] text-[#F5F5F5] border-white/[0.06]'
          : 'bg-[#F8FAFC] text-[#0B0D10] border-black/[0.06]'
      }`}
    >
      {isDark && <GrainOverlay />}
      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Section Opening + Fluid Shared-Layout Filter */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-28"
        >
          <div className="max-w-4xl">
            <h2
              id="building-heading"
              className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}
            >
              Eventually, learning became building.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter projects"
            className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border self-start lg:self-end ${
              isDark
                ? 'bg-white/[0.04] border-white/10'
                : 'bg-white border-black/10'
            }`}
          >
            {FILTERS.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
                    active
                      ? 'text-white'
                      : isDark
                      ? 'text-[#9297A1] hover:text-[#F5F5F5]'
                      : 'text-[#525866] hover:text-[#0B0D10]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#1E90FF]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {/* MidusaElibrary */}
          {showFlagship && (
            <motion.article
              key="flagship-article"
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mb-28 md:mb-36"
            >
              <div className="relative">
                <div
                  className={`w-full overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[21/9] ${
                    isDark ? 'bg-[#111419]' : 'bg-slate-200'
                  }`}
                >
                  <LazyImage
                    src={flagship.image}
                    alt={flagship.imageAlt}
                    fallbackLabel={flagship.title}
                    isDark={isDark}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>

                {/* Balanced Editorial Title & Narrative Below Full-Width Stage */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-5 space-y-3">
                    <h3
                      className={`editorial-subheadline ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                      }`}
                    >
                      {flagship.title}
                    </h3>
                    <p className={`pt-2 tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                      {flagship.stack.join(' · ')}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <p className={`editorial-body ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                      {flagship.narrative}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <motion.button
                        type="button"
                        whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                        onClick={() => onSelectProject(flagship)}
                        className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors duration-150 whitespace-nowrap"
                      >
                        <span>Explore the complete case study</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </motion.button>

                      {flagship.liveUrl && (
                        <motion.a
                          whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                          href={flagship.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                            isDark
                              ? 'border-white/15 text-[#F5F5F5]'
                              : 'border-black/15 text-[#0B0D10] bg-white'
                          }`}
                        >
                          <span>www.midusaelibary.co.ke</span>
                          <ExternalLink className="w-4 h-4 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Midusa Digital Solutions */}
          {showStudio && (
            <motion.article
              key="studio-article"
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`mb-24 md:mb-32 pt-20 border-t ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
                <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between gap-8 py-2">
                  <div className="space-y-5">
                    <h3
                      className={`editorial-subheadline ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                      }`}
                    >
                      {studio.title}
                    </h3>
                    <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                      {studio.narrative}
                    </p>
                  </div>

                  <div
                    className={`space-y-5 pt-6 border-t ${
                      isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                    }`}
                  >
                    <p className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                      {studio.stack.join(' · ')}
                    </p>
                    <div>
                      <motion.button
                        type="button"
                        whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                        onClick={() => onSelectProject(studio)}
                        className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
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
                  className={`lg:col-span-7 order-1 lg:order-2 overflow-hidden rounded-2xl min-h-[280px] aspect-[16/10] ${
                    isDark ? 'bg-[#111419]' : 'bg-slate-200'
                  }`}
                >
                  <LazyImage
                    src={studio.image}
                    alt={studio.imageAlt}
                    fallbackLabel={studio.title}
                    isDark={isDark}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>
              </div>
            </motion.article>
          )}

          {/* Additional Prototypes & Technical Patterns */}
          {visibleSecondary.length > 0 && (
            <motion.div
              key="secondary-studies"
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`pt-16 border-t ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <p className="chapter-label text-[#1E90FF] mb-12">
                Selected Prototypes &amp; Architecture Studies
              </p>

              <div
                className={`divide-y ${isDark ? 'divide-white/[0.08]' : 'divide-black/[0.08]'}`}
              >
                {visibleSecondary.map((project, idx) => (
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
                    className="py-12 md:py-16 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
                  >
                    <div
                      className={`lg:col-span-5 overflow-hidden rounded-2xl min-h-[240px] aspect-[16/10] ${
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
                      <div className="space-y-4">
                        <h3
                          className={`text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.018em] leading-[1.12] ${
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
                        className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${
                          isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
                        }`}
                      >
                        <span className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                          {project.stack.join(' · ')}
                        </span>
                        <motion.button
                          type="button"
                          whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                          onClick={() => onSelectProject(project)}
                          className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
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
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
