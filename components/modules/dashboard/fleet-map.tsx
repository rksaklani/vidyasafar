"use client";

import { useEffect, useRef } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Bus, Route, School } from "@/lib/data/mock-data";

const colors = ["#0284C7", "#D97706", "#059669", "#4F46E5"];

function busIcon(bus: Bus, selected: boolean) {
  return L.divIcon({
    className: "bus-marker",
    html: `<span class="bus-pin is-${bus.status}${selected ? " is-selected" : ""}">${bus.busNumber}</span>`,
    iconSize: [52, 28],
    iconAnchor: [26, 14],
  });
}

const campusIcon = L.divIcon({
  className: "campus-marker",
  html: `<span class="campus-pin">Campus</span>`,
  iconSize: [74, 26],
  iconAnchor: [37, 13],
});

function MapSize() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 180);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}

function FlyTo({ bus }: { bus?: Bus }) {
  const map = useMap();
  const flown = useRef<string | null>(null);
  useEffect(() => {
    if (!bus || flown.current === bus.id) return;
    flown.current = bus.id;
    map.flyTo([bus.latitude, bus.longitude], 14, { duration: 0.45 });
  }, [bus, map]);
  return null;
}

export function FleetMap({
  school,
  buses,
  routes,
  selectedId,
  onSelect,
}: {
  school: School;
  buses: Bus[];
  routes: Route[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const selected = buses.find((bus) => bus.id === selectedId);
  return (
    <MapContainer
      center={[school.latitude, school.longitude]}
      zoom={12}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapSize />
      <FlyTo bus={selected} />
      {routes.map((route, index) => (
        <Polyline
          key={route.id}
          positions={route.stops.map((stop) => [stop.lat, stop.lng])}
          pathOptions={{ color: colors[index % colors.length], weight: route.id === selected?.routeId ? 5 : 3, opacity: 0.85 }}
        />
      ))}
      <Marker position={[school.latitude, school.longitude]} icon={campusIcon} />
      {buses.map((bus) => (
        <Marker
          key={bus.id}
          position={[bus.latitude, bus.longitude]}
          icon={busIcon(bus, bus.id === selectedId)}
          eventHandlers={{ click: () => onSelect(bus.id) }}
        />
      ))}
    </MapContainer>
  );
}
