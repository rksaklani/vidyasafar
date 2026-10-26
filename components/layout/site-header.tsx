"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/parents", label: "For Parents" },
  { href: "/schools", label: "For Schools" },
  { href: "/operators", label: "For Operators" },
  { href: "/safety", label: "Safety" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/92 text-white backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Audience">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-[13px] font-medium text-slate-300 hover:bg-white/10 hover:text-white",
                pathname === link.href && "bg-white/10 text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Button href="/login" variant="ghost" size="sm">
            Sign in
          </Button>
          <Button href="/pilot" variant="outline" size="sm" className="hidden xl:inline-flex">
            Book a pilot
          </Button>
          <Button href="/download" size="sm">
            Download App
          </Button>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-xl px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">
              Sign in
            </Link>
          </nav>
          <Button href="/download" className="mt-3 w-full">
            Download App
          </Button>
        </div>
      ) : null}
    </header>
  );
}

export function MobileDownloadBar() {
  const pathname = usePathname();
  if (pathname === "/download") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 backdrop-blur lg:hidden">
      <Button href="/download" className="w-full">
        Download App
      </Button>
    </div>
  );
}
