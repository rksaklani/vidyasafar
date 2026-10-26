import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";

export function AuthShell({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-ink text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative max-w-md">
          <p className="font-hindi text-sm text-sky-200">विद्यासफ़र</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight">The safe journey of learning.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Demo sign-in. The one-time code for a phone login is 482913. No real OTP is sent.
          </p>
        </div>
        <p className="relative text-xs text-slate-500">Nalanda Vidya Niketan · Whitefield morning wave</p>
      </section>
      <section className="flex items-center justify-center bg-surface px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo tone="dark" />
          </div>
          <h2 className="font-display text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{lede}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </div>
  );
}
