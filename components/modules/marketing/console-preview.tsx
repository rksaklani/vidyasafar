import Link from "next/link";

export function ConsolePreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs text-slate-500">console.vidyasafar.in / command</span>
      </div>
      <div className="grid md:grid-cols-[180px_1fr_220px]">
        <div className="hidden bg-ink p-4 text-xs text-slate-400 md:block">
          <p className="font-semibold text-white">Nalanda Vidya Niketan</p>
          <ul className="mt-4 space-y-2">
            <li className="rounded-lg bg-white/10 px-2 py-1.5 text-white">Command</li>
            <li className="px-2 py-1.5">Attendance</li>
            <li className="px-2 py-1.5">Routes</li>
            <li className="px-2 py-1.5">Fees</li>
          </ul>
        </div>
        <div className="relative min-h-56 bg-[#dbe7f3] p-4">
          <svg viewBox="0 0 360 180" className="h-full w-full" aria-hidden>
            <path d="M20 140 C 80 120, 120 40, 190 70 S 300 40, 340 50" fill="none" stroke="#0284C7" strokeWidth="3" />
            <path d="M30 40 C 90 80, 150 150, 250 120" fill="none" stroke="#F59E0B" strokeWidth="3" />
          </svg>
          <span className="absolute left-[28%] top-[42%] rounded-full bg-emerald-500 px-2 py-1 text-[11px] font-bold text-white">12</span>
          <span className="absolute left-[58%] top-[28%] rounded-full bg-amber-400 px-2 py-1 text-[11px] font-bold text-ink">07</span>
          <span className="absolute left-[70%] top-[60%] rounded-full bg-rose-600 px-2 py-1 text-[11px] font-bold text-white">15</span>
        </div>
        <div className="border-t border-slate-200 p-4 md:border-l md:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected</p>
          <p className="mt-2 font-display text-lg font-semibold">Bus 12</p>
          <p className="text-sm text-slate-600">On time · 32 km/h</p>
          <p className="mt-3 text-sm text-slate-600">Ramesh Gowda · AECS Layout</p>
          <p className="mt-3 text-sm font-semibold text-ink">34 / 40 on board</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[85%] rounded-full bg-trust" />
          </div>
          <Link href="/dashboard" className="mt-4 inline-flex text-sm font-semibold text-trust">
            Open the command console
          </Link>
        </div>
      </div>
    </div>
  );
}
