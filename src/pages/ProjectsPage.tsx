import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { allProjects } from '../data/mockData';

const ProjectsPage: React.FC = () => (
  <main className="page-enter" style={{ flexGrow: 1, padding: '128px var(--margin-desktop) var(--section-gap)' }}>
    <SectionHeader title="Projects_Archive" subtitle="A collection of engineering projects focused on AI infrastructure, scalable backend systems, and data processing. Selected works demonstrate full-stack capabilities and deep technical implementation." />
    <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)' }}>
      {allProjects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  </main>
);

interface ProjectCardProps {
  readonly project: typeof allProjects[number];
  readonly index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project: p, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const accent = p.accentColor === 'cyan' ? 'var(--secondary-container)' : 'var(--tertiary)';
  return (
    <div
      ref={ref}
      className={`glass-panel card-glow animate-in stagger-${(index % 4) + 1} ${isVisible ? 'visible' : ''}`}
      style={{ gridColumn: `span ${p.colSpan}`, padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'default' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <span className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>{p.sysId} // {p.category}</span>
        <span className="font-mono" style={{ color: accent, opacity: 0.7 }}>{p.refId}</span>
      </div>
      <h3 className="font-headline" style={{ fontSize: p.colSpan > 5 ? '32px' : '24px', color: 'var(--on-surface)', marginBottom: '8px' }}>{p.title}</h3>
      <p className="font-code" style={{ color: 'var(--on-surface-variant)', marginBottom: '24px', opacity: 0.8 }}>{p.date}</p>
      <p className="font-body" style={{ color: 'var(--on-background)', marginBottom: '32px', maxWidth: '640px', lineHeight: 1.7 }}>{p.description}</p>
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {p.tags.map((t) => (
          <span key={t} className={`tech-tag ${p.accentColor}`} style={{ fontSize: '13px' }}>{t}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
