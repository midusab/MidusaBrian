import React, { useState } from 'react';
import { BookOpen, Calendar, ChevronDown, ChevronUp, Code2, Tag } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { JOURNAL_ENTRIES } from '../data/portfolioData';
import { JournalEntry, ThemeMode } from '../types/portfolio';
import { SectionShell } from './ui/SectionShell';

interface DeveloperJournalProps {
  theme: ThemeMode;
}

export const DeveloperJournal: React.FC<DeveloperJournalProps> = ({ theme }) => {
  const [expandedId, setExpandedId] = useState<string>(JOURNAL_ENTRIES[0].id);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const tags = ['All', ...Array.from(new Set(JOURNAL_ENTRIES.map((entry) => entry.tag)))];

  const filteredEntries =
    selectedTag === 'All'
      ? JOURNAL_ENTRIES
      : JOURNAL_ENTRIES.filter((entry) => entry.tag === selectedTag);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <SectionShell
      id="chapter-journal"
      labelledBy="journal-heading"
      theme={theme}
      surface="primary"
      className="!py-16 sm:!py-24 lg:!py-32"
    >
      <div className="space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8"
        >
          <div className="max-w-3xl space-y-3">
            <p className="chapter-label text-[#1E90FF]">Engineering Reflections</p>
            <h2 id="journal-heading" className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              Things I learned along the way.
            </h2>
            <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              A developer’s transparent engineering journal documenting actual production friction, architectural discoveries, and honest retrospectives.
            </p>
          </div>

          {/* Compact Topic Dropdown Filter */}
          <div className="self-start lg:self-end">
            <div className="relative inline-flex items-center">
              <label htmlFor="journal-tag-select" className="sr-only">Filter by topic</label>
              <select
                id="journal-tag-select"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                data-cursor="SELECT"
                className={`appearance-none pl-3.5 pr-8 py-2 rounded-lg border text-xs font-sans font-medium transition-all cursor-pointer focus:outline-none focus:border-[#1E90FF] ${
                  isDark
                    ? 'bg-[#0E1217] border-white/15 text-[#F5F5F5] hover:border-white/30'
                    : 'bg-white border-black/15 text-[#0B0D10] hover:border-black/30 shadow-sm'
                }`}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag} className={isDark ? 'bg-[#0B0D10] text-[#F5F5F5]' : 'bg-white text-[#0B0D10]'}>
                    {tag === 'All' ? 'All Topics' : tag}
                  </option>
                ))}
              </select>
              <ChevronDown className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`} />
            </div>
          </div>
        </motion.div>

        {/* Journal Entries List */}
        <div className={`divide-y ${isDark ? 'divide-white/[0.08]' : 'divide-black/[0.08]'}`}>
          {filteredEntries.map((entry, idx) => {
            const isExpanded = expandedId === entry.id;
            return (
              <motion.article
                key={entry.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-8 sm:py-10 first:pt-0 last:pb-0"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(entry.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(entry.id);
                    }
                  }}
                  data-cursor="READ"
                  className="w-full text-left group flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E90FF] rounded-xl p-2 -m-2"
                >
                  <div className="space-y-2 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3 tech-meta">
                      <span className="text-[#1E90FF]">{entry.date}</span>
                      <span className={isDark ? 'text-white/20' : 'text-black/20'}>·</span>
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[0.6875rem] ${
                          isDark
                            ? 'bg-white/[0.04] border-white/10 text-[#9297A1]'
                            : 'bg-black/[0.04] border-black/10 text-[#525866]'
                        }`}
                      >
                        {entry.tag}
                      </span>
                    </div>

                    <h3
                      className={`text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight transition-colors ${
                        isExpanded
                          ? 'text-[#1E90FF]'
                          : isDark
                          ? 'text-[#F5F5F5] group-hover:text-[#1E90FF]'
                          : 'text-[#0B0D10] group-hover:text-[#1E90FF]'
                      }`}
                    >
                      {entry.title}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                      isExpanded
                        ? 'border-[#1E90FF] text-[#1E90FF]'
                        : isDark
                        ? 'border-white/10 text-[#9297A1] group-hover:border-white/30'
                        : 'border-black/10 text-[#525866] group-hover:border-black/30'
                    }`}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Detailed Breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* The Problem */}
                        <div
                          className={`p-5 sm:p-6 rounded-2xl border space-y-2 ${
                            isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.06]'
                          }`}
                        >
                          <p className="tech-meta text-rose-400 uppercase tracking-wider font-semibold">
                            The Problem Encountered
                          </p>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                            {entry.problem}
                          </p>
                        </div>

                        {/* What I Discovered */}
                        <div
                          className={`p-5 sm:p-6 rounded-2xl border space-y-2 ${
                            isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.06]'
                          }`}
                        >
                          <p className="tech-meta text-[#1E90FF] uppercase tracking-wider font-semibold">
                            What I Discovered
                          </p>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                            {entry.discovery}
                          </p>
                        </div>

                        {/* How I Approached the Solution */}
                        <div
                          className={`p-5 sm:p-6 rounded-2xl border space-y-2 ${
                            isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.06]'
                          }`}
                        >
                          <p className="tech-meta text-[#10B981] uppercase tracking-wider font-semibold">
                            How I Approached the Solution
                          </p>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                            {entry.solution}
                          </p>
                        </div>

                        {/* What I Would Improve Next Time */}
                        <div
                          className={`p-5 sm:p-6 rounded-2xl border space-y-2 ${
                            isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.06]'
                          }`}
                        >
                          <p className="tech-meta text-amber-400 uppercase tracking-wider font-semibold">
                            What I Would Improve Next Time
                          </p>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                            {entry.improvement}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
};
