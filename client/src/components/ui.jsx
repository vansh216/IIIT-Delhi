import { useId } from "react";
import { Link } from "react-router-dom";
import { STATUS_LABEL } from "../lib/format";

export function Spinner({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="animate-spin motion-reduce:animate-none"
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 1 0 9 9" opacity="0.9" />
    </svg>
  );
}

const BTN = {
  primary: "bg-teal text-white hover:bg-teal-deep disabled:bg-line disabled:text-ink-soft",
  dark: "bg-ink text-white hover:bg-teal-deep disabled:bg-line disabled:text-ink-soft",
  outline: "border border-line hover:border-ink disabled:text-ink-soft disabled:hover:border-line",
  danger: "border border-alert/40 text-alert hover:bg-alert-wash disabled:opacity-50",
};
const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium transition-colors disabled:cursor-not-allowed";

export function Button({ variant = "primary", loading = false, className = "", children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || loading}
      className={`${BTN_BASE} ${BTN[variant]} ${className}`}
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}

export function ButtonLink({ to, variant = "primary", className = "", children, ...props }) {
  return (
    <Link to={to} {...props} className={`${BTN_BASE} ${BTN[variant]} ${className}`}>
      {children}
    </Link>
  );
}

const TONES = {
  error: "bg-alert-wash text-alert",
  warn: "bg-amber-50 text-amber-900",
  info: "bg-wash text-ink",
  success: "bg-ok-wash text-ok",
};

export function Alert({ tone = "error", title, children, className = "" }) {
  if (!children && !title) return null;
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl px-4 py-3 text-[16px] leading-relaxed ${TONES[tone]} ${className}`}>
      {title && <p className="font-semibold">{title}</p>}
      {children}
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-[17px] placeholder:text-ink-soft/70 focus:border-teal disabled:bg-wash";

function FieldWrap({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describe = (id, error, hint) => (error ? `${id}-err` : hint ? `${id}-hint` : undefined);

export function Input({ label, hint, error, className = "", ...props }) {
  const id = useId();
  return (
    <FieldWrap id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describe(id, error, hint)}
        className={`${inputCls} ${error ? "border-alert" : ""} ${className}`}
        {...props}
      />
    </FieldWrap>
  );
}

export function Textarea({ label, hint, error, className = "", ...props }) {
  const id = useId();
  return (
    <FieldWrap id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describe(id, error, hint)}
        className={`${inputCls} ${error ? "border-alert" : ""} ${className}`}
        {...props}
      />
    </FieldWrap>
  );
}

export function Select({ label, hint, error, className = "", children, ...props }) {
  const id = useId();
  return (
    <FieldWrap id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describe(id, error, hint)}
        className={`${inputCls} ${error ? "border-alert" : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldWrap>
  );
}

export function Check({ children, error, ...props }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[16px] leading-snug">
        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-teal" {...props} />
        <span>{children}</span>
      </label>
      {error && <p className="ml-8 mt-1 text-sm text-alert">{error}</p>}
    </div>
  );
}

const BADGE = {
  neutral: "bg-wash text-ink-soft",
  teal: "bg-teal/10 text-teal-deep",
  ok: "bg-ok-wash text-ok",
  alert: "bg-alert-wash text-alert",
  warn: "bg-amber-50 text-amber-900",
};

export function Badge({ tone = "neutral", children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[13px] font-medium ${BADGE[tone]}`}>
      {children}
    </span>
  );
}

const STATUS_TONE = {
  PENDING: "warn",
  CONFIRMED: "ok",
  COMPLETED: "teal",
  CANCELLED: "alert",
  NO_SHOW: "alert",
};

export function StatusBadge({ status }) {
  return <Badge tone={STATUS_TONE[status] ?? "neutral"}>{STATUS_LABEL[status] ?? status}</Badge>;
}

export function DemoBadge() {
  return <Badge>Demo profile</Badge>;
}

export function Loading({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-3 py-12 text-ink-soft" role="status">
      <Spinner />
      {label}...
    </div>
  );
}

export function PageShell({ title, subtitle, actions, narrow = false, children }) {
  return (
    <div className={`mx-auto px-5 py-10 ${narrow ? "max-w-xl" : "max-w-5xl"}`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-lg text-ink-soft">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

export function Tabs({ value, onChange, options }) {
  return (
    <div role="tablist" className="inline-flex rounded-full bg-wash p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-5 py-1.5 font-medium transition-colors ${
            value === o.value ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Empty({ title, children }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-10 text-center">
      <p className="font-display text-xl font-semibold">{title}</p>
      {children && <div className="mt-2 text-ink-soft">{children}</div>}
    </div>
  );
}