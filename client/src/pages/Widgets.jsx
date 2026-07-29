import React from 'react';

export default function Widgets() {
  return (
    <div>
      <div style={{ marginBottom: '32px', textAlign: 'left' }}>
        <h1>My Chat Widgets</h1>
        <p>Create, inspect, and get the embed scripts for your web platforms.</p>
      </div>

      <div className="card" style={{ padding: '0px', overflow: 'hidden', borderCollapse: 'collapse', textAlign: 'left' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Installed Widgets</h3>
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>+ Create Widget</button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Domain Whitelist</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Theme</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', fontWeight: 500 }}>Customer Support Widget</td>
              <td style={{ padding: '16px 24px', fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>example.com</td>
              <td style={{ padding: '16px 24px' }}>
                <span className="badge badge-primary">Ocean Preset</span>
              </td>
              <td style={{ padding: '16px 24px' }}>
                <span className="badge badge-success">Active</span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2026-07-29</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
