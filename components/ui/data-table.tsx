"use client";

import { useState } from "react";
import {
  flexRender,
  type OnChangeFn,
  type SortingState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useLegacyTable,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy";
import type { RowData } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function DataTable<T extends RowData>({
  columns,
  data,
  pageSize = 8,
  renderCard,
  empty = "Nothing matches this view.",
}: {
  columns: LegacyColumnDef<T>[];
  data: T[];
  pageSize?: number;
  renderCard?: (row: T) => ReactNode;
  empty?: string;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useLegacyTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize, pageIndex: 0 } },
  });

  const rows = table.getRowModel().rows;

  return (
    <div>
      {renderCard ? (
        <div className="grid gap-3 md:hidden">
          {rows.length === 0 ? <p className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">{empty}</p> : null}
          {rows.map((row) => (
            <div key={row.id}>{renderCard(row.original)}</div>
          ))}
        </div>
      ) : null}
      <div className={renderCard ? "hidden overflow-x-auto md:block" : "overflow-x-auto"}>
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th key={header.id} className="border-b border-slate-200 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 hover:text-ink"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-[10px] text-slate-400">{sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : ""}</span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-10 text-center text-slate-500">
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="align-top">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border-b border-slate-100 px-3 py-3 text-ink">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-500">
        <p>
          {data.length === 0 ? "0 rows" : `${table.getState().pagination.pageIndex * pageSize + 1}–${Math.min(data.length, (table.getState().pagination.pageIndex + 1) * pageSize)} of ${data.length}`}
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="surface" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            {table.getPageCount() === 0 ? 1 : table.getState().pagination.pageIndex + 1} / {Math.max(table.getPageCount(), 1)}
          </span>
          <Button size="sm" variant="surface" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
