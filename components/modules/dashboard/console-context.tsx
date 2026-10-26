"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  buses as seedBuses,
  drivers as seedDrivers,
  routes as seedRoutes,
  schools,
  seedBroadcasts,
  students as seedStudents,
  type BroadcastRecord,
  type Bus,
  type Driver,
  type Route,
  type RouteStop,
  type School,
  type Student,
} from "@/lib/data/mock-data";
import { projectFleet } from "@/lib/data/telemetry";
import { readSession, type SessionUser } from "@/lib/session";
import { useToast } from "@/components/ui/toast";

export const permissionKeys = [
  ["map", "View live fleet"],
  ["routes", "Edit routes"],
  ["attendance", "Mark attendance"],
  ["students", "Import students"],
  ["fees", "Collect fees"],
  ["broadcast", "Send broadcasts"],
  ["drivers", "Manage KYC"],
  ["settings", "Change settings"],
] as const;

const roles = ["Principal", "Transport Manager", "Front Desk", "Accountant", "Auditor"] as const;
export const permissionRoles = roles;

type PermissionMap = Record<(typeof roles)[number], Record<(typeof permissionKeys)[number][0], boolean>>;

function blank(value: boolean) {
  return Object.fromEntries(permissionKeys.map(([key]) => [key, value])) as PermissionMap[keyof PermissionMap];
}

function initialPermissions(): PermissionMap {
  return {
    Principal: blank(true),
    "Transport Manager": { ...blank(true), settings: false },
    "Front Desk": { ...blank(false), map: true, attendance: true, students: true, broadcast: true },
    Accountant: { ...blank(false), map: true, fees: true },
    Auditor: { ...blank(false), map: true, attendance: true, fees: true, students: true },
  };
}

type ConsoleValue = {
  schoolId: string;
  setSchoolId: (id: string) => void;
  school: School;
  schools: School[];
  buses: Bus[];
  routes: Route[];
  students: Student[];
  drivers: Driver[];
  broadcasts: BroadcastRecord[];
  user: SessionUser | null;
  refreshUser: () => void;
  permissions: PermissionMap;
  togglePermission: (role: (typeof roles)[number], key: (typeof permissionKeys)[number][0]) => void;
  reorderStops: (routeId: string, orderedIds: string[]) => void;
  addStop: (routeId: string, stop: Omit<RouteStop, "id">) => void;
  removeStop: (routeId: string, stopId: string) => void;
  setStudentStatus: (id: string, status: Student["status"]) => Promise<void>;
  importStudents: (rows: Student[]) => void;
  markFeePaid: (id: string) => void;
  sendBroadcast: (input: Omit<BroadcastRecord, "id" | "sentAt" | "schoolId">) => void;
};

const ConsoleContext = createContext<ConsoleValue | null>(null);

export function ConsoleProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const [schoolId, setSchoolId] = useState(schools[0].id);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [routeState, setRouteState] = useState(seedRoutes);
  const [studentState, setStudentState] = useState(seedStudents);
  const [liveBuses, setLiveBuses] = useState(seedBuses);
  const [broadcasts, setBroadcasts] = useState(seedBroadcasts);
  const [permissions, setPermissions] = useState<PermissionMap>(initialPermissions);
  const stopSeq = useRef(1);

  useEffect(() => {
    const session = readSession();
    setUser(session);
    if (session && schools.some((school) => school.id === session.schoolId)) setSchoolId(session.schoolId);
  }, []);

  useEffect(() => {
    const tick = () => setLiveBuses(projectFleet(seedBuses, routeState, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [routeState]);

  const school = schools.find((item) => item.id === schoolId) ?? schools[0];

  const value = useMemo<ConsoleValue>(() => {
    const buses = liveBuses.filter((bus) => bus.schoolId === schoolId);
    const routes = routeState.filter((route) => route.schoolId === schoolId);
    const students = studentState.filter((student) => student.schoolId === schoolId);
    const drivers = seedDrivers.filter((driver) => driver.schoolId === schoolId);
    return {
      schoolId,
      setSchoolId,
      school,
      schools,
      buses,
      routes,
      students,
      drivers,
      broadcasts: broadcasts.filter((item) => item.schoolId === schoolId),
      user,
      refreshUser: () => setUser(readSession()),
      permissions,
      togglePermission: (role, key) =>
        setPermissions((prev) => ({ ...prev, [role]: { ...prev[role], [key]: !prev[role][key] } })),
      reorderStops: (routeId, orderedIds) =>
        setRouteState((prev) =>
          prev.map((route) => {
            if (route.id !== routeId) return route;
            const byId = new Map(route.stops.map((stop) => [stop.id, stop]));
            const stops = orderedIds.flatMap((id) => {
              const stop = byId.get(id);
              return stop ? [stop] : [];
            });
            return { ...route, stops };
          }),
        ),
      addStop: (routeId, draft) =>
        setRouteState((prev) =>
          prev.map((route) => {
            if (route.id !== routeId) return route;
            const stop: RouteStop = { ...draft, id: `stop-new-${stopSeq.current++}` };
            const stops = [...route.stops];
            const campusAt = stops.findIndex((item) => item.kind === "campus");
            stops.splice(campusAt === -1 ? stops.length : campusAt, 0, stop);
            return { ...route, stops };
          }),
        ),
      removeStop: (routeId, stopId) =>
        setRouteState((prev) =>
          prev.map((route) =>
            route.id === routeId
              ? { ...route, stops: route.stops.filter((stop) => stop.id !== stopId || stop.kind === "campus") }
              : route,
          ),
        ),
      setStudentStatus: async (id, status) => {
        const current = studentState.find((student) => student.id === id);
        const clock = new Date();
        const boardingTime = `${String(clock.getHours()).padStart(2, "0")}:${String(clock.getMinutes()).padStart(2, "0")}`;
        setStudentState((prev) =>
          prev.map((student) =>
            student.id === id
              ? {
                  ...student,
                  status,
                  boardingTime: status === "boarded" || status === "arrived" ? boardingTime : undefined,
                }
              : student,
          ),
        );
        const response = await fetch("/api/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: id,
            studentName: current?.name,
            status,
            stopName: current?.stopName,
            busNumber: buses.find((bus) => bus.id === current?.busId)?.busNumber,
          }),
        });
        const payload = (await response.json()) as { message?: string };
        toast(payload.message ?? "Attendance updated.");
      },
      importStudents: (rows) => {
        setStudentState((prev) => [...rows, ...prev]);
        toast(`Imported ${rows.length} student${rows.length === 1 ? "" : "s"} into ${school.name}.`);
      },
      markFeePaid: (id) => {
        const student = studentState.find((item) => item.id === id);
        setStudentState((prev) => prev.map((item) => (item.id === id ? { ...item, feeStatus: "paid" } : item)));
        toast(`${student?.name ?? "Fee"} marked paid for October.`);
      },
      sendBroadcast: (input) => {
        const record: BroadcastRecord = {
          ...input,
          id: `bc-${schoolId}-${broadcasts.length + 1}`,
          schoolId,
          sentAt: new Date().toISOString(),
        };
        setBroadcasts((prev) => [record, ...prev]);
        toast(`Dispatched to ${input.recipients} people on ${input.channels.join(", ")}.`);
      },
    };
  }, [broadcasts, liveBuses, permissions, routeState, school, schoolId, studentState, toast, user]);

  return <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>;
}

export function useConsole() {
  const value = useContext(ConsoleContext);
  if (!value) throw new Error("useConsole must be used inside the school console");
  return value;
}
