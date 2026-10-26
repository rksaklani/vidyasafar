import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const columns = [
  {
    title: "Product",
    links: [
      ["/download", "Download hub"],
      ["/pricing", "Fleet calculator"],
      ["/pilot", "4-week pilot"],
      ["/dashboard", "School console"],
    ],
  },
  {
    title: "Who it's for",
    links: [
      ["/parents", "Parents"],
      ["/schools", "Schools"],
      ["/operators", "Operators"],
      ["/safety", "Safety & DPDP"],
    ],
  },
  {
    title: "Trust desk",
    links: [
      ["/safety#dpdp", "Children's data"],
      ["/safety#ais-140", "AIS-140"],
      ["/safety#encryption", "Encryption"],
      ["mailto:privacy@vidyasafar.in", "privacy@vidyasafar.in"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            The safe journey of learning. A verified transit network for the Indian school day — from the stop to the campus gate.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{column.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 VidyaSafar. Bengaluru.</p>
          <p>Demo console · student data on this site is fictional.</p>
        </div>
      </div>
    </footer>
  );
}
