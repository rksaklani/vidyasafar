"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pilotSchema } from "@/lib/schemas";
import { writeSession, type SessionRole } from "@/lib/session";
import { Field, Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = pilotSchema.extend({
  password: z.string().min(8, "Use at least 8 characters"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { intent: "pilot", role: "principal", busCount: 12, timeSlot: "" },
  });

  async function onSubmit(values: RegisterValues) {
    setError(null);
    const { password: _password, ...lead } = values;
    const response = await fetch("/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, intent: "pilot", notes: "Institutional registration" }),
    });
    const payload = (await response.json()) as { ok?: boolean; reference?: string; message?: string };
    if (!response.ok || !payload.reference) {
      setError(payload.message ?? "Registration could not be filed.");
      return;
    }
    const role: SessionRole = values.role === "operator" ? "operator" : values.role === "transport-director" ? "school-admin" : "principal";
    writeSession({
      name: values.contactPerson,
      role,
      schoolId: "sch_nalanda",
      contact: values.email,
    });
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-5" noValidate>
      <div className="grid gap-4">
        <Field label="School name" error={errors.schoolName?.message}>
          <Input {...register("schoolName")} />
        </Field>
        <Field label="Your name" error={errors.contactPerson?.message}>
          <Input {...register("contactPerson")} />
        </Field>
        <Field label="Role" error={errors.role?.message}>
          <Select {...register("role")}>
            <option value="principal">Principal</option>
            <option value="transport-director">Transport director</option>
            <option value="operator">Fleet operator</option>
          </Select>
        </Field>
        <Field label="Official email" error={errors.email?.message}>
          <Input type="email" {...register("email")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} placeholder="9845011220" />
        </Field>
        <Field label="City" error={errors.city?.message}>
          <Input {...register("city")} />
        </Field>
        <Field label="Buses" error={errors.busCount?.message}>
          <Input type="number" min={1} {...register("busCount")} />
        </Field>
        <Field label="Preferred launch" error={errors.launchDate?.message}>
          <Input type="date" min="2026-10-26" {...register("launchDate")} />
        </Field>
        <Field label="Password" hint="Stored only in this browser session. It is not kept by the pilot desk." error={errors.password?.message}>
          <Input type="password" {...register("password")} />
        </Field>
      </div>
      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
      <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating the console…" : "Create the school login"}
      </Button>
      <p className="mt-4 text-sm text-slate-600">
        Already filed? <Link className="font-semibold text-trust" href="/login">Sign in</Link>
      </p>
    </form>
  );
}
