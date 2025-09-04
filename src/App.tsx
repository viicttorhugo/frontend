import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Atendimento from "./pages/Atendimento";
import Documentos from "./pages/Documentos";
import Exames from "./pages/Exames";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Carregando...</div>;
  return user ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/app/atendimento"
          element={
            <PrivateRoute>
              <Atendimento />
            </PrivateRoute>
          }
        />
        <Route
          path="/app/documentos"
          element={
            <PrivateRoute>
              <Documentos />
            </PrivateRoute>
          }
        />
        <Route
          path="/app/exames"
          element={
            <PrivateRoute>
              <Exames />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
