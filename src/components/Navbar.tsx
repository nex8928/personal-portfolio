import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/mockData';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)',
          maxWidth: '1200px',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          height: '64px',
          backgroundColor: 'rgba(19, 19, 19, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 12px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Logo and Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--on-surface)',
              textDecoration: 'none',
            }}
          >
            Nipun Gahane
          </Link>
          <div className="nav-links-desktop status-badge" style={{ display: 'inline-flex', padding: '4px 10px', fontSize: '10px', gap: '6px', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px' }}>
            <span className="status-dot-pulse" style={{ width: '6px', height: '6px' }} />
            <span>SYS // ONLINE</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="font-mono"
                style={{
                  color: isActive ? 'var(--tertiary)' : 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  padding: '8px 16px',
                  borderRadius: '16px',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--on-surface-variant)';
                  }
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Icon buttons (desktop) */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            {['code', 'terminal'].map((icon) => (
              <button
                key={icon}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'background 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                aria-label={icon}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
              </button>
            ))}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '100px',
              left: '24px',
              right: '24px',
              backgroundColor: 'rgba(19, 19, 19, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 24px',
              gap: '20px',
              alignItems: 'center'
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <Link
                    to={link.path}
                    className="font-mono"
                    style={{
                      color: isActive ? 'var(--tertiary)' : 'var(--on-surface-variant)',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: 500,
                      display: 'block',
                      padding: '12px',
                      borderRadius: '16px',
                      transition: 'color 0.3s, background 0.3s',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
