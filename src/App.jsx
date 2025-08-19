// src/App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // <-- Import HomePage
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* <-- Set HomePage as the default */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
      </Routes>
    </div>
  );
}

export default App;