import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/modules/marketing/faq";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For parents",
  description: "Live school-bus tracking, boarding confirmation, and fee payment for Indian parents.",
};

const day = [
  ["06:55", "The bus leaves the first stop. You are not expected to watch it yet."],
  ["07:12", "One kilometre out, the phone tells you the approach. You walk down, not out early."],
  ["07:18", "The attendant taps once. You see Arnav boarded Bus 12 at AECS Layout."],
  ["07:41", "The map closes when the bus reaches the campus gate."],
];

export default function ParentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For parents"
        title="Know the bus before you call the school."
        lede="VidyaSafar Parent is the live trip your family already asks about, without a hardware box under the seat or a dozen messages in a class group."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/download?audience=parent">Get the parent app</Button>
          <Button href="/safety#dpdp" variant="outline">
            How your child&apos;s location is handled
          </Button>
        </div>
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">A school morning, without the phone queue.</h2>
          <ol className="mt-6 space-y-4">
            {day.map(([time, copy]) => (
              <li key={time} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <span className="font-display text-sm font-semibold text-trust">{time}</span>
                <p className="text-sm leading-6 text-slate-600">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-3xl bg-ink p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">On the phone</p>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-slate-200">
            <li>Approach alert at 1 km, not a stream of pings.</li>
            <li>Boarding is confirmed by the attendant, not guessed from a blurry photo.</li>
            <li>Mark a sick day before the stop, so the bus does not wait and the register already knows.</li>
            <li>Pay the transport fee in the app. The receipt is the same one the school accountant sees.</li>
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <h2 className="mb-4 font-display text-2xl font-semibold">Questions families actually ask</h2>
        <Faq
          items={[
            {
              q: "Can other parents see my child's stop?",
              a: "No. A parent account sees that child, that bus, and that trip. The school roster is a staff view.",
            },
            {
              q: "Do I need a new GPS device?",
              a: "No. The driver phone is enough to start. Schools that already fitted an AIS-140 device can feed those pings into the same map.",
            },
            {
              q: "What if the network drops at the stop?",
              a: "The tap is stored on the phone and reaches the register when the signal returns. The parent sees the stop time the attendant recorded, not the time the network recovered.",
            },
          ]}
        />
      </section>
    </>
  );
}
