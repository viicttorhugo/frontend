
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { loginGoogle, onUser, logout, idToken } from "./firebase";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8000";

async function api(path, opts = {}) {
  const token = await idToken();
  if (!token) throw new Error("Sem ID token");
  const headers = { ...(opts.headers||{}), Authorization: `Bearer ${token}` };
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (!res.ok) throw new Error(await res.text());
  const ct = res.headers.get("content-type")||"";
  if (ct.includes("application/json")) return await res.json();
  return await res.text();
}

function Login() {
  return (
    <>
      <div className="bg" />
      <div className="card">
        <h1>FacilitaMed</h1>
        <p>Entre com sua conta Google autorizada.</p>
        <button onClick={loginGoogle}>Entrar com Google</button>
      </div>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [out, setOut] = useState("");

  useEffect(() => onUser(async (u) => {
    setUser(u);
    if (u) { try { setStatus(await api("/me/status")); } catch(e) { setStatus(null); } }
    else { setStatus(null); }
  }), []);

  // Stripe verify-session flow
  useEffect(() => { (async () => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;
    try {
      await api("/billing/verify-session", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ session_id: sessionId })
      });
      const st = await api("/me/status"); setStatus(st);
    } catch(e){ console.error(e); }
    finally{
      const url = new URL(window.location.href); url.search = ""; history.replaceState({}, "", url.toString());
    }
  })(); }, [user]);

  if (!user) return <Login />;
  if (!status) return <div className="card">Carregando…</div>;

  const startCheckout = async () => {
    const data = await api("/billing/create-checkout-session", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        success_url: window.location.origin + "/?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: window.location.origin + "/?canceled=1"
      })
    });
    if (data.url) window.location.href = data.url;
  };

  const testIA = async () => {
    const r = await api("/api/ia/diagnostico", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ nome:user.displayName || "Paciente", cpf:"000", hda:"Cefaleia" })
    });
    setOut(r.text);
  };

  return (
    <div>
      <div className="header">
        <b>FacilitaMed</b>
        <span>{user?.email}</span>
        <button className="ghost" onClick={logout}>Sair</button>
      </div>
      <div className="container">
        {!status.active ? (
          <div className="card" style={{maxWidth:600}}>
            <h2>Assinatura necessária</h2>
            <p>Conclua o pagamento para liberar a plataforma.</p>
            <button onClick={startCheckout}>Assinar agora</button>
          </div>
        ) : (
          <div className="card" style={{maxWidth:900}}>
            <h2>Bem-vindo!</h2>
            <p>Status: ativo</p>
            <button onClick={testIA}>Testar IA (Diagnóstico)</button>
            <pre style={{marginTop:12}}>{out}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
