import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Simple password-only admin auth
const ADMIN_PASSWORD = 'theboyz2026';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in via sessionStorage
    const stored = sessionStorage.getItem('theboyz_admin');
    if (stored === 'true') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem('theboyz_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('theboyz_admin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
