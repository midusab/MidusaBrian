import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Download, Play, RefreshCw, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ThemeMode } from '../types/portfolio';
import { SectionShell } from './ui/SectionShell';

interface InteractivePlaygroundProps {
  theme: ThemeMode;
}

type CheckoutState = 'idle' | 'prompt' | 'verified' | 'delivery';

const STATES: { id: CheckoutState; label: string }[] = [
  { id: 'idle', label: 'Idle' },
  { id: 'prompt', label: 'STK Prompt' },
  { id: 'verified', label: 'Verified' },
  { id: 'delivery', label: 'Delivery' },
];

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ theme }) => {
  const [activeState, setActiveState] = useState<CheckoutState>('idle');
  const [isSimulating, setIsSimulating] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveState('prompt');

    setTimeout(() => {
      setActiveState('verified');
      setTimeout(() => {
        setActiveState('delivery');
        setTimeout(() => {
          setIsSimulating(false);
        }, 1200);
      }, 1400);
    }, 1400);
  };

  return (
    <SectionShell
      id="chapter-playground"
      labelledBy="playground-heading"
      theme={theme}
      surface="secondary"
      className="!py-14 sm:!py-20 lg:!py-24"
    >
      <div className="space-y-8 sm:space-y-10">
        {/* Header without numbering */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl space-y-2">
            <p className="chapter-label text-[#1E90FF]">Creative Engineering</p>
            <h2 id="playground-heading" className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              Interactive state sandbox.
            </h2>
            <p className={`editorial-body text-sm ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              A compact simulation demonstrating how the M-Pesa mobile checkout state machine transitions gracefully under network latency.
            </p>
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-2.5 self-start lg:self-end">
            <button
              type="button"
              onClick={runSimulation}
              disabled={isSimulating}
              data-cursor="RUN"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? 'Simulating...' : 'Simulate Lifecycle'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSimulating(false);
                setActiveState('idle');
              }}
              data-cursor="RESET"
              aria-label="Reset simulation"
              className={`p-2 rounded-lg border text-xs transition-colors ${
                isDark ? 'border-white/10 hover:border-white/25 text-[#9297A1]' : 'border-black/10 hover:border-black/25 text-[#525866]'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Compact Playground Card */}
        <div
          className={`rounded-2xl border p-5 sm:p-7 transition-all ${
            isDark ? 'bg-[#0E1217] border-white/[0.08]' : 'bg-white border-black/[0.08] shadow-sm'
          }`}
        >
          {/* Segmented Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 dark:border-white/10">
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/10 dark:border-white/10 bg-white/[0.02]">
              {STATES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveState(s.id);
                  }}
                  data-cursor="TEST"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeState === s.id
                      ? 'bg-[#1E90FF] text-white font-medium shadow-sm'
                      : isDark
                      ? 'text-[#9297A1] hover:text-[#F5F5F5]'
                      : 'text-[#525866] hover:text-[#0B0D10]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <span className={`text-[11px] ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
              Latency: &lt;100ms · Optimistic UI
            </span>
          </div>

          {/* Interactive Stage Preview */}
          <div className="pt-6 min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-xl p-4 rounded-xl border border-dashed border-white/15 dark:border-white/15"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E90FF]/10 text-[#1E90FF] flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                        Awaiting Checkout Initiation
                      </p>
                      <p className={`text-xs ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                        Cart item: Software Architecture Manual (KES 450)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveState('prompt')}
                    data-cursor="PAY"
                    className="px-4 py-2 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
                  >
                    Pay with M-Pesa
                  </button>
                </motion.div>
              )}

              {activeState === 'prompt' && (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-xl p-4 rounded-xl border border-[#1E90FF]/40 bg-[#1E90FF]/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E90FF]/15 text-[#1E90FF] flex items-center justify-center shrink-0 animate-pulse">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E90FF]">
                        SIM Toolkit Prompt Sent
                      </p>
                      <p className={`text-xs ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                        Check your phone (+254 712 *** 890) and enter M-Pesa PIN.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveState('verified')}
                    data-cursor="TEST"
                    className="px-3.5 py-2 rounded-lg border border-[#1E90FF]/50 text-xs font-medium text-[#1E90FF] hover:bg-[#1E90FF]/10 transition-colors whitespace-nowrap"
                  >
                    Simulate PIN entry
                  </button>
                </motion.div>
              )}

              {activeState === 'verified' && (
                <motion.div
                  key="verified"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-xl p-4 rounded-xl border border-white/20 dark:border-white/20 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E90FF]/15 text-[#1E90FF] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                        Payment Callback Verified
                      </p>
                      <p className={`text-xs ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
                        Receipt: QK84DX91P · PostgreSQL record committed
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveState('delivery')}
                    data-cursor="TEST"
                    className="px-3.5 py-2 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
                  >
                    Unlock Download
                  </button>
                </motion.div>
              )}

              {activeState === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-xl p-4 rounded-xl border border-[#1E90FF]/50 bg-[#1E90FF]/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1E90FF] text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                        Ebook Access Granted
                      </p>
                      <p className={`text-xs ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`}>
                        Signed Supabase storage token generated with 24h validity.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveState('idle')}
                    data-cursor="DOWNLOAD"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download file</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
