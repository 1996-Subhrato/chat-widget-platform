import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: '32px', textAlign: 'left' }}>
        <h1>Console Dashboard</h1>
        <p>Overview of your active widgets, subscriptions, and platform settings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Users Card */}
        <div className="card" style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
          <h3>Users</h3>
          <p style={{ margin: '8px 0 16px' }}>Manage users details, account variables, profiles, and associations.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-success">Active</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>1 Total User</span>
          </div>
        </div>

        {/* Subscription Status Card */}
        <div className="card" style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💳</div>
          <h3>Subscription</h3>
          <p style={{ margin: '8px 0 16px' }}>Current billing plans, tier status, trial ranges, and usage allocations.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-primary">Trial</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Ends in 14 days</span>
          </div>
        </div>

        {/* API Keys Card */}
        <div className="card" style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔑</div>
          <h3>API Keys</h3>
          <p style={{ margin: '8px 0 16px' }}>Create and revoke cryptographically signed keys for widget communication.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-success">Secure</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>1 Active Key</span>
          </div>
        </div>

        {/* Themes Card */}
        <div className="card" style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎨</div>
          <h3>Widget Themes</h3>
          <p style={{ margin: '8px 0 16px' }}>Choose custom skins, color codes, border dimensions, and styles.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-primary">System Preset</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>5 Presets Loaded</span>
          </div>
        </div>
      </div>

      {/* Database Verification Indicator section */}
      <div className="card" style={{ textAlign: 'left' }}>
        <h3 style={{ marginBottom: '12px' }}>System Architecture & Connectivity</h3>
        <p style={{ marginBottom: '20px' }}>
          This interface is running on <strong>Phase 0 Foundation</strong> framework. Dynamic database connections are verified by the Express.js server and pooled via Sequelize ORM in real-time.
        </p>
        <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Database Dialect</span>
            <span style={{ fontWeight: 500 }}>MySQL 8.0</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>ORM Layer</span>
            <span style={{ fontWeight: 500 }}>Sequelize v6</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Server Env</span>
            <span style={{ fontWeight: 500 }}>Express (ES Modules)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
