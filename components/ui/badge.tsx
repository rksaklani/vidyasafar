import { cn } from "@/lib/utils";
import { statusLabel } from "@/lib/format";

const tones: Record<string, string> = {
  "on-time": "bg-emerald-50 text-emerald-800 ring-emerald-200",
  boarded: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  arrived: "bg-sky-50 text-sky-800 ring-sky-200",
  paid: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  verified: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  owned: "bg-sky-50 text-sky-800 ring-sky-200",
  delayed: "bg-amber-50 text-amber-950 ring-amber-200",
  pending: "bg-slate-100 text-slate-700 ring-slate-200",
  absent: "bg-amber-50 text-amber-950 ring-amber-200",
  stopped: "bg-rose-50 text-rose-700 ring-rose-200",
  overdue: "bg-rose-50 text-rose-700 ring-rose-200",
  expired: "bg-rose-50 text-rose-700 ring-rose-200",
  sos: "bg-rose-600 text-white ring-rose-700",
  contracted: "bg-amber-50 text-amber-950 ring-amber-200",
};

export function StatusPill({ status, label, className }: { status: string; label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[status] ?? "bg-slate-100 text-slate-700 ring-slate-200",
        className,
      )}
    >
      {label ?? statusLabel(status)}
    </span>
  );
}
