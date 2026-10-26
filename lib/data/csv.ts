import type { Bus, Student } from "@/lib/data/mock-data";

export const SAMPLE_STUDENT_CSV = `name,grade,parentName,parentPhone,stopName,busNumber
Riya Sen,6-B,Amit Sen,9810098100,Brookefield,12
Advik Rao,3-A,Sneha Rao,9810098101,AECS Layout,12
`;

export type CsvImportResult = {
  rows: Student[];
  errors: string[];
};

export function parseStudentCsv(text: string, schoolId: string, fleet: Bus[]): CsvImportResult {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const errors: string[] = [];
  const rows: Student[] = [];
  if (lines.length < 2) {
    return { rows, errors: ["The file needs a header and at least one student."] };
  }

  const header = lines[0].toLowerCase().split(",").map((cell) => cell.trim());
  const indexOf = (name: string) => header.indexOf(name);
  const required = ["name", "grade", "parentname", "parentphone", "stopname", "busnumber"];
  if (required.some((column) => indexOf(column) === -1)) {
    return {
      rows,
      errors: ["Use the columns name, grade, parentName, parentPhone, stopName, busNumber."],
    };
  }

  lines.slice(1).forEach((line, lineIndex) => {
    const cells = line.split(",").map((cell) => cell.trim());
    const name = cells[indexOf("name")] ?? "";
    const grade = cells[indexOf("grade")] ?? "";
    const parentName = cells[indexOf("parentname")] ?? "";
    const parentPhone = (cells[indexOf("parentphone")] ?? "").replace(/\D/g, "").slice(-10);
    const stopName = cells[indexOf("stopname")] ?? "";
    const busNumber = cells[indexOf("busnumber")] ?? "";
    const bus = fleet.find((item) => item.busNumber === busNumber && item.schoolId === schoolId);
    const rowNumber = lineIndex + 2;
    if (!name || !grade || !parentName || !stopName) {
      errors.push(`Row ${rowNumber} is missing a name, grade, parent, or stop.`);
      return;
    }
    if (!/^[6-9]\d{9}$/.test(parentPhone)) {
      errors.push(`Row ${rowNumber} needs a 10-digit mobile number.`);
      return;
    }
    if (!bus) {
      errors.push(`Row ${rowNumber} refers to bus ${busNumber || "—"}, which is not in this fleet.`);
      return;
    }
    rows.push({
      id: `stu_import_${schoolId}_${lineIndex}_${name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 8)}`,
      schoolId,
      name,
      grade,
      parentName,
      parentPhone,
      stopName,
      busId: bus.id,
      status: "pending",
      feeStatus: "pending",
      feeAmount: 2800,
      admissionNo: `IMP-${String(8000 + lineIndex)}`,
    });
  });

  return { rows, errors };
}
