import type { Metadata } from "next";
import { AttendanceBoard } from "@/components/modules/dashboard/attendance-board";

export const metadata: Metadata = { title: "Attendance" };

export default function AttendancePage() {
  return <AttendanceBoard />;
}
