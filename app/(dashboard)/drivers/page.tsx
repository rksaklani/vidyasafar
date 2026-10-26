import type { Metadata } from "next";
import { DriverKyc } from "@/components/modules/dashboard/driver-kyc";

export const metadata: Metadata = { title: "Drivers" };

export default function DriversPage() {
  return <DriverKyc />;
}
