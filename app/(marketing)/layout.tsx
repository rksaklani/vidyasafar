import type { ReactNode } from "react";
import { Suspense } from "react";
import { MobileDownloadBar, SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <Suspense fallback={<div className="h-16 bg-ink" />}>
        <SiteHeader />
      </Suspense>
      <main id="main" className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <Suspense fallback={null}>
        <MobileDownloadBar />
      </Suspense>
    </div>
  );
}
