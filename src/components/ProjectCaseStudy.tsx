import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Project, PROJECTS } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';
import { LazyImage } from './LazyImage';
import { ThemeMode } from './Navigation';

interface ProjectCaseStudyProps {
  theme: ThemeMode;
  project: Project;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  theme,
  project,
  onClose,
  onSelectProject,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

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
      className={`fixed inset-0 z-50 overflow-y-auto no-scrollbar transition-colors duration-300 ${
        isDark ? 'bg-[#0B0D10] text-[#F5F5F5]' : 'bg-white text-[#0B0D10]'
      }`}
    >
      {isDark && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
          <GrainOverlay />
        </div>
      )}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Minimal Editorial Top Bar */}
        <div
          className={`sticky top-0 z-20 backdrop-blur-md border-b px-6 md:px-14 h-16 flex items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#0B0D10]/90 border-white/[0.08]'
              : 'bg-white/90 border-black/[0.08]'
          }`}
        >
          <div className="flex items-center gap-3 tech-meta min-w-0">
            <span className="uppercase tracking-[0.14em] text-[#1E90FF] shrink-0">
              Case Study
            </span>
            <span aria-hidden="true" className={isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}>
              /
            </span>
            <span
              className={`truncate font-sans text-xs font-medium ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
              }`}
            >
              {project.title}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border tech-meta uppercase tracking-[0.12em] hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors whitespace-nowrap shrink-0 ${
              isDark
                ? 'border-white/15 text-[#9297A1]'
                : 'border-black/15 text-[#525866]'
            }`}
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Case Study Content */}
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16 py-14 md:py-20 space-y-16 flex-1">
          <header className="space-y-8">
            <div className="space-y-4">
              <h1
                id="case-study-title"
                className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}
              >
                {project.title}
              </h1>
              <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                {project.summary}
              </p>
            </div>

            <div
              className={`overflow-hidden rounded-2xl aspect-[16/9] ${
                isDark ? 'bg-[#111419]' : 'bg-slate-200'
              }`}
            >
              <LazyImage
                key={project.id}
                src={project.image}
                alt={project.imageAlt}
                fallbackLabel={project.title}
                isDark={isDark}
                priority
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className={`flex flex-wrap items-center justify-between gap-4 py-5 border-y ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <p className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                {project.stack.join(' · ')}
              </p>

              <div className="flex flex-wrap items-center gap-6 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] hover:text-[#1E90FF] transition-colors whitespace-nowrap ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                    }`}
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#1E90FF]" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#1E90FF] hover:opacity-80 transition-opacity whitespace-nowrap"
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
              <p className="chapter-label text-[#1E90FF]">The Problem</p>
              <p className={`text-base leading-[1.7] ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                {project.problem}
              </p>
            </div>
            <div className="space-y-3">
              <p className="chapter-label text-[#1E90FF]">The Idea</p>
              <p className={`text-base leading-[1.7] ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                {project.idea}
              </p>
            </div>
            <div className="space-y-3">
              <p className="chapter-label text-[#1E90FF]">My Approach</p>
              <p className={`text-base leading-[1.7] ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                {project.approach}
              </p>
            </div>
          </section>

          {/* System Architecture Flow */}
          {project.architecture && project.architecture.length > 0 && (
            <section
              aria-label="System architecture"
              className={`pt-12 border-t space-y-8 ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <h2
                className={`text-xl font-medium tracking-[-0.015em] ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                Architecture &amp; Data Flow
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {project.architecture.map((step) => (
                  <div
                    key={step.layer}
                    className={`space-y-2 pt-4 border-t ${
                      isDark ? 'border-white/[0.12]' : 'border-black/[0.12]'
                    }`}
                  >
                    <p className="chapter-label text-[#1E90FF]">{step.layer}</p>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                      }`}
                    >
                      {step.component}
                    </p>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-[#9297A1]' : 'text-[#525866]'
                      }`}
                    >
                      {step.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges & Learnings */}
          <section
            className={`pt-12 border-t grid grid-cols-1 md:grid-cols-2 gap-12 ${
              isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
            }`}
          >
            <div className="space-y-4">
              <h2
                className={`text-lg font-medium tracking-[-0.015em] ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                Challenges Encountered
              </h2>
              <ul
                className={`space-y-4 text-sm md:text-base leading-relaxed ${
                  isDark ? 'text-[#9297A1]' : 'text-[#525866]'
                }`}
              >
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
                <h2
                  className={`text-lg font-medium tracking-[-0.015em] ${
                    isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                  }`}
                >
                  What I Learned
                </h2>
                <p className={`editorial-body ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.learned}
                </p>
              </div>

              <div
                className={`pt-6 border-t space-y-2 ${
                  isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                }`}
              >
                <p className="chapter-label text-[#1E90FF]">Verified Outcome</p>
                <p className={`editorial-body ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                  {project.outcome}
                </p>
              </div>
            </div>
          </section>

          {/* Editorial Prev/Next Navigation */}
          <nav
            aria-label="Navigate between project stories"
            className={`pt-10 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
              isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-[#1E90FF]/60 text-left group transition-colors ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <ArrowLeft
                className={`w-4 h-4 group-hover:text-[#1E90FF] transition-colors ${
                  isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'
                }`}
              />
              <div>
                <p className={`chapter-label ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                  Previous
                </p>
                <p
                  className={`text-base font-medium group-hover:text-[#1E90FF] transition-colors ${
                    isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                  }`}
                >
                  {prevProject.title}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-[#1E90FF]/60 text-right sm:ml-auto group transition-colors ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <div>
                <p className={`chapter-label ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                  Next
                </p>
                <p
                  className={`text-base font-medium group-hover:text-[#1E90FF] transition-colors ${
                    isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                  }`}
                >
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight
                className={`w-4 h-4 group-hover:text-[#1E90FF] transition-colors ${
                  isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'
                }`}
              />
            </button>
          </nav>
        </div>
      </motion.div>
    </div>
  );
};
