/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { HeroExperience } from './components/HeroExperience';
import { Navigation, ThemeMode } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { Project } from './data/portfolioData';

const StoryDiscovery = lazy(() =>
  import('./components/StoryDiscovery').then((m) => ({ default: m.StoryDiscovery }))
);
const JourneyTimeline = lazy(() =>
  import('./components/JourneyTimeline').then((m) => ({ default: m.JourneyTimeline }))
);
const ProjectShowcase = lazy(() =>
  import('./components/ProjectShowcase').then((m) => ({ default: m.ProjectShowcase }))
);
const MindsetSection = lazy(() =>
  import('./components/MindsetSection').then((m) => ({ default: m.MindsetSection }))
);
const SkillsEcosystem = lazy(() =>
  import('./components/SkillsEcosystem').then((m) => ({ default: m.SkillsEcosystem }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const ProjectCaseStudy = lazy(() =>
  import('./components/ProjectCaseStudy').then((m) => ({ default: m.ProjectCaseStudy }))
);
const MeetingBookingModal = lazy(() =>
  import('./components/MeetingBookingModal').then((m) => ({ default: m.MeetingBookingModal }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

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
    <MotionConfig reducedMotion="user">
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

          <Suspense
            fallback={
              <div
                aria-hidden="true"
                className={`min-h-[60vh] ${isDark ? 'bg-[#0B0D10]' : 'bg-white'}`}
              />
            }
          >
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
          </Suspense>
        </main>

        <Suspense fallback={null}>
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
        </Suspense>
      </div>
    </MotionConfig>
  );
}
