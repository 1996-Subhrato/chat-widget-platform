import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <div className="logo-container" style={{ margin: '0 auto 24px auto' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Bot size={18} />
            </div>
            <span>ChatterFlow</span>
          </div>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
