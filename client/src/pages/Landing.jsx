import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, 
  Sparkles, 
  Code2, 
  ShieldCheck, 
  Palette, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Check, 
  Globe, 
  Layers, 
  Cpu, 
  ChevronRight,
  MessageSquare,
  Send,
  HelpCircle
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [activeTheme, setActiveTheme] = useState('Ocean');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const themeColors = {
    Ocean: { primary: '#0284c7', bg: '#e0f2fe', label: 'Ocean Blue' },
    Sunset: { primary: '#ea580c', bg: '#ffedd5', label: 'Sunset Orange' },
    Forest: { primary: '#16a34a', bg: '#dcfce7', label: 'Forest Green' },
    Midnight: { primary: '#6366f1', bg: '#e0e7ff', label: 'Midnight Indigo' },
    Minimal: { primary: '#4b5563', bg: '#f3f4f6', label: 'Minimal Slate' },
  };

  const currentTheme = themeColors[activeTheme];

  const sampleEmbedCode = `<script 
  src="http://localhost:5000/widget.js" 
  data-api-key="pk_live_demo_9823f4a1c72b"
  defer>
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleEmbedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const faqs = [
    {
      q: "How do I embed the ChatterFlow widget on my site?",
      a: "Simply copy your unique single-line <script> tag from your dashboard and paste it into the <head> or <body> of your website HTML. It works automatically across React, Next.js, Vue, WordPress, and static HTML pages."
    },
    {
      q: "Can I customize the widget colors and agent welcome messages?",
      a: "Yes! You can choose from built-in theme presets (Ocean, Sunset, Forest, Midnight, Minimal) or customize primary colors, background bubbles, and welcome greetings in real-time."
    },
    {
      q: "How does tenant security and API key authentication work?",
      a: "Every tenant account is issued a cryptographically secure pk_live_ API key. Requests originating from your widget are verified server-side, protecting your identity and subscription rate limits."
    },
    {
      q: "Can I start with a free trial?",
      a: "Absolutely! We offer a full-featured 14-day free trial on signup with zero credit card required."
    }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden'
    }}>
      {/* 1. Header / Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(11, 15, 25, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 32px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Bot size={22} />
            </div>
            <span style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              ChatterFlow
            </span>
          </div>

          {/* Nav items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#features" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', fontWeight: 500 }}>Features</a>
            <a href="#demo" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', fontWeight: 500 }}>Live Demo</a>
            <a href="#integration" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', fontWeight: 500 }}>Integration</a>
            <a href="#pricing" style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', fontWeight: 500 }}>Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
                style={{ padding: '10px 20px', gap: '8px', fontSize: '0.9rem' }}
              >
                <span>Go to Console</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.9rem', gap: '6px' }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section style={{
        padding: '80px 24px 60px 24px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          {/* Announcement Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'var(--accent-glow)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a855f7',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '24px'
          }}>
            <Sparkles size={14} />
            <span>Phase 2 SaaS Engine & Live API Key Integration</span>
          </div>

          {/* Hero Main Heading */}
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            color: '#ffffff'
          }}>
            Embed Modern AI Chat Widgets <br />
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              On Any Website in Minutes
            </span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 36px auto',
            lineHeight: '1.6'
          }}>
            Complete multi-tenant platform for customizing, testing, and embedding responsive chat widgets. Powered by real-time WebSockets, preset visual themes, and single-script integration.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/signup')}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1rem', gap: '10px', boxShadow: 'var(--shadow-glow)' }}
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/playground')}
              className="btn btn-secondary"
              style={{ padding: '14px 24px', fontSize: '1rem', gap: '8px' }}
            >
              <Palette size={18} />
              <span>Interactive Sandbox</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Live Interactive Widget Sandbox Demo */}
      <section id="demo" style={{ padding: '40px 24px 80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="card" style={{
            padding: '32px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 4px 0' }}>Live Interactive Demo</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>Click theme presets to test live widget styling in real-time.</p>
              </div>

              {/* Theme Selector Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.keys(themeColors).map((tName) => {
                  const isSel = activeTheme === tName;
                  const colorObj = themeColors[tName];
                  return (
                    <button
                      key={tName}
                      onClick={() => setActiveTheme(tName)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: isSel ? `${colorObj.primary}22` : 'var(--bg-tertiary)',
                        border: `1.5px solid ${isSel ? colorObj.primary : 'var(--border-color)'}`,
                        color: isSel ? '#ffffff' : 'var(--text-secondary)'
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colorObj.primary }} />
                      {tName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sandbox Container */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: '32px',
              backgroundColor: '#070b12',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '28px',
              alignItems: 'center'
            }}>
              {/* Left Column: Embed Info */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: currentTheme.primary, fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
                  <Code2 size={16} />
                  <span>Instant Integration</span>
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '12px' }}>
                  Single Line Script Tag
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Copy your unique script snippet from your account console. It automatically renders a floating chat button, handles real-time messages, and enforces tenant security.
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--success)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>API Key Verified</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={18} style={{ color: 'var(--warning)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>WebSocket Ready</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mock Widget */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '280px',
                  height: '340px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: `0 12px 35px ${currentTheme.primary}40, 0 4px 15px rgba(0,0,0,0.6)`,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}>
                  {/* Header */}
                  <div style={{
                    backgroundColor: currentTheme.primary,
                    color: '#ffffff',
                    padding: '14px 16px',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.3s ease'
                  }}>
                    <Bot size={16} />
                    <span>Support Assistant</span>
                  </div>

                  {/* Message Area */}
                  <div style={{ flex: 1, padding: '16px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
                    <div style={{
                      backgroundColor: currentTheme.bg,
                      border: `1px solid ${currentTheme.primary}33`,
                      color: '#0f172a',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '0.825rem',
                      marginBottom: '10px',
                      maxWidth: '88%',
                      lineHeight: '1.4'
                    }}>
                      👋 Welcome! How can we assist your team today?
                    </div>
                  </div>

                  {/* Input area */}
                  <div style={{ padding: '10px 12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px', backgroundColor: '#ffffff' }}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      disabled
                      style={{
                        flex: 1,
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.775rem',
                        backgroundColor: '#f1f5f9',
                        color: '#000000'
                      }}
                    />
                    <button
                      disabled
                      style={{
                        backgroundColor: currentTheme.primary,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" style={{ padding: '60px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Platform Capabilities</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '8px 0 12px 0' }}>
              Everything You Need for Customer Chat
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
              Built for high-concurrency, security compliance, and seamless multi-tenant developer workflows.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Feature 1 */}
            <div className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Code2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Single-Script Embed</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Lightweight JavaScript snippet easily integrates into React, Next.js, HTML, WordPress, or Shopify sites without build steps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Palette size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Visual Theme Studio</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Select preset themes (Ocean, Sunset, Forest, Midnight, Minimal) or customize primary branding, fonts, and message bubble colors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>API Key Security</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Cryptographically generated <code style={{ fontFamily: 'monospace' }}>pk_live_</code> keys enforce tenant isolation and server-side rate limits.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Zap size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>SaaS Tier Management</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Multi-tier plan selection (Trial, Basic, Pro) featuring automated trial expiry handling and subscription route protection.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Cpu size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Real-Time Gateway</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                WebSocket connection pipeline engineered for sub-100ms message delivery between website visitors and agent dashboards.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card" style={{ textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Globe size={20} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Domain Whitelisting</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Restrict widget execution exclusively to authorized domain origins to prevent unauthorized script embedding on third-party sites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Integration Code Snippet Section */}
      <section id="integration" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-success" style={{ marginBottom: '12px' }}>Developer Integration</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '8px 0 16px 0' }}>
            Two Minutes to Live Deployment
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1rem' }}>
            Paste this snippet into your HTML document to instantly activate the widget on your site.
          </p>

          <div style={{
            backgroundColor: '#090d16',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            textAlign: 'left',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                HTML Script Tag
              </span>
              <button
                onClick={handleCopyCode}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
              >
                {copiedCode ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre style={{
              margin: 0,
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#34d399',
              lineHeight: '1.6',
              overflowX: 'auto'
            }}>
              <code>{sampleEmbedCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="pricing" style={{ padding: '80px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>SaaS Pricing Tiers</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '8px 0 16px 0' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 48px auto', fontSize: '1rem' }}>
            Choose the plan that fits your application scale. Upgrade or downgrade at any time.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
            {/* Trial Plan */}
            <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>14-Day Free Trial</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Perfect for evaluating ChatterFlow features.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: '#ffffff' }}>
                ₹0 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 14 days</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> 1 Active Chat Widget
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> All Preset Themes Included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Live API Key Generation
                </li>
              </ul>
              <button onClick={() => navigate('/signup')} className="btn btn-secondary" style={{ width: '100%', padding: '12px', marginTop: 'auto' }}>
                Start Free Trial
              </button>
            </div>

            {/* Basic Plan */}
            <div className="card" style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid var(--accent-color)',
              boxShadow: 'var(--shadow-glow)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                backgroundColor: 'var(--accent-color)',
                color: '#ffffff',
                padding: '2px 12px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                MOST POPULAR
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Basic Plan</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Ideal for growing sites and small teams.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: '#ffffff' }}>
                ₹100 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Up to 5 Active Chat Widgets
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Preset Themes + Custom Colors
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Standard Response Rates
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Email Support
                </li>
              </ul>
              <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: 'auto' }}>
                Get Started Basic
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Pro Plan</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>For high-volume web platforms & enterprises.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: '#ffffff' }}>
                ₹300 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Unlimited Active Widgets
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Priority WebSocket Connections
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Domain Origin Whitelisting
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> 24/7 Priority Support
                </li>
              </ul>
              <button onClick={() => navigate('/signup')} className="btn btn-secondary" style={{ width: '100%', padding: '12px', marginTop: 'auto' }}>
                Get Started Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>FAQ</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '8px 0 12px 0' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="card"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{ cursor: 'pointer', padding: '20px 24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} style={{ color: 'var(--accent-color)' }} />
                    {faq.q}
                  </h3>
                  <ChevronRight size={18} style={{
                    transform: activeFaq === idx ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    color: 'var(--text-secondary)'
                  }} />
                </div>
                {activeFaq === idx && (
                  <p style={{ marginTop: '14px', fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '48px 24px'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Bot size={18} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>ChatterFlow</span>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginLeft: '8px' }}>v0.1</span>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
            © {new Date().getFullYear()} ChatterFlow Platform Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
