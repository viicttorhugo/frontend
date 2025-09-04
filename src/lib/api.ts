import { getAuth } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") || "";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const headers = new Headers(init.headers || {});
  if (user) {
    const token = await user.getIdToken();
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const text = await res.text().catch(() => "");
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  try { return JSON.parse(text); } catch { return text; }
}
