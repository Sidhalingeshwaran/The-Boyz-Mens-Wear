import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hardcoded simple password for admin access
  const ADMIN_PASSWORD = 'theboyz2026';

  useEffect(() => {
    // Check session storage on load
    const isAuth = sessionStorage.getItem('admin_auth') === 'true';
    if (isAuth) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('admin_auth');
  };

  const value = {
    isAdmin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
