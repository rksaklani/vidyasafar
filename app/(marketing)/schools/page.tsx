import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { PilotForm } from "@/components/modules/marketing/pilot-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For schools",
  description: "A school transport command console for attendance, vendors, compliance, and parent calls.",
};

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="For schools"
        title="The front desk stops being the transport department."
        lede="Principals and transport directors get a morning register that fills itself, a fleet map that includes contracted vendors, and a fee ledger that matches what parents paid."
      >
        <Button href="/dashboard" variant="outline">
          Open a live demo console
        </Button>
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:px-8 md:grid-cols-3">
        {[
          ["Call drop", "When parents can see boarding, the 'has the bus left?' queue collapses. Schools in the model shed about 70% of those calls."],
          ["One register", "Boarded, absent-by-parent, and still en route are different states. The gate is not reconciling three WhatsApp groups."],
          ["Vendor buses too", "Owned and contracted vehicles sit on the same map, with insurance, fitness, and licence expiry beside the driver."],
        ].map(([title, copy]) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="font-display text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
          </article>
        ))}
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-trust">15 minutes</p>
            <h2 className="mt-3 font-serif text-4xl">See your morning on the console.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Bring a route list, even a rough one. We will place two corridors on the map, show a parent absence landing before the stop, and walk the fee ledger. No hardware quote on the call.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>DPDP roles: the school remains the data fiduciary.</li>
              <li>AIS-140: phone-first, with a path for buses that already carry a VLT device.</li>
              <li>RBAC: front desk, accountant, and transport manager do not share one password.</li>
            </ul>
          </div>
          <Suspense fallback={<div className="h-96 rounded-3xl bg-slate-100" />}>
            <PilotForm intent="demo" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
