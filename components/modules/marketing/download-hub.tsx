"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import { QRCodeSVG } from "qrcode.react";
import { Monitor, Smartphone } from "lucide-react";
import { PhoneMockup } from "@/components/modules/marketing/phone-mockup";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const DOWNLOAD_URL = "https://vidyasafar.in/download";

type Device = "ios" | "android" | "desktop";

export function DownloadHub() {
  const params = useSearchParams();
  const requested = params.get("audience");
  const welcome = params.get("welcome") === "1";
  const initial = requested === "driver" ? "driver" : requested === "console" ? "console" : "parent";
  const [tab, setTab] = useState(initial);
  const [device, setDevice] = useState<Device>("desktop");
  const toast = useToast();

  useEffect(() => {
    const agent = navigator.userAgent;
    if (/android/i.test(agent)) setDevice("android");
    else if (/iPad|iPhone|iPod/.test(agent)) setDevice("ios");
    else setDevice("desktop");
  }, []);

  useEffect(() => {
    setTab(initial);
  }, [initial]);

  return (
    <div>
      {welcome ? (
        <p className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          You are signed in. The live trip and the one-tap register live in the mobile apps. This browser stays with the school console.
        </p>
      ) : null}
      <p className="mb-4 text-sm text-slate-600">
        This device looks like <span className="font-semibold text-ink">{device === "ios" ? "iPhone or iPad" : device === "android" ? "Android" : "a desktop"}</span>.
        {device === "desktop" ? " Scan the code with the phone that should run the app." : " The matching store button is highlighted."}
      </p>
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List className="grid gap-2 rounded-2xl bg-slate-100 p-1 sm:grid-cols-3" aria-label="Apps">
          <Tab value="parent">Parent app</Tab>
          <Tab value="driver">Driver app</Tab>
          <Tab value="console">School console</Tab>
        </Tabs.List>
        <Tabs.Content value="parent" className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-display text-3xl font-semibold">VidyaSafar Parent</h2>
            <p className="mt-3 max-w-xl text-slate-600">
              The 1 km approach, the boarding confirmation, the live bus, and the fee — on the phone the family already has. No tracker to buy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StoreBadge store="apple" highlighted={device === "ios"} />
              <StoreBadge store="google" highlighted={device === "android"} />
            </div>
            {device === "desktop" ? (
              <div className="mt-6 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                <QRCodeSVG value={`${DOWNLOAD_URL}?audience=parent`} size={112} />
                <div>
                  <p className="text-sm font-semibold">Scan to install</p>
                  <p className="mt-1 max-w-[14rem] text-xs leading-5 text-slate-500">Opens the parent download on the phone camera.</p>
                </div>
              </div>
            ) : null}
          </div>
          <PhoneMockup compact />
        </Tabs.Content>
        <Tabs.Content value="driver" className="mt-6 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold">VidyaSafar Driver</h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Android first. The attendant sees the stop list and confirms a child with one tap. The panic control is always on the same screen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StoreBadge store="google" highlighted={device === "android" || device === "desktop"} />
              <button
                type="button"
                onClick={() =>
                  toast("The signed driver APK is issued by the operator desk during pilot week. This demo does not sideload a package.")
                }
                className={cn(
                  "inline-flex h-14 min-w-44 flex-col justify-center rounded-xl border px-4 text-left",
                  device === "android" ? "border-trust bg-sky-50" : "border-slate-200 bg-white",
                )}
              >
                <span className="text-[10px] uppercase tracking-wide text-slate-500">Direct install</span>
                <span className="text-sm font-semibold text-ink">Android APK</span>
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">Production APKs are signed for the school&apos;s operator desk. The button confirms the handoff instead of shipping an unsigned file.</p>
          </div>
          <BoardingShowcase />
        </Tabs.Content>
        <Tabs.Content value="console" className="mt-6 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-trust">
              <Monitor className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">Browser</p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold">School Command Console</h2>
            <p className="mt-3 text-slate-600">
              The morning map, the register, routes, vendors, and the fee ledger. It runs in the browser the front desk already uses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/login">Sign in to the console</Button>
              <Button href="/pilot?intent=demo" variant="surface">
                Schedule a 15-minute demo
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-ink p-5 text-white">
            <p className="text-xs uppercase tracking-[0.16em] text-sky-300">On the call</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              <li>Live fleet, including a contracted vendor bus.</li>
              <li>How a parent absence lands on the register before the stop.</li>
              <li>What the desk stops doing once boarding is verified.</li>
            </ul>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function Tab({ value, children }: { value: string; children: string }) {
  return (
    <Tabs.Trigger
      value={value}
      className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm"
    >
      {children}
    </Tabs.Trigger>
  );
}

function StoreBadge({ store, highlighted }: { store: "apple" | "google"; highlighted: boolean }) {
  const apple = store === "apple";
  return (
    <a
      href={apple ? "https://apps.apple.com" : "https://play.google.com/store"}
      className={cn(
        "inline-flex h-14 min-w-48 items-center gap-3 rounded-xl border bg-ink px-4 text-white",
        highlighted ? "ring-2 ring-trust ring-offset-2" : "border-ink",
      )}
    >
      <Smartphone className="h-5 w-5 text-sky-300" />
      <span>
        <span className="block text-[10px] uppercase tracking-wide text-slate-400">{apple ? "Download on the" : "Get it on"}</span>
        <span className="block text-sm font-semibold">{apple ? "App Store" : "Google Play"}</span>
      </span>
    </a>
  );
}

function BoardingShowcase() {
  const rows = [
    ["Arnav Mehta", "4-A", "Boarded"],
    ["Ananya Iyer", "7-B", "Boarded"],
    ["Myra Kapoor", "9-A", "Tap to board"],
  ];
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-3 text-white">
      <div className="rounded-[1.4rem] bg-[#111827] p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-amber-300">Stop · AECS Layout</p>
        <p className="mt-1 font-display text-xl font-semibold">Bus 12 check-in</p>
        <ul className="mt-4 space-y-2">
          {rows.map(([name, grade, action]) => (
            <li key={name} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-3">
              <span>
                <span className="block text-sm font-semibold">{name}</span>
                <span className="text-xs text-slate-400">{grade}</span>
              </span>
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", action === "Boarded" ? "bg-emerald-500/20 text-emerald-300" : "bg-bus text-ink")}>
                {action}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
