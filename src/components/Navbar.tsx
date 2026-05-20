import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
          top: 0,
          width: '100%',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 var(--margin-desktop)',
          height: '64px',
          backgroundColor: 'rgba(19, 19, 19, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--outline-variant)',
        }}
      >
        {/* Logo and Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--on-surface)',
              textDecoration: 'none',
            }}
          >
            Nipun Gahane
          </Link>
          <div className="nav-links-desktop status-badge" style={{ display: 'inline-flex', padding: '4px 10px', fontSize: '11px', gap: '6px' }}>
            <span className="status-dot-pulse" style={{ width: '6px', height: '6px' }} />
            <span>SYS // DEPLOYED</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 'var(--gutter)' }}>
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
                  padding: '8px 12px',
                  borderBottom: isActive ? '1px solid var(--tertiary)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--on-surface-variant)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
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

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
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
                fontSize: '18px',
                padding: '12px 24px',
                borderBottom: isActive ? '1px solid var(--tertiary)' : '1px solid transparent',
                transition: 'color 0.3s',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
