import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { RegisterForm } from "@/components/modules/auth/register-form";

export const metadata: Metadata = { title: "Register a school" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Register the institution"
      lede="This opens the demo command console for your name and files a pilot lead with the desk."
    >
      <RegisterForm />
    </AuthShell>
  );
}
