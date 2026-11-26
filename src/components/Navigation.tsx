import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData';

interface NavigationProps {
  onJumpToChapter: (id: string) => void;
  onOpenBooking: () => void;
}

const TOP_LINKS = [
  { id: 'chapter-beginning', label: 'Beginning' },
  { id: 'chapter-learning', label: 'Evolution' },
  { id: 'chapter-building', label: 'Building' },
  { id: 'chapter-mind', label: 'Mind' },
  { id: 'chapter-tools', label: 'Tools' },
];

export const Navigation: React.FC<NavigationProps> = ({
  onJumpToChapter,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [inLightZone, setInLightZone] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      const mindEl = document.getElementById('chapter-mind');
      if (mindEl) {
        const rect = mindEl.getBoundingClientRect();
        setInLightZone(rect.top <= 72);
      }
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

  const navTheme = inLightZone
    ? 'bg-[#F5F5F5]/90 text-[#0B0D10] border-black/10'
    : scrolled
    ? 'bg-[#0B0D10]/85 text-[#F5F5F5] border-white/10'
    : 'bg-transparent text-[#F5F5F5] border-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${navTheme}`}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-8 px-6 md:px-14 h-16">
        {/* Zone 1: Wordmark */}
        <a
          href="#chapter-opening"
          onClick={(e) => handleLinkClick(e, 'chapter-opening')}
          className="text-base font-medium tracking-[-0.015em] whitespace-nowrap shrink-0 hover:text-[#1E90FF] transition-colors"
        >
          Midusa
        </a>

        {/* Zone 2: Minimal chapter links */}
        <nav aria-label="Story chapters" className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide">
          {TOP_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#1E90FF] ${
                inLightZone ? 'text-[#525866]' : 'text-[#9297A1]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Subtle contact & booking actions */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className={`hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 border transition-colors duration-150 ${
              inLightZone
                ? 'border-[#0B0D10]/20 text-[#0B0D10] hover:border-[#1E90FF] hover:text-[#1E90FF]'
                : 'border-white/20 text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF]'
            }`}
          >
            Book a meeting
          </button>

          <a
            href="#chapter-future"
            onClick={(e) => handleLinkClick(e, 'chapter-future')}
            className={`hidden sm:inline-block text-xs font-medium whitespace-nowrap shrink-0 border-b pb-0.5 transition-colors duration-150 ${
              inLightZone
                ? 'border-[#0B0D10]/40 text-[#0B0D10] hover:border-[#1E90FF] hover:text-[#1E90FF]'
                : 'border-white/30 text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF]'
            }`}
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close chapter menu' : 'Open chapter menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-current hover:text-[#1E90FF] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`md:hidden border-t px-6 py-5 ${
            inLightZone
              ? 'bg-[#F5F5F5] border-black/10 text-[#0B0D10]'
              : 'bg-[#0B0D10] border-white/10 text-[#F5F5F5]'
          }`}
        >
          <nav aria-label="Mobile chapter navigation" className="flex flex-col gap-1">
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
