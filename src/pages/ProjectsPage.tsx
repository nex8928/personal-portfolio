import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { allProjects } from '../data/mockData';

const ProjectsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(allProjects.map((p) => p.category)))];

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="page-enter" style={{ flexGrow: 1, padding: '128px var(--margin-desktop) var(--section-gap)', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      <SectionHeader title="PROJECTS_ARCHIVE" subtitle="A collection of engineering projects focused on AI infrastructure, scalable backend systems, and data processing. Selected works demonstrate full-stack capabilities and deep technical implementation." />
      
      {/* Search & Filtering Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px', marginTop: '24px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)', fontSize: '20px' }}>search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, description, or stack..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              backgroundColor: 'rgba(28, 27, 27, 0.4)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '6px',
              color: 'var(--on-surface)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--tertiary)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--outline-variant)'}
          />
        </div>

        {/* Categories Tab Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-mono"
              style={{
                padding: '8px 16px',
                backgroundColor: activeCategory === cat ? 'rgba(171, 214, 0, 0.15)' : 'rgba(32, 32, 31, 0.4)',
                border: activeCategory === cat ? '1px solid var(--tertiary)' : '1px solid var(--outline-variant)',
                color: activeCategory === cat ? 'var(--tertiary)' : 'var(--on-surface-variant)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '12px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.borderColor = 'var(--outline-variant)';
                  e.currentTarget.style.color = 'var(--on-surface-variant)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {filteredProjects.length > 0 ? (
        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)' }}>
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline)', marginBottom: '16px' }}>search_off</span>
          <p className="font-mono" style={{ fontSize: '15px' }}>No records found matching search queries.</p>
        </div>
      )}
    </main>
  );
};

interface ProjectCardProps {
  readonly project: typeof allProjects[number];
  readonly index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project: p, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const accent = p.accentColor === 'cyan' ? 'var(--secondary-container)' : 'var(--tertiary)';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={ref}
      className={`cyber-card animate-in stagger-${(index % 4) + 1} ${isVisible ? 'visible' : ''} ${p.accentColor === 'cyan' ? 'accent-cyan' : ''}`}
      onMouseMove={handleMouseMove}
      style={{ gridColumn: `span ${p.colSpan}`, padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'default' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', zIndex: 2 }}>
        <span className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase' }}>{p.sysId} // {p.category}</span>
        <span className="font-mono" style={{ color: accent, opacity: 0.7 }}>{p.refId}</span>
      </div>
      <h3 className="font-headline" style={{ fontSize: p.colSpan > 5 ? '32px' : '24px', color: 'var(--on-surface)', marginBottom: '8px', zIndex: 2 }}>{p.title}</h3>
      <p className="font-code" style={{ color: 'var(--on-surface-variant)', marginBottom: '24px', opacity: 0.8, zIndex: 2 }}>{p.date}</p>
      <p className="font-body" style={{ color: 'var(--on-background)', marginBottom: '32px', maxWidth: '640px', lineHeight: 1.7, zIndex: 2 }}>{p.description}</p>
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px', zIndex: 2 }}>
        {p.tags.map((t) => (
          <span key={t} className={`tech-tag ${p.accentColor}`} style={{ fontSize: '13px' }}>{t}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
