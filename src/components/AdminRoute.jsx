import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--text-secondary)'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
