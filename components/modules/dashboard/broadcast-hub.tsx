"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useConsole } from "@/components/modules/dashboard/console-context";
import { Modal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/input";
import { broadcastTemplates } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

const channels = ["whatsapp", "push", "sms"] as const;

export function BroadcastHub() {
  const { routes, students, drivers, broadcasts, sendBroadcast } = useConsole();
  const [title, setTitle] = useState(broadcastTemplates[0].title);
  const [body, setBody] = useState(broadcastTemplates[0].body);
  const [audience, setAudience] = useState("all-parents");
  const [selected, setSelected] = useState<Array<(typeof channels)[number]>>([...channels]);
  const [open, setOpen] = useState(false);

  const audienceLabel = useMemo(() => {
    if (audience === "all-parents") return "All parents";
    if (audience === "crew") return "Drivers and attendants";
    const route = routes.find((item) => item.id === audience);
    return route ? `Route ${route.code} · ${route.name}` : "Selected audience";
  }, [audience, routes]);

  const recipients = useMemo(() => {
    if (audience === "crew") return drivers.length;
    if (audience === "all-parents") return students.length;
    const route = routes.find((item) => item.id === audience);
    if (!route) return 0;
    const stopNames = new Set(route.stops.map((stop) => stop.name));
    return students.filter((student) => stopNames.has(student.stopName)).length;
  }, [audience, drivers.length, routes, students]);

  function toggle(channel: (typeof channels)[number]) {
    setSelected((prev) => (prev.includes(channel) ? prev.filter((item) => item !== channel) : [...prev, channel]));
  }

  return (
    <div>
      <PageHeader
        title="Emergency broadcast"
        description="Templates for the three messages a transport desk actually sends. Dispatch reaches WhatsApp, push, and SMS together."
      />
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-2">
          {broadcastTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                setTitle(template.title);
                setBody(template.body);
                setAudience(template.audience.startsWith("route:") ? template.audience.slice(6) : template.audience);
              }}
              className={cn(
                "w-full rounded-2xl border bg-white p-4 text-left",
                title === template.title ? "border-trust" : "border-slate-200",
              )}
            >
              <p className="font-semibold">{template.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{template.body}</p>
            </button>
          ))}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recent dispatches</p>
            <ul className="mt-3 space-y-3">
              {broadcasts.map((item) => (
                <li key={item.id} className="text-sm">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {item.recipients} · {item.channels.join(", ")} · {item.audience}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <label className="block text-sm font-medium">
            Headline
            <input className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm" value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Message
            <TextArea className="mt-1.5" rows={5} value={body} onChange={(event) => setBody(event.target.value)} />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Audience
            <select className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm" value={audience} onChange={(event) => setAudience(event.target.value)}>
              <option value="all-parents">All parents</option>
              <option value="crew">Drivers and attendants</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.code} · {route.name}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {channels.map((channel) => (
              <button
                key={channel}
                type="button"
                onClick={() => toggle(channel)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-semibold uppercase",
                  selected.includes(channel) ? "border-trust bg-sky-50 text-trust" : "border-slate-200 text-slate-500",
                )}
              >
                {channel}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            {recipients} {audience === "crew" ? "crew" : "families"} on {audienceLabel}.
          </p>
          <Button className="mt-4" disabled={!title.trim() || !body.trim() || selected.length === 0 || recipients === 0} onClick={() => setOpen(true)}>
            Review dispatch
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Send this notice?"
        description={`${audienceLabel} · ${recipients} recipients · ${selected.join(", ") || "no channel"}`}
      >
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="surface" onClick={() => setOpen(false)}>
            Hold
          </Button>
          <Button
            onClick={() => {
              sendBroadcast({ title, body, channels: selected, audience: audienceLabel, recipients });
              setOpen(false);
            }}
          >
            Dispatch
          </Button>
        </div>
      </Modal>
    </div>
  );
}
