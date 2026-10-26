import { z } from "zod";

export const pilotSchema = z.object({
  schoolName: z.string().trim().min(2, "Enter the school name"),
  contactPerson: z.string().trim().min(2, "Enter a contact person"),
  role: z.enum(["principal", "transport-director", "operator", "other"]),
  email: z.string().trim().email("Enter an official email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number"),
  city: z.string().trim().min(2, "Enter the city"),
  busCount: z.coerce.number().int().min(1, "At least one bus").max(400, "Use the operator desk above 400 buses"),
  launchDate: z.string().min(1, "Choose a preferred date"),
  timeSlot: z.string().optional(),
  intent: z.enum(["pilot", "demo"]),
  notes: z.string().trim().max(500).optional(),
});

export type PilotInput = z.infer<typeof pilotSchema>;

export const attendanceEventSchema = z.object({
  studentId: z.string().min(1),
  studentName: z.string().optional(),
  status: z.enum(["pending", "boarded", "absent", "arrived"]),
  stopName: z.string().optional(),
  busNumber: z.string().optional(),
});

export const telemetryPingSchema = z.object({
  busId: z.string().min(1),
  busNumber: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  speedKmH: z.number().min(0).max(140),
  status: z.enum(["on-time", "delayed", "stopped", "sos"]).optional(),
});
