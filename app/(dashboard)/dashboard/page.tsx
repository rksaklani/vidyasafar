import type { Metadata } from "next";
import { CommandConsole } from "@/components/modules/dashboard/command-console";

export const metadata: Metadata = { title: "Fleet command" };

export default function DashboardPage() {
  return <CommandConsole />;
}
