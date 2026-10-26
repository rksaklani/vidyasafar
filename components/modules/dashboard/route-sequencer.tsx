"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, type ButtonHTMLAttributes, type CSSProperties } from "react";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { routeLengthKm, routeWarnings, scheduleStops } from "@/lib/data/routing";
import { formatClock, formatNumber } from "@/lib/format";
import type { RouteStop } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

const RouteMap = dynamic(() => import("@/components/modules/dashboard/route-map").then((mod) => mod.RouteMap), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />,
});

export function RouteSequencer() {
  const { school, routes, reorderStops, addStop, removeStop } = useConsole();
  const [routeId, setRouteId] = useState(routes[0]?.id ?? "");
  const route = routes.find((item) => item.id === routeId) ?? routes[0];
  const [name, setName] = useState("");
  const [radiusM, setRadiusM] = useState(250);
  const [draft, setDraft] = useState<{ lat: number; lng: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  useEffect(() => setMounted(true), []);

  const scheduled = useMemo(() => (route ? scheduleStops(route.stops, route.startTime) : []), [route]);
  const warnings = useMemo(() => (route ? routeWarnings(route, routes) : []), [route, routes]);

  if (!route) return <p className="text-sm text-slate-500">This school has no routes in the demo wave.</p>;

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = route.stops.map((stop) => stop.id);
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    reorderStops(route.id, arrayMove(ids, oldIndex, newIndex));
  }

  return (
    <div>
      <PageHeader
        title="Route sequencer"
        description="Drag stops to rewrite the morning. ETAs move with the order, and overlapping geofences are called out before two buses claim the same junction."
      />
      <div className="mb-4 flex gap-2 overflow-auto">
        {routes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setRouteId(item.id);
              setDraft(null);
            }}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold",
              item.id === route.id ? "border-trust bg-trust text-white" : "border-slate-200 bg-white",
            )}
          >
            {item.code} · {item.name}
          </button>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
            <p>
              {formatNumber(routeLengthKm(route.stops), 1)} km · first pickup {formatClock(route.startTime)} · gate {formatClock(scheduled[scheduled.length - 1]?.eta ?? route.startTime)}
            </p>
          </div>
          {warnings.length > 0 ? (
            <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              {warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          ) : (
            <p className="mb-3 text-sm text-emerald-700">No geofence overlap on this corridor.</p>
          )}
          {mounted ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={route.stops.map((stop) => stop.id)} strategy={verticalListSortingStrategy}>
                <ol className="space-y-2">
                  {scheduled.map((stop) => (
                    <SortableStop key={stop.id} stop={stop} onRemove={() => removeStop(route.id, stop.id)} />
                  ))}
                </ol>
              </SortableContext>
            </DndContext>
          ) : (
            <ol className="space-y-2">
              {scheduled.map((stop) => (
                <StopRow key={stop.id} stop={stop} onRemove={() => removeStop(route.id, stop.id)} />
              ))}
            </ol>
          )}
        </div>
        <div className="space-y-4">
          <div className="h-72 overflow-hidden rounded-2xl border border-slate-200">
            <RouteMap school={school} route={route} draft={draft} onPick={(lat, lng) => setDraft({ lat, lng })} />
          </div>
          <form
            className="rounded-2xl border border-slate-200 bg-white p-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim() || !draft) return;
              addStop(route.id, {
                name: name.trim(),
                lat: draft.lat,
                lng: draft.lng,
                legMin: 6,
                radiusM,
                kind: "stop",
              });
              setName("");
              setDraft(null);
            }}
          >
            <p className="font-display text-lg font-semibold">Geofence stop</p>
            <p className="mt-1 text-xs text-slate-500">Click the map to drop a pin, then name the stop. Campus approach stays at 1 km.</p>
            <Input className="mt-3" value={name} onChange={(event) => setName(event.target.value)} placeholder="Stop name" />
            <Select className="mt-2" value={String(radiusM)} onChange={(event) => setRadiusM(Number(event.target.value))}>
              <option value="100">100 m geofence</option>
              <option value="250">250 m geofence</option>
              <option value="500">500 m geofence</option>
              <option value="1000">1 km approach</option>
            </Select>
            <p className="mt-2 text-xs text-slate-500">
              {draft ? `${draft.lat.toFixed(4)}, ${draft.lng.toFixed(4)}` : "No pin yet."}
            </p>
            <Button type="submit" className="mt-3" disabled={!name.trim() || !draft}>
              Add stop
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SortableStop({ stop, onRemove }: { stop: RouteStop & { sequence: number; eta: string }; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stop.id });
  return (
    <StopRow
      stop={stop}
      onRemove={onRemove}
      dragging={isDragging}
      setNodeRef={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      handleProps={{ ...attributes, ...listeners }}
    />
  );
}

function StopRow({
  stop,
  onRemove,
  dragging,
  setNodeRef,
  style,
  handleProps,
}: {
  stop: RouteStop & { sequence: number; eta: string };
  onRemove: () => void;
  dragging?: boolean;
  setNodeRef?: (element: HTMLElement | null) => void;
  style?: CSSProperties;
  handleProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn("flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2", dragging && "shadow-lg")}
    >
      <button type="button" className="cursor-grab text-slate-400" aria-label={`Reorder ${stop.name}`} {...handleProps}>
        <GripVertical className="h-4 w-4" />
      </button>
      <span className="w-6 text-xs font-semibold text-slate-400">{stop.sequence}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{stop.name}</p>
        <p className="text-xs text-slate-500">{stop.kind === "campus" ? "1 km approach" : `${stop.radiusM} m`} · +{stop.legMin} min leg</p>
      </div>
      <span className="text-sm font-semibold text-trust">{formatClock(stop.eta)}</span>
      {stop.kind === "campus" ? null : (
        <button type="button" aria-label={`Remove ${stop.name}`} className="text-slate-400 hover:text-rose-600" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </li>
  );
}
