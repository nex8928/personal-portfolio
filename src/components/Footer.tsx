import React from 'react';
import { socialLinks } from '../data/mockData';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: '100%',
        padding: 'var(--gutter) var(--margin-desktop)',
        backgroundColor: 'var(--surface-container-lowest)',
        borderTop: '1px solid var(--outline-variant)',
      }}
    >
      <div
        className="footer-content"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="font-mono" style={{ color: 'var(--tertiary)' }}>
          © 2024 NIPUN GAHANE [REF-DEPL-01]
        </div>
        <div style={{ display: 'flex', gap: 'var(--gutter)' }}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-code link-underline"
              style={{
                color: 'var(--on-surface-variant)',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--tertiary)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--on-surface-variant)';
                e.currentTarget.style.opacity = '0.8';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
