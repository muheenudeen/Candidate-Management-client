import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext';
import LoginForm from './contexts/login';
import ProtectedRoute from './contexts/protectedRoute';
// import AdminDashboard from './pages/AdminDashboard';
// import CandidateDashboard from './pages/CandidateDashboard';

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
                <div>Admin Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/dashboard"
            element={
              <ProtectedRoute>
                {/* <CandidateDashboard /> */}
                <div>Candidate Dashboard</div>
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
