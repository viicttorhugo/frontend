import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif"
      }}>
        <div style={{padding: 16, borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,.08)"}}>Carregando...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/app" replace /> : <Login />} />
        <Route path="/app" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to={user ? "/app" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
