import React from 'react';
import { ArrowUpRight, Briefcase, Calendar, CheckCircle2, Code2, Compass, FileText, HeartHandshake, Mail, Sparkles, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types/portfolio';
import { SectionShell } from './ui/SectionShell';

interface CareerSectionProps {
  theme: ThemeMode;
  onOpenResume: () => void;
  onOpenBooking: () => void;
}

const ROLES = [
  {
    title: 'Junior Software Engineer',
    subtitle: 'Full-time / In-office or Remote',
    icon: Code2,
    description:
      'Contributing clean, tested code across React, TypeScript, Node.js, and modern relational databases within collaborative product teams.',
    focus: ['Frontend UI Systems', 'REST API Architecture', 'Database Modeling', 'Component Engineering'],
  },
  {
    title: 'Frontend / Full-Stack Engineer',
    subtitle: 'Product & Web Engineering',
    icon: Sparkles,
    description:
      'Building responsive, accessible, and high-performance user interfaces paired with robust backend data flows and third-party integrations.',
    focus: ['Modern React 19 & Next.js', 'State Management & Caching', 'Interactive UX', 'API Integrations'],
  },
  {
    title: 'Web Architecture & Freelance',
    subtitle: 'End-to-End Client Builds',
    icon: Briefcase,
    description:
      'Designing and delivering fast, production-ready web platforms, payment workflows (e.g. M-Pesa Daraja), and digital storefronts.',
    focus: ['E-Commerce & Digital Goods', 'Payment Processing', 'SEO & Performance', 'Cloud Hosting'],
  },
  {
    title: 'Technical Collaborations',
    subtitle: 'Open Source & Pair Building',
    icon: HeartHandshake,
    description:
      'Partnering with designers, product builders, and fellow developers on open-source packages, experimental tools, and civic tech.',
    focus: ['Open Source', 'Hackathons', 'Mentorship & Growth', 'Community Projects'],
  },
];

const ATTRIBUTES = [
  {
    label: 'High Learning Velocity',
    desc: 'Rapidly unpacks unfamiliar codebases, reads official documentation thoroughly, and implements idiomatic patterns.',
  },
  {
    label: 'Receptive & Eager for Mentorship',
    desc: 'Actively seeks constructive code reviews, absorbs engineering guidance, and prioritizes long-term code quality.',
  },
  {
    label: 'Detail-Oriented Engineering',
    desc: 'Obsessed with edge cases, graceful error handling, responsive ergonomics, and sub-100ms UI responsiveness.',
  },
  {
    label: 'Clear Communication',
    desc: 'Articulates technical trade-offs, documents architectural decisions, and collaborates respectfully across teams.',
  },
];

export const CareerSection: React.FC<CareerSectionProps> = ({
  theme,
  onOpenResume,
  onOpenBooking,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <SectionShell
      id="chapter-career"
      labelledBy="career-heading"
      theme={theme}
      surface="secondary"
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
            <p className="chapter-label text-[#1E90FF]">10 · Opportunities &amp; Alignment</p>
            <h2
              id="career-heading"
              className={`editorial-headline ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}
            >
              Ready to build, learn, and contribute.
            </h2>
            <p className={`editorial-body ${isDark ? 'text-[#9297A1]' : 'text-[#525866]'}`}>
              I am actively seeking junior software engineering roles, frontend or full-stack positions,
              and collaborative engineering environments where I can learn from senior engineers and
              ship meaningful products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              data-cursor="MEET"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-all shadow-sm active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule an intro</span>
            </button>
            <button
              type="button"
              onClick={onOpenResume}
              data-cursor="RESUME"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                isDark
                  ? 'border-white/15 bg-white/[0.04] text-[#F5F5F5] hover:border-[#1E90FF] hover:text-[#1E90FF]'
                  : 'border-black/15 bg-white text-[#0B0D10] hover:border-[#1E90FF] hover:text-[#1E90FF]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#1E90FF]" />
              <span>View résumé</span>
            </button>
          </div>
        </motion.div>

        {/* Roles & Engagements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {ROLES.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 group ${
                  isDark
                    ? 'bg-[#0E1217]/80 border-white/[0.08] hover:border-[#1E90FF]/40 hover:bg-[#111720]'
                    : 'bg-white border-black/[0.08] hover:border-[#1E90FF]/40 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E90FF]/10 text-[#1E90FF] flex items-center justify-center border border-[#1E90FF]/20 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] text-[#9297A1]'
                        : 'border-black/10 bg-slate-50 text-[#525866]'
                    }`}
                  >
                    {role.subtitle}
                  </span>
                </div>

                <h3
                  className={`text-lg font-medium tracking-tight mb-2 group-hover:text-[#1E90FF] transition-colors ${
                    isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                  }`}
                >
                  {role.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    isDark ? 'text-[#9297A1]' : 'text-[#525866]'
                  }`}
                >
                  {role.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-dashed border-white/10 dark:border-white/10">
                  <p className="chapter-label text-xs text-[#1E90FF]">Key capabilities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.focus.map((item) => (
                      <span
                        key={item}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                          isDark
                            ? 'bg-white/[0.04] text-[#D1D5DB]'
                            : 'bg-slate-100 text-[#374151]'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Work Ethic & Growth Mindset */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border ${
            isDark
              ? 'bg-[#0B0D10]/60 border-white/[0.08]'
              : 'bg-slate-50/80 border-black/[0.08]'
          }`}
        >
          <div className="max-w-2xl mb-6">
            <p className="chapter-label text-[#1E90FF]">How I Work</p>
            <h3
              className={`text-base sm:text-lg font-medium tracking-tight mt-1 ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
              }`}
            >
              What you can expect when working with me.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATTRIBUTES.map((attr, i) => (
              <div key={attr.label} className="space-y-2">
                <div className="flex items-center gap-2 text-[#1E90FF]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span
                    className={`text-xs font-mono font-medium ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'
                    }`}
                  >
                    {attr.label}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? 'text-[#9297A1]' : 'text-[#525866]'
                  }`}
                >
                  {attr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Connection Strip */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border ${
            isDark
              ? 'bg-[#1E90FF]/[0.04] border-[#1E90FF]/25'
              : 'bg-[#1E90FF]/[0.03] border-[#1E90FF]/20'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-[#F5F5F5]' : 'text-[#0B0D10]'}`}>
              Available for full-time junior positions, internships, and freelance projects.
            </p>
          </div>

          <a
            href={`mailto:${PROFILE.email}?subject=Software%20Engineering%20Opportunity`}
            data-cursor="EMAIL"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#1E90FF] hover:underline"
          >
            <span>Discuss an opportunity</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </SectionShell>
  );
};
