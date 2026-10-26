export const DEMO_TODAY = "2026-10-26";

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return phone;
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function formatRegistration(registration: string) {
  const match = registration.match(/^([A-Z]{2})(\d{2})([A-Z]{1,3})(\d{4})$/);
  if (!match) return registration;
  return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
}

export function formatClock(hhmm: string) {
  const [hourPart, minutePart] = hhmm.split(":");
  const hour = Number(hourPart);
  const minute = Number(minutePart);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return hhmm;
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelve = hour % 12 || 12;
  return `${String(twelve).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function formatLongDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function daysUntil(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const [todayYear, todayMonth, todayDay] = DEMO_TODAY.split("-").map(Number);
  const target = Date.UTC(year, month - 1, day);
  const today = Date.UTC(todayYear, todayMonth - 1, todayDay);
  return Math.round((target - today) / 86_400_000);
}

export function expiryLabel(iso: string) {
  const days = daysUntil(iso);
  if (days < 0) return { tone: "danger" as const, label: `Expired ${Math.abs(days)}d ago` };
  if (days === 0) return { tone: "danger" as const, label: "Expires today" };
  if (days <= 45) return { tone: "warning" as const, label: `Expires in ${days}d` };
  return { tone: "ok" as const, label: `Valid · ${formatLongDate(iso)}` };
}

export function statusLabel(status: string) {
  switch (status) {
    case "on-time":
      return "On time";
    case "delayed":
      return "Delayed";
    case "stopped":
      return "Stopped";
    case "sos":
      return "SOS";
    case "boarded":
      return "Boarded";
    case "pending":
      return "Awaiting";
    case "absent":
      return "Absent";
    case "arrived":
      return "At campus";
    case "paid":
      return "Paid";
    case "overdue":
      return "Overdue";
    default:
      return status;
  }
}

export function roleLabel(role: string) {
  switch (role) {
    case "parent":
      return "Parent";
    case "driver":
      return "Driver";
    case "school-admin":
      return "School admin";
    case "operator":
      return "Fleet operator";
    case "principal":
      return "Principal";
    default:
      return role;
  }
}
