import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PhrasesPage } from './pages/PhrasesPage';
import { CaptionsPage } from './pages/CaptionsPage';
import { StudentPage } from './pages/StudentPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/student" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/phrases" element={<PhrasesPage />} />
          <Route path="/captions" element={<CaptionsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
