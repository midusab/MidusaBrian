import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Check, Copy, FileText, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';
import { LazyImage } from './LazyImage';
import { ThemeMode } from './Navigation';

interface ContactSectionProps {
  theme: ThemeMode;
  onOpenResume: () => void;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  theme,
  onOpenResume,
  onOpenBooking,
}) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section
      id="chapter-future"
      aria-labelledby="future-heading"
      className={`relative min-h-[100svh] flex flex-col justify-between pt-24 pb-0 px-6 sm:px-10 lg:px-16 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0E1217] text-[#F5F5F5] border-white/[0.08]'
          : 'bg-white text-[#0B0D10] border-black/[0.08]'
      }`}
    >
      {isDark && <GrainOverlay />}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative & Dynamic Action Bar */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <h2
              id="future-heading"
              className={`editorial-headline max-w-[14ch] ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
              }`}
            >
              The story is still being written.
            </h2>

            <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              I&apos;m looking for opportunities to build meaningful software, collaborate with
              ambitious people, and continue growing as an engineer.
            </p>

            {/* Primary Dynamic Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors duration-150 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a meeting</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.a
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                href={`mailto:${PROFILE.email}`}
                className={`group inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                  isDark
                    ? 'border-white/15 bg-white/[0.03] text-[#F5F5F5]'
                    : 'border-black/15 bg-white text-[#0B0D10]'
                }`}
              >
                <Mail className="w-4 h-4 text-[#1E90FF]" />
                <span>Email Midusa</span>
              </motion.a>

              <motion.button
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onOpenResume}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                  isDark
                    ? 'border-white/15 bg-white/[0.03] text-[#F5F5F5]'
                    : 'border-black/15 bg-white text-[#0B0D10]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#1E90FF]" />
                <span>View &amp; Download Résumé</span>
              </motion.button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                  isDark
                    ? 'border-white/10 text-[#9297A1] hover:border-white/25 hover:text-[#F5F5F5]'
                    : 'border-black/10 text-[#525866] hover:border-black/25 hover:text-[#0B0D10]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1E90FF]" />
                    <span className="text-[#1E90FF]">Copied {PROFILE.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy {PROFILE.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Minimal Editorial Channel Links */}
            <nav
              aria-label="External profiles"
              className={`pt-4 border-t flex flex-wrap items-center gap-x-10 gap-y-4 text-sm font-medium ${
                isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
              }`}
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 hover:text-[#1E90FF] transition-colors ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 hover:text-[#1E90FF] transition-colors ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E90FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                Open to software engineering internships, junior roles &amp; product collaborations
              </span>
            </nav>
          </motion.div>

          {/* Balanced Editorial Full-Color Portrait — Lazy Loaded */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <figure className="space-y-3 max-w-md lg:ml-auto">
              <div
                className={`overflow-hidden rounded-2xl aspect-[4/5] ${
                  isDark ? 'bg-[#111419]' : 'bg-slate-100'
                }`}
              >
                <LazyImage
                  src="/assets/aistudio/23474_cc099930.jpg"
                  alt="Studio portrait of Midusa"
                  isDark={isDark}
                  className="w-full h-full object-cover object-[50%_14%] scale-[1.09] transition-transform duration-700 ease-out hover:scale-[1.12]"
                />
              </div>
            </figure>
          </motion.div>
        </div>
      </div>

      {/* Animated horizontal DodgerBlue line continuing beyond the visible screen */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] pt-6 pb-10">
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-px w-[120%] origin-left bg-gradient-to-r from-[#1E90FF] via-[#1E90FF]/60 to-transparent"
        />
      </div>
    </section>
  );
};
