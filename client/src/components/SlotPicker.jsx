import { formatDayLong, formatTime, groupByDay, MODE_LABEL } from "../lib/format";

// Open appointment times, grouped by day. `value` is the chosen slot id.
export default function SlotPicker({ slots, value, onChange }) {
  const days = groupByDay(slots);

  if (days.length === 0) {
    return <p className="text-ink-soft">No open times right now. Please check again later.</p>;
  }

  return (
    <div className="space-y-6">
      {days.map(([key, daySlots]) => (
        <div key={key}>
          <h3 className="mb-2 font-display text-lg font-semibold">{formatDayLong(daySlots[0].startsAt)}</h3>
          <ul className="flex flex-wrap gap-2">
            {daySlots.map((s) => {
              const picked = value === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={picked}
                    onClick={() => onChange(s.id)}
                    className={`rounded-xl border px-4 py-2 text-left transition-colors ${
                      picked ? "border-teal bg-teal text-white" : "border-line hover:border-teal"
                    }`}
                  >
                    <span className="block font-medium">{formatTime(s.startsAt)}</span>
                    <span className={`block text-xs ${picked ? "text-white/85" : "text-ink-soft"}`}>
                      {MODE_LABEL[s.mode] ?? s.mode}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}