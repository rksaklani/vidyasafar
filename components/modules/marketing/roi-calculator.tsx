"use client";

import { useMemo, useState } from "react";
import { calculateRoi } from "@/lib/data/roi";
import { formatInr, formatNumber } from "@/lib/format";

export function RoiCalculator() {
  const [buses, setBuses] = useState(18);
  const [students, setStudents] = useState(900);
  const result = useMemo(() => calculateRoi({ buses, students }), [buses, students]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <label className="block">
          <span className="flex items-center justify-between text-sm font-medium">
            School buses
            <span className="font-display text-2xl font-semibold text-ink">{buses}</span>
          </span>
          <input
            className="mt-3 w-full"
            type="range"
            min={5}
            max={50}
            value={buses}
            onChange={(event) => setBuses(Number(event.target.value))}
          />
          <span className="mt-1 flex justify-between text-xs text-slate-500">
            <span>5</span>
            <span>50</span>
          </span>
        </label>
        <label className="mt-8 block">
          <span className="flex items-center justify-between text-sm font-medium">
            Students on transport
            <span className="font-display text-2xl font-semibold text-ink">{formatNumber(students)}</span>
          </span>
          <input
            className="mt-3 w-full"
            type="range"
            min={200}
            max={2000}
            step={20}
            value={students}
            onChange={(event) => setStudents(Number(event.target.value))}
          />
          <span className="mt-1 flex justify-between text-xs text-slate-500">
            <span>200</span>
            <span>2,000</span>
          </span>
        </label>
        <ul className="mt-8 space-y-2 text-xs leading-5 text-slate-500">
          {result.assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="Front-desk hours saved / month" value={formatNumber(result.frontDeskHours, 0)} unit="hours" />
        <Result label="Parent calls that never happen" value={formatNumber(result.callsAvoided)} unit="calls" />
        <Result label="Digital fee adoption" value={`${result.digitalFeeAdoption}%`} unit="of families" />
        <Result label="Estimated fuel saved / month" value={formatInr(result.fuelSavingsInr)} unit={`${formatNumber(result.litresSaved, 0)} litres`} />
      </div>
    </div>
  );
}

function Result({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-3xl bg-ink p-5 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{label}</p>
      <p className="mt-4 font-serif text-4xl">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{unit}</p>
    </div>
  );
}
