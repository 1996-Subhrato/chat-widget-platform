import React from 'react';
import { User, CreditCard, Key, Plus, ShieldCheck, Trash2 } from 'lucide-react';

export default function Settings() {
  return (
    <div>
      <div style={{ marginBottom: '32px', textAlign: 'left' }}>
        <h1>Settings Console</h1>
        <p>Manage API key access, plan structures, themes, and configuration parameters.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
        {/* Profile Card */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <User size={20} style={{ color: 'var(--accent-color)' }} />
            <h3 style={{ margin: 0 }}>Account Information</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" defaultValue="Demo User" disabled />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" defaultValue="demo@chatterflow.io" disabled />
            </div>
          </div>
        </div>

        {/* Subscription Plan Settings Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={20} style={{ color: 'var(--success)' }} />
              <h3 style={{ margin: 0 }}>Subscription Details</h3>
            </div>
            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> Trial Plan
            </span>
          </div>
          <p style={{ marginBottom: '20px' }}>
            You are currently on the trial plan. The trial gives you full API access, standard response rates, and 5 concurrent chat widgets.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Trial Started</span>
              <span style={{ fontWeight: 500 }}>2026-07-29</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Trial Ends</span>
              <span style={{ fontWeight: 500 }}>2026-08-12</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Status</span>
              <span style={{ fontWeight: 500 }}>Active</span>
            </div>
          </div>
        </div>

        {/* API Credentials Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key size={20} style={{ color: 'var(--warning)' }} />
              <h3 style={{ margin: 0 }}>API Keys</h3>
            </div>
            <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem', gap: '6px' }}>
              <Plus size={16} />
              <span>Generate New Key</span>
            </button>
          </div>
          <p style={{ marginBottom: '16px' }}>
            Use these keys to authenticate and identify script calls connecting from your widget code snippet. Never expose this secret key.
          </p>
          
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--bg-tertiary)' }}>
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)' }}>pk_live_c1a3b5...</span>
                <span style={{ marginLeft: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created 2026-07-29</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="badge badge-success">Active</span>
                <button style={{ color: 'var(--danger)', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Trash2 size={14} /> Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
