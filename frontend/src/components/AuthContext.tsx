import React, { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContextValue';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    if (token && expiry) {
      if (new Date().getTime() > parseInt(expiry, 10)) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTokenExpiry');
        return false;
      }
      return true;
    }
    return false;
  });

  const login = (token: string) => {
    const expiryTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 days
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminTokenExpiry', expiryTime.toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkExpiry = () => {
      const expiry = localStorage.getItem('adminTokenExpiry');
      if (expiry && new Date().getTime() > parseInt(expiry, 10)) {
        logout();
      }
    };
    const interval = setInterval(checkExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
