"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[min(90vh,720px)] w-[min(100%-1.5rem,34rem)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-white p-6 shadow-2xl">
          <Dialog.Title className="pr-8 font-display text-xl font-semibold text-ink">{title}</Dialog.Title>
          {description ? (
            <Dialog.Description className="mt-2 text-sm leading-6 text-slate-600">{description}</Dialog.Description>
          ) : null}
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X className="h-4 w-4" />
          </Dialog.Close>
          <div className="mt-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
