import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function LoginPage() {
  const [status, setStatus] = useState<string>("");
  const navigate = useNavigate();

  async function doLogin() {
    try {
      setStatus("Conectando…");
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      await apiFetch("/me/status"); // sanity check no backend
      navigate("/app");
    } catch (e: any) {
      setStatus(e.message || "Falhou");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await apiFetch("/me/status");
        navigate("/app");
      } catch {/* fica */}
    })();
  }, [navigate]);

  return (
    <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#f5f7fb"}}>
      <div style={{width:420,padding:24,borderRadius:12,boxShadow:"0 12px 40px rgba(0,0,0,.08)",background:"#fff"}}>
        <h1 style={{marginTop:0}}>FacilitaMed</h1>
        <p style={{color:"#666"}}>Entre com sua conta Google autorizada.</p>
        <button onClick={doLogin} style={{padding:"10px 14px",borderRadius:10,background:"#2563eb",color:"#fff",border:0,cursor:"pointer",width:"100%"}}>
          Entrar com Google
        </button>
        {status && <div style={{marginTop:8,fontSize:12,color:"#444",whiteSpace:"pre-wrap"}}>{status}</div>}
      </div>
    </div>
  );
}
