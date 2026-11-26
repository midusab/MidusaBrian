import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Code2,
  Compass,
  Copy,
  ExternalLink,
  Layers,
  MessageSquare,
  Moon,
  Search,
  Sliders,
  Sun,
  Terminal,
  User,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { useModalEscapeAndScrollLock } from '../hooks/useModalEscapeAndScrollLock';
import { ThemeMode } from '../types/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onJumpToChapter: (id: string) => void;
  onOpenBooking: () => void;
  onOpenMidusaCaseStudy?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Case Studies' | 'Engineering' | 'Action' | 'External';
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onJumpToChapter,
  onOpenBooking,
  onOpenMidusaCaseStudy,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  useModalEscapeAndScrollLock({
    onClose,
  });

  const commands: CommandItem[] = useMemo(() => [
    {
      id: 'home',
      title: 'Home & Opening Question',
      category: 'Navigation',
      shortcut: 'H',
      icon: Compass,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-opening');
      },
    },
    {
      id: 'journey',
      title: 'Developer Journey Timeline',
      category: 'Navigation',
      shortcut: 'J',
      icon: User,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-learning');
      },
    },
    {
      id: 'projects',
      title: 'Built Projects Showcase',
      category: 'Navigation',
      shortcut: 'P',
      icon: Code2,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-building');
      },
    },
    {
      id: 'case-study-elibrary',
      title: 'MidusaElibrary — Deep Engineering Case Study',
      category: 'Case Studies',
      shortcut: '↵',
      icon: BookOpen,
      perform: () => {
        onClose();
        if (onOpenMidusaCaseStudy) {
          onOpenMidusaCaseStudy();
        } else {
          onJumpToChapter('chapter-building');
        }
      },
    },
    {
      id: 'architecture',
      title: 'Interactive System Architecture Explorer',
      category: 'Engineering',
      shortcut: 'A',
      icon: Layers,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-architecture');
      },
    },
    {
      id: 'journal',
      title: 'Developer Journal ("Things I Learned Along the Way")',
      category: 'Engineering',
      shortcut: 'L',
      icon: Terminal,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-journal');
      },
    },
    {
      id: 'playground',
      title: 'Interactive Coding Playground',
      category: 'Engineering',
      shortcut: 'T',
      icon: Sliders,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-playground');
      },
    },
    {
      id: 'skills',
      title: 'Technical Foundation & Ecosystem',
      category: 'Navigation',
      shortcut: 'S',
      icon: Code2,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-tools');
      },
    },
    {
      id: 'career',
      title: 'Career Opportunities & Collaboration',
      category: 'Navigation',
      shortcut: 'C',
      icon: Briefcase,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-career');
      },
    },
    {
      id: 'contact',
      title: 'Contact Information',
      category: 'Navigation',
      shortcut: 'M',
      icon: MessageSquare,
      perform: () => {
        onClose();
        onJumpToChapter('chapter-future');
      },
    },
    {
      id: 'toggle-theme',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      category: 'Action',
      shortcut: 'T',
      icon: isDark ? Sun : Moon,
      perform: () => {
        onToggleTheme();
      },
    },
    {
      id: 'book-meeting',
      title: 'Schedule a Meeting / Technical Chat',
      category: 'Action',
      shortcut: 'B',
      icon: Calendar,
      perform: () => {
        onClose();
        onOpenBooking();
      },
    },
    {
      id: 'whatsapp',
      title: 'Chat on WhatsApp (+254112478220)',
      category: 'External',
      shortcut: 'W',
      icon: MessageSquare,
      perform: () => {
        onClose();
        window.open(PROFILE.whatsapp, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'github',
      title: 'View GitHub Profile (@midusab)',
      category: 'External',
      shortcut: 'G',
      icon: ExternalLink,
      perform: () => {
        onClose();
        window.open(PROFILE.github, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      category: 'External',
      shortcut: 'In',
      icon: ExternalLink,
      perform: () => {
        onClose();
        window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer');
      },
    },
  ], [isDark, onClose, onJumpToChapter, onOpenBooking, onOpenMidusaCaseStudy, onToggleTheme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 bg-[#0B0D10]/75 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center pt-16 sm:pt-24"
      onClick={onClose}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: -10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[75vh] ${
          isDark
            ? 'bg-[#0E1217] border-white/10 text-[#F5F5F5]'
            : 'bg-white border-black/10 text-[#0B0D10]'
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-white/[0.08] shrink-0">
          <Search className="w-4 h-4 text-[#1E90FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to chapter... (Esc to close)"
            className={`w-full bg-transparent text-sm placeholder:text-neutral-500 focus:outline-none ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          />
          <span className="hidden sm:inline-block font-mono text-[0.6875rem] px-2 py-0.5 rounded border border-white/10 text-neutral-400">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#9297A1] font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.perform}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-mono transition-colors ${
                    isSelected
                      ? 'bg-[#1E90FF] text-white'
                      : isDark
                      ? 'text-[#F5F5F5] hover:bg-white/[0.04]'
                      : 'text-[#0B0D10] hover:bg-black/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#1E90FF]'}`} />
                    <span className="truncate">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[0.625rem] px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : isDark
                          ? 'bg-white/5 text-[#9297A1]'
                          : 'bg-black/5 text-[#525866]'
                      }`}
                    >
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <span className={`text-[0.6875rem] ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard Footer Tip */}
        <div
          className={`px-4 py-2.5 border-t text-[0.6875rem] font-mono flex items-center justify-between ${
            isDark ? 'border-white/[0.06] text-[#9297A1] bg-black/20' : 'border-black/[0.06] text-[#6B7280] bg-slate-50'
          }`}
        >
          <span>Use ↑ and ↓ to navigate · ↵ to select</span>
          <span className="hidden sm:inline">Ctrl + K / ⌘K anytime</span>
        </div>
      </motion.div>
    </div>
  );
};
