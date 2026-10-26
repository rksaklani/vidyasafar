"use client";

import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { PageHeader } from "@/components/layout/page-header";
import { permissionKeys, permissionRoles, useConsole } from "@/components/modules/dashboard/console-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function SettingsPanel() {
  const { school, permissions, togglePermission } = useConsole();
  const toast = useToast();
  const [name, setName] = useState(school.name);
  const [address, setAddress] = useState(school.campusAddress);
  const [grievance, setGrievance] = useState("privacy@vidyasafar.in");

  useEffect(() => {
    setName(school.name);
    setAddress(school.campusAddress);
  }, [school]);

  return (
    <div>
      <PageHeader
        title="Tenant settings"
        description="School profile and the permission grid. Changes stay in this browser session."
      />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <form
          className="rounded-2xl border border-slate-200 bg-white p-5"
          onSubmit={(event) => {
            event.preventDefault();
            toast(`Saved ${name}. The grievance desk is ${grievance}.`);
          }}
        >
          <h2 className="font-display text-lg font-semibold">School profile</h2>
          <label className="mt-4 block text-sm font-medium">
            Name
            <Input className="mt-1.5" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="mt-3 block text-sm font-medium">
            Campus
            <Input className="mt-1.5" value={address} onChange={(event) => setAddress(event.target.value)} />
          </label>
          <label className="mt-3 block text-sm font-medium">
            DPDP grievance email
            <Input className="mt-1.5" type="email" value={grievance} onChange={(event) => setGrievance(event.target.value)} />
          </label>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            {school.board} · {school.city} · {school.totalStudents.toLocaleString("en-IN")} students on the published roll.
          </p>
          <Button type="submit" className="mt-4">
            Save profile
          </Button>
        </form>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-display text-lg font-semibold">Who can do what</h2>
          <table className="mt-4 w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Permission</th>
                {permissionRoles.map((role) => (
                  <th key={role} className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionKeys.map(([key, label]) => (
                <tr key={key} className="border-t border-slate-100">
                  <td className="py-3 pr-3 font-medium">{label}</td>
                  {permissionRoles.map((role) => (
                    <td key={role} className="px-2 py-3">
                      <Switch.Root
                        checked={permissions[role][key]}
                        onCheckedChange={() => togglePermission(role, key)}
                        aria-label={`${role} ${label}`}
                        className="relative h-6 w-11 rounded-full bg-slate-200 data-[state=checked]:bg-trust"
                      >
                        <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5" />
                      </Switch.Root>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
