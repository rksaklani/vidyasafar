import type { Metadata } from "next";
import { RouteSequencer } from "@/components/modules/dashboard/route-sequencer";

export const metadata: Metadata = { title: "Routes" };

export default function RoutesPage() {
  return <RouteSequencer />;
}
