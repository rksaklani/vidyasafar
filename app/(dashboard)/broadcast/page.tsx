import type { Metadata } from "next";
import { BroadcastHub } from "@/components/modules/dashboard/broadcast-hub";

export const metadata: Metadata = { title: "Broadcast" };

export default function BroadcastPage() {
  return <BroadcastHub />;
}
