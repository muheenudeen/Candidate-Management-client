import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext';
import LoginForm from './contexts/login';
// import AdminDashboard from './pages/AdminDashboard';
// import CandidateDashboard from './pages/CandidateDashboard';

import ProtectedRoute from './contexts/protectedRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<LoginForm type="admin" />} />
          <Route path="/candidate/login" element={<LoginForm type="candidate" />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                {/* <AdminDashboard /> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/dashboard"
            element={
              <ProtectedRoute>
                {/* <CandidateDashboard /> */}
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/candidate/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

