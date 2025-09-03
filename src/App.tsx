import { useEffect, useState } from "react";
import { app } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { api } from "./lib/api";

const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState<null | { email?: string }>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setLoading(true);
      setErr("");
      if (!u) {
        setUser(null);
        setStatus(null);
        setLoading(false);
        return;
      }
      setUser({ email: u.email || "" });
      try {
        const s = await api("/me/status");
        setStatus(s);
      } catch (e: any) {
        setErr(e.message || String(e));
        setStatus(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ padding: 24, borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,.1)", width: 420 }}>
        <h2 style={{ marginTop: 0 }}>FacilitaMed</h2>

        {!user && (
          <button onClick={loginGoogle} style={{ padding: 12, width: "100%" }}>
            Entrar com Google
          </button>
        )}

        {loading && <p>Carregando…</p>}

        {err && (
          <pre style={{ whiteSpace: "pre-wrap", color: "crimson" }}>{err}</pre>
        )}

        {user && !loading && (
          <>
            <p>Logado como: <b>{user.email}</b></p>
            <pre style={{ background: "#f7f7f7", padding: 12, borderRadius: 8 }}>
{JSON.stringify(status, null, 2)}
            </pre>
            <button onClick={logout} style={{ padding: 10, width: "100%" }}>Sair</button>
          </>
        )}
      </div>
    </div>
  );
}
