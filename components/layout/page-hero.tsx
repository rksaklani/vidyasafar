import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.15] sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{lede}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
