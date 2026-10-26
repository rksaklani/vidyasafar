import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">VidyaSafar</p>
      <h1 className="mt-4 font-serif text-5xl">This stop is not on the route.</h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">The page is not part of the network. Head back to the morning map or the public site.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Home</Button>
        <Link href="/dashboard" className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 text-sm font-semibold">
          Console
        </Link>
      </div>
    </div>
  );
}
