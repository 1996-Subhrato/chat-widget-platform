import React, { useState } from 'react';
import { Sliders, Bot, Send, Sparkles } from 'lucide-react';

export default function Playground() {
  const [selectedTheme, setSelectedTheme] = useState('Ocean');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi! How can we help you today?');

  const themes = ['Ocean', 'Sunset', 'Forest', 'Midnight', 'Minimal'];

  const getThemeColors = (themeName) => {
    switch (themeName) {
      case 'Ocean':
        return { primary: '#0284c7', text: '#ffffff', bg: '#e0f2fe', label: 'Ocean Blue' };
      case 'Sunset':
        return { primary: '#ea580c', text: '#ffffff', bg: '#ffedd5', label: 'Sunset Orange' };
      case 'Forest':
        return { primary: '#16a34a', text: '#ffffff', bg: '#dcfce7', label: 'Forest Green' };
      case 'Midnight':
        return { primary: '#6366f1', text: '#ffffff', bg: '#e0e7ff', label: 'Midnight Indigo' };
      case 'Minimal':
        return { primary: '#4b5563', text: '#ffffff', bg: '#f3f4f6', label: 'Minimal Slate' };
      default:
        return { primary: '#6366f1', text: '#ffffff', bg: '#e0e7ff', label: 'Default Theme' };
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={20} style={{ color: 'var(--accent-color)' }} />
            <h3 style={{ margin: 0 }}>Configuration Controls</h3>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>Theme Preset</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {themes.map((themeName) => {
                const colors = getThemeColors(themeName);
                const isSelected = selectedTheme === themeName;
                return (
                  <button
                    key={themeName}
                    onClick={() => setSelectedTheme(themeName)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: isSelected ? `${colors.primary}20` : 'var(--bg-tertiary)',
                      border: `2px solid ${isSelected ? colors.primary : 'var(--border-color)'}`,
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      boxShadow: isSelected ? `0 0 12px ${colors.primary}50` : 'none',
                      transform: isSelected ? 'translateY(-1px)' : 'none'
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: colors.primary,
                        boxShadow: `0 0 8px ${colors.primary}`,
                        display: 'inline-block',
                        transition: 'transform 0.2s ease',
                        transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                      }}
                    />
                    {themeName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Theme Color Details Swatch Card */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-tertiary)',
            border: `1px solid ${currentColors.primary}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: currentColors.primary,
                boxShadow: `0 0 10px ${currentColors.primary}88`,
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }} />
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>
                  {currentColors.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Primary: {currentColors.primary} | Bubble: {currentColors.bg}
                </span>
              </div>
            </div>
            <span className="badge" style={{
              backgroundColor: `${currentColors.primary}25`,
              color: currentColors.primary,
              border: `1px solid ${currentColors.primary}66`,
              padding: '4px 10px'
            }}>
              Active Swatch
            </span>
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
            <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> Preview Mode
            </span>
            <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>
              Interactive inputs modify properties locally in Phase 0. Backend sync mechanisms will launch in subsequent database phases.
            </p>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#0e1420', position: 'relative' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--success)', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Live Sandbox Preview</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: currentColors.primary, fontWeight: 600 }}>
              Theme: {selectedTheme}
            </span>
          </div>

          <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            {/* Mock Chat Box */}
            <div style={{
              width: '280px',
              height: '350px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              boxShadow: `0 10px 30px ${currentColors.primary}33, 0 4px 12px rgba(0,0,0,0.5)`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              color: '#000000',
              textAlign: 'left',
              transition: 'all 0.3s ease'
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
                gap: '8px',
                transition: 'background-color 0.3s ease'
              }}>
                <Bot size={16} />
                <span>Support Agent</span>
              </div>

              {/* Box Body */}
              <div style={{ flex: 1, padding: '16px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
                <div style={{
                  backgroundColor: currentColors.bg,
                  border: `1px solid ${currentColors.primary}44`,
                  color: '#1e293b',
                  padding: '12px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  marginBottom: '12px',
                  maxWidth: '85%',
                  transition: 'all 0.3s ease'
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
                    opacity: 0.9,
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
