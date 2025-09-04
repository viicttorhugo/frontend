import { useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  async function handleGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/app", { replace: true }); // redireciona logo após login
    } catch (e) {
      alert("Falha no login: " + (e as Error).message);
    }
  }

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter, system-ui, sans-serif"}}>
      <div style={{padding:24,border:"1px solid #eee",borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,.05)"}}>
        <h2 style={{marginTop:0}}>FacilitaMed</h2>
        <button onClick={handleGoogle} style={{padding:"10px 16px",borderRadius:10,border:"1px solid #ddd",cursor:"pointer"}}>
          Entrar com Google
        </button>
        {loading && <p style={{opacity:.7}}>Carregando...</p>}
      </div>
    </div>
  );
}
