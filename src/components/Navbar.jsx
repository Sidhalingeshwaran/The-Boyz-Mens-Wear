import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag } from 'react-icons/hi';
const brandLogo = "https://res.cloudinary.com/dtbjdbbtk/image/upload/v1773299233/logo_smk_mdqcth.jpg";

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={brandLogo} alt="The Boys Mens Wear" className="navbar-logo" />
          <span className="navbar-title">
            THE <span className="highlight">BOYZ</span>
          </span>
        </Link>

        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className={`hamburger ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
