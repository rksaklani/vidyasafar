"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { schools } from "@/lib/data/mock-data";
import { DEMO_OTP, writeSession, type SessionRole } from "@/lib/session";
import { Field, Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const roles: { value: SessionRole; label: string }[] = [
  { value: "parent", label: "Parent" },
  { value: "driver", label: "Driver" },
  { value: "principal", label: "Principal" },
  { value: "school-admin", label: "Transport manager" },
  { value: "operator", label: "Fleet operator" },
];

export function LoginForm() {
  const router = useRouter();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState<"identify" | "otp">("identify");
  const [role, setRole] = useState<SessionRole>("principal");
  const [schoolId, setSchoolId] = useState(schools[0].id);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  function finish(name: string, contact: string) {
    writeSession({ name, role, schoolId, contact });
    if (role === "parent") router.push("/download?audience=parent&welcome=1");
    else if (role === "driver") router.push("/download?audience=driver&welcome=1");
    else router.push("/dashboard");
  }

  function requestOtp() {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a 10-digit mobile number.");
      return;
    }
    setError(null);
    setStep("otp");
  }

  function verifyOtp() {
    if (otp !== DEMO_OTP) {
      setError("That code does not match. Use 482913 for this demo.");
      return;
    }
    const school = schools.find((item) => item.id === schoolId);
    finish(role === "parent" ? "Meera Mehta" : role === "driver" ? "Ramesh Gowda" : school?.principal ?? "Anita Deshpande", phone);
  }

  function verifyEmail() {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters. This demo does not check a real password store.");
      return;
    }
    const school = schools.find((item) => item.id === schoolId);
    finish(email.split("@")[0].replace(/\./g, " "), email || school?.principal || "Staff");
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1">
        <button type="button" className={tabClass(method === "phone")} onClick={() => { setMethod("phone"); setStep("identify"); setError(null); }}>
          Phone OTP
        </button>
        <button type="button" className={tabClass(method === "email")} onClick={() => { setMethod("email"); setError(null); }}>
          Email
        </button>
      </div>
      <div className="mt-4 grid gap-4">
        <Field label="Role">
          <Select value={role} onChange={(event) => setRole(event.target.value as SessionRole)}>
            {roles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="School">
          <Select value={schoolId} onChange={(event) => setSchoolId(event.target.value)}>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>
        </Field>
        {method === "phone" && step === "identify" ? (
          <Field label="Mobile number" error={error ?? undefined}>
            <Input inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="9845011220" />
          </Field>
        ) : null}
        {method === "phone" && step === "otp" ? (
          <Field label="One-time code" hint="Demo code 482913. Nothing is sent to the phone." error={error ?? undefined}>
            <Input inputMode="numeric" value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="482913" />
          </Field>
        ) : null}
        {method === "email" ? (
          <>
            <Field label="Email" error={error ?? undefined}>
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="principal@nalandavidya.edu.in" />
            </Field>
            <Field label="Password" hint="Any 8 or more characters. This is a demo gate.">
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Field>
          </>
        ) : null}
      </div>
      <div className="mt-5 flex gap-2">
        {method === "phone" && step === "otp" ? (
          <Button variant="surface" onClick={() => setStep("identify")}>
            Back
          </Button>
        ) : null}
        <Button
          className="flex-1"
          onClick={method === "email" ? verifyEmail : step === "otp" ? verifyOtp : requestOtp}
        >
          {method === "email" ? "Sign in" : step === "otp" ? "Verify and continue" : "Send code"}
        </Button>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Registering a school? <Link className="font-semibold text-trust" href="/register">Start the institutional signup</Link>
      </p>
    </div>
  );
}

function tabClass(active: boolean) {
  return active ? "rounded-full bg-white py-2 text-sm font-semibold text-ink shadow-sm" : "rounded-full py-2 text-sm font-semibold text-slate-500";
}
