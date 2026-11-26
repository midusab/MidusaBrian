import React, { useEffect, useState } from 'react';
import { CHAPTERS } from '../data/portfolioData';
import { ThemeMode } from './Navigation';

interface ScrollProgressProps {
  theme: ThemeMode;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ theme }) => {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);

      const viewportFocus = scrollTop + window.innerHeight * 0.4;
      let current = CHAPTERS[0];
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el && el.offsetTop <= viewportFocus) {
          current = ch;
        }
      }
      setActiveChapter(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-[#1E90FF] origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <aside
        aria-label="Reading progress section"
        className={`hidden lg:flex fixed bottom-7 right-10 z-30 items-center gap-2 chapter-label transition-colors duration-300 pointer-events-none ${
          isDark ? 'text-[#9297A1]' : 'text-[#525866]'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1E90FF]" aria-hidden="true" />
        <span>{activeChapter.label}</span>
      </aside>
    </>
  );
};
