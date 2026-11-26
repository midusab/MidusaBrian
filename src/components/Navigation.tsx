import React, { useEffect, useState } from 'react';
import { Command, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';

export type { ThemeMode };

interface NavigationProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onJumpToChapter: (id: string) => void;
  onOpenBooking: () => void;
  onOpenCommandPalette?: () => void;
}

const TOP_LINKS = [
  { id: 'chapter-beginning', label: 'About' },
  { id: 'chapter-learning', label: 'Journey' },
  { id: 'chapter-building', label: 'Projects' },
  { id: 'chapter-architecture', label: 'Architecture' },
  { id: 'chapter-journal', label: 'Journal' },
  { id: 'chapter-playground', label: 'Playground' },
  { id: 'chapter-career', label: 'Opportunities' },
];

export const Navigation: React.FC<NavigationProps> = ({
  theme,
  onToggleTheme,
  onJumpToChapter,
  onOpenBooking,
  onOpenCommandPalette,
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
      ? 'bg-[#0B0D10]/90 text-[#F5F5F5] border-white/10'
      : 'bg-transparent text-[#F5F5F5] border-transparent'
    : scrolled
    ? 'bg-white/95 text-[#0B0D10] border-black/10 shadow-sm'
    : 'bg-transparent text-[#0B0D10] border-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${navTheme}`}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-4 md:gap-6 px-4 sm:px-8 md:px-12 lg:px-16 h-16">
        <a
          href="#chapter-opening"
          onClick={(e) => handleLinkClick(e, 'chapter-opening')}
          className="text-base font-medium tracking-[-0.015em] whitespace-nowrap shrink-0 hover:text-[#1E90FF] transition-colors"
        >
          Midusa<span className="text-[#1E90FF]">.</span>
        </a>

        {/* Primary Desktop Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-8 text-xs font-medium"
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

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Quick Search / Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              data-cursor="SEARCH"
              aria-label="Open command palette"
              className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs transition-colors duration-150 ${
                isDark
                  ? 'border-white/12 bg-white/[0.03] text-[#9297A1] hover:border-[#1E90FF] hover:text-[#F5F5F5]'
                  : 'border-black/10 bg-slate-50 text-[#525866] hover:border-[#1E90FF] hover:text-[#0B0D10]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-sans text-xs">Search</span>
              <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 dark:border-white/10 bg-white/5 opacity-80">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            data-cursor="THEME"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={!isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-colors duration-150 ${
              isDark
                ? 'border-white/15 text-[#9297A1] hover:border-[#1E90FF] hover:text-[#1E90FF]'
                : 'border-black/12 text-[#525866] hover:border-[#1E90FF] hover:text-[#1E90FF]'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Contact Anchor */}
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

          {/* Booking Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            data-cursor="MEET"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#1E90FF] text-white text-xs font-medium whitespace-nowrap shrink-0 hover:bg-[#1677D9] active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            Book a meeting
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 text-current hover:text-[#1E90FF] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden border-t px-4 sm:px-8 py-5 max-h-[calc(100svh-4rem)] overflow-y-auto no-scrollbar shadow-2xl ${
            isDark
              ? 'bg-[#0B0D10]/98 border-white/10 text-[#F5F5F5]'
              : 'bg-white/98 border-black/10 text-[#0B0D10]'
          }`}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => handleLinkClick(e, chapter.id)}
                className="flex items-center justify-between py-2.5 px-2 text-sm font-medium hover:text-[#1E90FF] hover:bg-white/[0.03] rounded-lg transition-colors"
              >
                <span>{chapter.label}</span>
                <span className="text-[10px] font-mono text-[#1E90FF]">{chapter.index}</span>
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 dark:border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#1E90FF] text-white text-sm font-medium text-center hover:bg-[#1677D9] transition-colors"
              >
                Book a meeting
              </button>

              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCommandPalette();
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg border text-sm font-medium text-center transition-colors ${
                    isDark
                      ? 'border-white/15 bg-white/[0.04] text-[#F5F5F5]'
                      : 'border-black/15 bg-slate-50 text-[#0B0D10]'
                  }`}
                >
                  Search &amp; Commands (⌘K)
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
