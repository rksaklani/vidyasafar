import Link from "next/link";
import { ArrowRight, PhoneOff, Radio, Wallet } from "lucide-react";
import { PhoneMockup } from "@/components/modules/marketing/phone-mockup";
import { SafetyJourney } from "@/components/modules/marketing/journey";
import { ConsolePreview } from "@/components/modules/marketing/console-preview";
import { Button } from "@/components/ui/button";

const counters = [
  ["100M+", "Daily commutes on India's school routes"],
  ["70%+", "Front-desk calls that are just 'where is the bus?'"],
  ["Zero", "Extra hardware on the bus to get started"],
];

const audiences = [
  {
    href: "/parents",
    eyebrow: "Parents",
    title: "See the bus before you call the school.",
    copy: "A kilometre-out alert, a boarding confirmation, and a map that ends at the campus gate.",
  },
  {
    href: "/schools",
    eyebrow: "Schools",
    title: "A register the front desk does not have to chase.",
    copy: "Attendance, vendors, and fees in one console, aligned with how a principal actually runs the morning.",
  },
  {
    href: "/operators",
    eyebrow: "Operators",
    title: "Routes, diesel, and the cash that never gets counted.",
    copy: "Sequence the stops, spot the overlap, and settle contracted buses without a shoe-box of receipts.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="font-hindi text-sm font-semibold text-sky-200">विद्यासफ़र</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">The safe journey of learning</p>
            <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[1.12] sm:text-6xl">
              School Transport Built on Trust, Not &ldquo;Phone Calls &amp; Prayers&rdquo;.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              VidyaSafar turns the morning bus from a rumour into a verified register: live GPS, one-tap boarding, and fees that settle without cash on the seat.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/download" size="lg">
                Download the parent app
              </Button>
              <Button href="/pilot" variant="outline" size="lg">
                Book a 4-week pilot
              </Button>
            </div>
            <Link href="/dashboard" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
              Preview the school console <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <PhoneMockup />
        </div>
        <dl className="relative mx-auto grid max-w-7xl border-t border-white/10 sm:grid-cols-3">
          {counters.map(([value, label]) => (
            <div key={value} className="border-white/10 px-5 py-6 sm:px-8 sm:[&:not(:last-child)]:border-r">
              <dt className="font-serif text-3xl text-white">{value}</dt>
              <dd className="mt-2 max-w-xs text-sm leading-6 text-slate-400">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          CBSE · ICSE · State board · K-12 groups · Built for the Indian school day
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-8 sm:px-8 md:grid-cols-3">
        {[
          [PhoneOff, "The front desk is a call centre", "Most of the 7:40 rush is a parent asking if the bus has left a stop the school cannot see."],
          [Radio, "A stopped bus is a rumour", "Breakdowns travel by WhatsApp forwards. The attendant, the vendor, and the gate each have a different story."],
          [Wallet, "Fees still ride on the seat", "Cash collected by a driver does not reconcile. Overdue families and paid families look the same at the gate."],
        ].map(([Icon, title, copy]) => {
          const Glyph = Icon as typeof PhoneOff;
          return (
            <article key={title as string} className="rounded-3xl border border-slate-200 bg-white p-6">
              <Glyph className="h-5 w-5 text-trust" />
              <h2 className="mt-4 font-display text-xl font-semibold">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy as string}</p>
            </article>
          );
        })}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-trust">The morning, in four steps</p>
          <h2 className="mt-3 font-serif text-4xl text-ink">From the stop to the campus gate.</h2>
        </div>
        <div className="mt-8">
          <SafetyJourney />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:px-8 lg:grid-cols-3">
          {audiences.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-3xl border border-slate-200 p-6 transition hover:border-trust">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-trust">{item.eyebrow}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                See how <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-trust">School command</p>
            <h2 className="mt-3 font-serif text-4xl">The desk sees the whole fleet.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Green is on time. Amber is delayed. Red is stopped or an SOS. Occupancy, driver, and the current stop sit beside the map.
          </p>
        </div>
        <ConsolePreview />
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
          {[
            ["DPDP", "The school is the fiduciary. VidyaSafar processes location only for the trip, and only the parent of that child sees it."],
            ["AIS-140", "Start on the driver phone. If a bus already has a vehicle-location device, its pings can land in the same console."],
            ["Encryption", "Transport in transit, locked storage for the roster, and a permission grid for who can send a broadcast."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h2 className="font-display text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-6xl justify-end px-5 pb-12 sm:px-8">
          <Button href="/safety" variant="outline">
            Read the safety model
          </Button>
        </div>
      </section>
    </>
  );
}
