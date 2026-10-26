import { pilotSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Send a JSON application." }, { status: 400 });
  }

  const parsed = pilotSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, message: "Check the highlighted fields and try again.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const kind = parsed.data.intent === "demo" ? "DEMO" : "PLT";
  const reference = `VS-${kind}-${parsed.data.phone.slice(-4)}`;
  return Response.json({
    ok: true,
    reference,
    message:
      parsed.data.intent === "demo"
        ? "Demo request received."
        : "Pilot application received. A transport specialist will confirm within one school day.",
  });
}
