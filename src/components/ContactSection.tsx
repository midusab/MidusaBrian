import React, { useRef, useState } from 'react';
import { ArrowUpRight, Calendar, Check, Copy, FileText, Mail } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { GrainOverlay } from './GrainOverlay';
import { LazyImage } from './LazyImage';

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
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const portraitY = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const portraitScale = useTransform(smoothProgress, [0, 0.5, 1], [1.03, 1.07, 1.03]);

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
      ref={sectionRef}
      id="chapter-future"
      aria-labelledby="future-heading"
      className={`relative scroll-mt-16 min-h-[100svh] flex flex-col justify-between pt-16 sm:pt-24 pb-0 px-4 sm:px-8 md:px-12 lg:px-16 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#0B0D10] text-[#F5F5F5] border-white/[0.08]'
          : 'bg-white text-[#0B0D10] border-black/[0.08]'
      }`}
    >
      {isDark && <GrainOverlay />}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] my-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
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

            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <motion.button
                type="button"
                data-cursor="MEET"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors duration-150 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a meeting</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.a
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                href={`mailto:${PROFILE.email}`}
                data-cursor="EMAIL"
                className={`group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
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
                data-cursor="RESUME"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={onOpenResume}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors duration-150 whitespace-nowrap ${
                  isDark
                    ? 'border-white/15 bg-white/[0.03] text-[#F5F5F5]'
                    : 'border-black/15 bg-white text-[#0B0D10]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#1E90FF]" />
                <span>View &amp; download résumé</span>
              </motion.button>

              <button
                type="button"
                data-cursor="COPY"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
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

            <nav
              aria-label="External profiles"
              className={`pt-4 border-t flex flex-wrap items-center gap-x-8 sm:gap-x-10 gap-y-3 text-sm font-medium ${
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

              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 hover:text-[#25D366] transition-colors ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                }`}
              >
                <span>WhatsApp ({PROFILE.phone})</span>
                <ArrowUpRight className="w-4 h-4 text-[#25D366] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className={`tech-meta ${isDark ? 'text-[#9297A1]' : 'text-[#6B7280]'}`}>
                Open to software engineering internships, junior roles &amp; product collaborations
              </span>
            </nav>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <figure className="space-y-3 max-w-sm sm:max-w-md mx-auto lg:ml-auto lg:mr-0">
              <div
                className={`relative overflow-hidden rounded-2xl aspect-[4/5] border transition-all duration-500 group ${
                  isDark
                    ? 'bg-[#0B0D10] border-white/[0.05]'
                    : 'bg-slate-100 border-black/10'
                }`}
              >
                <LazyImage
                  src="/assets/portraits/23474_cc099930.jpg"
                  alt="Midusa Brian software engineer portrait in Nairobi, Kenya"
                  isDark={isDark}
                  motionStyle={{ y: portraitY, scale: portraitScale }}
                  className="w-full h-full object-cover object-[50%_14%] picture-camouflage-portrait transition-transform duration-700 ease-out hover:scale-[1.07]"
                />
                {isDark ? (
                  <>
                    {/* Feathered radial edge camouflage melting portrait into #0B0D10 */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_36%,rgba(11,13,16,0.52)_70%,rgba(11,13,16,0.96)_100%)] z-10 transition-opacity duration-700 group-hover:opacity-85"
                    />
                    {/* Deep bottom dissolution gradient */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/75 to-transparent z-10"
                    />
                    {/* Subtle top edge atmosphere */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B0D10]/55 to-transparent z-10"
                    />
                  </>
                ) : (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-100/70 via-transparent to-transparent z-10"
                  />
                )}
              </div>
            </figure>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] pt-6 pb-8 sm:pb-10">
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[2px] w-[120%] origin-left bg-gradient-to-r from-[#1E90FF] via-[#1E90FF]/60 to-transparent"
        />
      </div>
    </section>
  );
};
