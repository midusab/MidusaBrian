import React, { useState } from 'react';
import { Check, Copy, Download, Play, RefreshCw, Sliders, Smartphone, Sparkles, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ThemeMode } from '../types/portfolio';
import { SectionShell } from './ui/SectionShell';

interface InteractivePlaygroundProps {
  theme: ThemeMode;
}

type AccentColor = {
  name: string;
  hex: string;
  twClass: string;
};

const ACCENTS: AccentColor[] = [
  { name: 'DodgerBlue', hex: '#1E90FF', twClass: 'bg-[#1E90FF]' },
  { name: 'Deep Azure', hex: '#0066CC', twClass: 'bg-[#0066CC]' },
  { name: 'Sky Focus', hex: '#38BDF8', twClass: 'bg-[#38BDF8]' },
  { name: 'Slate Mono', hex: '#94A3B8', twClass: 'bg-[#94A3B8]' },
  { name: 'Pure White', hex: '#FFFFFF', twClass: 'bg-white' },
];

type SpeedOption = {
  label: string;
  duration: number;
};

const SPEEDS: SpeedOption[] = [
  { label: 'Snappy (150ms)', duration: 0.15 },
  { label: 'Balanced (300ms)', duration: 0.3 },
  { label: 'Cinematic (600ms)', duration: 0.6 },
];

