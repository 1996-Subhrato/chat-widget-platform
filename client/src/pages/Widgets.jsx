import React from 'react';
import { Plus, MessageSquare, Globe, Palette, CheckCircle2 } from 'lucide-react';

export default function Widgets() {
  return (
    <div>
      <div style={{ marginBottom: '32px', textAlign: 'left' }}>
        <h1>My Chat Widgets</h1>
        <p>Create, inspect, and get the embed scripts for your web platforms.</p>
      </div>

      <div className="card" style={{ padding: '0px', overflow: 'hidden', borderCollapse: 'collapse', textAlign: 'left' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={20} style={{ color: 'var(--accent-color)' }} />
            <h3 style={{ margin: 0 }}>Installed Widgets</h3>
          </div>
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem', gap: '6px' }}>
            <Plus size={16} />
            <span>Create Widget</span>
          </button>
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
              <td style={{ padding: '16px 24px', fontWeight: 600 }}>Customer Support Widget</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={14} /> example.com
                </span>
              </td>
              <td style={{ padding: '16px 24px' }}>
                <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Palette size={12} /> Ocean Preset
                </span>
              </td>
              <td style={{ padding: '16px 24px' }}>
                <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Active
                </span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2026-07-29</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
