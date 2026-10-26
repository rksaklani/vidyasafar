import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { LoginForm } from "@/components/modules/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign in to the network"
      lede="Parents and drivers continue in the app. School staff and operators open the command console."
    >
      <Suspense fallback={<div className="h-80" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
