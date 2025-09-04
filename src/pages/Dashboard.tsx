import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(import.meta.env.VITE_API_BASE + "/me/status", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setStatus(data);
    };
    fetchStatus();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>FacilitaMed</h1>
      <p>Logado como: <b>{auth.currentUser?.email}</b></p>
      <pre>{JSON.stringify(status, null, 2)}</pre>
      <div style={{ marginTop: 20 }}>
        <Link to="/app/atendimento"><button>Novo Atendimento</button></Link>
        <Link to="/app/documentos"><button>Documentos PDF</button></Link>
        <Link to="/app/exames"><button>Interpretação de Exames (IA)</button></Link>
      </div>
      <button onClick={() => signOut(auth)} style={{ marginTop: 20 }}>Sair</button>
    </div>
  );
}
