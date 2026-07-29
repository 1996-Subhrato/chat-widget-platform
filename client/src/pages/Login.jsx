import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In Phase 0, we bypass auth logic and navigate directly to dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '8px' }}>Welcome back</h2>
      <p style={{ marginBottom: '24px', fontSize: '0.875rem' }}>Sign in to manage your chat widgets</p>

      <form onSubmit={handleSubmit}>
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
          Sign In
        </button>
      </form>

      <p style={{ marginTop: '24px', fontSize: '0.875rem' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>Create an account</Link>
      </p>
    </div>
  );
}
