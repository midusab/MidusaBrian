import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

type CategoryFilter = 'All' | 'Platform' | 'Brand & Studio' | 'Client & Demo';
const FILTERS: CategoryFilter[] = ['All', 'Platform', 'Brand & Studio', 'Client & Demo'];

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const shouldReduceMotion = useReducedMotion();

  const flagship = PROJECTS[0]; // MidusaElibrary
  const studio = PROJECTS[1]; // Midusa Digital Solutions
  const secondary = PROJECTS.slice(2);

  const showFlagship = filter === 'All' || filter === 'Platform';
  const showStudio = filter === 'All' || filter === 'Brand & Studio';
  const visibleSecondary =
    filter === 'All' || filter === 'Client & Demo' ? secondary : [];

  const handleImgError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="chapter-building"
      aria-labelledby="building-heading"
      className="relative bg-[#0B0D10] text-[#F5F5F5] py-24 md:py-36 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] overflow-hidden"
    >
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Section Opening + Dynamic Filter */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-28"
        >
          <div className="max-w-4xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1E90FF] mb-6">
              Building — Ideas Become Real
            </p>
            <h2
              id="building-heading"
              className="editorial-headline text-4xl sm:text-6xl lg:text-7xl leading-[1.05]"
            >
              Eventually, learning became building.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter projects"
            className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start lg:self-end"
          >
            {FILTERS.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    active
                      ? 'bg-[#1E90FF] text-white'
                      : 'text-[#9297A1] hover:text-[#F5F5F5]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Chapter 04A — MidusaElibrary (Full-Width Adaptive Feature) */}
        {showFlagship && (
          <article className="mb-28 md:mb-36">
            <div className="relative">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden rounded-2xl bg-[#111419]"
              >
                {!failedImages[flagship.id] ? (
                  <img
                    src={flagship.image}
                    alt={flagship.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => handleImgError(flagship.id)}
                    className="w-full aspect-[16/9] lg:aspect-[21/9] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center bg-[#12161E] text-[#9297A1]">
                    {flagship.title}
                  </div>
                )}
              </motion.div>

              {/* Balanced Editorial Title & Narrative Below Full-Width Stage */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1E90FF]">
                    Featured Product · {flagship.subtitle}
                  </p>
                  <h3 className="editorial-headline text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] leading-[1.05]">
                    {flagship.title}
                  </h3>
                  <p className="pt-2 text-xs leading-relaxed text-[#9297A1]">
                    {flagship.stack.join(' · ')}
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="text-lg md:text-xl leading-[1.7] text-[#D1D5DB]">
                    {flagship.narrative}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onSelectProject(flagship)}
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                    >
                      <span>Explore the complete case study</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    {flagship.liveUrl && (
                      <a
                        href={flagship.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-sm font-medium text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF] transition-all duration-150 whitespace-nowrap"
                      >
                        <span>www.midusaelibary.co.ke</span>
                        <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Chapter 04B — Midusa Digital Solutions (Balanced Full-Width Asymmetric Spread) */}
        {showStudio && (
          <article className="mb-24 md:mb-32 pt-20 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between gap-8 py-2">
                <div className="space-y-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1E90FF]">
                    Web Practice · {studio.subtitle}
                  </p>
                  <h3 className="editorial-headline text-3xl sm:text-5xl text-[#F5F5F5] leading-[1.08]">
                    {studio.title}
                  </h3>
                  <p className="text-base md:text-lg leading-[1.7] text-[#9297A1]">
                    {studio.narrative}
                  </p>
                </div>

                <div className="space-y-5 pt-6 border-t border-white/[0.08]">
                  <p className="text-xs text-[#9297A1]">{studio.stack.join(' · ')}</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => onSelectProject(studio)}
                      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-white/15 text-sm font-medium text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
                    >
                      <span>Explore the complete case study</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 order-1 lg:order-2 overflow-hidden rounded-2xl bg-[#111419]"
              >
                {!failedImages[studio.id] ? (
                  <img
                    src={studio.image}
                    alt={studio.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => handleImgError(studio.id)}
                    className="w-full h-full min-h-[280px] aspect-[16/10] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full min-h-[280px] flex items-center justify-center bg-[#12161E] text-[#9297A1]">
                    {studio.title}
                  </div>
                )}
              </motion.div>
            </div>
          </article>
        )}

        {/* Chapter 04C — Additional Prototypes & Technical Patterns */}
        {visibleSecondary.length > 0 && (
          <div className="pt-16 border-t border-white/[0.08]">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#9297A1] mb-12">
              Selected Prototypes &amp; Architecture Studies
            </p>

            <div className="divide-y divide-white/[0.08]">
              {visibleSecondary.map((project) => (
                <article
                  key={project.id}
                  className="py-12 md:py-16 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
                >
                  <div className="lg:col-span-5 overflow-hidden rounded-2xl bg-[#111419]">
                    {!failedImages[project.id] ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() => handleImgError(project.id)}
                        className="w-full h-full min-h-[240px] aspect-[16/10] object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[240px] flex items-center justify-center bg-[#12161E] text-[#9297A1]">
                        {project.title}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-between gap-6 py-1">
                    <div className="space-y-4">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1E90FF]">
                        {project.subtitle}
                      </p>
                      <h3 className="text-2xl sm:text-4xl font-medium tracking-[-0.02em] text-[#F5F5F5]">
                        {project.title}
                      </h3>
                      <p className="text-base md:text-lg leading-[1.7] text-[#9297A1] max-w-2xl">
                        {project.narrative}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-[#9297A1]">{project.stack.join(' · ')}</span>
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-xs font-medium text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF] transition-all duration-150 whitespace-nowrap"
                      >
                        <span>Read case study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
