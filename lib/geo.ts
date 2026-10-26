export type LatLng = { lat: number; lng: number };

export function haversineKm(a: LatLng, b: LatLng) {
  const earth = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earth * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function pointAlong(points: LatLng[], progress: number): LatLng {
  if (points.length === 0) return { lat: 0, lng: 0 };
  if (points.length === 1) return points[0];
  const t = ((progress % 1) + 1) % 1;
  const legs: number[] = [];
  let total = 0;
  for (let index = 0; index < points.length - 1; index += 1) {
    const length = Math.max(haversineKm(points[index], points[index + 1]), 0.0001);
    legs.push(length);
    total += length;
  }
  let remaining = t * total;
  for (let index = 0; index < legs.length; index += 1) {
    if (remaining <= legs[index] || index === legs.length - 1) {
      const fraction = Math.min(1, remaining / legs[index]);
      const start = points[index];
      const end = points[index + 1];
      return {
        lat: start.lat + (end.lat - start.lat) * fraction,
        lng: start.lng + (end.lng - start.lng) * fraction,
      };
    }
    remaining -= legs[index];
  }
  return points[points.length - 1];
}

export function stopAtProgress<T extends { name: string }>(stops: T[], progress: number) {
  if (stops.length === 0) return { current: "—", next: "—", index: 0 };
  const t = Math.min(0.999, Math.max(0, progress));
  const index = Math.min(stops.length - 1, Math.floor(t * Math.max(stops.length - 1, 1)));
  const nextIndex = Math.min(stops.length - 1, index + 1);
  return { current: stops[index].name, next: stops[nextIndex].name, index };
}

export function pathDistanceKm(points: LatLng[]) {
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    total += haversineKm(points[index - 1], points[index]);
  }
  return total;
}
