import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--bg-color, #0f172a)',
        color: 'var(--text-color, #f8fafc)',
        fontSize: '1rem',
        fontWeight: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="spinner" style={{
            width: '24px',
            height: '24px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: '#6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <span>Verifying authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
