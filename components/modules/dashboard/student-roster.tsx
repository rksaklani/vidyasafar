"use client";

import { useMemo, useState } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { DataTable } from "@/components/ui/data-table";
import { StatusPill } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { SAMPLE_STUDENT_CSV, parseStudentCsv } from "@/lib/data/csv";
import { formatInr, formatPhone } from "@/lib/format";
import { buses as allBuses, type Student } from "@/lib/data/mock-data";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function StudentRoster() {
  const { schoolId, school, students, buses, importStudents } = useConsole();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [busId, setBusId] = useState("all");
  const [stopName, setStopName] = useState("all");
  const [errors, setErrors] = useState<string[]>([]);

  const filtered = students.filter((student) => {
    const haystack = `${student.name} ${student.parentName} ${student.admissionNo} ${student.stopName}`.toLowerCase();
    if (query && !haystack.includes(query.toLowerCase())) return false;
    if (busId !== "all" && student.busId !== busId) return false;
    if (stopName !== "all" && student.stopName !== stopName) return false;
    return true;
  });

  const stops = [...new Set(students.map((student) => student.stopName))];
  const columns = useMemo<LegacyColumnDef<Student>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Student",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.admissionNo} · {row.original.grade}</p>
          </div>
        ),
      },
      {
        accessorKey: "parentName",
        header: "Parent",
        cell: ({ row }) => (
          <div>
            <p>{row.original.parentName}</p>
            <p className="text-xs text-slate-500">{formatPhone(row.original.parentPhone)}</p>
          </div>
        ),
      },
      { accessorKey: "stopName", header: "Stop" },
      {
        id: "bus",
        header: "Bus",
        accessorFn: (row) => buses.find((bus) => bus.id === row.busId)?.busNumber ?? "",
        cell: ({ row }) => buses.find((bus) => bus.id === row.original.busId)?.busNumber ?? "—",
      },
      { accessorKey: "feeStatus", header: "Fee", cell: ({ row }) => <StatusPill status={row.original.feeStatus} /> },
      { accessorKey: "feeAmount", header: "October", cell: ({ row }) => formatInr(row.original.feeAmount) },
    ],
    [buses],
  );

  return (
    <div>
      <PageHeader
        title="Student roster"
        description={`${students.length} students in this console view of ${school.name}. The published roll is ${school.totalStudents.toLocaleString("en-IN")}.`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="surface"
              onClick={() => {
                const blob = new Blob([SAMPLE_STUDENT_CSV], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "vidyasafar-students-sample.csv";
                link.click();
                URL.revokeObjectURL(url);
              }}
            >
              Sample CSV
            </Button>
            <label className="inline-flex h-11 cursor-pointer items-center rounded-full bg-trust px-5 text-sm font-semibold text-white">
              Import CSV
              <input
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  const parsed = parseStudentCsv(await file.text(), schoolId, allBuses);
                  setErrors(parsed.errors);
                  if (parsed.rows.length) importStudents(parsed.rows);
                  else toast(parsed.errors[0] ?? "No students imported.");
                }}
              />
            </label>
          </div>
        }
      />
      {errors.length > 0 ? (
        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}
      <div className="mb-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-center text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-3 text-left">Stop</th>
              {buses.map((bus) => (
                <th key={bus.id} className="px-3 py-3">Bus {bus.busNumber}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stops.map((stop) => (
              <tr key={stop} className="border-t border-slate-100">
                <td className="px-3 py-2 text-left font-medium">{stop}</td>
                {buses.map((bus) => {
                  const count = students.filter((student) => student.stopName === stop && student.busId === bus.id).length;
                  const active = busId === bus.id && stopName === stop;
                  return (
                    <td key={bus.id} className="px-2 py-2">
                      <button
                        type="button"
                        disabled={count === 0}
                        onClick={() => {
                          setBusId(bus.id);
                          setStopName(stop);
                        }}
                        className={cn(
                          "h-8 min-w-8 rounded-lg text-xs font-semibold",
                          count === 0 && "text-slate-300",
                          count > 0 && "bg-sky-50 text-trust",
                          active && "bg-trust text-white",
                        )}
                      >
                        {count || "·"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, parent, admission no." className="sm:max-w-sm" />
        <Select value={busId} onChange={(event) => setBusId(event.target.value)} className="sm:max-w-[12rem]">
          <option value="all">All buses</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>Bus {bus.busNumber}</option>
          ))}
        </Select>
        {stopName !== "all" ? (
          <Button variant="surface" onClick={() => { setStopName("all"); setBusId("all"); }}>
            Clear stop filter
          </Button>
        ) : null}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <DataTable
          data={filtered}
          columns={columns}
          renderCard={(student) => (
            <article className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.grade} · {student.stopName} · Bus {buses.find((bus) => bus.id === student.busId)?.busNumber}</p>
                </div>
                <StatusPill status={student.feeStatus} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{student.parentName} · {formatPhone(student.parentPhone)}</p>
              <p className="mt-1 text-sm font-medium">{formatInr(student.feeAmount)}</p>
            </article>
          )}
        />
      </div>
    </div>
  );
}
