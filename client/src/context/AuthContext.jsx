import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    try {
      const response = await api.get('/subscription/current');
      if (response.data?.subscription) {
        setSubscription(response.data.subscription);
        return response.data.subscription;
      } else {
        setSubscription(null);
        return null;
      }
    } catch (error) {
      setSubscription(null);
      return null;
    }
  };

  // Check if current user is authenticated on initial load
  const refreshUser = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/me');
      if (response.data?.user) {
        setUser(response.data.user);
        await fetchSubscription();
      } else {
        setUser(null);
        setSubscription(null);
      }
    } catch (error) {
      setUser(null);
      setSubscription(null);
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
      await fetchSubscription();
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
      setSubscription(null);
    }
  };

  const setSubscriptionState = (sub) => {
    setSubscription(sub);
  };

  const hasActiveSubscription = !!(subscription && subscription.status === 'active');

  const value = {
    user,
    subscription,
    loading,
    isAuthenticated: !!user,
    hasActiveSubscription,
    login,
    signup,
    logout,
    refreshUser,
    refreshSubscription: fetchSubscription,
    setSubscriptionState
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
