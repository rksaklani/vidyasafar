import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/format";

export const metadata: Metadata = {
  title: "For operators",
  description: "Route sequencing, vendor settlement, and cash reconciliation for school fleet operators.",
};

const lanes = [
  { name: "ITPL Corridor", km: 18.4, overlap: "Clear", saving: "1.1 km" },
  { name: "Sarjapur Loop", km: 24.8, overlap: "Vydehi geofence", saving: "0.4 km" },
  { name: "Kadugodi Express", km: 11.2, overlap: "Shares Vydehi", saving: "Hold" },
  { name: "Varthur Belt", km: 9.6, overlap: "Clear", saving: "0.6 km" },
];

export default function OperatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For operators"
        title="Shorter routes, and a settlement that adds up."
        lede="Fleet operators run owned buses and contracted vendors on the same morning. VidyaSafar sequences the stops, flags geofence overlaps, and shows which fees arrived as digital payments instead of cash."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/pricing">Run the fuel and fee numbers</Button>
          <Button href="/dashboard" variant="outline">
            Open the route sequencer
          </Button>
        </div>
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-display text-xl font-semibold">Morning wave · Nalanda</h2>
            <p className="text-sm text-slate-500">Illustrative corridors from the demo school.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Corridor</th>
                  <th className="px-3 py-3 font-semibold">Length</th>
                  <th className="px-3 py-3 font-semibold">Overlap</th>
                  <th className="px-3 py-3 font-semibold">If resequenced</th>
                </tr>
              </thead>
              <tbody>
                {lanes.map((lane) => (
                  <tr key={lane.name} className="border-t border-slate-100">
                    <td className="px-5 py-3 font-medium">{lane.name}</td>
                    <td className="px-3 py-3">{lane.km} km</td>
                    <td className="px-3 py-3">{lane.overlap}</td>
                    <td className="px-3 py-3">{lane.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-3xl bg-ink p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">October settlement</p>
          <p className="mt-4 font-serif text-4xl">{formatInr(482000)}</p>
          <p className="mt-2 text-sm text-slate-300">Expected transport fees on the demo roster&apos;s October cycle, scaled to the published fleet.</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
              <dt className="text-slate-400">Still cash on the seat</dt>
              <dd>41%</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
              <dt className="text-slate-400">Digital, already matched</dt>
              <dd>47%</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
              <dt className="text-slate-400">Overdue, visible to accounts</dt>
              <dd>12%</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Dead kilometres", "Reordering a stop recalculates ETAs and warns when two routes claim the same junction."],
            ["Vendor buses", "Contracted vehicles stay on the operator's map, with the vendor named on the registry."],
            ["No new box", "Driver phones cover the pilot. Existing AIS-140 devices can publish into the same telemetry intake."],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-5">
              <h2 className="font-display text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
