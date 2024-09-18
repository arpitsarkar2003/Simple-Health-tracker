import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
