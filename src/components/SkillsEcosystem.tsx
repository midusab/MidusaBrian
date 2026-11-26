import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { TOOL_GROUPS } from '../data/portfolioData';
import { ThemeMode, ToolItem } from '../types/portfolio';
import { SectionShell } from './ui/SectionShell';

interface SkillsEcosystemProps {
  theme: ThemeMode;
}

export const SkillsEcosystem: React.FC<SkillsEcosystemProps> = ({ theme }) => {
  const [activeTool, setActiveTool] = useState<ToolItem>(TOOL_GROUPS[0].items[1]);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <SectionShell
      id="chapter-tools"
      labelledBy="tools-heading"
      theme={theme}
      surface="secondary"
      className="!py-16 sm:!py-24 lg:!py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 space-y-5"
        >
          <h2
            id="tools-heading"
            className={`editorial-subheadline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}
          >
            My technical foundation.
          </h2>

          <div
            className={`pt-4 border-t min-h-[88px] ${
              isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-sm font-medium ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                    }`}
                  >
                    {activeTool.name}
                  </span>
                  <span
                    className={`tech-meta ${
                      activeTool.status === 'learning'
                        ? isDark
                          ? 'text-[#9297A1] italic'
                          : 'text-[#525866] italic'
                        : 'text-[#1E90FF]'
                    }`}
                  >
                    {activeTool.status === 'learning' ? 'Currently exploring' : 'Used in projects'}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed max-w-[42ch] ${
                    isDark ? 'text-[#9297A1]' : 'text-[#525866]'
                  }`}
                >
                  {activeTool.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div
          className={`lg:col-span-8 divide-y ${
            isDark ? 'divide-white/[0.08]' : 'divide-black/[0.08]'
          }`}
        >
          {TOOL_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : groupIdx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-6 sm:py-7 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-baseline"
            >
              <p
                className={`sm:col-span-4 chapter-label ${
                  isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'
                }`}
              >
                {group.label}
              </p>
              <div className="sm:col-span-8 flex flex-wrap items-baseline gap-x-2 gap-y-2 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
                {group.items.map((item, idx) => {
                  const isSelected = activeTool.name === item.name;
                  return (
                    <React.Fragment key={item.name}>
                      <button
                        type="button"
                        onClick={() => setActiveTool(item)}
                        onMouseEnter={() => setActiveTool(item)}
                        className={`text-left transition-colors duration-150 border-b ${
                          isSelected
                            ? 'border-[#1E90FF] text-[#1E90FF]'
                            : item.status === 'learning'
                            ? isDark
                              ? 'border-transparent text-[#9297A1] hover:text-[#1E90FF]'
                              : 'border-transparent text-[#525866] hover:text-[#1E90FF]'
                            : isDark
                            ? 'border-transparent text-[#F5F5F5] hover:text-[#1E90FF]'
                            : 'border-transparent text-[#0B0D10] hover:text-[#1E90FF]'
                        }`}
                      >
                        {item.name}
                        {item.status === 'learning' && (
                          <span
                            className={`tech-meta ml-1.5 ${
                              isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'
                            }`}
                          >
                            (exploring)
                          </span>
                        )}
                      </button>
                      {idx < group.items.length - 1 && (
                        <span className="text-[#9297A1]">,</span>
                      )}
                      {idx === group.items.length - 1 && (
                        <span className="text-[#9297A1]">.</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
