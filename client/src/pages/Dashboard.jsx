import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { user, subscription } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await api.get('/subscription/api-key');
        if (response.data?.apiKey) {
          setApiKey(response.data.apiKey);
        }
      } catch (error) {
        console.error('[Dashboard API Key Error]:', error);
      }
    };
    fetchApiKey();
  }, []);

  const handleCopyKey = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPlanName = (planType) => {
    if (!planType) return 'No Active Plan';
    switch (planType.toLowerCase()) {
      case 'trial': return '14-Day Free Trial';
      case 'basic': return 'Basic Plan (₹100/mo)';
      case 'pro': return 'Pro Plan (₹300/mo)';
      default: return planType.toUpperCase();
    }
  };

  return (
    <div style={{ textStyle: 'left' }}>
      {/* Header section */}
      <div style={{
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#f8fafc',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em'
          }}>
            Welcome back, {user?.name || 'Developer'} 👋
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem' }}>
            Overview of your subscription plan, identity profile, and integration API key.
          </p>
        </div>

        <div style={{
          padding: '8px 16px',
          borderRadius: '9999px',
          backgroundColor: subscription?.status === 'active' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: subscription?.status === 'active' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
          color: subscription?.status === 'active' ? '#10b981' : '#f87171',
          fontSize: '0.875rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: subscription?.status === 'active' ? '#10b981' : '#f87171'
          }} />
          <span>Status: {subscription?.status ? subscription.status.toUpperCase() : 'INACTIVE'}</span>
        </div>
      </div>

      {/* Grid of Profile & Subscription Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Account Profile Card */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: '#818cf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 700
            }}>
              👤
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                Account Identity
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                User Profile
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>Full Name</span>
              <span style={{ fontSize: '0.975rem', fontWeight: 600, color: '#e2e8f0' }}>{user?.name || 'N/A'}</span>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>Email Address</span>
              <span style={{ fontSize: '0.975rem', fontWeight: 600, color: '#e2e8f0' }}>{user?.email || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Current Plan Card */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 700
            }}>
              💳
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                Active SaaS Tier
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Subscription Plan
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>Current Plan</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                {formatPlanName(subscription?.plan_type)}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>Subscription Status</span>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: subscription?.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: subscription?.status === 'active' ? '#34d399' : '#f87171'
              }}>
                {subscription?.status ? subscription.status.toUpperCase() : 'NO SUBSCRIPTION'}
              </span>
            </div>
          </div>
        </div>

        {/* API Key Card */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 700
            }}>
              🔑
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                Access Credentials
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Integration API Key
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>Active API Key</span>
            {apiKey ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <code style={{
                  flex: 1,
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  backgroundColor: '#090d16',
                  color: '#34d399',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #1f2937',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {apiKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: copied ? '#10b981' : '#374151',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            ) : (
              <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Loading API key...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
