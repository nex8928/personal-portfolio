import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experiences } from '../data/mockData';

const ExperiencePage: React.FC = () => (
  <main className="page-enter" style={{ flexGrow: 1, paddingTop: '128px', paddingBottom: 'var(--section-gap)', paddingLeft: 'var(--margin-desktop)', paddingRight: 'var(--margin-desktop)', position: 'relative' }}>
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.05, backgroundImage: 'linear-gradient(to right, #444748 1px, transparent 1px), linear-gradient(to bottom, #444748 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    <SectionHeader title="EXPERIENCE_LOG" subtitle="> Initializing professional timeline. Fetching latest deployment records..." />
    <div style={{ position: 'relative', maxWidth: '1100px', zIndex: 10 }}>
      {/* Vertical timeline line */}
      <div className="timeline-line" style={{ position: 'absolute', left: '16.666%', top: '16px', bottom: 0, width: '1px', backgroundColor: 'var(--outline-variant)', transform: 'translateX(-50%)' }} />
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}
      {/* EOF */}
      <div className="timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)' }}>
        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', paddingRight: '48px', position: 'relative' }}>
          <div className="timeline-node" style={{ position: 'absolute', right: 0, top: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--outline-variant)', transform: 'translateX(50%)', zIndex: 20 }} />
        </div>
        <div style={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
          <span className="font-code" style={{ color: 'var(--outline-variant)' }}>EOF // End of verifiable records.</span>
        </div>
      </div>
    </div>
  </main>
);

interface ExperienceCardProps {
  readonly experience: typeof experiences[number];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience: exp }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`animate-in ${isVisible ? 'visible' : ''} timeline-grid`} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)', marginBottom: 'var(--section-gap)', position: 'relative' }}>
      {/* Date & Node */}
      <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', paddingRight: '48px', paddingTop: '16px', position: 'relative' }}>
        <div className="timeline-node" style={{ position: 'absolute', right: 0, top: '24px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--background)', border: '2px solid var(--tertiary)', transform: 'translateX(50%)', zIndex: 20, transition: 'box-shadow 0.3s', boxShadow: isVisible ? '0 0 10px rgba(171,214,0,0.4)' : 'none' }} />
        <span className="font-code timeline-date-desktop" style={{ color: 'var(--tertiary)' }}>{exp.dateRange}</span>
      </div>
      {/* Card */}
      <article className="card-glow" style={{ gridColumn: 'span 8', backgroundColor: 'rgba(32,32,31,0.4)', backdropFilter: 'blur(12px)', border: '1px solid var(--outline-variant)', padding: '48px', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow line on top */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--tertiary), transparent)', opacity: 0, transition: 'opacity 0.5s' }} />

        {/* Mobile date */}
        <div className="timeline-date-mobile" style={{ display: 'none', marginBottom: '16px' }}>
          <span className="font-code" style={{ color: 'var(--tertiary)' }}>{exp.dateRange}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', borderBottom: '1px solid rgba(68,71,72,0.5)', paddingBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="font-headline" style={{ fontSize: '32px', color: 'var(--on-surface)', marginBottom: '8px' }}>{exp.role}</h2>
            <h3 className="font-body" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--outline)' }}>{exp.companyIcon}</span>
              {exp.company}
            </h3>
          </div>
          <div className="font-mono" style={{ color: 'var(--outline)', backgroundColor: 'var(--surface-container)', padding: '4px 12px', border: '1px solid rgba(68,71,72,0.5)' }}>{exp.systemId}</div>
        </div>

        {/* Metrics with animated entry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '32px' }}>
          {exp.metrics.map((m, i) => (
            <div key={m.label} className="metric-value" style={{ animationDelay: `${0.3 + i * 0.2}s`, backgroundColor: 'rgba(19,19,19,0.5)', border: '1px solid rgba(68,71,72,0.5)', padding: '16px', borderRadius: '4px', opacity: 0 }}>
              <span className="font-code" style={{ color: m.color === 'lime' ? 'var(--tertiary)' : 'var(--secondary-container)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '15px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'inherit' }}>{m.icon}</span>
                {m.label}
              </span>
              <span className="font-body" style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{m.description}</span>
            </div>
          ))}
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span className="font-code" style={{ color: 'var(--tertiary)', marginTop: '4px', flexShrink: 0 }}>&gt;</span>
              <p className="font-body" style={{ color: 'var(--on-surface)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: b }} />
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(68,71,72,0.3)' }}>
          {exp.tags.map((t) => (
            <span key={t.label} className={`tech-tag ${t.color}`} style={{ backgroundColor: 'rgba(19,19,19,0.5)', backdropFilter: 'blur(4px)' }}>{t.label}</span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ExperiencePage;
