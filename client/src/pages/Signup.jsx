import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to onboarding upon registration
    navigate('/onboarding');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '8px' }}>Get Started</h2>
      <p style={{ marginBottom: '24px', fontSize: '0.875rem' }}>Create an account to deploy dynamic chat widgets</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            className="form-control" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>
          Create Account
        </button>
      </form>

      <p style={{ marginTop: '24px', fontSize: '0.875rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Sign in</Link>
      </p>
    </div>
  );
}
