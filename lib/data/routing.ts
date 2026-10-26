import { haversineKm, pathDistanceKm, type LatLng } from "@/lib/geo";
import type { Route, RouteStop } from "@/lib/data/mock-data";

export type ScheduledStop = RouteStop & { sequence: number; eta: string };

export function scheduleStops(stops: RouteStop[], startTime: string): ScheduledStop[] {
  const [hour, minute] = startTime.split(":").map(Number);
  let cursor = hour * 60 + minute;
  return stops.map((stop, index) => {
    if (index > 0) cursor += stop.legMin;
    const hh = Math.floor(cursor / 60) % 24;
    const mm = cursor % 60;
    return {
      ...stop,
      sequence: index + 1,
      eta: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`,
    };
  });
}

export function routeLengthKm(stops: Pick<RouteStop, "lat" | "lng">[]) {
  return pathDistanceKm(stops.map((stop) => ({ lat: stop.lat, lng: stop.lng })));
}

export function routeWarnings(route: Route, routes: Route[]) {
  const warnings: string[] = [];
  const last = route.stops[route.stops.length - 1];
  if (last && last.kind !== "campus") {
    warnings.push("Campus gate is no longer the final stop. Arrival alerts will fire before the bus is actually in.");
  }

  for (const stop of route.stops) {
    if (stop.kind === "campus") continue;
    for (const other of routes) {
      if (other.id === route.id || other.schoolId !== route.schoolId) continue;
      for (const candidate of other.stops) {
        if (candidate.kind === "campus") continue;
        const distance = haversineKm(stop as LatLng, candidate as LatLng);
        const overlapAt = Math.max(stop.radiusM, candidate.radiusM) / 1000;
        if (distance > 0 && distance < overlapAt + 0.25) {
          warnings.push(
            `${stop.name} sits ${Math.round(distance * 1000)} m from ${candidate.name} on ${other.code}. The geofences overlap.`,
          );
        }
      }
    }
  }

  return [...new Set(warnings)].slice(0, 4);
}
