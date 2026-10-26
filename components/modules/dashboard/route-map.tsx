"use client";

import { useEffect } from "react";
import { Circle, MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Route, RouteStop, School } from "@/lib/data/mock-data";

function MapSize() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 180);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}

function ClickCatch({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

const draftIcon = L.divIcon({
  className: "stop-marker",
  html: `<span class="stop-dot" style="background:#F59E0B"></span>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export function RouteMap({
  school,
  route,
  draft,
  onPick,
}: {
  school: School;
  route: Route;
  draft: { lat: number; lng: number } | null;
  onPick: (lat: number, lng: number) => void;
}) {
  return (
    <MapContainer key={route.id} center={[school.latitude, school.longitude]} zoom={12} className="h-full w-full">
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapSize />
      <ClickCatch onPick={onPick} />
      <Polyline positions={route.stops.map((stop) => [stop.lat, stop.lng])} pathOptions={{ color: "#0284C7", weight: 4 }} />
      {route.stops.map((stop) => (
        <Circle
          key={stop.id}
          center={[stop.lat, stop.lng]}
          radius={stop.radiusM}
          pathOptions={{
            color: stop.kind === "campus" ? "#F59E0B" : "#0284C7",
            weight: 1,
            fillOpacity: 0.08,
          }}
        />
      ))}
      {route.stops.map((stop) => (
        <StopMarker key={`${stop.id}-pin`} stop={stop} />
      ))}
      {draft ? <Marker position={[draft.lat, draft.lng]} icon={draftIcon} /> : null}
    </MapContainer>
  );
}

function StopMarker({ stop }: { stop: RouteStop }) {
  const icon = L.divIcon({
    className: "stop-marker",
    html: stop.kind === "campus" ? `<span class="campus-pin">Gate</span>` : `<span class="stop-dot"></span>`,
    iconSize: stop.kind === "campus" ? [48, 26] : [14, 14],
    iconAnchor: stop.kind === "campus" ? [24, 13] : [7, 7],
  });
  return <Marker position={[stop.lat, stop.lng]} icon={icon} />;
}
