import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="logo-container">
          <span className="logo-dot"></span>
          <span>ChatterFlow</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
