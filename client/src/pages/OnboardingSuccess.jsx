import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Check, Copy, ArrowRight, ShieldCheck, Key } from 'lucide-react';

export default function OnboardingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState(location.state?.apiKey || '');
  const [planType, setPlanType] = useState(location.state?.planType || location.state?.subscription?.plan_type || '');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(!apiKey);

  useEffect(() => {
    // If state was lost due to page refresh, fetch from backend API
    if (!apiKey) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const [keyRes, subRes] = await Promise.all([
            api.get('/subscription/api-key'),
            api.get('/subscription/current')
          ]);
          if (keyRes.data?.apiKey) {
            setApiKey(keyRes.data.apiKey);
          }
          if (subRes.data?.subscription?.plan_type) {
            setPlanType(subRes.data.subscription.plan_type);
          }
        } catch (error) {
          console.error('[Fetch Success Data Error]:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [apiKey]);

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getPlanDisplayName = (type) => {
    if (!type) return 'Subscription';
    switch (type.toLowerCase()) {
      case 'trial': return '14-Day Free Trial';
      case 'basic': return 'Basic';
      case 'pro': return 'Pro';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#090d16',
        color: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="spinner" style={{
            width: '24px',
            height: '24px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: '#10b981',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <span>Finalizing your onboarding setup...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Glow background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(9, 13, 22, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '560px',
        width: '100%',
        backgroundColor: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '20px',
        padding: '40px 32px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          color: '#10b981',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
        }}>
          <ShieldCheck size={32} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          margin: '0 0 12px 0',
          color: '#ffffff',
          letterSpacing: '-0.02em'
        }}>
          Subscription Activated Successfully
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1rem',
          color: '#94a3b8',
          margin: '0 0 32px 0',
          lineHeight: '1.5'
        }}>
          Thank you for choosing the <strong style={{ color: '#10b981' }}>{getPlanDisplayName(planType)}</strong> plan. Your API key is ready below.
        </p>

        {/* API Key Box */}
        <div style={{
          backgroundColor: '#090d16',
          border: '1px solid #374151',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Key size={14} />
            <span>Your Live API Key</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <code style={{
              flex: 1,
              fontFamily: 'monospace',
              fontSize: '0.92rem',
              color: '#34d399',
              backgroundColor: '#030712',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #1f2937',
              wordBreak: 'break-all',
              userSelect: 'all'
            }}>
              {apiKey || 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
            </code>

            <button
              onClick={handleCopy}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: copied ? '#10b981' : '#374151',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy Key'}</span>
            </button>
          </div>
        </div>

        {/* Information Message */}
        <p style={{
          fontSize: '0.875rem',
          color: '#64748b',
          margin: '0 0 32px 0',
          fontStyle: 'italic'
        }}>
          “Use this API key to integrate the widget into your website.”
        </p>

        {/* Continue Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
            transition: 'background-color 0.2s ease, transform 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>Continue to Dashboard</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
