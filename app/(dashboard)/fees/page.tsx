import type { Metadata } from "next";
import { FeeLedger } from "@/components/modules/dashboard/fee-ledger";

export const metadata: Metadata = { title: "Fees" };

export default function FeesPage() {
  return <FeeLedger />;
}
