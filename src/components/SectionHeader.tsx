import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <header ref={ref} className={`animate-in ${isVisible ? 'visible' : ''}`} style={{ marginBottom: '80px', maxWidth: '900px' }}>
      <h1 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--on-surface)' }}>
        <span style={{ color: 'var(--tertiary)', opacity: 0.7 }}>[</span>{title}<span style={{ color: 'var(--tertiary)', opacity: 0.7 }}>]</span>
      </h1>
      {subtitle && <p className="font-code" style={{ color: 'var(--on-surface-variant)', marginTop: '16px' }}>{subtitle}</p>}
    </header>
  );
};

export default SectionHeader;
