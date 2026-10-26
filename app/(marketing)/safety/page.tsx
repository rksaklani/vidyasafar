import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Safety",
  description: "How VidyaSafar handles student location under the DPDP Act, AIS-140 tracking norms, and encryption.",
};

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust & compliance"
        title="A child's location is not a product feature to be resold."
        lede="VidyaSafar is designed around the Digital Personal Data Protection Act, 2023, the AIS-140 vehicle-tracking norm, and a simple rule: staff see the route they run, parents see their own child."
      />
      <article className="mx-auto max-w-3xl space-y-12 px-5 py-14 text-[15px] leading-7 text-slate-700 sm:px-8">
        <section id="dpdp">
          <h2 className="font-serif text-3xl text-ink">Children&apos;s data, under the DPDP Act</h2>
          <p className="mt-4">
            The school is the data fiduciary. VidyaSafar processes the roster and the trip on the school&apos;s instructions. Location is collected for one purpose: getting that student between the stop and the campus gate.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>A parent sees their child. They do not see the rest of the bus roster.</li>
            <li>The live position is shown for the active trip, then closed at campus arrival, with a short buffer so a late gate scan still matches.</li>
            <li>Absence marked by a parent is a consent signal for that morning, not a permanent share of home location.</li>
            <li>The grievance contact sits in school settings and is the address on the privacy mail, not a generic inbox buried in a footer.</li>
          </ul>
        </section>
        <section id="ais-140">
          <h2 className="font-serif text-3xl text-ink">AIS-140, without pretending a phone is a certified VLT</h2>
          <p className="mt-4">
            AIS-140 is the automotive standard behind India&apos;s vehicle location tracking devices and the emergency button used on permitted public-service vehicles. Several states expect school buses to carry that class of device.
          </p>
          <p className="mt-4">
            VidyaSafar&apos;s pilot path does not require a new box. The driver phone publishes GPS, the attendant confirms boarding, and the panic control raises an SOS on the command map. Where a bus already has an AIS-140 device, those pings can be posted to the same telemetry intake the console already draws. The phone does not replace a mandated device. It covers the schools that are still running on calls.
          </p>
        </section>
        <section id="encryption">
          <h2 className="font-serif text-3xl text-ink">Encryption and who can press send</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Traffic between the apps, the console, and the intake is encrypted in transit.</li>
            <li>Roster, trip logs, and fee status are stored encrypted at rest.</li>
            <li>Roles are separate: a front-desk login can mark attendance and cannot rewrite the permission grid.</li>
            <li>Broadcasts are deliberate. A rain notice and a breakdown notice are different templates, and each send is kept on the dispatch log.</li>
          </ul>
          <p className="mt-4">
            This page describes the product&apos;s design. It is not a government certificate, and the demo console on this site uses fictional students.
          </p>
        </section>
      </article>
    </>
  );
}
