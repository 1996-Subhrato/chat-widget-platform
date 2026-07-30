import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setSubscriptionState, subscription } = useAuth();
  const [selectedPlanLoading, setSelectedPlanLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const trialAlreadyUsed = subscription?.plan_type === 'trial' || subscription?.status === 'expired';

  const handleSelectPlan = async (planType) => {
    try {
      setErrorMsg('');
      setSelectedPlanLoading(planType);
      
      const response = await api.post('/subscription/select', { planType });
      const { subscription: newSub, apiKey } = response.data;
      
      // Update AuthContext state
      setSubscriptionState(newSub);
      
      // Navigate to success page passing state
      navigate('/onboarding/success', {
        replace: true,
        state: {
          subscription: newSub,
          apiKey,
          planType
        }
      });
    } catch (err) {
      console.error('[Plan Selection Error]:', err);
      const errData = err.response?.data?.error;
      const message = errData?.message || 'Failed to select plan. Please try again.';
      setErrorMsg(message);
    } finally {
      setSelectedPlanLoading(null);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(9, 13, 22, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1100px',
        width: '100%'
      }}>
        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: '#818cf8',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            <span>✨ Phase 2 — Choose Your Subscription</span>
          </div>

          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            margin: '0 0 12px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Select a Plan to Get Your API Key
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get instant access to your embeddable chat widget. Upgrade or change your plan anytime from your dashboard.
          </p>

          {errorMsg && (
            <div style={{
              marginTop: '24px',
              padding: '12px 20px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#f87171',
              fontSize: '0.95rem',
              display: 'inline-block',
              maxWidth: '500px'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          {/* Card 1: 14-Day Free Trial */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            transition: 'transform 0.2s ease, border-color 0.2s ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '8px'
              }}>
                14-Day Free Trial
              </div>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                margin: '0 0 20px 0',
                minHeight: '40px'
              }}>
                Full platform access for 14 days. No credit card required. Single-use.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>₹0</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '6px' }}>/ 14 days</span>
              </div>

              <div style={{
                borderTop: '1px solid #1f2937',
                paddingTop: '20px',
                marginBottom: '24px'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> 14 Days Full Trial Access
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> Instant API Key Generation
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> No Credit Card Required
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> Single-Use Activation
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('trial')}
              disabled={selectedPlanLoading !== null || trialAlreadyUsed}
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '10px',
                backgroundColor: trialAlreadyUsed ? '#1f2937' : '#374151',
                color: trialAlreadyUsed ? '#6b7280' : '#ffffff',
                border: '1px solid #4b5563',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: trialAlreadyUsed ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {selectedPlanLoading === 'trial' ? (
                <span>Activating Trial...</span>
              ) : trialAlreadyUsed ? (
                <span>Trial Already Used</span>
              ) : (
                <span>Start Free Trial</span>
              )}
            </button>
          </div>

          {/* Card 2: Basic Plan */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            transition: 'transform 0.2s ease, border-color 0.2s ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '8px'
              }}>
                Basic Plan
              </div>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                margin: '0 0 20px 0',
                minHeight: '40px'
              }}>
                Essential features for personal websites and early-stage projects.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>₹100</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '6px' }}>/ month</span>
              </div>

              <div style={{
                borderTop: '1px solid #1f2937',
                paddingTop: '20px',
                marginBottom: '24px'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> Unlimited Widget Displays
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> Standard Theme Customization
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> Instant Activation & Key
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <span style={{ color: '#10b981' }}>✓</span> Standard Email Support
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('basic')}
              disabled={selectedPlanLoading !== null}
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {selectedPlanLoading === 'basic' ? (
                <span>Activating Basic...</span>
              ) : (
                <span>Choose Basic — ₹100</span>
              )}
            </button>
          </div>

          {/* Card 3: Pro Plan (Recommended) */}
          <div style={{
            backgroundColor: '#0f172a',
            border: '2px solid #6366f1',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.25)',
            transform: 'scale(1.02)'
          }}>
            {/* Recommended Badge */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '24px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Recommended
            </div>

            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '8px'
              }}>
                Pro Plan
              </div>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                margin: '0 0 20px 0',
                minHeight: '40px'
              }}>
                For growing businesses requiring advanced customization & priority support.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>₹300</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '6px' }}>/ month</span>
              </div>

              <div style={{
                borderTop: '1px solid #1e293b',
                paddingTop: '20px',
                marginBottom: '24px'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#f1f5f9' }}>
                    <span style={{ color: '#818cf8', fontWeight: 'bold' }}>✓</span> Everything in Basic Plan
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#f1f5f9' }}>
                    <span style={{ color: '#818cf8', fontWeight: 'bold' }}>✓</span> Multi-Domain Embedding
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#f1f5f9' }}>
                    <span style={{ color: '#818cf8', fontWeight: 'bold' }}>✓</span> Remove Platform Branding
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#f1f5f9' }}>
                    <span style={{ color: '#818cf8', fontWeight: 'bold' }}>✓</span> Priority 24/7 Dedicated Support
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleSelectPlan('pro')}
              disabled={selectedPlanLoading !== null}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                transition: 'transform 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {selectedPlanLoading === 'pro' ? (
                <span>Activating Pro Plan...</span>
              ) : (
                <span>Choose Pro — ₹300</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
