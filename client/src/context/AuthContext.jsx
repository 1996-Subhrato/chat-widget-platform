import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if current user is authenticated on initial load
  const refreshUser = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/me');
      if (response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const authenticatedUser = response.data?.user;
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error) {
      const errData = error.response?.data?.error;
      const message = errData?.message || 'Login failed. Please check your credentials.';
      const errObj = new Error(message);
      errObj.code = errData?.code;
      errObj.details = errData?.details;
      throw errObj;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      // Do NOT auto-login after signup
      return response.data;
    } catch (error) {
      const errData = error.response?.data?.error;
      const message = errData?.message || 'Signup failed. Please try again.';
      const errObj = new Error(message);
      errObj.code = errData?.code;
      errObj.details = errData?.details;
      throw errObj;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('[Logout API Error]:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
