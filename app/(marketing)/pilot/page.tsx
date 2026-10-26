import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { PilotForm } from "@/components/modules/marketing/pilot-form";

export const metadata: Metadata = {
  title: "4-week pilot",
  description: "Apply for a four-week VidyaSafar school pilot. No hardware required to start.",
};

const weeks = [
  ["Week 0", "Import the roster and draw two routes. The rest of the fleet stays on paper."],
  ["Week 1", "Driver phones on those routes. Attendants learn the one tap before parents are invited."],
  ["Week 2", "Parents join. The 1 km alert and the boarding notice replace the class-group messages."],
  ["Week 3", "Fees run in parallel: cash is still accepted, and every digital payment lands on the ledger."],
  ["Week 4", "A review of call volume, on-time arrival, and which stops should be resequenced."],
];

export default function PilotPage() {
  return (
    <>
      <PageHero
        eyebrow="School pilot"
        title="Four weeks. Two routes. No device to install on the bus."
        lede="Built for principals and transport directors who want the register to prove itself before a fleet-wide rollout."
      />
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <ol className="space-y-4">
          {weeks.map(([week, copy]) => (
            <li key={week} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-trust">{week}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{copy}</p>
            </li>
          ))}
        </ol>
        <Suspense fallback={<div className="h-[32rem] rounded-3xl bg-white" />}>
          <PilotForm />
        </Suspense>
      </section>
    </>
  );
}
