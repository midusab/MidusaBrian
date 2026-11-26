import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CalendarPlus,
  Check,
  Clock,
  Download,
  Globe,
  Mail,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { GrainOverlay } from './GrainOverlay';

interface MeetingBookingModalProps {
  onClose: () => void;
}

interface EatSlot {
  id: string;
  hourEat: number;
  minuteEat: number;
  labelEat: string;
}

const EAT_SLOTS: EatSlot[] = [
  { id: '1000', hourEat: 10, minuteEat: 0, labelEat: '10:00 EAT' },
  { id: '1130', hourEat: 11, minuteEat: 30, labelEat: '11:30 EAT' },
  { id: '1400', hourEat: 14, minuteEat: 0, labelEat: '14:00 EAT' },
  { id: '1530', hourEat: 15, minuteEat: 30, labelEat: '15:30 EAT' },
  { id: '1700', hourEat: 17, minuteEat: 0, labelEat: '17:00 EAT' },
];

function getUpcomingWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(new Date(cursor));
    }
  }
  return days;
}

function createUtcDateFromEat(day: Date, hourEat: number, minuteEat: number): Date {
  return new Date(
    Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), hourEat - 3, minuteEat, 0, 0)
  );
}

function formatIcsTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getUTCFullYear()}` +
    `${pad(date.getUTCMonth() + 1)}` +
    `${pad(date.getUTCDate())}T` +
    `${pad(date.getUTCHours())}` +
    `${pad(date.getUTCMinutes())}` +
    `${pad(date.getUTCSeconds())}Z`
  );
}

export const MeetingBookingModal: React.FC<MeetingBookingModalProps> = ({ onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const upcomingDays = useMemo(() => getUpcomingWeekdays(6), []);

  const [duration, setDuration] = useState<15 | 30>(30);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [selectedSlotId, setSelectedSlotId] = useState<string>(EAT_SLOTS[1].id);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const localTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
    } catch {
      return 'Local Time';
    }
  }, []);

  const selectedDay = upcomingDays[selectedDayIdx] || upcomingDays[0];
  const selectedSlot = EAT_SLOTS.find((s) => s.id === selectedSlotId) || EAT_SLOTS[0];

  const startDateUtc = useMemo(
    () => createUtcDateFromEat(selectedDay, selectedSlot.hourEat, selectedSlot.minuteEat),
    [selectedDay, selectedSlot]
  );

  const endDateUtc = useMemo(
    () => new Date(startDateUtc.getTime() + duration * 60 * 1000),
    [startDateUtc, duration]
  );

  const formattedDateLong = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'Africa/Nairobi',
      }).format(startDateUtc),
    [startDateUtc]
  );

  const formattedLocalTime = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(startDateUtc),
    [startDateUtc]
  );

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

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = visitorName.trim();
    const trimmedEmail = visitorEmail.trim();

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

  const googleCalendarUrl = useMemo(() => {
    const title = `Meeting with Midusa`;
    const details = [
      `Booked by: ${visitorName.trim()} (${visitorEmail.trim()})`,
      `Duration: ${duration} minutes`,
      notes.trim() ? `Notes: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatIcsTimestamp(startDateUtc)}/${formatIcsTimestamp(endDateUtc)}`,
      details,
      add: PROFILE.email,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [visitorName, visitorEmail, duration, notes, startDateUtc, endDateUtc]);

  const mailtoUrl = useMemo(() => {
    const subject = `Meeting Request with Midusa (${formattedDateLong}, ${selectedSlot.labelEat})`;
    const body = [
      `Hi Midusa,`,
      ``,
      `I would like to book a ${duration}-minute meeting.`,
      `Date: ${formattedDateLong}`,
      `Time: ${selectedSlot.labelEat} (${formattedLocalTime} ${localTimeZone})`,
      `Name: ${visitorName.trim()}`,
      `Email: ${visitorEmail.trim()}`,
      notes.trim() ? `\nNotes:\n${notes.trim()}` : '',
      ``,
      `Looking forward to speaking with you.`,
    ].join('\n');

    return `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
  }, [
    formattedDateLong,
    selectedSlot,
    formattedLocalTime,
    localTimeZone,
    duration,
    visitorName,
    visitorEmail,
    notes,
  ]);

  const handleDownloadIcs = () => {
    const escapeIcs = (str: string) =>
      str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

    const description = [
      `Booked by: ${visitorName.trim()} (${visitorEmail.trim()})`,
      notes.trim() ? `Notes: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Midusa Portfolio//Meeting Scheduler//EN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:midusa-meeting-${startDateUtc.getTime()}@midusab.dev`,
      `DTSTAMP:${formatIcsTimestamp(new Date())}`,
      `DTSTART:${formatIcsTimestamp(startDateUtc)}`,
      `DTEND:${formatIcsTimestamp(endDateUtc)}`,
      `SUMMARY:${escapeIcs('Meeting with Midusa')}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `ORGANIZER;CN=${escapeIcs(visitorName.trim())}:mailto:${visitorEmail.trim()}`,
      `ATTENDEE;CN=Midusa;RSVP=TRUE:mailto:${PROFILE.email}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Meeting_with_Midusa.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0D10]/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex items-start md:items-center justify-center"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl rounded-2xl bg-[#0B0D10] text-[#F5F5F5] border border-white/12 shadow-2xl overflow-hidden my-4"
      >
        <GrainOverlay />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src="/assets/aistudio/37321_2c38d586.jpg"
              alt="Portrait of Midusa"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover object-top border border-white/15 shrink-0"
            />
            <div className="min-w-0">
              <p className="chapter-label text-[#9297A1]">Schedule</p>
              <h2
                id="booking-modal-title"
                className="text-lg sm:text-xl font-medium tracking-[-0.015em] text-[#F5F5F5] truncate"
              >
                Book a meeting with Midusa
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close meeting scheduler"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-[#9297A1] hover:border-[#1E90FF] hover:text-[#F5F5F5] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="relative z-10 p-6 sm:p-8">
          {!confirmed ? (
            <form onSubmit={handleConfirm} className="space-y-7">
              {/* Day Selection + Duration */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="chapter-label text-[#9297A1]">Pick a day</span>
                  <div
                    role="group"
                    aria-label="Meeting duration"
                    className="inline-flex items-center gap-1 p-0.5 rounded-lg border border-white/10 bg-white/[0.03]"
                  >
                    {([15, 30] as const).map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDuration(mins)}
                        aria-pressed={duration === mins}
                        className={`px-2.5 py-1 rounded-md tech-meta transition-colors ${
                          duration === mins
                            ? 'bg-[#1E90FF] text-white'
                            : 'text-[#9297A1] hover:text-[#F5F5F5]'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {upcomingDays.map((day, idx) => {
                    const active = selectedDayIdx === idx;
                    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day);
                    const monthDay = new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                    }).format(day);
                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => setSelectedDayIdx(idx)}
                        aria-pressed={active}
                        className={`px-2.5 py-2.5 rounded-xl border text-center transition-all duration-150 ${
                          active
                            ? 'border-[#1E90FF] bg-[#1E90FF]/12 text-[#F5F5F5]'
                            : 'border-white/10 bg-white/[0.02] text-[#9297A1] hover:border-white/25 hover:text-[#F5F5F5]'
                        }`}
                      >
                        <p className="tech-meta uppercase">{weekday}</p>
                        <p className="text-xs font-medium mt-0.5 text-current">{monthDay}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="chapter-label text-[#9297A1]">Pick a time (EAT · UTC+3)</span>
                  <span className="tech-meta text-[#9297A1] inline-flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#1E90FF]" />
                    <span>Your time: {formattedLocalTime}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {EAT_SLOTS.map((slot) => {
                    const active = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        aria-pressed={active}
                        className={`px-3 py-2 rounded-lg border tech-meta text-center transition-all duration-150 ${
                          active
                            ? 'border-[#1E90FF] bg-[#1E90FF] text-white'
                            : 'border-white/10 bg-white/[0.02] text-[#D1D5DB] hover:border-[#1E90FF]/60'
                        }`}
                      >
                        {slot.labelEat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simple Visitor Fields */}
              <div className="space-y-4 pt-5 border-t border-white/[0.08]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-name" className="block text-xs text-[#D1D5DB]">
                      Your name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Alex Kamau"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/12 text-sm text-[#F5F5F5] placeholder:text-[#6B7280] focus:outline-none focus:border-[#1E90FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="booking-email" className="block text-xs text-[#D1D5DB]">
                      Email address
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/12 text-sm text-[#F5F5F5] placeholder:text-[#6B7280] focus:outline-none focus:border-[#1E90FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-notes" className="block text-xs text-[#D1D5DB]">
                    Note <span className="text-[#6B7280]">(optional)</span>
                  </label>
                  <input
                    id="booking-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Briefly share what the call is about..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/12 text-sm text-[#F5F5F5] placeholder:text-[#6B7280] focus:outline-none focus:border-[#1E90FF] transition-colors"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs text-[#60A5FA]">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Footer Summary + Submit */}
              <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 tech-meta text-[#9297A1]">
                  <div className="flex items-center gap-2 text-[#F5F5F5]">
                    <Calendar className="w-3.5 h-3.5 text-[#1E90FF] shrink-0" />
                    <span>{formattedDateLong}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#1E90FF] shrink-0" />
                    <span>
                      {selectedSlot.labelEat} · {duration} min ({formattedLocalTime} local)
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] active:scale-[0.99] transition-all duration-150 whitespace-nowrap"
                >
                  <span>Book meeting</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="py-2 space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E90FF]/15 border border-[#1E90FF]/40 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-[#1E90FF]" />
                </div>
                <div className="space-y-2">
                  <p className="chapter-label text-[#1E90FF]">Ready to confirm</p>
                  <h3 className="text-2xl font-medium tracking-[-0.02em] text-[#F5F5F5]">
                    Meeting with Midusa
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9297A1]">
                    Send the email request to <span className="text-[#F5F5F5]">{PROFILE.email}</span>{' '}
                    or add it directly to your calendar.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 tech-meta text-[#9297A1]">
                <div>
                  <p className="text-[#6B7280] uppercase mb-0.5">When</p>
                  <p className="text-[#F5F5F5]">{formattedDateLong}</p>
                  <p>
                    {selectedSlot.labelEat} · {duration} min ({formattedLocalTime} {localTimeZone})
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7280] uppercase mb-0.5">Guest</p>
                  <p className="text-[#F5F5F5]">{visitorName.trim()}</p>
                  <p>{visitorEmail.trim()}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E90FF] text-white text-sm font-medium hover:bg-[#1677D9] transition-colors whitespace-nowrap"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-[#F5F5F5] text-sm font-medium hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email Request</span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/12 text-xs font-medium text-[#9297A1] hover:border-white/30 hover:text-[#F5F5F5] transition-colors whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ics</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="text-xs text-[#9297A1] hover:text-[#F5F5F5] transition-colors"
                >
                  Change time
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-medium text-[#1E90FF] hover:text-[#F5F5F5] transition-colors"
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
