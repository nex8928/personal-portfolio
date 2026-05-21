import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skillCategories, education, milestones } from '../data/mockData';
import AnimatedPage from '../components/AnimatedPage';
import CardTilt from '../components/CardTilt';
import BorderBeam from '../components/BorderBeam';

const SkillsPage: React.FC = () => (
  <AnimatedPage>
    <main className="page-enter" style={{ flexGrow: 1, paddingTop: '128px', paddingBottom: 'var(--section-gap)', paddingLeft: 'var(--margin-desktop)', paddingRight: 'var(--margin-desktop)', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--section-gap)' }}>
      <SkillsMatrix />
      <AcademicSection />
    </main>
  </AnimatedPage>
);

const SkillsMatrix: React.FC = () => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
    <SectionHeader title="TECHNICAL_MATRIX" subtitle="SYS_LOG // Current operational stack and proficiencies. Optimized for high-performance computing and intelligent systems architecture." />
    <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)' }}>
      {skillCategories.map((cat, i) => (
        <SkillCard key={cat.id} category={cat} index={i} />
      ))}
    </div>
  </section>
);

interface SkillCardProps {
  readonly category: typeof skillCategories[number];
  readonly index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category: cat, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const tagColor = cat.accentColor === 'lime' ? 'var(--tertiary)' : cat.accentColor === 'cyan' ? 'var(--secondary-container)' : 'var(--primary)';
  return (
    <div ref={ref} className={`animate-in stagger-${(index % 4) + 1} ${isVisible ? 'visible' : ''}`}
      style={{ gridColumn: `span ${cat.colSpan}`, display: 'flex', flexDirection: 'column' }}>
      <CardTilt className="w-full h-full">
        <div className="cyber-card"
          style={{ width: '100%', height: '100%', padding: '32px', position: 'relative', overflow: 'hidden', cursor: 'default', borderRadius: '8px' }}>
          <BorderBeam
            size={160}
            duration={12}
            borderWidth={1.5}
            colorFrom={tagColor}
            colorTo="transparent"
          />
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', zIndex: 2 }} className="font-mono">
            <span style={{ color: 'var(--outline-variant)' }}>{cat.moduleId}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', zIndex: 2 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>{cat.icon}</span>
            <h3 className="font-code" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cat.title}</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', zIndex: 2 }}>
            {cat.skills.map((s) => (
              <span key={s} style={{ border: '1px solid var(--outline-variant)', color: tagColor, padding: '6px 16px', fontFamily: "'JetBrains Mono'", fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em', transition: 'all 0.3s', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = tagColor; e.currentTarget.style.backgroundColor = `${tagColor}11`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </CardTilt>
    </div>
  );
};

const AcademicSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className={`animate-in bento-grid ${isVisible ? 'visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)' }}>
      {/* Education */}
      <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h2 className="font-headline" style={{ fontSize: '32px', color: 'var(--on-surface)' }}>
          <span style={{ color: 'var(--tertiary)' }}>[</span>ACADEMIC_RECORD<span style={{ color: 'var(--tertiary)' }}>]</span>
        </h2>
        <CardTilt className="w-full flex-grow">
          <div className="cyber-card" style={{ padding: '32px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <BorderBeam
              size={240}
              duration={16}
              borderWidth={1.5}
              colorFrom="var(--tertiary)"
              colorTo="transparent"
            />
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', zIndex: 2 }} className="font-mono"><span style={{ color: 'var(--outline-variant)' }}>{education.status}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', zIndex: 2 }}>
              <div className="font-code" style={{ color: 'var(--tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{education.degree}</div>
              <h3 className="font-headline" style={{ fontSize: '32px', color: 'var(--on-surface)' }}>{education.institution}</h3>
              <p className="font-body" style={{ color: 'var(--on-surface-variant)', maxWidth: '480px', marginTop: '8px', zIndex: 2 }}>{education.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '48px', borderTop: '1px solid rgba(68,71,72,0.5)', paddingTop: '24px', zIndex: 2 }}>
              <div>
                <div className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', marginBottom: '4px' }}>Already Graduated</div>
                <div className="font-code" style={{ color: 'var(--primary)' }}>{education.expectedGraduation}</div>
              </div>
              <div>
                <div className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', marginBottom: '4px' }}>Current CGPA</div>
                <div className="font-code" style={{ color: 'var(--tertiary)', fontSize: '18px' }}>{education.cgpa}</div>
              </div>
            </div>
          </div>
        </CardTilt>
      </div>
      {/* Milestones */}
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h2 className="font-headline" style={{ fontSize: '32px', color: 'var(--on-surface)' }}>
          <span style={{ color: 'var(--tertiary)' }}>[</span>MILESTONES<span style={{ color: 'var(--tertiary)' }}>]</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {milestones.map((m) => {
            const milestoneAccent = m.accentColor === 'lime' ? 'var(--tertiary)' : 'var(--secondary-container)';
            return (
              <CardTilt key={m.title} maxRotation={8} className="w-full">
                <div className="cyber-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px', cursor: 'default', borderRadius: '8px', overflow: 'hidden' }}>
                  <BorderBeam
                    size={140}
                    duration={10}
                    borderWidth={1.5}
                    colorFrom={milestoneAccent}
                    colorTo="transparent"
                  />
                  <div style={{ backgroundColor: 'var(--surface-container-high)', padding: '12px', border: '1px solid var(--outline-variant)', zIndex: 2 }}>
                    <span className="material-symbols-outlined" style={{ color: milestoneAccent }}>{m.icon}</span>
                  </div>
                  <div style={{ zIndex: 2 }}>
                    <h4 className="font-code" style={{ color: 'var(--primary)', marginBottom: '4px' }}>{m.title}</h4>
                    <p className="font-body" style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{m.description}</p>
                    <div style={{ marginTop: '12px' }}>
                      <span className="font-mono" style={{ color: milestoneAccent, border: `1px solid ${m.accentColor === 'lime' ? 'rgba(171,214,0,0.3)' : 'rgba(0,241,254,0.3)'}`, padding: '2px 8px', fontSize: '10px' }}>{m.platform}</span>
                    </div>
                  </div>
                </div>
              </CardTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;
