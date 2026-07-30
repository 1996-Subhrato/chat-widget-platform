import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <span className="logo-dot"></span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ChatterFlow
          </span>
          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>v0.1</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `btn btn-secondary ${isActive ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', gap: '10px' }}
          >
            📊 Dashboard
          </NavLink>
          <NavLink 
            to="/widgets" 
            className={({ isActive }) => `btn btn-secondary ${isActive ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', gap: '10px' }}
          >
            💬 Widgets
          </NavLink>
          <NavLink 
            to="/playground" 
            className={({ isActive }) => `btn btn-secondary ${isActive ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', gap: '10px' }}
          >
            🎮 Playground
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `btn btn-secondary ${isActive ? 'btn-primary' : ''}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', gap: '10px' }}
          >
            ⚙️ Settings
          </NavLink>
        </nav>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
              👤
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || ''}
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '8px 12px', fontSize: '0.875rem' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="main-content">
        <header className="navbar">
          <div>
            <h3 style={{ textTransform: 'capitalize', fontWeight: 500 }}>
              Platform Foundation Console
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="badge badge-success">API Status: Connected</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
          </div>
        </header>
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
