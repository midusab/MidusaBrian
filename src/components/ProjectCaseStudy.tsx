import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Project, PROJECTS } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';

interface ProjectCaseStudyProps {
  project: Project;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  useEffect(() => {
    setImageFailed(false);
  }, [project.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectProject(nextProject);
      if (e.key === 'ArrowLeft') onSelectProject(prevProject);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onSelectProject, prevProject, nextProject]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0D10] text-[#F5F5F5]"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
        <GrainOverlay />
      </div>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Minimal Editorial Top Bar */}
        <div className="sticky top-0 z-20 bg-[#0B0D10]/90 backdrop-blur-md border-b border-white/[0.08] px-6 md:px-14 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#9297A1] min-w-0">
            <span className="uppercase tracking-[0.18em] text-[#1E90FF] shrink-0">
              Case Study
            </span>
            <span aria-hidden="true">/</span>
            <span className="truncate text-[#F5F5F5]">{project.title}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/15 text-xs uppercase tracking-[0.14em] text-[#9297A1] hover:border-[#1E90FF] hover:text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Case Study Content — Balanced Full-Width Editorial Spread */}
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 py-14 md:py-20 space-y-16 flex-1">
          <header className="space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1E90FF]">
                {project.category} · {project.subtitle}
              </p>
              <h1
                id="case-study-title"
                className="editorial-headline text-4xl sm:text-5xl md:text-6xl text-[#F5F5F5] leading-[1.06]"
              >
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-[#9297A1] leading-relaxed max-w-3xl">
                {project.summary}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-[#111419] aspect-[16/9]">
              {!imageFailed ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-[#9297A1]">
                  {project.title}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-white/[0.08]">
              <p className="text-xs text-[#9297A1]">{project.stack.join(' · ')}</p>

              <div className="flex flex-wrap items-center gap-6 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#F5F5F5] hover:text-[#1E90FF] transition-colors whitespace-nowrap"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#1E90FF] hover:text-[#F5F5F5] transition-colors whitespace-nowrap"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Problem / Idea / Approach */}
          <section aria-label="Project narrative" className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#1E90FF]">
                The Problem
              </p>
              <p className="text-sm md:text-base leading-[1.75] text-[#D1D5DB]">
                {project.problem}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#1E90FF]">
                The Idea
              </p>
              <p className="text-sm md:text-base leading-[1.75] text-[#D1D5DB]">
                {project.idea}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#1E90FF]">
                My Approach
              </p>
              <p className="text-sm md:text-base leading-[1.75] text-[#D1D5DB]">
                {project.approach}
              </p>
            </div>
          </section>

          {/* System Architecture Flow — Unboxed Hairline Columns */}
          {project.architecture && project.architecture.length > 0 && (
            <section
              aria-label="System architecture"
              className="pt-12 border-t border-white/[0.08] space-y-8"
            >
              <h2 className="text-xl font-medium tracking-tight text-[#F5F5F5]">
                Architecture &amp; Data Flow
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {project.architecture.map((step) => (
                  <div key={step.layer} className="space-y-2 pt-4 border-t border-white/[0.12]">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#1E90FF]">
                      {step.layer}
                    </p>
                    <p className="text-sm font-medium text-[#F5F5F5]">{step.component}</p>
                    <p className="text-xs leading-relaxed text-[#9297A1]">{step.role}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges & Learnings — Hairline Editorial Columns */}
          <section className="pt-12 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-lg font-medium tracking-tight text-[#F5F5F5]">
                Challenges Encountered
              </h2>
              <ul className="space-y-4 text-sm md:text-base leading-relaxed text-[#9297A1]">
                {project.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1E90FF] shrink-0"
                    />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-lg font-medium tracking-tight text-[#F5F5F5]">
                  What I Learned
                </h2>
                <p className="text-sm md:text-base leading-[1.75] text-[#D1D5DB]">
                  {project.learned}
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#1E90FF]">
                  Verified Outcome
                </p>
                <p className="text-sm md:text-base leading-relaxed text-[#F5F5F5]">
                  {project.outcome}
                </p>
              </div>
            </div>
          </section>

          {/* Editorial Prev/Next Navigation */}
          <nav
            aria-label="Navigate between project stories"
            className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:border-[#1E90FF]/60 text-left group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#9297A1] group-hover:text-[#1E90FF] transition-colors" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#9297A1]">Previous</p>
                <p className="text-base font-medium text-[#F5F5F5] group-hover:text-[#1E90FF] transition-colors">
                  {prevProject.title}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:border-[#1E90FF]/60 text-right sm:ml-auto group transition-colors"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#9297A1]">Next</p>
                <p className="text-base font-medium text-[#F5F5F5] group-hover:text-[#1E90FF] transition-colors">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9297A1] group-hover:text-[#1E90FF] transition-colors" />
            </button>
          </nav>
        </div>
      </motion.div>
    </div>
  );
};
