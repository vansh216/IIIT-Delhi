import { Link } from "react-router-dom";
import { formatDateTime, MODE_LABEL, rupees } from "../lib/format";
import { Badge, DemoBadge, StatusBadge } from "./ui";

// One appointment row. Patients see the doctor, doctors see the patient.
export default function AppointmentCard({ appt, role = "PATIENT" }) {
  const isDoctor = role === "DOCTOR";
  const title = isDoctor ? appt.patient?.name : appt.doctor.name;
  const sub = isDoctor
    ? appt.reason || "No reason given"
    : `${appt.doctor.specialization} · ${rupees(appt.doctor.consultationFee)}`;

  return (
    <article className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line p-5">
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold">{formatDateTime(appt.startsAt)}</p>
        <p className="mt-0.5 text-[17px]">
          {title}
          {!isDoctor && appt.doctor.isDemo && (
            <span className="ml-2 align-middle">
              <DemoBadge />
            </span>
          )}
        </p>
        <p className="truncate text-[15px] text-ink-soft">{sub}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <StatusBadge status={appt.status} />
          <Badge tone="teal">{MODE_LABEL[appt.mode] ?? appt.mode}</Badge>
          {appt.online?.canJoin && <Badge tone="ok">Room is open</Badge>}
        </div>
      </div>
      <Link
        to={`/appointments/${appt.id}`}
        className="rounded-full border border-line px-5 py-2 font-medium hover:border-ink"
      >
        {appt.online?.canJoin ? "Join or view" : "View"}
      </Link>
    </article>
  );
}