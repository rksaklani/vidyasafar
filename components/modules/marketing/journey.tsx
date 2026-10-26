"use client";

import { useState } from "react";
import { Bell, MapPinned, ShieldCheck, School } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    icon: Bell,
    title: "Geofence approach",
    detail: "1 km alert",
    copy: "When the bus is a kilometre from the stop, the parent gets one quiet alert. Nobody waits at the gate guessing, and the front desk stops fielding the same call.",
  },
  {
    icon: ShieldCheck,
    title: "Verified boarding",
    detail: "1 tap",
    copy: "The attendant confirms the child in a single tap. The register stores the stop and the minute, and the parent sees “boarded” instead of a missed call.",
  },
  {
    icon: MapPinned,
    title: "Live en-route map",
    detail: "Until the gate",
    copy: "The bus stays on the map with speed, delay, and occupancy. The school sees the corridor. The parent sees only their child.",
  },
  {
    icon: School,
    title: "Campus gate arrival",
    detail: "Register closed",
    copy: "Arrival closes the trip. The desk knows who is in, who was marked absent by a parent, and who never boarded.",
  },
];

export function SafetyJourney() {
  const [active, setActive] = useState(1);
  const stage = stages[active];

  return (
    <div>
      <ol className="grid gap-3 md:grid-cols-4">
        {stages.map((item, index) => {
          const Icon = item.icon;
          const selected = index === active;
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "h-full w-full rounded-2xl border p-4 text-left transition",
                  selected ? "border-trust bg-white shadow-sm" : "border-slate-200 bg-white/70 hover:border-slate-300",
                )}
                aria-pressed={selected}
              >
                <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  0{index + 1}
                  <Icon className={cn("h-4 w-4", selected ? "text-trust" : "text-slate-400")} />
                </span>
                <span className="mt-3 block font-display text-lg font-semibold text-ink">{item.title}</span>
                <span className="mt-1 block text-sm text-trust">{item.detail}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 rounded-2xl bg-ink px-5 py-5 text-white sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Stage 0{active + 1}</p>
        <p className="mt-2 max-w-3xl text-base leading-7 text-slate-200">{stage.copy}</p>
      </div>
    </div>
  );
}
