"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { StatusPill } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPhone, formatRegistration } from "@/lib/format";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const FleetMap = dynamic(() => import("@/components/modules/dashboard/fleet-map").then((mod) => mod.FleetMap), {
  ssr: false,
  loading: () => <div className="h-full min-h-80 animate-pulse bg-slate-200" />,
});

export function CommandConsole() {
  const { school, buses, routes } = useConsole();
  const toast = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = buses.find((bus) => bus.id === selectedId) ?? buses[0];
  const route = routes.find((item) => item.id === selected?.routeId);

  useEffect(() => {
    setSelectedId(null);
  }, [school.id]);

  async function pushPing() {
    if (!selected) return;
    const response = await fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        busId: selected.id,
        busNumber: selected.busNumber,
        latitude: selected.latitude,
        longitude: selected.longitude,
        speedKmH: selected.currentSpeedKmH,
        status: selected.status,
      }),
    });
    const payload = (await response.json()) as { message?: string };
    toast(payload.message ?? "Ping sent.");
  }

  return (
    <div className="flex min-h-[70vh] flex-1 flex-col lg:min-h-0 lg:flex-row">
      <div className="relative h-[48vh] min-h-80 lg:h-auto lg:flex-1">
        <FleetMap
          key={school.id}
          school={school}
          buses={buses}
          routes={routes}
          selectedId={selected?.id ?? null}
          onSelect={setSelectedId}
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
          {["on-time", "delayed", "stopped"].map((status) => (
            <span key={status} className="pointer-events-none">
              <StatusPill status={status === "stopped" ? "sos" : status} label={status === "stopped" ? "SOS / stopped" : undefined} />
            </span>
          ))}
        </div>
      </div>
      <aside className="flex max-h-[52vh] w-full flex-col border-slate-200 bg-white lg:max-h-none lg:w-[380px] lg:border-l">
        <div className="border-b border-slate-200 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Morning wave</p>
          <p className="font-display text-lg font-semibold">{buses.length} buses on the map</p>
        </div>
        <ul className="max-h-40 overflow-auto border-b border-slate-200 lg:max-h-48">
          {buses.map((bus) => (
            <li key={bus.id}>
              <button
                type="button"
                onClick={() => setSelectedId(bus.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50",
                  selected?.id === bus.id && "bg-sky-50",
                )}
              >
                <span>
                  <span className="font-semibold">Bus {bus.busNumber}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{routes.find((item) => item.id === bus.routeId)?.name}</span>
                </span>
                <StatusPill status={bus.status} />
              </button>
            </li>
          ))}
        </ul>
        {selected ? (
          <div className="flex-1 overflow-auto px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold">Bus {selected.busNumber}</h2>
                <p className="text-sm text-slate-500">{formatRegistration(selected.registrationNumber)}</p>
              </div>
              <StatusPill status={selected.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Speed" value={`${selected.currentSpeedKmH} km/h`} />
              <Stat label="Occupancy" value={`${selected.currentOccupancy}/${selected.capacity}`} />
              <Stat label="Current stop" value={selected.currentStop ?? "—"} />
              <Stat label="Next" value={selected.nextStop ?? "—"} />
            </dl>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn("h-full rounded-full", selected.currentOccupancy / selected.capacity > 0.9 ? "bg-bus" : "bg-trust")}
                style={{ width: `${Math.min(100, (selected.currentOccupancy / selected.capacity) * 100)}%` }}
              />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Driver · </span>
                {selected.driverName} · <a className="text-trust" href={`tel:+91${selected.driverPhone}`}>{formatPhone(selected.driverPhone)}</a>
              </p>
              <p>
                <span className="text-slate-500">Attendant · </span>
                {selected.attendantName}
              </p>
              <p>
                <span className="text-slate-500">Route · </span>
                {route ? `${route.code} ${route.name}` : "Unassigned"}
              </p>
              {selected.vendor ? (
                <p>
                  <span className="text-slate-500">Vendor · </span>
                  {selected.vendor}
                </p>
              ) : null}
              {selected.note ? <p className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">{selected.note}</p> : null}
            </div>
            <Button className="mt-4" variant="surface" onClick={pushPing}>
              Push GPS ping
            </Button>
          </div>
        ) : (
          <p className="p-4 text-sm text-slate-500">No buses are on this morning wave.</p>
        )}
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface px-3 py-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
