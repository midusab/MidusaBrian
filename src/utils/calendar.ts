export function toInputDateValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function getDefaultMeetingDateValue(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toInputDateValue(tomorrow);
}

export function formatLongDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, (month || 1) - 1, day || 1));
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(utcDate);
}

function formatCompactDate(dateStr: string, addDays = 0): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, (month || 1) - 1, (day || 1) + addDays));
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

function formatIcsUtcStamp(date: Date): string {
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

interface MeetingRequestPayload {
  selectedDate: string;
  visitorName: string;
  visitorEmail: string;
  notes: string;
  hostEmail: string;
}

export function buildGoogleCalendarUrl({
  selectedDate,
  visitorName,
  visitorEmail,
  notes,
  hostEmail,
}: MeetingRequestPayload): string {
  const startCompact = formatCompactDate(selectedDate, 0);
  const endCompact = formatCompactDate(selectedDate, 1);
  const details = [
    `Booked by: ${visitorName.trim()} (${visitorEmail.trim()})`,
    notes.trim() ? `Notes: ${notes.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Meeting with Midusa',
    dates: `${startCompact}/${endCompact}`,
    details,
    add: hostEmail,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildMeetingMailtoUrl({
  selectedDate,
  visitorName,
  visitorEmail,
  notes,
  hostEmail,
}: MeetingRequestPayload): string {
  const formattedDate = formatLongDate(selectedDate);
  const subject = `Meeting request with Midusa (${formattedDate})`;
  const body = [
    'Hi Midusa,',
    '',
    'I would like to book a meeting with you.',
    `Preferred date: ${formattedDate}`,
    `Name: ${visitorName.trim()}`,
    `Email: ${visitorEmail.trim()}`,
    notes.trim() ? `\nNote:\n${notes.trim()}` : '',
    '',
    'Looking forward to speaking with you.',
  ].join('\n');

  return `mailto:${hostEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function downloadMeetingIcs({
  selectedDate,
  visitorName,
  visitorEmail,
  notes,
  hostEmail,
}: MeetingRequestPayload): void {
  const escapeIcs = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

  const startCompact = formatCompactDate(selectedDate, 0);
  const endCompact = formatCompactDate(selectedDate, 1);
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
    `UID:midusa-meeting-${startCompact}@midusab.dev`,
    `DTSTAMP:${formatIcsUtcStamp(new Date())}`,
    `DTSTART;VALUE=DATE:${startCompact}`,
    `DTEND;VALUE=DATE:${endCompact}`,
    `SUMMARY:${escapeIcs('Meeting with Midusa')}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `ORGANIZER;CN=${escapeIcs(visitorName.trim())}:mailto:${visitorEmail.trim()}`,
    `ATTENDEE;CN=Midusa;RSVP=TRUE:mailto:${hostEmail}`,
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
}
