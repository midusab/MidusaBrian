/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { FadedCodeBackground } from './components/FadedCodeBackground';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { GlobalPointerLight } from './components/GlobalPointerLight';
import { HeroExperience } from './components/HeroExperience';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ScrollProgress';
import { SeoHead } from './components/SeoHead';
import { PROJECTS } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import { Project } from './types/portfolio';

const StoryDiscovery = lazy(() =>
  import('./components/StoryDiscovery').then((m) => ({ default: m.StoryDiscovery }))
);
const JourneyTimeline = lazy(() =>
  import('./components/JourneyTimeline').then((m) => ({ default: m.JourneyTimeline }))
);
const ProjectShowcase = lazy(() =>
  import('./components/ProjectShowcase').then((m) => ({ default: m.ProjectShowcase }))
);
const SystemArchitecture = lazy(() =>
  import('./components/SystemArchitecture').then((m) => ({ default: m.SystemArchitecture }))
);
const DeveloperJournal = lazy(() =>
  import('./components/DeveloperJournal').then((m) => ({ default: m.DeveloperJournal }))
);
const InteractivePlayground = lazy(() =>
  import('./components/InteractivePlayground').then((m) => ({ default: m.InteractivePlayground }))
);
const MindsetSection = lazy(() =>
  import('./components/MindsetSection').then((m) => ({ default: m.MindsetSection }))
);
const SkillsEcosystem = lazy(() =>
  import('./components/SkillsEcosystem').then((m) => ({ default: m.SkillsEcosystem }))
);
const CareerSection = lazy(() =>
  import('./components/CareerSection').then((m) => ({ default: m.CareerSection }))
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
  const { theme, isDark, toggleTheme } = useTheme();

  const jumpToChapter = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <SeoHead theme={theme} activeProject={activeProject} />
      <div
        className={`min-h-screen transition-colors duration-300 relative ${
          isDark ? 'bg-[#0B0D10] text-[#F5F5F5]' : 'bg-white text-[#0B0D10]'
        }`}
      >
        <FadedCodeBackground theme={theme} />
        <Navigation
          theme={theme}
          onToggleTheme={toggleTheme}
          onJumpToChapter={jumpToChapter}
          onOpenBooking={() => setBookingOpen(true)}
        />
        <ScrollProgress theme={theme} />
        <GlobalPointerLight theme={theme} />
        <FloatingWhatsApp theme={theme} phoneNumber="0112478220" />

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
            {/* Chapter 02: About */}
            <StoryDiscovery
              theme={theme}
              onExploreEvolution={() => jumpToChapter('chapter-learning')}
            />

            {/* Chapter 03: Journey Timeline */}
            <JourneyTimeline theme={theme} />

            {/* Chapter 04: Project Showcase */}
            <ProjectShowcase theme={theme} onSelectProject={setActiveProject} />

            {/* Chapter 05: System Architecture & M-Pesa Flow */}
            <SystemArchitecture theme={theme} />

            {/* Chapter 06: Developer Journal (Things I Learned Along the Way) */}
            <DeveloperJournal theme={theme} />

            {/* Chapter 07: Interactive Coding Playground */}
            <InteractivePlayground theme={theme} />

            {/* Chapter 08: Engineering Mindset */}
            <MindsetSection theme={theme} />

            {/* Chapter 09: Skills & Technical Foundation */}
            <SkillsEcosystem theme={theme} />

            {/* Opportunities */}
            <CareerSection
              theme={theme}
              onOpenResume={() => setResumeOpen(true)}
              onOpenBooking={() => setBookingOpen(true)}
            />

            {/* Contact */}
            <ContactSection
              theme={theme}
              onOpenResume={() => setResumeOpen(true)}
              onOpenBooking={() => setBookingOpen(true)}
            />
          </Suspense>
        </main>

        <Footer theme={theme} onJumpToChapter={jumpToChapter} />

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
              <MeetingBookingModal
                key="meeting-booking-modal"
                onClose={() => setBookingOpen(false)}
              />
            )}
          </AnimatePresence>

          {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
        </Suspense>
      </div>
    </MotionConfig>
  );
}