type ComponentState = 'idle' | 'processing' | 'verified' | 'ready';

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ theme }) => {
  const [accent, setAccent] = useState<AccentColor>(ACCENTS[0]);
  const [speed, setSpeed] = useState<SpeedOption>(SPEEDS[1]);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>(theme);
  const [componentState, setComponentState] = useState<ComponentState>('idle');
  const [codeCopied, setCodeCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const isPreviewDark = previewTheme === 'dark';

  const handleCopyCode = async () => {
    const code = `/* Generated Design Tokens */
:root {
  --accent-color: ${accent.hex};
  --transition-speed: ${speed.duration}s;
  --theme-mode: '${previewTheme}';
  --component-state: '${componentState}';
}`;
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <SectionShell
      id="chapter-playground"
      labelledBy="playground-heading"
      theme={theme}
      surface="secondary"
      className="!py-16 sm:!py-24 lg:!py-32"
    >
      <div className="space-y-10 sm:space-y-12">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <p className="chapter-label text-[#1E90FF]">07 · Creative Engineering</p>
          <h2 id="playground-heading" className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
            Interactive coding playground.
          </h2>
          <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
            Experiment directly with design variables, transition physics, and payment state machines. Adjust tokens and see live UI re-render instantly.
          </p>
        </motion.div>

        {/* Playground Split Container */}
        <div
          className={`rounded-2xl border overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x ${
            isDark ? 'bg-[#0E1217] border-white/[0.08] divide-white/[0.08]' : 'bg-white border-black/[0.08] divide-black/[0.08] shadow-sm'
          }`}
        >
          {/* Controls Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-2">
              <Sliders className="w-4 h-4 text-[#1E90FF]" />
              <h3 className={`text-base font-medium tracking-tight ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
                Token Controller
              </h3>
            </div>

            {/* Accent Color Selection */}
            <div className="space-y-2.5">
              <label className="tech-meta text-[#1E90FF] uppercase tracking-wider block">
                Primary Brand Accent
              </label>
              <div className="flex flex-wrap gap-2.5">
                {ACCENTS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setAccent(item)}
                    data-cursor="TEST"
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      accent.name === item.name
                        ? 'border-[#1E90FF] text-[#1E90FF] bg-[#1E90FF]/10 font-bold'
                        : isDark
                        ? 'border-white/10 text-[#9297A1] hover:border-white/20'
                        : 'border-black/10 text-[#525866] hover:border-black/20'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.hex }} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Speed Selector */}
            <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
              <label className="tech-meta text-[#1E90FF] uppercase tracking-wider block">
                Transition Dynamics
              </label>
              <div className="flex flex-wrap gap-2">
                {SPEEDS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSpeed(s)}
                    data-cursor="TEST"
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      speed.label === s.label
                        ? 'border-[#1E90FF] text-[#1E90FF] bg-[#1E90FF]/10'
                        : isDark
                        ? 'border-white/10 text-[#9297A1] hover:border-white/20'
                        : 'border-black/10 text-[#525866] hover:border-black/20'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State Machine Preview */}
            <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
              <label className="tech-meta text-[#1E90FF] uppercase tracking-wider block">
                Payment State Lifecycle
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['idle', 'processing', 'verified', 'ready'] as ComponentState[]).map((stateKey) => (
                  <button
                    key={stateKey}
                    type="button"
                    onClick={() => setComponentState(stateKey)}
                    data-cursor="TEST"
                    className={`px-3 py-2 rounded-lg border text-xs font-mono capitalize transition-all ${
                      componentState === stateKey
                        ? 'border-[#1E90FF] text-[#1E90FF] bg-[#1E90FF]/10'
                        : isDark
                        ? 'border-white/10 text-[#9297A1] hover:border-white/20'
                        : 'border-black/10 text-[#525866] hover:border-black/20'
                    }`}
                  >
                    {stateKey === 'idle'
                      ? '1. Idle'
                      : stateKey === 'processing'
                      ? '2. STK Prompt'
                      : stateKey === 'verified'
                      ? '3. Verified'
                      : '4. Download'}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Theme Toggle */}
            <div className="space-y-2.5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="tech-meta text-[#1E90FF] uppercase tracking-wider">Canvas Theme</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTheme('dark')}
                  data-cursor="TEST"
                  className={`px-3 py-1 rounded-lg border text-xs font-mono ${
                    previewTheme === 'dark'
                      ? 'border-[#1E90FF] text-white bg-[#1E90FF]/20'
                      : isDark
                      ? 'border-white/10 text-[#9297A1]'
                      : 'border-black/10 text-[#525866]'
                  }`}
                >
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTheme('light')}
                  data-cursor="TEST"
                  className={`px-3 py-1 rounded-lg border text-xs font-mono ${
                    previewTheme === 'light'
                      ? 'border-[#1E90FF] text-slate-900 bg-[#1E90FF]/20'
                      : isDark
                      ? 'border-white/10 text-[#9297A1]'
                      : 'border-black/10 text-[#525866]'
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="tech-meta text-[#1E90FF]">Live Render Canvas</span>
                <span className={`text-[0.6875rem] font-mono ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                  Transition: {speed.duration}s
                </span>
              </div>

              {/* Interactive Component Stage */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex items-center justify-center min-h-[260px] ${
                  isPreviewDark
                    ? 'bg-[#0B0D10] border-white/10 shadow-inner'
                    : 'bg-slate-100 border-black/10'
                }`}
              >
                <motion.div
                  key={componentState}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: speed.duration, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full max-w-sm p-6 rounded-2xl border shadow-xl transition-colors duration-300 ${
                    isPreviewDark
                      ? 'bg-[#141922] border-white/10 text-[#F5F5F5]'
                      : 'bg-white border-black/10 text-[#0B0D10]'
                  }`}
                >
                  {componentState === 'idle' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#9297A1]">MidusaElibrary Checkout</span>
                        <span className="text-xs font-mono font-bold" style={{ color: accent.hex }}>
                          KES 350
                        </span>
                      </div>
                      <h4 className="text-lg font-medium">Software Architecture Guide</h4>
                      <p className="text-xs text-[#9297A1] leading-relaxed">
                        Instant digital book access via M-Pesa mobile money.
                      </p>
                      <button
                        type="button"
                        onClick={() => setComponentState('processing')}
                        data-cursor="TEST"
                        className="w-full py-2.5 rounded-lg text-white text-xs font-mono font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                        style={{ backgroundColor: accent.hex }}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Initiate STK Push</span>
                      </button>
                    </div>
                  )}

                  {componentState === 'processing' && (
                    <div className="space-y-4 text-center py-2">
                      <div className="relative mx-auto w-10 h-10 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                          className="w-full h-full rounded-full border-2 border-t-transparent"
                          style={{ borderColor: accent.hex, borderTopColor: 'transparent' }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Waiting for M-Pesa PIN</h4>
                        <p className="text-xs text-[#9297A1] mt-1">
                          STK prompt dispatched to 07XX... Check your handset.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setComponentState('verified')}
                        data-cursor="TEST"
                        className="text-xs font-mono underline hover:opacity-80"
                        style={{ color: accent.hex }}
                      >
                        Simulate Customer Entered PIN →
                      </button>
                    </div>
                  )}

                  {componentState === 'verified' && (
                    <div className="space-y-4 text-center py-2">
                      <div
                        className="mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: accent.hex }}
                      >
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">M-Pesa Payment Verified</h4>
                        <p className="text-xs text-[#9297A1] font-mono mt-1">
                          Receipt: QA9872LK12 · Confirmed via Webhook
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setComponentState('ready')}
                        data-cursor="TEST"
                        className="w-full py-2 rounded-lg text-white text-xs font-mono font-medium"
                        style={{ backgroundColor: accent.hex }}
                      >
                        Grant Signed Download Access
                      </button>
                    </div>
                  )}

                  {componentState === 'ready' && (
                    <div className="space-y-4 py-1">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" style={{ color: accent.hex }} />
                        <h4 className="text-sm font-medium">Download Authorized</h4>
                      </div>
                      <p className="text-xs text-[#9297A1]">
                        Cryptographically signed Supabase token generated. Valid for 60 minutes.
                      </p>
                      <button
                        type="button"
                        onClick={() => setComponentState('idle')}
                        data-cursor="TEST"
                        className="w-full py-2 rounded-lg border text-xs font-mono transition-colors hover:border-[#1E90FF]"
                      >
                        Reset Simulation
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Generated Tokens & Code Display */}
            <div
              className={`p-4 rounded-xl border text-xs font-mono space-y-2.5 ${
                isDark ? 'bg-black/40 border-white/10 text-[#9297A1]' : 'bg-slate-50 border-black/10 text-[#525866]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#1E90FF]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Real-time Token State</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  data-cursor="TEST"
                  className="inline-flex items-center gap-1 hover:text-[#1E90FF] transition-colors"
                >
                  {codeCopied ? <Check className="w-3 h-3 text-[#1E90FF]" /> : <Copy className="w-3 h-3" />}
                  <span>{codeCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="overflow-x-auto no-scrollbar text-[0.75rem] leading-relaxed">
{`--accent: ${accent.hex} (${accent.name})
--transition-duration: ${speed.duration}s
--canvas-mode: ${previewTheme}
--state-machine-step: ${componentState.toUpperCase()}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
