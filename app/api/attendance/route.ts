import { connection } from "next/server";
import { students } from "@/lib/data/mock-data";
import { attendanceEventSchema } from "@/lib/schemas";

export async function GET(request: Request) {
  await connection();
  const schoolId = new URL(request.url).searchParams.get("schoolId");
  const roll = students.filter((student) => !schoolId || student.schoolId === schoolId);
  return Response.json({
    date: "2026-10-26",
    schoolId,
    count: roll.length,
    students: roll,
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Send a check-in event as JSON." }, { status: 400 });
  }
  const parsed = attendanceEventSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, message: "Check-in rejected.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const eventId = `evt-${parsed.data.studentId}-${parsed.data.status}`;
  return Response.json({
    ok: true,
    eventId,
    recordedAt: new Date().toISOString(),
    message: `${parsed.data.studentName ?? "Student"} marked ${parsed.data.status}. Event ${eventId}.`,
  });
}
