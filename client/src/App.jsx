import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Layouts
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Widgets from './pages/Widgets';
import Playground from './pages/Playground';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default Redirect to Onboarding */}
          <Route path="/" element={<Navigate to="/onboarding" replace />} />

          {/* Public Auth Routes (Redirect to /onboarding if logged in) */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          {/* Protected Onboarding Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/onboarding" element={<Onboarding />} />
            </Route>
          </Route>

          {/* Protected Console Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/widgets" element={<Widgets />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback Catch-All route */}
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
