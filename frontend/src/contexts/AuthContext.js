import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await apiRequest('/auth/profile', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setUser(response.user);
          setToken(storedToken);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      data: { email, password }
    });

    const { user: userData, token: userToken } = response;
    
    localStorage.setItem('token', userToken);
    setUser(userData);
    setToken(userToken);
    
    return response;
  };

  const register = async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      data: userData
    });

    const { user: newUser, token: newToken } = response;
    
    localStorage.setItem('token', newToken);
    setUser(newUser);
    setToken(newToken);
    
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (profileData) => {
    const response = await apiRequest('/auth/profile', {
      method: 'PUT',
      data: profileData,
      headers: { Authorization: `Bearer ${token}` }
    });

    setUser(response.user);
    return response;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!token && !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
