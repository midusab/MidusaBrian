import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, RefreshCw, Server, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PAYMENT_FLOW_STEPS, SYSTEM_ARCHITECTURE_NODES } from '../data/portfolioData';
import { ArchitectureNode, PaymentFlowStep, ThemeMode } from '../types/portfolio';
import { SectionShell } from './ui/SectionShell';

interface SystemArchitectureProps {
  theme: ThemeMode;
  inCaseStudy?: boolean;
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({
  theme,
  inCaseStudy = false,
}) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'payment-flow'>('topology');
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(SYSTEM_ARCHITECTURE_NODES[0]);
  const [selectedStep, setSelectedStep] = useState<PaymentFlowStep>(PAYMENT_FLOW_STEPS[0]);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const content = (
    <div className="space-y-10 sm:space-y-12">
      {/* Section Header */}
      {!inCaseStudy && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8"
        >
          <div className="max-w-3xl space-y-3">
            <p className="chapter-label text-[#1E90FF]">System Engineering</p>
            <h2 className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              How the pieces communicate.
            </h2>
            <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              An interactive inspection of MidusaElibrary’s cloud architecture, state machines, and Safaricom M-Pesa payment lifecycle.
            </p>
          </div>

          {/* Mode Switcher */}
          <div
            role="tablist"
            aria-label="Architecture visualization mode"
            className={`inline-flex items-center gap-1 p-1 rounded-xl border self-start lg:self-end ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-black/10'
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'topology'}
              onClick={() => setActiveTab('topology')}
              data-cursor="INSPECT"
              className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'topology'
                  ? 'text-white'
                  : isDark
                  ? 'text-[#9297A1] hover:text-[#F5F5F5]'
                  : 'text-[#525866] hover:text-[#0B0D10]'
              }`}
            >
              {activeTab === 'topology' && (
                <motion.span
                  layoutId="arch-tab-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-[#1E90FF]"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>System Topology</span>
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'payment-flow'}
              onClick={() => setActiveTab('payment-flow')}
              data-cursor="INSPECT"
              className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'payment-flow'
                  ? 'text-white'
                  : isDark
                  ? 'text-[#9297A1] hover:text-[#F5F5F5]'
                  : 'text-[#525866] hover:text-[#0B0D10]'
              }`}
            >
              {activeTab === 'payment-flow' && (
                <motion.span
                  layoutId="arch-tab-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-[#1E90FF]"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5" />
                <span>M-Pesa Payment Flow</span>
              </span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Interactive Container */}
      <div
        className={`rounded-2xl border transition-colors overflow-hidden ${
          isDark
            ? 'bg-[#0E1217] border-white/[0.08]'
            : 'bg-white border-black/[0.08] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]'
        }`}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'topology' ? (
            <motion.div
              key="topology"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]"
            >
              {/* Nodes Selection Grid */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="tech-meta text-[#1E90FF]">Component Graph · Select node to inspect</p>
                  <span className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                    7 Active Nodes
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SYSTEM_ARCHITECTURE_NODES.map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNode(node)}
                        data-cursor="INSPECT"
                        className={`text-left p-4 rounded-xl border transition-all duration-200 group relative ${
                          isSelected
                            ? isDark
                              ? 'bg-white/[0.06] border-[#1E90FF] shadow-[0_0_24px_-4px_rgba(30,144,255,0.25)]'
                              : 'bg-[#1E90FF]/[0.05] border-[#1E90FF] shadow-[0_0_20px_-4px_rgba(30,144,255,0.18)]'
                            : isDark
                            ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                            : 'bg-slate-50 border-black/[0.06] hover:border-black/20 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span
                            className="text-[0.6875rem] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E90FF]/15 text-[#1E90FF]"
                          >
                            {node.category}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isSelected
                                ? 'text-[#1E90FF] translate-x-0.5'
                                : isDark
                                ? 'text-white/20 group-hover:text-white/50'
                                : 'text-black/20 group-hover:text-black/50'
                            }`}
                          />
                        </div>
                        <h4
                          className={`text-base font-medium tracking-tight mb-1 transition-colors ${
                            isSelected
                              ? 'text-[#1E90FF]'
                              : isDark
                              ? 'text-[#F5F5F5]'
                              : 'text-[#0B0D10]'
                          }`}
                        >
                          {node.name}
                        </h4>
                        <p className={`tech-meta truncate ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                          {node.tech}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Node Inspector Detail Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E90FF] animate-pulse" />
                    <span className="tech-meta text-[#1E90FF]">Inspector Details</span>
                  </div>

                  <div>
                    <span className="text-[0.6875rem] font-medium text-[#1E90FF] uppercase tracking-wider">
                      {selectedNode.category} Layer
                    </span>
                    <h3
                      className={`text-2xl font-medium tracking-tight mt-1 ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                      }`}
                    >
                      {selectedNode.name}
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                      {selectedNode.tech}
                    </p>
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'}`}>
                    <p className="tech-meta text-[#1E90FF] mb-1.5">Architectural Role</p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                      {selectedNode.role}
                    </p>
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'}`}>
                    <p className="tech-meta text-[#1E90FF] mb-1.5">Implementation Mechanics</p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                      {selectedNode.details}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payment-flow"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 md:p-10 space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="tech-meta text-[#1E90FF]">M-Pesa Daraja STK Push State Machine</p>
                  <h3 className={`text-xl sm:text-2xl font-medium tracking-tight mt-1 ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                    End-to-End Payment Lifecycle
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#1E90FF] animate-pulse" />
                  <span className="tech-meta text-[#1E90FF]">Asynchronous Webhook Protocol</span>
                </div>
              </div>

              {/* Interactive Step Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {PAYMENT_FLOW_STEPS.map((step) => {
                  const isSelected = selectedStep.id === step.id;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setSelectedStep(step)}
                      data-cursor="INSPECT"
                      className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? isDark
                            ? 'bg-[#1E90FF]/10 border-[#1E90FF] shadow-[0_0_20px_-4px_rgba(30,144,255,0.25)]'
                            : 'bg-[#1E90FF]/10 border-[#1E90FF]'
                          : isDark
                          ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                          : 'bg-slate-50 border-black/[0.06] hover:border-black/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[0.625rem] font-medium px-1.5 py-0.5 rounded bg-[#1E90FF]/15 text-[#1E90FF]">
                          {step.actor}
                        </span>
                      </div>
                      <p className={`text-xs font-medium line-clamp-2 ${isSelected ? 'text-[#1E90FF]' : isDark ? 'text-white' : 'text-black'}`}>
                        {step.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Step Detailed Inspector */}
              <motion.div
                key={selectedStep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`p-6 sm:p-7 rounded-xl border space-y-4 ${
                  isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-black/[0.08]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {selectedStep.step}
                    </span>
                    <div>
                      <h4 className={`text-base sm:text-lg font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                        {selectedStep.title}
                      </h4>
                      <p className="tech-meta text-[#25D366]">Actor: {selectedStep.actor}</p>
                    </div>
                  </div>
                  <span className={`tech-meta px-3 py-1 rounded-full border ${
                    isDark ? 'bg-white/[0.04] border-white/10 text-[#9297A1]' : 'bg-white border-black/10 text-[#525866]'
                  }`}>
                    Protocol: {selectedStep.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5">
                    <p className="tech-meta text-[#1E90FF]">Operational Action</p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                      {selectedStep.action}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="tech-meta text-[#25D366]">Technical &amp; Cryptographic Details</p>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                      {selectedStep.technicalDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (inCaseStudy) {
    return <div className="pt-8">{content}</div>;
  }

  return (
    <SectionShell
      id="chapter-architecture"
      labelledBy="architecture-heading"
      theme={theme}
      surface="secondary"
      className="!py-16 sm:!py-24 lg:!py-32"
    >
      {content}
    </SectionShell>
  );
};
