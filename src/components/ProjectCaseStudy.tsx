import React, { useCallback, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Layers,
  Lightbulb,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { useModalEscapeAndScrollLock } from '../hooks/useModalEscapeAndScrollLock';
import { Project, ThemeMode } from '../types/portfolio';
import { GrainOverlay } from './GrainOverlay';
import { LazyImage } from './LazyImage';
import { SystemArchitecture } from './SystemArchitecture';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id);

  // Scroll to top when switching case studies
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project.id]);

  const handleKeyDownExtra = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onSelectProject(nextProject);
      if (e.key === 'ArrowLeft') onSelectProject(prevProject);
    },
    [onSelectProject, nextProject, prevProject]
  );

  useModalEscapeAndScrollLock({
    onClose,
    onKeyDownExtra: handleKeyDownExtra,
  });

  const isMidusaElibrary = project.id === 'midusa-elibrary';

  return (
    <div
      ref={containerRef}
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
        className="relative z-10 min-h-screen flex flex-col font-sans"
      >
        {/* Sticky Header Bar */}
        <div
          className={`sticky top-0 z-20 backdrop-blur-md border-b px-4 sm:px-8 lg:px-14 h-16 flex items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#0B0D10]/90 border-white/[0.08]'
              : 'bg-white/90 border-black/[0.08]'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 tech-meta min-w-0">
            <span className="text-[#1E90FF] shrink-0 font-medium">Case study</span>
            <span aria-hidden="true" className={isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}>
              /
            </span>
            <span
              className={`truncate text-xs font-medium ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
              }`}
            >
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-colors"
              >
                <span>Live demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              data-cursor="CLOSE"
              className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg border text-xs font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors whitespace-nowrap shrink-0 ${
                isDark
                  ? 'border-white/15 text-[#9297A1]'
                  : 'border-black/15 text-[#525866]'
              }`}
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Content Container */}
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20 space-y-16 sm:space-y-20 flex-1">
          {/* Header Story */}
          <header className="space-y-6 sm:space-y-8">
            <div className="space-y-4 max-w-4xl">
              {project.subtitle && (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border border-[#1E90FF]/30 bg-[#1E90FF]/10 text-[#1E90FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{project.subtitle}</span>
                </div>
              )}
              <h1
                id="case-study-title"
                className={`editorial-headline text-3xl sm:text-5xl lg:text-6xl ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                {project.title}
              </h1>
              <p className={`editorial-body text-base sm:text-xl leading-relaxed ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                {project.summary}
              </p>
            </div>

            {/* Featured Image */}
            <div
              className={`overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] border ${
                isDark ? 'bg-[#111419] border-white/10' : 'bg-slate-200 border-black/10'
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

            {/* Technical Metadata Bar */}
            <div
              className={`flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 py-5 border-y ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-medium mr-2 ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                  Tech Stack:
                </span>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
                      isDark
                        ? 'bg-white/[0.04] border-white/10 text-[#E5E7EB]'
                        : 'bg-slate-100 border-black/10 text-[#374151]'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 sm:gap-6 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VISIT"
                    className={`inline-flex items-center gap-2 text-xs font-medium hover:text-[#1E90FF] transition-colors whitespace-nowrap ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                    }`}
                  >
                    <span>Visit production site</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#1E90FF]" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GITHUB"
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#1E90FF] hover:opacity-80 transition-opacity whitespace-nowrap"
                  >
                    <span>View repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* The Problem & The Product Idea */}
          <section aria-label="Problem and Vision" className="space-y-6">
            <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              The Problem &amp; The Concept
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.08]'
                } space-y-3`}
              >
                <div className="flex items-center gap-2.5 text-[#1E90FF]">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <p className="chapter-label text-xs uppercase tracking-wider text-[#1E90FF]">The friction</p>
                </div>
                <h3 className={`text-lg font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                  What was broken?
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.problem}
                </p>
              </div>

              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.08]'
                } space-y-3`}
              >
                <div className="flex items-center gap-2.5 text-[#1E90FF]">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <p className="chapter-label text-xs uppercase tracking-wider text-[#1E90FF]">The solution</p>
                </div>
                <h3 className={`text-lg font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                  The core product idea
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.idea}
                </p>
              </div>
            </div>
          </section>

          {/* Design Process */}
          {project.designProcess && (
            <section aria-label="Design Process" className="space-y-6 pt-8 border-t border-white/10 dark:border-white/10">
              <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                Human-Centered Design Process
              </h2>
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                } space-y-4`}
              >
                <div className="flex items-center gap-2 text-[#1E90FF]">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">UX Research &amp; Ergonomics</span>
                </div>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.designProcess}
                </p>
              </div>
            </section>
          )}

          {/* Frontend & Backend Architecture */}
          <section aria-label="System Architecture" className="space-y-6 pt-8 border-t border-white/10 dark:border-white/10">
            <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              Software Architecture &amp; Data Pipeline
            </h2>

            {project.frontendArchitecture && project.backendArchitecture ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                  } space-y-4`}
                >
                  <div className="flex items-center gap-2 text-[#1E90FF]">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Frontend Architecture</span>
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                    {project.frontendArchitecture}
                  </p>
                </div>

                <div
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                  } space-y-4`}
                >
                  <div className="flex items-center gap-2 text-[#1E90FF]">
                    <Server className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Backend Architecture</span>
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                    {project.backendArchitecture}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                }`}
              >
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.approach}
                </p>
              </div>
            )}

            {/* Embedded Live Interactive Architecture for MidusaElibrary */}
            {isMidusaElibrary && (
              <div className="pt-6">
                <div className="mb-4">
                  <p className="chapter-label text-xs text-[#1E90FF]">Interactive System Inspector</p>
                  <p className={`text-xs ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                    Explore live component responsibilities or inspect the M-Pesa Daraja payment loop.
                  </p>
                </div>
                <div
                  className={`p-6 sm:p-8 rounded-2xl border overflow-hidden ${
                    isDark ? 'bg-[#0B0D10]/80 border-white/[0.08]' : 'bg-slate-50/80 border-black/[0.08]'
                  }`}
                >
                  <SystemArchitecture theme={theme} inCaseStudy={true} />
                </div>
              </div>
            )}
          </section>

          {/* Database Design & Relational Schema */}
          {project.databaseDesign && (
            <section aria-label="Database Design" className="space-y-6 pt-8 border-t border-white/10 dark:border-white/10">
              <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                Database Schema &amp; Storage Strategy
              </h2>
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                } space-y-4`}
              >
                <div className="flex items-center gap-2 text-[#1E90FF]">
                  <Database className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Persistence &amp; Data Model</span>
                </div>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.databaseDesign}
                </p>
              </div>
            </section>
          )}

          {/* API Integration & Payment Routing */}
          {(project.apiIntegration || project.paymentIntegration) && (
            <section aria-label="Payments and APIs" className="space-y-6 pt-8 border-t border-white/10 dark:border-white/10">
              <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                API Contracts &amp; Integration Architecture
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.apiIntegration && (
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border ${
                      isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                    } space-y-4`}
                  >
                    <div className="flex items-center gap-2 text-[#1E90FF]">
                      <Workflow className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">API Integration</span>
                    </div>
                    <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                      {project.apiIntegration}
                    </p>
                  </div>
                )}

                {project.paymentIntegration && (
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border ${
                      isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                    } space-y-4`}
                  >
                    <div className="flex items-center gap-2 text-[#1E90FF]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Mobile Money Payment Routing</span>
                    </div>
                    <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                      {project.paymentIntegration}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Challenges & Solutions */}
          <section aria-label="Challenges and Solutions" className="space-y-6 pt-8 border-t border-white/10 dark:border-white/10">
            <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              Challenges Faced &amp; Engineering Solutions
            </h2>

            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
              } space-y-6`}
            >
              <div className="space-y-4">
                {project.challenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#1E90FF] shrink-0" />
                    <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lessons Learned & Future Roadmap */}
          <section aria-label="Lessons and Future Roadmap" className="space-y-6 pt-8 border-t border-white/10 dark:border-white/10">
            <h2 className={`text-2xl sm:text-3xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              Lessons Learned &amp; Future Improvements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`p-6 sm:p-8 rounded-2xl border ${
                  isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                } space-y-4`}
              >
                <div className="flex items-center gap-2 text-[#1E90FF]">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Key Takeaways</span>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                  {project.learned}
                </p>
                <div className="pt-4 border-t border-dashed border-white/10">
                  <p className="chapter-label text-xs text-[#1E90FF]">Production Outcome</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                    {project.outcome}
                  </p>
                </div>
              </div>

              {project.futureImprovements && (
                <div
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                  } space-y-4`}
                >
                  <div className="flex items-center gap-2 text-[#1E90FF]">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Roadmap &amp; Next Steps</span>
                  </div>
                  <ul className="space-y-3">
                    {project.futureImprovements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1E90FF] shrink-0 mt-0.5" />
                        <span className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                          {imp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Related Case Studies & Projects */}
          <section
            aria-label="Related case studies"
            className={`pt-12 sm:pt-16 border-t space-y-8 ${
              isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
            }`}
          >
            <div className="space-y-2">
              <p className="chapter-label text-[#1E90FF]">Related Case Studies</p>
              <h2 className={`text-xl sm:text-2xl font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                Continue exploring engineering stories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <article
                  key={rel.id}
                  className={`flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 group ${
                    isDark
                      ? 'bg-[#0E1217]/70 border-white/[0.08] hover:border-[#1E90FF]/50'
                      : 'bg-white border-black/[0.08] hover:border-[#1E90FF]/50 hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-lg aspect-[16/10] bg-slate-200 dark:bg-[#111419]">
                      <LazyImage
                        src={rel.image}
                        alt={rel.imageAlt}
                        fallbackLabel={rel.title}
                        isDark={isDark}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-medium tracking-wider uppercase text-[#1E90FF]">
                      {rel.category}
                    </span>
                    <h3 className={`text-base font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                      {rel.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                      {rel.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[10px] opacity-70">
                      {rel.stack.slice(0, 2).join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProject(rel)}
                      data-cursor="EXPLORE"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E90FF] hover:underline"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Project Story Switcher */}
          <nav
            aria-label="Navigate between project stories"
            className={`pt-8 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 ${
              isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              data-cursor="PREVIOUS"
              className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border hover:border-[#1E90FF]/60 text-left group transition-colors ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <ArrowLeft
                className={`w-4 h-4 shrink-0 group-hover:text-[#1E90FF] transition-colors ${
                  isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'
                }`}
              />
              <div className="min-w-0">
                <p className={`chapter-label ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                  Previous Project
                </p>
                <p
                  className={`text-base font-medium truncate group-hover:text-[#1E90FF] transition-colors ${
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
              data-cursor="NEXT"
              className={`inline-flex items-center justify-between sm:justify-end gap-3 px-4 py-3 rounded-xl border hover:border-[#1E90FF]/60 text-left sm:text-right sm:ml-auto group transition-colors ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <div className="min-w-0">
                <p className={`chapter-label ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                  Next Project
                </p>
                <p
                  className={`text-base font-medium truncate group-hover:text-[#1E90FF] transition-colors ${
                    isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                  }`}
                >
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight
                className={`w-4 h-4 shrink-0 group-hover:text-[#1E90FF] transition-colors ${
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
