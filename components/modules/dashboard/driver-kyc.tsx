"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { StatusPill } from "@/components/ui/badge";
import { daysUntil, expiryLabel, formatPhone } from "@/lib/format";

export function DriverKyc() {
  const { drivers, buses } = useConsole();
  const alerts = drivers.filter((driver) => daysUntil(driver.licenseExpiry) <= 45 || driver.policeVerification !== "verified");

  return (
    <div>
      <PageHeader
        title="Drivers and attendants"
        description="Licence, attendant badge, and police verification for the crew on this morning's buses."
      />
      {alerts.length > 0 ? (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {alerts.length} record{alerts.length === 1 ? "" : "s"} need a look before the next fitness week: an expiry inside 45 days, or verification that is not clear.
        </div>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {drivers.map((driver) => {
          const bus = buses.find((item) => item.id === driver.busId);
          const document = expiryLabel(driver.licenseExpiry);
          return (
            <article key={driver.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                    {driver.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <h2 className="font-semibold">{driver.name}</h2>
                    <p className="text-xs capitalize text-slate-500">{driver.role} · Bus {bus?.busNumber ?? "—"}</p>
                  </div>
                </div>
                <StatusPill status={driver.policeVerification} />
              </div>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">{driver.role === "driver" ? "Driving licence" : "Attendant badge"}</dt>
                  <dd className="text-right">{driver.licenseNumber}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Phone</dt>
                  <dd><a className="text-trust" href={`tel:+91${driver.phone}`}>{formatPhone(driver.phone)}</a></dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Document</dt>
                  <dd className={document.tone === "danger" ? "font-semibold text-rose-700" : document.tone === "warning" ? "font-semibold text-amber-800" : ""}>
                    {document.label}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
