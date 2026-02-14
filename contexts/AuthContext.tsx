
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  useEffect(() => {
    // Check local storage on mount
    const storedAuth = localStorage.getItem('coshare_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser({
        id: 'user-1',
        name: 'Jonathan Sterling',
        email: 'j.sterling@familyoffice.com'
      });
    }
  }, []);

  const login = () => {
    localStorage.setItem('coshare_auth', 'true');
    setIsAuthenticated(true);
    setUser({
      id: 'user-1',
      name: 'Jonathan Sterling',
      email: 'j.sterling@familyoffice.com'
    });
  };

  const logout = () => {
    localStorage.removeItem('coshare_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
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
