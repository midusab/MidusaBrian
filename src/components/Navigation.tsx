import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData';

export type ThemeMode = 'dark' | 'light';

interface NavigationProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onJumpToChapter: (id: string) => void;
  onOpenBooking: () => void;
}

const TOP_LINKS = [
  { id: 'chapter-beginning', label: 'About' },
  { id: 'chapter-learning', label: 'Journey' },
  { id: 'chapter-building', label: 'Projects' },
  { id: 'chapter-mind', label: 'Mindset' },
  { id: 'chapter-tools', label: 'Skills' },
];

export const Navigation: React.FC<NavigationProps> = ({
  theme,
  onToggleTheme,
  onJumpToChapter,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onJumpToChapter(id);
  };

  const navTheme = isDark
    ? scrolled
      ? 'bg-[#0B0D10]/85 text-[#F5F5F5] border-white/10'
      : 'bg-transparent text-[#F5F5F5] border-transparent'
    : scrolled
    ? 'bg-white/90 text-[#0B0D10] border-black/10'
    : 'bg-transparent text-[#0B0D10] border-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${navTheme}`}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-6 px-6 md:px-14 h-16">
        {/* Zone 1: Wordmark */}
        <a
          href="#chapter-opening"
          onClick={(e) => handleLinkClick(e, 'chapter-opening')}
          className="text-base font-medium tracking-[-0.015em] whitespace-nowrap shrink-0 hover:text-[#1E90FF] transition-colors"
        >
          Midusa<span className="text-[#1E90FF]">.</span>
        </a>

        {/* Zone 2: Clear user-friendly navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-medium tracking-wide"
        >
          {TOP_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1E90FF] ${
                isDark ? 'text-[#9297A1]' : 'text-[#525866]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme Toggle + Contact + Booking CTA (last) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={!isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors duration-150 ${
              isDark
                ? 'border-white/15 text-[#9297A1] hover:border-[#1E90FF] hover:text-[#1E90FF]'
                : 'border-black/12 text-[#525866] hover:border-[#1E90FF] hover:text-[#1E90FF]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#chapter-future"
            onClick={(e) => handleLinkClick(e, 'chapter-future')}
            className={`hidden sm:inline-block text-xs font-medium whitespace-nowrap shrink-0 border-b pb-0.5 transition-colors duration-150 ${
              isDark
                ? 'border-[#1E90FF]/60 text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF]'
                : 'border-[#1E90FF]/60 text-[#0B0D10] hover:border-[#1E90FF] hover:text-[#1E90FF]'
            }`}
          >
            Contact
          </a>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#1E90FF] text-white text-xs font-medium whitespace-nowrap shrink-0 hover:bg-[#1677D9] active:scale-[0.98] transition-all duration-150"
          >
            Book a meeting
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-current hover:text-[#1E90FF] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`md:hidden border-t px-6 py-5 ${
            isDark
              ? 'bg-[#0B0D10] border-white/10 text-[#F5F5F5]'
              : 'bg-white border-black/10 text-[#0B0D10]'
          }`}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => handleLinkClick(e, chapter.id)}
                className="flex items-center justify-between py-3 text-sm font-medium hover:text-[#1E90FF] transition-colors"
              >
                <span>{chapter.label}</span>
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="mt-2 w-full py-2.5 px-4 rounded-lg bg-[#1E90FF] text-white text-sm font-medium text-center hover:bg-[#1677D9] transition-colors"
            >
              Book a meeting
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
