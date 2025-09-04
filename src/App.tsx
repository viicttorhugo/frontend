import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import PatientsPage from "./pages/PatientsPage";
import VisitsPage from "./pages/VisitsPage";
import DocsPage from "./pages/DocsPage";
import ExamAIPage from "./pages/ExamAIPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="patients" replace />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="visits" element={<VisitsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="exam-ai" element={<ExamAIPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
