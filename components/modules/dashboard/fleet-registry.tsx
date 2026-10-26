"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { StatusPill } from "@/components/ui/badge";
import { expiryLabel, formatRegistration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Bus } from "@/lib/data/mock-data";

export function FleetRegistry() {
  const { buses, routes, school } = useConsole();
  const [ownership, setOwnership] = useState<"all" | Bus["ownership"]>("all");
  const visible = buses.filter((bus) => ownership === "all" || bus.ownership === ownership);
  const owned = buses.filter((bus) => bus.ownership === "owned").length;

  return (
    <div>
      <PageHeader
        title="Vehicle registry"
        description={`${school.name} publishes ${school.totalBuses} buses. This morning wave shows ${buses.length}, of which ${owned} are owned and ${buses.length - owned} are contracted.`}
      />
      <div className="mb-4 flex gap-2">
        {(["all", "owned", "contracted"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setOwnership(key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold capitalize",
              ownership === key ? "border-ink bg-ink text-white" : "border-slate-200 bg-white",
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {visible.map((bus) => {
          const insurance = expiryLabel(bus.insuranceExpiry);
          const fitness = expiryLabel(bus.fitnessExpiry);
          const route = routes.find((item) => item.id === bus.routeId);
          return (
            <article key={bus.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold">Bus {bus.busNumber}</h2>
                  <p className="text-sm text-slate-500">{formatRegistration(bus.registrationNumber)}</p>
                </div>
                <StatusPill status={bus.ownership} />
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-slate-500">Route</dt>
                  <dd>{route ? `${route.code} ${route.name}` : "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Vendor</dt>
                  <dd>{bus.vendor ?? "School owned"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Capacity</dt>
                  <dd>{bus.currentOccupancy}/{bus.capacity} this morning</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Crew</dt>
                  <dd>{bus.driverName} · {bus.attendantName}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <ExpiryChip title="Insurance" tone={insurance.tone} label={insurance.label} />
                <ExpiryChip title="Fitness" tone={fitness.tone} label={fitness.label} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ExpiryChip({ title, tone, label }: { title: string; tone: "ok" | "warning" | "danger"; label: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        tone === "ok" && "bg-emerald-50 text-emerald-800",
        tone === "warning" && "bg-amber-50 text-amber-950",
        tone === "danger" && "bg-rose-50 text-rose-700",
      )}
    >
      {title}: {label}
    </span>
  );
}
