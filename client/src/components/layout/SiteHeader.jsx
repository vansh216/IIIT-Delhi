import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useUnreadCount from "../../hooks/useUnreadCount";
import Logo from "./Logo";

const landingLinks = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#doctors", label: "For doctors" },
];
const patientLinks = [
  { to: "/dashboard", label: "Home" },
  { to: "/query", label: "Find help" },
  { to: "/appointments", label: "Appointments" },
  { to: "/nurse", label: "Nurse at home" },
];
const doctorLinks = [{ to: "/doctor", label: "Dashboard" }];

const linkCls = ({ isActive }) =>
  `whitespace-nowrap hover:text-ink ${isActive ? "font-medium text-ink" : ""}`;

function Bell({ count }) {
  return (
    <Link
      to="/notifications"
      aria-label={count > 0 ? `Notifications, ${count} unread` : "Notifications"}
      className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-wash"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </svg>
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-alert px-1 text-[11px] font-semibold leading-[18px] text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

export default function SiteHeader() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const unread = useUnreadCount(Boolean(user));

  const appLinks = user?.role === "DOCTOR" ? doctorLinks : user ? patientLinks : [];
  const showAnchors = !user && pathname === "/";

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const name = user?.profile?.name?.split(" ")[0];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] text-ink-soft md:flex">
          {showAnchors &&
            landingLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </a>
            ))}
          {appLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {user ? (
            <>
              <Bell count={unread} />
              {name && <span className="hidden px-2 text-[15px] text-ink-soft sm:inline">Hi, {name}</span>}
              <button
                onClick={handleLogout}
                className="rounded-full border border-line px-4 py-2 text-[15px] font-medium hover:border-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-[15px] font-medium hover:text-teal-deep">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-ink px-4 py-2 text-[15px] font-medium text-white hover:bg-teal-deep"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>

      {appLinks.length > 1 && (
        <nav aria-label="Main" className="flex gap-6 overflow-x-auto border-t border-line px-5 py-2.5 text-[15px] text-ink-soft md:hidden">
          {appLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}