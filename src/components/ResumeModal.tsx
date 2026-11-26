import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { useModalEscapeAndScrollLock } from '../hooks/useModalEscapeAndScrollLock';

interface ResumeModalProps {
  onClose: () => void;
}

const PLAIN_TEXT_RESUME = `Midusa
Junior software engineer & computer science student
Location: Kenya
Email: midusab@gmail.com
GitHub: https://github.com/midusab
LinkedIn: https://www.linkedin.com/in/midusab

Summary
Computer science student and junior software engineer building practical full-stack web applications and digital business platforms. Focused on clean interfaces, relational data design, API architecture, and local payment integration.

Selected work
1. MidusaElibrary — Digital ebook bookstore (www.midusaelibary.co.ke)
   - Built an online ebook platform to make digital books accessible with M-Pesa Daraja payment integration.
   - Stack: React, Node.js, Express.js, PostgreSQL, Prisma, Supabase, M-Pesa Daraja.
   - Engineered relational schemas, STK Push checkout initiation, asynchronous payment verification, and protected digital delivery.

2. Midusa Digital Solutions — Web development practice
   - Builds responsive, user-centered, business-focused websites for organizations strengthening their digital presence.
   - Stack: React, Tailwind CSS, HTML, CSS, JavaScript.

Technical skills
- Frontend: HTML, CSS, JavaScript, React, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs
- Database & services: PostgreSQL, Prisma, Supabase (currently learning: Firebase)
- Tools: Git, GitHub, Vercel

Education
B.Sc. in Computer Science (in progress) — Kenya
`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  useModalEscapeAndScrollLock({ onClose });

  const handleDownloadTxt = () => {
    const blob = new Blob([PLAIN_TEXT_RESUME], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Midusa_Software_Engineer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto no-scrollbar bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 md:p-8 flex items-start justify-center"
    >
      <div className="w-full max-w-3xl max-h-[calc(100svh-1.5rem)] sm:max-h-[calc(100svh-3rem)] flex flex-col rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden my-auto">
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 id="resume-modal-title" className="text-sm font-semibold text-slate-900">
            Midusa — curriculum vitae
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close résumé"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-200 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          id="printable-resume"
          className="flex-1 overflow-y-auto no-scrollbar p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 text-sm leading-relaxed"
        >
          <header className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <img
                src="/assets/aistudio/37321_2c38d586.jpg"
                alt="Portrait of Midusa"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover object-top border border-slate-200 shrink-0"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-medium tracking-[-0.02em] text-slate-950">
                  {PROFILE.name}
                </h1>
                <p className="mt-1 text-sm sm:text-base font-normal text-[#1E90FF]">
                  {PROFILE.role}
                </p>
              </div>
            </div>
            <div className="font-mono text-xs text-slate-600 space-y-1 sm:text-right break-words">
              <p>{PROFILE.location}</p>
              <p>{PROFILE.email}</p>
              <p>github.com/midusab · linkedin.com/in/midusab</p>
            </div>
          </header>

          <section className="space-y-2">
            <h3 className="text-xs font-mono text-slate-500">Profile</h3>
            <p className="text-slate-700">
              Computer Science student and Junior Software Engineer focused on building practical,
              reliable full-stack web applications. Experienced in connecting modern React interfaces
              with Node.js/Express APIs, PostgreSQL databases, and M-Pesa Daraja mobile payment
              workflows.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-mono text-slate-500">
              Projects &amp; practical work
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline justify-between gap-1 sm:gap-2">
                  <h4 className="font-medium text-slate-950">
                    MidusaElibrary — Digital ebook bookstore (www.midusaelibary.co.ke)
                  </h4>
                  <span className="font-mono text-xs text-slate-500">
                    React · Node.js · Express · PostgreSQL · Prisma · Supabase · M-Pesa Daraja
                  </span>
                </div>
                <p className="mt-1 text-slate-700">
                  Designed and built an online bookstore platform enabling accessible digital book
                  purchases via M-Pesa Daraja STK Push, relational order tracking in PostgreSQL,
                  and controlled digital file delivery.
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline justify-between gap-1 sm:gap-2">
                  <h4 className="font-medium text-slate-950">
                    Midusa Digital Solutions — Web development practice
                  </h4>
                  <span className="font-mono text-xs text-slate-500">
                    React · Tailwind CSS · Responsive UX
                  </span>
                </div>
                <p className="mt-1 text-slate-700">
                  Created responsive, business-oriented web experiences prioritizing clear
                  communication, mobile usability, and fast frontend performance.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-xs font-mono text-slate-500">
              Technical capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <p>
                <strong className="text-slate-900">Frontend:</strong> HTML, CSS, JavaScript, React,
                Tailwind CSS
              </p>
              <p>
                <strong className="text-slate-900">Backend:</strong> Node.js, Express.js, REST APIs
              </p>
              <p>
                <strong className="text-slate-900">Database &amp; services:</strong> PostgreSQL,
                Prisma, Supabase, Firebase (learning)
              </p>
              <p>
                <strong className="text-slate-900">Tools:</strong> Git, GitHub, Vercel
              </p>
            </div>
          </section>

          <section className="space-y-1">
            <h3 className="text-xs font-mono text-slate-500">Education</h3>
            <p className="font-medium text-slate-900">Computer science undergraduate</p>
            <p className="text-slate-600">Kenya · Ongoing degree studies</p>
          </section>
        </div>
      </div>
    </div>
  );
};
