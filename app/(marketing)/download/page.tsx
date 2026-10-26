import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { DownloadHub } from "@/components/modules/marketing/download-hub";

export const metadata: Metadata = {
  title: "Download",
  description: "Download the VidyaSafar parent app, driver app, or open the school command console.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="Download hub"
        title="Three surfaces. One morning."
        lede="Parents and drivers live on the phone. The school lives in the browser. Pick the one in your hand — on a desktop, the code is there to scan."
      />
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Suspense fallback={<div className="h-96 rounded-3xl bg-white" />}>
          <DownloadHub />
        </Suspense>
      </section>
    </>
  );
}
