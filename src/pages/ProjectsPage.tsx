import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { allProjects } from '../data/mockData';
import AnimatedPage from '../components/AnimatedPage';
import CardTilt from '../components/CardTilt';
import BorderBeam from '../components/BorderBeam';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatedPage>
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
          <motion.div
            layout
            className="bento-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--outline)', marginBottom: '16px' }}>search_off</span>
            <p className="font-mono" style={{ fontSize: '15px' }}>No records found matching search queries.</p>
          </div>
        )}
      </main>
    </AnimatedPage>
  );
};

interface ProjectCardProps {
  readonly project: typeof allProjects[number];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project: p }) => {
  const accent = p.accentColor === 'cyan' ? 'var(--secondary-container)' : 'var(--tertiary)';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 15 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        layout: { duration: 0.4, type: 'spring', stiffness: 220, damping: 28 },
        opacity: { duration: 0.25 }
      }}
      style={{ gridColumn: `span ${p.colSpan}`, display: 'flex', flexDirection: 'column' }}
    >
      <CardTilt className="w-full h-full">
        {/* Outer Shell */}
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            boxSizing: 'border-box',
            position: 'relative'
          }}
        >
          <BorderBeam
            size={180}
            duration={15}
            borderWidth={1.5}
            colorFrom={accent}
            colorTo="transparent"
          />
          
          {/* Inner Core */}
          <div
            className={`cyber-card ${p.accentColor === 'cyan' ? 'accent-cyan' : ''}`}
            onMouseMove={handleMouseMove}
            style={{ 
              width: '100%', 
              height: '100%', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'relative', 
              cursor: 'default', 
              borderRadius: 'calc(24px - 8px)', 
              overflow: 'hidden',
              backgroundColor: 'var(--surface-container-low)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', zIndex: 2 }}>
              <span className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', fontSize: '11px' }}>{p.sysId} // {p.category}</span>
              <span className="font-mono" style={{ color: accent, opacity: 0.7, fontSize: '11px' }}>{p.refId}</span>
            </div>
            <h3 className="font-headline" style={{ fontSize: p.colSpan > 5 ? '28px' : '22px', color: 'var(--on-surface)', marginBottom: '8px', zIndex: 2 }}>{p.title}</h3>
            <p className="font-code" style={{ color: 'var(--on-surface-variant)', marginBottom: '20px', opacity: 0.8, zIndex: 2, fontSize: '12px' }}>{p.date}</p>
            <p className="font-body" style={{ color: 'var(--on-background)', marginBottom: '24px', maxWidth: '640px', lineHeight: 1.7, zIndex: 2, fontSize: '14px' }}>{p.description}</p>
            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px', zIndex: 2 }}>
              {p.tags.map((t) => (
                <span key={t} className={`tech-tag ${p.accentColor}`} style={{ fontSize: '12px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </CardTilt>
    </motion.div>
  );
};

export default ProjectsPage;
