/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ContactSection } from './components/ContactSection';
import { HeroExperience } from './components/HeroExperience';
import { JourneyTimeline } from './components/JourneyTimeline';
import { MindsetSection } from './components/MindsetSection';
import { Navigation } from './components/Navigation';
import { ProjectCaseStudy } from './components/ProjectCaseStudy';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgress } from './components/ScrollProgress';
import { SkillsEcosystem } from './components/SkillsEcosystem';
import { StoryDiscovery } from './components/StoryDiscovery';
import { Project } from './data/portfolioData';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const jumpToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F5F5]">
      <Navigation onJumpToChapter={jumpToChapter} />
      <ScrollProgress />

      <main>
        {/* 01. Opening — Curiosity */}
        <HeroExperience
          onScrollNext={() => jumpToChapter('chapter-beginning')}
          onJumpToProjects={() => jumpToChapter('chapter-building')}
        />

        {/* 02. The Beginning — A Natural Transition */}
        <StoryDiscovery onExploreEvolution={() => jumpToChapter('chapter-learning')} />

        {/* 03. Learning — The Evolution */}
        <JourneyTimeline />

        {/* 04. Building — Ideas Become Real */}
        <ProjectShowcase onSelectProject={setActiveProject} />

        {/* 05. The Mind Behind the Code */}
        <MindsetSection />

        {/* 06. The Tools — My Technical Foundation */}
        <SkillsEcosystem />

        {/* 07. The Future — The Story Continues */}
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      <AnimatePresence>
        {activeProject && (
          <ProjectCaseStudy
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onSelectProject={setActiveProject}
          />
        )}
      </AnimatePresence>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  );
}
