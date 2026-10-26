"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bus,
  ClipboardCheck,
  IdCard,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Route,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ConsoleProvider, useConsole } from "@/components/modules/dashboard/console-context";
import { clearSession } from "@/lib/session";
import { roleLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Command", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/routes", label: "Routes", icon: Route },
  { href: "/students", label: "Students", icon: Users },
  { href: "/fleet", label: "Fleet", icon: Bus },
  { href: "/drivers", label: "Drivers", icon: IdCard },
  { href: "/fees", label: "Fees", icon: IndianRupee },
  { href: "/broadcast", label: "Broadcast", icon: Megaphone },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <ConsoleProvider>
      <ShellFrame>{children}</ShellFrame>
    </ConsoleProvider>
  );
}

function ShellFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { school, schools, setSchoolId, buses, routes, user, refreshUser } = useConsole();
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("07:42");
  const bare = pathname === "/dashboard";
  const alertBus =
    buses.find((bus) => bus.status === "sos") ??
    buses.find((bus) => bus.status === "stopped") ??
    buses.find((bus) => bus.status === "delayed");
  const alertRoute = routes.find((route) => route.id === alertBus?.routeId);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-screen bg-surface text-ink">
      <button
        type="button"
        className={cn("fixed inset-0 z-30 bg-ink/50 lg:hidden", open ? "block" : "hidden")}
        aria-label="Close navigation"
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-ink text-white transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo href="/dashboard" />
          <button type="button" className="lg:hidden" aria-label="Close" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Console">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white",
                  active && "bg-white/10 text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-5 py-4 text-xs leading-5 text-slate-500">
          Demo data resets on refresh. {school.totalBuses} buses on the published fleet, {buses.length} on this morning wave.
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button type="button" className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <label className="min-w-0 flex-1">
            <span className="sr-only">School</span>
            <select
              className="w-full max-w-xs truncate rounded-xl border border-slate-200 bg-surface px-3 py-2 text-sm font-semibold"
              value={school.id}
              onChange={(event) => setSchoolId(event.target.value)}
            >
              {schools.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.city}
                </option>
              ))}
            </select>
          </label>
          <p className="hidden text-sm text-slate-500 sm:block">{clock} IST</p>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user?.name ?? school.principal}</p>
            <p className="text-xs text-slate-500">{user ? roleLabel(user.role) : "Demo console"}</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Sign out"
            onClick={() => {
              clearSession();
              refreshUser();
              router.push("/login");
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>
        {alertBus ? (
          <Link
            href="/broadcast"
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 text-sm sm:px-6",
              alertBus.status === "sos" ? "bg-rose-600 text-white" : alertBus.status === "stopped" ? "bg-rose-50 text-rose-800" : "bg-amber-50 text-amber-950",
            )}
          >
            <span className="font-semibold">
              {alertBus.status === "sos" ? "SOS" : alertBus.status === "stopped" ? "Stopped" : `+${alertBus.delayMinutes ?? 10} min`}
            </span>
            <span className="truncate">
              Bus {alertBus.busNumber}
              {alertRoute ? ` · ${alertRoute.code} ${alertRoute.name}` : ""} · {alertBus.currentStop}
              {alertBus.note ? ` — ${alertBus.note}` : ""}
            </span>
          </Link>
        ) : null}
        <main className={cn("flex min-h-0 flex-1 flex-col", bare ? "overflow-hidden" : "overflow-auto p-4 sm:p-6")}>{children}</main>
      </div>
    </div>
  );
}
