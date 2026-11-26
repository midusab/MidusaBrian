import React, { useEffect } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ResumeModalProps {
  onClose: () => void;
}

const PLAIN_TEXT_RESUME = `MIDUSA
Junior Software Engineer & Computer Science Student
Location: Kenya
Email: midusab@gmail.com
GitHub: https://github.com/midusab
LinkedIn: https://www.linkedin.com/in/midusab

SUMMARY
Computer Science student and Junior Software Engineer building practical full-stack web applications and digital business platforms. Focused on clean interfaces, relational data design, API architecture, and local payment integration.

SELECTED WORK
1. MidusaElibrary — Digital Ebook Bookstore (www.midusaelibary.co.ke)
   - Built an online ebook platform to make digital books accessible with M-Pesa Daraja payment integration.
   - Stack: React, Node.js, Express.js, PostgreSQL, Prisma, Supabase, M-Pesa Daraja.
   - Engineered relational schemas, STK Push checkout initiation, asynchronous payment verification, and protected digital delivery.

2. Midusa Digital Solutions — Web Development Studio
   - Builds responsive, user-centered, business-focused websites for organizations strengthening their digital presence.
   - Stack: React, Tailwind CSS, HTML, CSS, JavaScript.

TECHNICAL SKILLS
- Frontend: HTML, CSS, JavaScript, React, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs
- Database & Services: PostgreSQL, Prisma, Supabase (Currently learning: Firebase)
- Tools: Git, GitHub, Vercel

EDUCATION
B.Sc. in Computer Science (In Progress) — Kenya
`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 md:p-8 flex items-start justify-center"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 id="resume-modal-title" className="text-sm font-semibold text-slate-900">
            Midusa — Curriculum Vitae
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E90FF] text-white text-xs font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close résumé"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document */}
        <div id="printable-resume" className="p-8 md:p-10 space-y-8 text-sm leading-relaxed">
          <header className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/aistudio/37321_2c38d586.jpg"
                alt="Portrait of Midusa"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover object-top border border-slate-200 shrink-0"
              />
              <div>
                <h1 className="text-3xl font-display font-bold tracking-tight text-slate-950">
                  {PROFILE.name}
                </h1>
                <p className="mt-1 text-base font-medium text-[#1E90FF]">{PROFILE.role}</p>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1 sm:text-right">
              <p>{PROFILE.location}</p>
              <p>{PROFILE.email}</p>
              <p>github.com/midusab · linkedin.com/in/midusab</p>
            </div>
          </header>

          <section className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">Profile</h3>
            <p className="text-slate-700">
              Computer Science student and Junior Software Engineer focused on building practical,
              reliable full-stack web applications. Experienced in connecting modern React interfaces
              with Node.js/Express APIs, PostgreSQL databases, and M-Pesa Daraja mobile payment
              workflows.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Projects &amp; Practical Work
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-semibold text-slate-950">
                    MidusaElibrary — Digital Ebook Bookstore (www.midusaelibary.co.ke)
                  </h4>
                  <span className="text-xs text-slate-500">
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
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-semibold text-slate-950">
                    Midusa Digital Solutions — Web Development Practice
                  </h4>
                  <span className="text-xs text-slate-500">
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
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Technical Capabilities
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
                <strong className="text-slate-900">Database &amp; Services:</strong> PostgreSQL,
                Prisma, Supabase, Firebase (learning)
              </p>
              <p>
                <strong className="text-slate-900">Tools:</strong> Git, GitHub, Vercel
              </p>
            </div>
          </section>

          <section className="space-y-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">Education</h3>
            <p className="font-medium text-slate-900">Computer Science Undergraduate</p>
            <p className="text-slate-600">Kenya · Ongoing Degree Studies</p>
          </section>
        </div>
      </div>
    </div>
  );
};
