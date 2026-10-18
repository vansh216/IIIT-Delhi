import { Link } from "react-router-dom";
import { formatDateTime, initials, MODE_LABEL, rupees } from "../lib/format";
import { Badge, DemoBadge } from "./ui";

const LANG_NAME = { en: "English", hi: "Hindi" };

export default function DoctorCard({ match, queryId }) {
  const { doctor: d, reasons, nextSlots, rank, score } = match;
  const profile = `/doctors/${d.id}${queryId ? `?query=${queryId}` : ""}`;
  const slotLink = (slotId) => `/doctors/${d.id}?slot=${slotId}${queryId ? `&query=${queryId}` : ""}`;

  return (
    <article className="rounded-2xl border border-line p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal/10 font-display text-lg font-bold text-teal-deep"
          >
            {initials(d.name)}
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">
              <Link to={profile} className="hover:text-teal-deep">{d.name}</Link>
            </h3>
            <p className="text-[16px] text-ink-soft">
              {d.specialization} · {d.yearsOfExperience} years · {d.city}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone="ok">Verified</Badge>
              {d.isDemo && <DemoBadge />}
              {d.consultationModes.map((m) => (
                <Badge key={m} tone="teal">{MODE_LABEL[m]}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold">{rupees(d.consultationFee)}</p>
          <p className="text-sm text-ink-soft">per visit</p>
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-[15px] font-semibold">Why this doctor</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[16px] leading-snug text-ink-soft marker:text-teal">
            {reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-ink-soft">
            Rank {rank}, match score {score} out of 100. Speaks {d.languages.map((l) => LANG_NAME[l] ?? l).join(" and ")}.
          </p>
        </div>

        <div>
          <h4 className="text-[15px] font-semibold">Next open times</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {nextSlots.map((s) => (
              <li key={s.id}>
                <Link
                  to={slotLink(s.id)}
                  className="block rounded-xl border border-line px-3 py-2 text-[15px] hover:border-teal"
                >
                  <span className="block font-medium">{formatDateTime(s.startsAt)}</span>
                  <span className="block text-xs text-ink-soft">{MODE_LABEL[s.mode] ?? s.mode}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to={profile} className="mt-3 inline-block font-medium text-teal-deep underline underline-offset-4">
            See profile and all times
          </Link>
        </div>
      </div>
    </article>
  );
}