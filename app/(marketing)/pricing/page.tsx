import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { RoiCalculator } from "@/components/modules/marketing/roi-calculator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Estimate front-desk hours, digital fee adoption, and fuel savings for a school fleet.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet economics"
        title="What the morning is costing the front desk."
        lede="Move the sliders for buses and students. The figures are a planning model for a pilot conversation, not a quote."
      >
        <Button href="/pilot" variant="outline">
          Take the numbers into a pilot application
        </Button>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <RoiCalculator />
      </section>
    </>
  );
}
