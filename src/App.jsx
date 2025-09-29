import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MealsPage from './pages/MealsPage.jsx';
import MealsListPage from './pages/MealsListPage.jsx';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/meals" element={<MealsListPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
