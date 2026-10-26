import { buses, routes } from "@/lib/data/mock-data";
import { projectFleet } from "@/lib/data/telemetry";
import { telemetryPingSchema } from "@/lib/schemas";

export async function GET() {
  const now = Date.now();
  const fleet = projectFleet(buses, routes, now).map((bus) => ({
    id: bus.id,
    busNumber: bus.busNumber,
    schoolId: bus.schoolId,
    status: bus.status,
    latitude: bus.latitude,
    longitude: bus.longitude,
    currentSpeedKmH: bus.currentSpeedKmH,
    currentOccupancy: bus.currentOccupancy,
    capacity: bus.capacity,
    lastUpdated: bus.lastUpdated,
    routeId: bus.routeId,
  }));
  return Response.json({ serverTime: new Date(now).toISOString(), count: fleet.length, buses: fleet });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Send a GPS ping as JSON." }, { status: 400 });
  }
  const parsed = telemetryPingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, message: "Ping rejected.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const pingId = `png-${parsed.data.busId}-${Math.round(parsed.data.latitude * 1e4)}`;
  return Response.json({
    ok: true,
    pingId,
    acceptedAt: new Date().toISOString(),
    message: `Ping ${pingId} accepted for bus ${parsed.data.busNumber ?? parsed.data.busId}.`,
  });
}
