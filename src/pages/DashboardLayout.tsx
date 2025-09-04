import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`;

  async function doLogout() {
    await signOut(getAuth());
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
          <img src="/logo.png" alt="FacilitaMed" className="h-8" />
          <nav className="flex gap-2 ml-4">
            <NavLink to="patients" className={linkClass}>Pacientes</NavLink>
            <NavLink to="visits" className={linkClass}>Atendimentos</NavLink>
            <NavLink to="docs" className={linkClass}>Documentos</NavLink>
            <NavLink to="exam-ai" className={linkClass}>IA de Exames</NavLink>
          </nav>
          <div className="flex-1" />
          <button onClick={doLogout} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
