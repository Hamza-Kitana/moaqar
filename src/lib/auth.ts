import { redirect } from "@tanstack/react-router";

const KEY = "mwq.state.v12";

type StoredState = {
  sessionId: string | null;
  accounts: { id: string; kind: "super" | "employee"; active: boolean }[];
};

export function getSessionAccount() {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      window.localStorage.getItem(KEY) ??
      window.localStorage.getItem("mwq.state.v11") ??
      window.localStorage.getItem("mwq.state.v10");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredState;
    return parsed.accounts.find((a) => a.id === parsed.sessionId && a.active) ?? null;
  } catch {
    return null;
  }
}

export function requireLogin(redirectTo = "/login") {
  if (!getSessionAccount()) throw redirect({ to: redirectTo });
}

export function requireStaff() {
  if (!getSessionAccount()) throw redirect({ to: "/login" });
}
