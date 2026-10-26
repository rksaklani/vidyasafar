"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="font-medium text-ink">{item.q}</span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-500 transition", expanded && "rotate-180")} />
            </button>
            {expanded ? <p className="px-5 pb-4 text-sm leading-6 text-slate-600">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
