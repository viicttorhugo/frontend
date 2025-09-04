import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user);
      setChecking(false);
      if (!user) navigate("/", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  if (checking) {
    return (
      <div style={{minHeight:"100vh",display:"grid",placeItems:"center",color:"#555"}}>
        Verificando sessão…
      </div>
    );
  }
  return <>{authed ? children : null}</>;
}
