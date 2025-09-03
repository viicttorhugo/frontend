import { getAuth } from "firebase/auth";

const BASE = import.meta.env.VITE_API_BASE;

export async function api(path: string, options: RequestInit = {}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken(true) : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const text = await res.text();
  if (!res.ok) throw new Error(`API ${res.status}: ${text}`);
  try { return JSON.parse(text); } catch { return text; }
}
