import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <h2 style={{ marginBottom: '12px' }}>Welcome, {user?.name || 'User'}!</h2>
      <p style={{ marginBottom: '24px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
        Plan selection will be implemented in Phase 2.
      </p>

      <div style={{
        backgroundColor: 'var(--bg-tertiary)',
        padding: '16px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-color)',
        marginBottom: '24px',
        textAlign: 'left',
        fontSize: '0.85rem'
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Authenticated Session Details:</div>
        <div><strong>User ID:</strong> {user?.id}</div>
        <div><strong>Email:</strong> {user?.email}</div>
      </div>

      <button
        onClick={logout}
        className="btn btn-secondary"
        style={{ width: '100%', padding: '10px 16px' }}
      >
        Sign Out
      </button>
    </div>
  );
}
