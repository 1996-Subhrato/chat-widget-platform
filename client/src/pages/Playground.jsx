import React, { useState } from 'react';

export default function Playground() {
  const [selectedTheme, setSelectedTheme] = useState('Ocean');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi! How can we help you today?');

  const themes = ['Ocean', 'Sunset', 'Forest', 'Midnight', 'Minimal'];

  const getThemeColors = (themeName) => {
    switch(themeName) {
      case 'Ocean': return { primary: '#0284c7', text: '#ffffff', bg: '#f0f9ff' };
      case 'Sunset': return { primary: '#ea580c', text: '#ffffff', bg: '#fff7ed' };
      case 'Forest': return { primary: '#16a34a', text: '#ffffff', bg: '#f0fdf4' };
      case 'Midnight': return { primary: '#1e1b4b', text: '#ffffff', bg: '#f5f3ff' };
      case 'Minimal': return { primary: '#374151', text: '#ffffff', bg: '#f9fafb' };
      default: return { primary: '#6366f1', text: '#ffffff', bg: '#eef2ff' };
    }
  };

  const currentColors = getThemeColors(selectedTheme);

  return (
    <div>
      <div style={{ marginBottom: '32px', textAlign: 'left' }}>
        <h1>Widget Playground</h1>
        <p>Preview widget customizations, prompt layouts, and default preset themes in real-time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', minHeight: '500px', alignItems: 'stretch' }}>
        {/* Editor Controls Card */}
        <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Configuration Controls</h3>
          
          <div className="form-group">
            <label className="form-label">Theme Preset</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`btn ${selectedTheme === theme ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="welcome-msg">Welcome Message</label>
            <textarea
              id="welcome-msg"
              className="form-control"
              rows={3}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              placeholder="Enter greeting..."
              style={{ resize: 'none' }}
            />
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: 'auto' }}>
            <span className="badge badge-primary">Preview Mode</span>
            <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>
              Interactive inputs modify properties locally in Phase 0. Backend sync mechanisms will launch in subsequent database phases.
            </p>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#0e1420', position: 'relative' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--success)', borderRadius: '50%' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Live Sandbox Preview</span>
          </div>

          <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            {/* Mock Chat Box */}
            <div style={{
              width: '280px',
              height: '350px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              color: '#000000',
              textAlign: 'left'
            }}>
              {/* Box Header */}
              <div style={{
                backgroundColor: currentColors.primary,
                color: currentColors.text,
                padding: '16px',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%' }}></div>
                Support Agent
              </div>

              {/* Box Body */}
              <div style={{ flex: 1, padding: '16px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
                <div style={{
                  backgroundColor: currentColors.bg,
                  border: `1px solid ${currentColors.primary}22`,
                  color: '#1e293b',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  marginBottom: '12px',
                  maxWidth: '85%'
                }}>
                  {welcomeMessage}
                </div>
              </div>

              {/* Box Footer Input */}
              <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', backgroundColor: '#ffffff' }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  disabled
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    color: '#000000',
                    backgroundColor: '#f1f5f9'
                  }}
                />
                <button
                  disabled
                  style={{
                    backgroundColor: currentColors.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'not-allowed',
                    opacity: 0.8
                  }}
                >
                  ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
