import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      // Authenticated users are directed to onboarding
      navigate('/onboarding');
    } catch (err) {
      if (err.details && Array.isArray(err.details)) {
        const mappedErrors = {};
        err.details.forEach((d) => {
          if (d.field) mappedErrors[d.field] = d.message;
        });
        setFieldErrors(mappedErrors);
      }
      setServerError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '8px' }}>Welcome back</h2>
      <p style={{ marginBottom: '24px', fontSize: '0.875rem' }}>Sign in to manage your chat widgets</p>

      {serverError && (
        <div className="alert alert-danger" role="alert">
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {fieldErrors.email && <span className="form-error">{fieldErrors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {fieldErrors.password && <span className="form-error">{fieldErrors.password}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: '10px' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span className="spinner" style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: '#ffffff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p style={{ marginTop: '24px', fontSize: '0.875rem' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
