import React, { useState } from 'react';
import { TOOL_GROUPS } from '../data/portfolioData';

export const SkillsEcosystem: React.FC = () => {
  const [activeTool, setActiveTool] = useState<{
    name: string;
    status: 'used' | 'learning';
    note: string;
  }>(TOOL_GROUPS[0].items[1]); // React by default

  return (
    <section
      id="chapter-tools"
      aria-labelledby="tools-heading"
      className="relative bg-[#F5F5F5] text-[#0B0D10] py-24 md:py-32 px-6 sm:px-10 lg:px-16 border-t border-black/[0.08]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1E90FF]">
              The Tools
            </p>
            <h2
              id="tools-heading"
              className="editorial-headline text-2xl sm:text-4xl text-[#0B0D10]"
            >
              My technical foundation.
            </h2>

            {/* Dynamic Context Readout */}
            <div className="pt-4 border-t border-black/[0.08] space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#0B0D10]">{activeTool.name}</span>
                <span
                  className={
                    activeTool.status === 'learning' ? 'text-[#525866] italic' : 'text-[#1E90FF]'
                  }
                >
                  {activeTool.status === 'learning' ? 'Currently exploring' : 'Used in projects'}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#525866]">{activeTool.note}</p>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-black/[0.08]">
            {TOOL_GROUPS.map((group) => (
              <div
                key={group.label}
                className="py-7 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
              >
                <p className="sm:col-span-4 text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                  {group.label}
                </p>
                <div className="sm:col-span-8 flex flex-wrap items-baseline gap-x-2 gap-y-2 text-lg md:text-xl font-normal leading-relaxed text-[#0B0D10]">
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
                              ? 'border-transparent text-[#525866] italic hover:text-[#1E90FF]'
                              : 'border-transparent text-[#0B0D10] hover:text-[#1E90FF]'
                          }`}
                        >
                          {item.name}
                          {item.status === 'learning' ? ' (exploring)' : ''}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
