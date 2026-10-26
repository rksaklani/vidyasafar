export function PhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "relative mx-auto w-[240px]" : "relative mx-auto w-[280px]"}>
      <div className="board-note absolute -right-2 top-16 z-20 w-[230px] rounded-2xl border border-white/10 bg-white p-3 text-ink shadow-2xl sm:-right-10 sm:w-[250px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Boarding verified</p>
        <p className="mt-1 text-sm font-semibold leading-5">Arnav safely boarded Bus #12 at 07:42 AM</p>
        <p className="mt-1 text-xs text-slate-500">Meera Mehta notified · AECS Layout</p>
      </div>
      <div className="rounded-[2.2rem] border border-white/15 bg-slate-950 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className={`relative overflow-hidden rounded-[1.75rem] bg-[#0b1220] ${compact ? "h-[460px]" : "h-[540px]"}`}>
          <svg viewBox="0 0 240 520" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M0 90 H240 M0 180 H240 M0 270 H240 M0 360 H240 M40 0 V520 M110 0 V520 M180 0 V520" stroke="rgba(148,163,184,0.16)" />
            <path
              d="M 36 430 C 50 360, 80 340, 70 280 S 130 200, 150 150 S 120 80, 168 48"
              fill="none"
              stroke="#0284C7"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="70" cy="280" r="16" fill="rgba(16,185,129,0.18)" stroke="#10B981" />
            <circle cx="168" cy="48" r="7" fill="#F59E0B" />
          </svg>
          <div className="route-rider flex items-center justify-center rounded-full bg-bus text-xs font-bold text-ink shadow-lg">12</div>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-ink/80 p-3 text-white backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.14em] text-sky-200">Bus 12 · on time</p>
            <p className="mt-1 text-sm font-semibold">ITPL Corridor · 34/40 on board</p>
          </div>
          <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-black/50" />
        </div>
      </div>
    </div>
  );
}
