import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Check, Copy, FileText, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
  onOpenBooking,
}) => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
      className="relative min-h-[100svh] flex flex-col justify-between bg-white text-[#0B0D10] pt-24 pb-0 px-6 sm:px-10 lg:px-16 border-t border-black/[0.08] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative & Dynamic Action Bar */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <p className="chapter-label text-[#6B7280]">
              The Future — The Story Continues
            </p>

            <h2
              id="future-heading"
              className="editorial-headline text-[#0B0D10] max-w-[14ch]"
            >
              The story is still being written.
            </h2>

            <p className="editorial-body text-[#525866]">
              I&apos;m looking for opportunities to build meaningful software, collaborate with
              ambitious people, and continue growing as an engineer.
            </p>

            {/* Primary Dynamic Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a meeting</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={`mailto:${PROFILE.email}`}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-black/15 bg-white text-[#0B0D10] text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-[#1E90FF]" />
                <span>Email Midusa</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-black/15 bg-white text-[#0B0D10] text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-[#1E90FF]" />
                <span>View &amp; Download Résumé</span>
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-black/10 text-xs font-medium text-[#525866] hover:border-black/25 hover:text-[#0B0D10] transition-colors whitespace-nowrap"
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
              className="pt-4 border-t border-black/[0.08] flex flex-wrap items-center gap-x-10 gap-y-4 text-sm font-medium"
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[#0B0D10] hover:text-[#1E90FF] transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[#0B0D10] hover:text-[#1E90FF] transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className="tech-meta text-[#6B7280]">
                Open to software engineering internships, junior roles &amp; product collaborations
              </span>
            </nav>
          </motion.div>

          {/* Balanced Editorial Full-Color Portrait */}
          <div className="lg:col-span-5">
            <figure className="space-y-3 max-w-md lg:ml-auto">
              <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-slate-100">
                <img
                  src="/assets/aistudio/23474_cc099930.jpg"
                  alt="Studio portrait of Midusa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[50%_14%] scale-[1.09] transition-transform duration-700 ease-out hover:scale-[1.12]"
                />
              </div>
              <figcaption className="tech-meta text-[#6B7280] flex items-center justify-between px-1">
                <span>Midusa</span>
                <span>Kenya</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Subtle horizontal blue line continuing beyond the visible screen */}
      <div className="mx-auto w-full max-w-[1440px] pt-10 pb-10">
        <div className="w-full flex flex-wrap items-center justify-between gap-4 tech-meta text-[#6B7280] pb-6">
          <span>Midusa · Junior Software Engineer &amp; Computer Science Student</span>
          <span>Kenya</span>
        </div>
        <div
          aria-hidden="true"
          className="relative h-px w-[120%] bg-gradient-to-r from-[#1E90FF] via-[#1E90FF]/60 to-transparent"
        />
      </div>
    </section>
  );
};
