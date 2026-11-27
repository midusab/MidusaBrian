import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { CHAPTERS, PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';

interface FooterProps {
  theme: ThemeMode;
  onJumpToChapter: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onJumpToChapter }) => {
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Site footer"
      className={`border-t transition-colors duration-300 relative z-10 ${
        isDark ? 'bg-[#0B0D10] text-[#F5F5F5] border-white/[0.08]' : 'bg-white text-[#0B0D10] border-black/[0.08]'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 space-y-10 sm:space-y-12">
        {/* Top tier */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 dark:border-white/10">
          <div className="space-y-2 max-w-md">
            <a
              href="#chapter-opening"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              data-cursor="TOP"
              className="text-lg font-medium tracking-tight hover:text-[#1E90FF] transition-colors inline-block"
            >
              Midusa<span className="text-[#1E90FF]">.</span>
            </a>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              Junior software engineer exploring the craft of resilient web systems, distributed payments, and human-centered user experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className={`hover:text-[#1E90FF] transition-colors ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LINKEDIN"
              className={`hover:text-[#1E90FF] transition-colors ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CHAT"
              className={`hover:text-[#1E90FF] transition-colors ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor="EMAIL"
              className={`hover:text-[#1E90FF] transition-colors ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}
            >
              Email
            </a>
          </div>
        </div>

        {/* Quick Chapter Navigation */}
        <nav aria-label="Footer chapter links" className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs font-medium">
          {CHAPTERS.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              onClick={(e) => {
                e.preventDefault();
                onJumpToChapter(ch.id);
              }}
              className={`hover:text-[#1E90FF] transition-colors ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}
            >
              {ch.label}
            </a>
          ))}
        </nav>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 text-xs font-sans">
          <p className={isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}>
            &copy; {currentYear} Midusa Brian. Designed &amp; built in Nairobi, Kenya.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="TOP"
            className={`inline-flex items-center gap-1.5 hover:text-[#1E90FF] transition-colors ${
              isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
