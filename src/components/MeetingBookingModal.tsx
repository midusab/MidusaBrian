import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarPlus, Check, Download, Mail, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { useModalEscapeAndScrollLock } from '../hooks/useModalEscapeAndScrollLock';
import {
  buildGoogleCalendarUrl,
  buildMeetingMailtoUrl,
  downloadMeetingIcs,
  formatLongDate,
  getDefaultMeetingDateValue,
  toInputDateValue,
} from '../utils/calendar';

interface MeetingBookingModalProps {
  onClose: () => void;
}

export const MeetingBookingModal: React.FC<MeetingBookingModalProps> = ({ onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const todayValue = useMemo(() => toInputDateValue(new Date()), []);

  const [selectedDate, setSelectedDate] = useState<string>(getDefaultMeetingDateValue);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useModalEscapeAndScrollLock({ onClose });

  const formattedDateLong = useMemo(() => formatLongDate(selectedDate), [selectedDate]);

  const meetingPayload = useMemo(
    () => ({
      selectedDate,
      visitorName,
      visitorEmail,
      notes,
      hostEmail: PROFILE.email,
    }),
    [selectedDate, visitorName, visitorEmail, notes]
  );

  const googleCalendarUrl = useMemo(
    () => buildGoogleCalendarUrl(meetingPayload),
    [meetingPayload]
  );

  const mailtoUrl = useMemo(
    () => buildMeetingMailtoUrl(meetingPayload),
    [meetingPayload]
  );

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = visitorName.trim();
    const trimmedEmail = visitorEmail.trim();

    if (!selectedDate) {
      setErrorMsg('Please choose a date.');
      return;
    }
    if (!trimmedName) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setConfirmed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto no-scrollbar bg-[#0B0D10]/70 backdrop-blur-sm p-3 sm:p-6 flex items-start justify-center"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.985 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-auto w-full max-w-xl max-h-[calc(100svh-1.5rem)] sm:max-h-[calc(100svh-3rem)] flex flex-col rounded-2xl bg-white text-[#0B0D10] border border-black/10 shadow-2xl overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 border-b border-black/[0.08]">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/images/developer/profile.png"
              alt="Midusa Brian profile photo"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover object-top border border-black/10 shrink-0"
            />
            <div className="min-w-0">
              <h2
                id="booking-modal-title"
                className="text-base sm:text-lg font-medium tracking-[-0.015em] text-[#0B0D10] truncate"
              >
                Book a meeting with Midusa
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close meeting scheduler"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-black/10 text-[#6B7280] hover:border-[#1E90FF] hover:text-[#0B0D10] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6">
          {!confirmed ? (
            <form onSubmit={handleConfirm} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="booking-date" className="block chapter-label text-[#6B7280]">
                  Pick a date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={todayValue}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-black/12 text-sm text-[#0B0D10] focus:outline-none focus:border-[#1E90FF] focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="booking-name" className="block text-xs font-medium text-[#374151]">
                    Your name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Alex Kamau"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-black/12 text-sm text-[#0B0D10] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-email" className="block text-xs font-medium text-[#374151]">
                    Email address
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-black/12 text-sm text-[#0B0D10] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="booking-notes" className="block text-xs font-medium text-[#374151]">
                  Note <span className="text-[#6B7280] font-normal">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share a quick note about the meeting..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-black/12 text-sm text-[#0B0D10] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:bg-white transition-colors resize-none"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-medium text-[#DC2626]">
                  {errorMsg}
                </p>
              )}

              <div className="pt-4 border-t border-black/[0.08] flex justify-end">
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] active:scale-[0.99] transition-all duration-150 whitespace-nowrap"
                >
                  <span>Book meeting</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#1E90FF]/10 border border-[#1E90FF]/30 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#1E90FF]" />
                </div>
                <div className="space-y-1.5">
                  <p className="chapter-label text-[#1E90FF]">Ready to confirm</p>
                  <h3 className="text-xl font-medium tracking-[-0.018em] text-[#0B0D10]">
                    Meeting with Midusa
                  </h3>
                  <p className="text-sm leading-relaxed text-[#525866]">
                    Send the email request to{' '}
                    <span className="text-[#0B0D10] font-medium">{PROFILE.email}</span> or save it
                    directly to your calendar.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-black/[0.08] bg-[#F8FAFC] p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 tech-meta text-[#525866]">
                <div>
                  <p className="text-[#6B7280] mb-0.5">Date</p>
                  <p className="text-[#0B0D10] font-medium">{formattedDateLong}</p>
                </div>
                <div>
                  <p className="text-[#6B7280] mb-0.5">Guest</p>
                  <p className="text-[#0B0D10] font-medium">{visitorName.trim()}</p>
                  <p className="break-all">{visitorEmail.trim()}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-black/15 text-[#0B0D10] text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-[#1E90FF]" />
                  <span>Send email request</span>
                </a>

                <button
                  type="button"
                  onClick={() => downloadMeetingIcs(meetingPayload)}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-black/10 text-xs font-medium text-[#525866] hover:border-black/25 hover:text-[#0B0D10] transition-colors whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ics</span>
                </button>
              </div>

              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="text-xs text-[#6B7280] hover:text-[#0B0D10] transition-colors"
                >
                  Change date
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-medium text-[#1E90FF] hover:text-[#0B0D10] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
