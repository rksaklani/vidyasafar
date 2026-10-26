import type { Metadata } from "next";
import { StudentRoster } from "@/components/modules/dashboard/student-roster";

export const metadata: Metadata = { title: "Students" };

export default function StudentsPage() {
  return <StudentRoster />;
}
