import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("h-9 w-9", className)}>
      <path
        d="M16 2.5 27 6.6v8.4c0 5.6-4.2 10-11 12.5C9.2 25 5 20.6 5 15V6.6L16 2.5Z"
        fill="currentColor"
        className="text-trust"
      />
      <rect x="10" y="13.2" width="12" height="7.2" rx="1.6" fill="white" />
      <path d="M11.2 13.4 13.1 11h5.8l1.9 2.4" stroke="#0F172A" strokeWidth="1.3" fill="none" />
      <circle cx="13.1" cy="20.6" r="1.15" fill="#F59E0B" />
      <circle cx="18.9" cy="20.6" r="1.15" fill="#F59E0B" />
    </svg>
  );
}

export function Logo({ tone = "light", href = "/" }: { tone?: "light" | "dark"; href?: string }) {
  const light = tone === "light";
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className={cn("block font-display text-[15px] font-bold tracking-tight", light ? "text-white" : "text-ink")}>
          VidyaSafar
        </span>
        <span className={cn("mt-1 block font-hindi text-[12px] font-semibold", light ? "text-sky-200" : "text-trust")}>
          विद्यासफ़र
        </span>
      </span>
    </Link>
  );
}
