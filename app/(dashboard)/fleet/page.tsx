import type { Metadata } from "next";
import { FleetRegistry } from "@/components/modules/dashboard/fleet-registry";

export const metadata: Metadata = { title: "Fleet" };

export default function FleetPage() {
  return <FleetRegistry />;
}
