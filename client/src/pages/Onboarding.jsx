import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  
  const handleComplete = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '8px' }}>Setup Workspace</h2>
      <p style={{ marginBottom: '24px', fontSize: '0.875rem' }}>Step {step} of 2</p>

      {step === 1 ? (
        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="company">Company / Project Name</label>
            <input 
              type="text" 
              id="company" 
              className="form-control" 
              placeholder="Acme Corp" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required 
            />
          </div>
          <button 
            type="button" 
            onClick={nextStep} 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', marginTop: '10px' }}
            disabled={!companyName.trim()}
          >
            Continue
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="website">Website URL (for widget whitelist)</label>
            <input 
              type="url" 
              id="website" 
              className="form-control" 
              placeholder="https://example.com" 
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              required 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={prevStep} 
              className="btn btn-secondary" 
              style={{ flex: 1, padding: '12px' }}
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={handleComplete} 
              className="btn btn-primary" 
              style={{ flex: 2, padding: '12px' }}
              disabled={!websiteUrl.trim()}
            >
              Launch Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
