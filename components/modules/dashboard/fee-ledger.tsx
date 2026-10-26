"use client";

import { useMemo, useState } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { DataTable } from "@/components/ui/data-table";
import { StatusPill } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/format";
import type { Student } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

export function FeeLedger() {
  const { students, markFeePaid } = useConsole();
  const [filter, setFilter] = useState<"all" | Student["feeStatus"]>("all");
  const rows = students.filter((student) => filter === "all" || student.feeStatus === filter);
  const sum = (status?: Student["feeStatus"]) =>
    students.filter((student) => !status || student.feeStatus === status).reduce((total, student) => total + student.feeAmount, 0);

  const columns = useMemo<LegacyColumnDef<Student>[]>(
    () => [
      { accessorKey: "name", header: "Student", cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
      { accessorKey: "grade", header: "Grade" },
      { accessorKey: "feeAmount", header: "October", cell: ({ row }) => formatInr(row.original.feeAmount) },
      { accessorKey: "feeStatus", header: "Status", cell: ({ row }) => <StatusPill status={row.original.feeStatus} /> },
      {
        id: "action",
        header: "",
        enableSorting: false,
        cell: ({ row }) =>
          row.original.feeStatus === "paid" ? (
            <span className="text-xs text-slate-400">Receipt matched</span>
          ) : (
            <Button size="sm" onClick={() => markFeePaid(row.original.id)}>
              Mark received
            </Button>
          ),
      },
    ],
    [markFeePaid],
  );

  return (
    <div>
      <PageHeader
        title="Transport fee ledger"
        description="October 2026 cycle for the students loaded in this console. Marking a fee received updates the roster for this session."
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Summary label="Collected" value={formatInr(sum("paid"))} tone="text-emerald-700" />
        <Summary label="Pending" value={formatInr(sum("pending"))} tone="text-amber-800" />
        <Summary label="Overdue" value={formatInr(sum("overdue"))} tone="text-rose-700" />
      </div>
      <div className="mb-4 flex gap-2">
        {(["all", "paid", "pending", "overdue"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold capitalize",
              filter === key ? "border-ink bg-ink text-white" : "border-slate-200 bg-white",
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <DataTable
          data={rows}
          columns={columns}
          renderCard={(student) => (
            <article className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.grade} · {formatInr(student.feeAmount)}</p>
                </div>
                <StatusPill status={student.feeStatus} />
              </div>
              {student.feeStatus !== "paid" ? (
                <Button className="mt-3" size="sm" onClick={() => markFeePaid(student.id)}>
                  Mark received
                </Button>
              ) : null}
            </article>
          )}
        />
      </div>
    </div>
  );
}

function Summary({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cn("mt-2 font-display text-2xl font-semibold", tone)}>{value}</p>
    </div>
  );
}
