"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { pilotSchema, type PilotInput } from "@/lib/schemas";
import { Field, Input, Select, TextArea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatLongDate } from "@/lib/format";

const cities = ["Bengaluru", "Mumbai", "Delhi", "Gurugram", "Hyderabad", "Pune", "Chennai", "Kolkata"];

export function PilotForm({ intent = "pilot" }: { intent?: "pilot" | "demo" }) {
  return <PilotFormInner forcedIntent={intent} />;
}

function PilotFormInner({ forcedIntent }: { forcedIntent: "pilot" | "demo" }) {
  const params = useSearchParams();
  const intent = params.get("intent") === "demo" || forcedIntent === "demo" ? "demo" : "pilot";
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PilotInput>({
    resolver: zodResolver(pilotSchema),
    defaultValues: {
      intent,
      role: intent === "demo" ? "principal" : "transport-director",
      busCount: 12,
      timeSlot: "11:00",
    },
  });

  async function onSubmit(values: PilotInput) {
    setServerError(null);
    const response = await fetch("/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, intent }),
    });
    const payload = (await response.json()) as { ok?: boolean; reference?: string; message?: string };
    if (!response.ok || !payload.reference) {
      setServerError(payload.message ?? "The desk could not take this application. Try again.");
      return;
    }
    setReference(payload.reference);
  }

  if (reference) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">Received</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
          {intent === "demo" ? "Demo held" : "Pilot application in"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Reference <span className="font-semibold">{reference}</span>. A transport specialist confirms within one school day.
          Nothing is installed on the buses for the first week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="School name" error={errors.schoolName?.message}>
          <Input placeholder="Nalanda Vidya Niketan" {...register("schoolName")} />
        </Field>
        <Field label="Contact person" error={errors.contactPerson?.message}>
          <Input placeholder="Anita Deshpande" {...register("contactPerson")} />
        </Field>
        <Field label="Role" error={errors.role?.message}>
          <Select {...register("role")}>
            <option value="principal">Principal</option>
            <option value="transport-director">Transport director</option>
            <option value="operator">Fleet operator</option>
            <option value="other">Other</option>
          </Select>
        </Field>
        <Field label="Official email" error={errors.email?.message}>
          <Input type="email" placeholder="principal@school.edu.in" {...register("email")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input inputMode="numeric" placeholder="9845011220" {...register("phone")} />
        </Field>
        <Field label="City" error={errors.city?.message}>
          <Input list="vidyasafar-cities" placeholder="Bengaluru" {...register("city")} />
          <datalist id="vidyasafar-cities">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </Field>
        <Field label="Buses in the fleet" error={errors.busCount?.message}>
          <Input type="number" min={1} max={400} {...register("busCount")} />
        </Field>
        <Field label={intent === "demo" ? "Preferred demo date" : "Preferred pilot launch"} error={errors.launchDate?.message}>
          <Input type="date" min="2026-10-26" {...register("launchDate")} />
        </Field>
        {intent === "demo" ? (
          <Field label="15-minute slot (IST)" error={errors.timeSlot?.message}>
            <Select {...register("timeSlot")}>
              <option value="09:30">09:30</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="16:00">16:00</option>
            </Select>
          </Field>
        ) : null}
      </div>
      <div className="mt-4">
        <Field label="Notes" hint="Optional. Routes, vendor mix, or the call volume you want off the front desk." error={errors.notes?.message}>
          <TextArea rows={3} {...register("notes")} />
        </Field>
      </div>
      {serverError ? <p className="mt-3 text-sm text-rose-600">{serverError}</p> : null}
      <Button type="submit" className="mt-5" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : intent === "demo" ? "Schedule the demo" : "Apply for the 4-week pilot"}
      </Button>
      <p className="mt-3 text-xs text-slate-500">
        Launch dates from {formatLongDate("2026-10-27")}. We reply to the official email, not a personal inbox.
      </p>
    </form>
  );
}
