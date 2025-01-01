import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './component/pages/LoginForm';
import AdminDashboard from './component/components/adminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/candidate/login" element={<LoginForm />} />
        {/* <Route
          path="/admin/dashboard"
          element={isAdminAuthenticated() ? <AdminDashboard /> : <Navigate to="/admin/dashboard" />}
        /> */}
        <Route
          path="/admin/dashboard"
          element={ <AdminDashboard/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
