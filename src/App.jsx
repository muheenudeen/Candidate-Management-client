import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './component/pages/LoginForm';
import AdminDashboard from './component/pages/adminDashboard';
import CandidateHome from './component/pages/candidateHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin/login" element={<LoginForm />} />
        <Route path="/candidate/login" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/candidate/home" element={<CandidateHome />} />
      </Routes>
    </Router>
  );
}

export default App;
