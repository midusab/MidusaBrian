import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory, ThemeMode } from '../types/portfolio';
import { FlagshipProjectCard } from './projects/FlagshipProjectCard';
import { SecondaryProjectsList } from './projects/SecondaryProjectsList';
import { StudioProjectCard } from './projects/StudioProjectCard';
import { SectionShell } from './ui/SectionShell';

interface ProjectShowcaseProps {
  theme: ThemeMode;
  onSelectProject: (project: Project) => void;
}

type CategoryFilter = 'All' | ProjectCategory;

const FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'Platform', label: 'Platform' },
  { value: 'Brand & Studio', label: 'Brand & studio' },
  { value: 'Client & Demo', label: 'Client & demo' },
];

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
    <SectionShell
      id="chapter-building"
      labelledBy="building-heading"
      theme={theme}
      surface="secondary"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-14 sm:mb-20 md:mb-28"
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
          className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border self-start lg:self-end max-w-full ${
            isDark
              ? 'bg-white/[0.04] border-white/10'
              : 'bg-white border-black/10'
          }`}
        >
          {FILTERS.map((cat) => {
            const active = filter === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setFilter(cat.value)}
                className={`relative px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
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
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {showFlagship && (
          <FlagshipProjectCard
            key="flagship-article"
            project={flagship}
            theme={theme}
            onSelect={onSelectProject}
          />
        )}

        {showStudio && (
          <StudioProjectCard
            key="studio-article"
            project={studio}
            theme={theme}
            onSelect={onSelectProject}
          />
        )}

        {visibleSecondary.length > 0 && (
          <SecondaryProjectsList
            key="secondary-studies"
            projects={visibleSecondary}
            theme={theme}
            onSelect={onSelectProject}
          />
        )}
      </AnimatePresence>
    </SectionShell>
  );
};
