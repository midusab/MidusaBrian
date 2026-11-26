/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ContactSection } from './components/ContactSection';
import { HeroExperience } from './components/HeroExperience';
import { JourneyTimeline } from './components/JourneyTimeline';
import { MeetingBookingModal } from './components/MeetingBookingModal';
import { MindsetSection } from './components/MindsetSection';
import { Navigation, ThemeMode } from './components/Navigation';
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem('midusa-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem('midusa-theme', theme);
    document.documentElement.dataset.theme = theme;
    if (theme === 'dark') {
      document.documentElement.style.backgroundColor = '#0B0D10';
      document.documentElement.style.color = '#F5F5F5';
    } else {
      document.documentElement.style.backgroundColor = '#FFFFFF';
      document.documentElement.style.color = '#0B0D10';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const jumpToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0B0D10] text-[#F5F5F5]' : 'bg-white text-[#0B0D10]'
      }`}
    >
      <Navigation
        theme={theme}
        onToggleTheme={toggleTheme}
        onJumpToChapter={jumpToChapter}
        onOpenBooking={() => setBookingOpen(true)}
      />
      <ScrollProgress theme={theme} />

      <main>
        <HeroExperience
          theme={theme}
          onScrollNext={() => jumpToChapter('chapter-beginning')}
          onJumpToProjects={() => jumpToChapter('chapter-building')}
        />

        <StoryDiscovery
          theme={theme}
          onExploreEvolution={() => jumpToChapter('chapter-learning')}
        />

        <JourneyTimeline theme={theme} />

        <ProjectShowcase theme={theme} onSelectProject={setActiveProject} />

        <MindsetSection theme={theme} />

        <SkillsEcosystem theme={theme} />

        <ContactSection
          theme={theme}
          onOpenResume={() => setResumeOpen(true)}
          onOpenBooking={() => setBookingOpen(true)}
        />
      </main>

      <AnimatePresence>
        {activeProject && (
          <ProjectCaseStudy
            key={activeProject.id}
            theme={theme}
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onSelectProject={setActiveProject}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen && (
          <MeetingBookingModal onClose={() => setBookingOpen(false)} />
        )}
      </AnimatePresence>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  );
}
