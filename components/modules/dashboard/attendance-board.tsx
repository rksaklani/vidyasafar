"use client";

import { useMemo, useState } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { DataTable } from "@/components/ui/data-table";
import { StatusPill } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { formatClock, formatPhone } from "@/lib/format";
import type { Student } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

export function AttendanceBoard() {
  const { students, buses, setStudentStatus } = useConsole();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [busId, setBusId] = useState("all");

  const boarded = students.filter((student) => student.status === "boarded" || student.status === "arrived").length;
  const absent = students.filter((student) => student.status === "absent").length;
  const transit = students.filter((student) => student.status === "boarded").length;

  const filtered = students.filter((student) => {
    const bus = buses.find((item) => item.id === student.busId);
    const haystack = `${student.name} ${student.parentName} ${student.stopName} ${student.grade}`.toLowerCase();
    if (query && !haystack.includes(query.toLowerCase())) return false;
    if (status === "boarded-morning" && student.status !== "boarded" && student.status !== "arrived") return false;
    if (status !== "all" && status !== "boarded-morning" && student.status !== status) return false;
    if (busId !== "all" && student.busId !== busId) return false;
    return Boolean(bus || student.busId);
  });

  const columns = useMemo<LegacyColumnDef<Student>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Student",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-slate-500">{row.original.grade} · {row.original.admissionNo}</p>
          </div>
        ),
      },
      { accessorKey: "stopName", header: "Stop" },
      {
        id: "bus",
        header: "Bus",
        accessorFn: (row) => buses.find((bus) => bus.id === row.busId)?.busNumber ?? "",
        cell: ({ row }) => `Bus ${buses.find((bus) => bus.id === row.original.busId)?.busNumber ?? "—"}`,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusPill status={row.original.status} label={row.original.status === "absent" ? "Absent · parent" : undefined} />,
      },
      {
        accessorKey: "boardingTime",
        header: "Boarded",
        cell: ({ row }) => (row.original.boardingTime ? formatClock(row.original.boardingTime) : "—"),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            {row.original.status !== "boarded" && row.original.status !== "arrived" ? (
              <Button size="sm" onClick={() => setStudentStatus(row.original.id, "boarded")}>
                Board
              </Button>
            ) : null}
            {row.original.status !== "absent" ? (
              <Button size="sm" variant="surface" onClick={() => setStudentStatus(row.original.id, "absent")}>
                Absent
              </Button>
            ) : null}
          </div>
        ),
      },
    ],
    [buses, setStudentStatus],
  );

  const cards = [
    ["all", "Total registered", students.length],
    ["boarded-morning", "Boarded this morning", boarded],
    ["absent", "Marked absent by parent", absent],
    ["boarded", "In transit", transit],
  ] as const;

  return (
    <div>
      <PageHeader
        title="Morning register"
        description="26 Oct 2026 · Boarded, parent-absent, and still en route. A tap here is the same check-in the driver app posts."
        actions={
          <Button
            onClick={() => {
              const next = students.find((student) => student.status === "pending");
              if (next) void setStudentStatus(next.id, "boarded");
            }}
          >
            Simulate next boarding
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([key, label, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatus(key)}
            className={cn(
              "rounded-2xl border bg-white p-4 text-left",
              status === key ? "border-trust ring-2 ring-trust/20" : "border-slate-200",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search student, parent, or stop" className="sm:max-w-xs" />
        <Select value={busId} onChange={(event) => setBusId(event.target.value)} className="sm:max-w-[12rem]">
          <option value="all">All buses</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              Bus {bus.busNumber}
            </option>
          ))}
        </Select>
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <DataTable
          key={`${status}-${busId}-${query}`}
          data={filtered}
          columns={columns}
          renderCard={(student) => (
            <article className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.grade} · {student.stopName} · Bus {buses.find((bus) => bus.id === student.busId)?.busNumber}</p>
                  <p className="mt-1 text-xs text-slate-500">{student.parentName} · {formatPhone(student.parentPhone)}</p>
                </div>
                <StatusPill status={student.status} />
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => setStudentStatus(student.id, "boarded")}>Board</Button>
                <Button size="sm" variant="surface" onClick={() => setStudentStatus(student.id, "absent")}>Absent</Button>
              </div>
            </article>
          )}
        />
      </div>
    </div>
  );
}
