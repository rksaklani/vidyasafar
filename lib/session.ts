export type SessionRole = "parent" | "driver" | "school-admin" | "operator" | "principal";

export type SessionUser = {
  name: string;
  role: SessionRole;
  schoolId: string;
  contact: string;
};

const KEY = "vidyasafar.session";

export function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionUser;
    if (!parsed?.name || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeSession(user: SessionUser) {
  window.localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
}

export const DEMO_OTP = "482913";
