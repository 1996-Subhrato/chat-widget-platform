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
import OnboardingSuccess from './pages/OnboardingSuccess';
import Dashboard from './pages/Dashboard';
import Widgets from './pages/Widgets';
import Playground from './pages/Playground';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default Root Redirect to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Public Auth Routes */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          {/* Protected Onboarding Pricing Route (for users selecting a plan) */}
          <Route element={<ProtectedRoute allowWithoutSubscription={true} disallowWithSubscription={true} />}>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* Protected Onboarding Completion / Success Route */}
          <Route element={<ProtectedRoute allowWithoutSubscription={true} />}>
            <Route path="/onboarding/success" element={<OnboardingSuccess />} />
          </Route>

          {/* Protected Console Routes (requires active subscription) */}
          <Route element={<ProtectedRoute allowWithoutSubscription={false} />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/widgets" element={<Widgets />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback Catch-All route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
