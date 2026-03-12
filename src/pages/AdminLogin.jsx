import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const brandLogo = "https://res.cloudinary.com/dtbjdbbtk/image/upload/v1773300091/amk_hd_vcbt23.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Incorrect password. Try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={brandLogo} alt="Logo" style={{ height: 60, margin: '0 auto', borderRadius: 8 }} />
        </div>
        <h1 className="auth-title">Admin Access</h1>
        <p className="auth-subtitle">Enter password to manage products</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Verifying...' : 'Enter Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
