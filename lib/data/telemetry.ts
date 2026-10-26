import { pointAlong, stopAtProgress } from "@/lib/geo";
import type { Bus, Route } from "@/lib/data/mock-data";

export function projectBus(bus: Bus, route: Route | undefined, now: number): Bus {
  if (!route || bus.status === "stopped" || bus.status === "sos") {
    return {
      ...bus,
      currentSpeedKmH: 0,
      lastUpdated: new Date(now).toISOString(),
    };
  }

  const pace = bus.status === "delayed" ? 0.42 : 1;
  const progress = (bus.progress + now / (110_000 / pace)) % 1;
  const point = pointAlong(
    route.stops.map((stop) => ({ lat: stop.lat, lng: stop.lng })),
    progress,
  );
  const stop = stopAtProgress(route.stops, progress);
  const wave = Math.sin(now / 700 + bus.progress * 10);
  const speed =
    bus.status === "delayed" ? 12 + Math.round((wave + 1) * 7) : 24 + Math.round((wave + 1) * 10);

  return {
    ...bus,
    latitude: point.lat,
    longitude: point.lng,
    currentSpeedKmH: speed,
    lastUpdated: new Date(now).toISOString(),
    currentStop: stop.current,
    nextStop: stop.next === stop.current ? "Campus Gate" : stop.next,
  };
}

export function projectFleet(fleet: Bus[], routeList: Route[], now: number) {
  return fleet.map((bus) => projectBus(bus, routeList.find((route) => route.id === bus.routeId), now));
}
