// Everything in the app is shown in India time, whatever the browser's time zone.
const TZ = "Asia/Kolkata";
const fmt = (opts) => new Intl.DateTimeFormat("en-IN", { timeZone: TZ, ...opts });

export const formatTime = (d) =>
  fmt({ hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(d));

export const formatDay = (d) =>
  fmt({ weekday: "short", day: "numeric", month: "short" }).format(new Date(d));

export const formatDayLong = (d) =>
  fmt({ weekday: "long", day: "numeric", month: "long" }).format(new Date(d));

export const formatDateTime = (d) => `${formatDay(d)}, ${formatTime(d)}`;

// YYYY-MM-DD for the India calendar day of a date.
export const dayKey = (d) => new Intl.DateTimeFormat("sv-SE", { timeZone: TZ }).format(new Date(d));
export const todayKey = () => dayKey(new Date());
export const addDays = (key, n) =>
  dayKey(new Date(new Date(`${key}T12:00:00+05:30`).getTime() + n * 86400000));

export const rupees = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export const MODE_LABEL = { ONLINE: "Video visit", IN_PERSON: "In person" };

export const STATUS_LABEL = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "Missed",
};

export const initials = (name = "") =>
  name
    .replace(/^dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

export function groupByDay(slots) {
  const groups = new Map();
  for (const s of slots) {
    const key = dayKey(s.startsAt);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.entries()];
}