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
            size={160}
            duration={12}
            borderWidth={1.5}
            colorFrom={tagColor}
            colorTo="transparent"
          />
          
          {/* Inner Core */}
          <div 
            className="cyber-card"
            style={{ 
              width: '100%', 
              height: '100%', 
              padding: '24px', 
              position: 'relative', 
              overflow: 'hidden', 
              cursor: 'default', 
              borderRadius: 'calc(24px - 8px)',
              backgroundColor: 'var(--surface-container-low)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', zIndex: 2 }} className="font-mono">
              <span style={{ color: 'var(--outline-variant)', fontSize: '11px' }}>{cat.moduleId}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', zIndex: 2 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>{cat.icon}</span>
              <h3 className="font-code" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px' }}>{cat.title}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', zIndex: 2 }}>
              {cat.skills.map((s) => (
                <span key={s} style={{ border: '1px solid var(--outline-variant)', borderRadius: '12px', color: tagColor, padding: '6px 12px', fontFamily: "'JetBrains Mono'", fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = tagColor; e.currentTarget.style.backgroundColor = `${tagColor}11`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  {s}
                </span>
              ))}
            </div>
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
              size={240}
              duration={16}
              borderWidth={1.5}
              colorFrom="var(--tertiary)"
              colorTo="transparent"
            />
            
            {/* Inner Core */}
            <div 
              className="cyber-card" 
              style={{ 
                padding: '24px', 
                position: 'relative', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '100%', 
                borderRadius: 'calc(24px - 8px)', 
                overflow: 'hidden',
                backgroundColor: 'var(--surface-container-low)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', zIndex: 2 }} className="font-mono"><span style={{ color: 'var(--outline-variant)', fontSize: '11px' }}>{education.status}</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', zIndex: 2 }}>
                <div className="font-code" style={{ color: 'var(--tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontSize: '13px' }}>{education.degree}</div>
                <h3 className="font-headline" style={{ fontSize: '28px', color: 'var(--on-surface)' }}>{education.institution}</h3>
                <p className="font-body" style={{ color: 'var(--on-surface-variant)', maxWidth: '480px', marginTop: '8px', zIndex: 2, fontSize: '14px', lineHeight: 1.6 }}>{education.description}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px', borderTop: '1px solid rgba(68,71,72,0.5)', paddingTop: '20px', zIndex: 2 }}>
                <div>
                  <div className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', marginBottom: '4px', fontSize: '10px' }}>Already Graduated</div>
                  <div className="font-code" style={{ color: 'var(--primary)', fontSize: '13px' }}>{education.expectedGraduation}</div>
                </div>
                <div>
                  <div className="font-mono" style={{ color: 'var(--outline)', textTransform: 'uppercase', marginBottom: '4px', fontSize: '10px' }}>Current CGPA</div>
                  <div className="font-code" style={{ color: 'var(--tertiary)', fontSize: '16px' }}>{education.cgpa}</div>
                </div>
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
                {/* Outer Shell */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    boxSizing: 'border-box',
                    position: 'relative'
                  }}
                >
                  <BorderBeam
                    size={140}
                    duration={10}
                    borderWidth={1.5}
                    colorFrom={milestoneAccent}
                    colorTo="transparent"
                  />
                  
                  {/* Inner Core */}
                  <div 
                    className="cyber-card" 
                    style={{ 
                      padding: '16px', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '16px', 
                      cursor: 'default', 
                      borderRadius: 'calc(20px - 6px)', 
                      overflow: 'hidden',
                      backgroundColor: 'var(--surface-container-low)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ backgroundColor: 'var(--surface-container-high)', padding: '10px', border: '1px solid var(--outline-variant)', zIndex: 2, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ color: milestoneAccent, fontSize: '20px' }}>{m.icon}</span>
                    </div>
                    <div style={{ zIndex: 2 }}>
                      <h4 className="font-code" style={{ color: 'var(--primary)', marginBottom: '4px', fontSize: '13px' }}>{m.title}</h4>
                      <p className="font-body" style={{ color: 'var(--on-surface-variant)', fontSize: '13px', lineHeight: 1.5 }}>{m.description}</p>
                      <div style={{ marginTop: '10px' }}>
                        <span className="font-mono" style={{ color: milestoneAccent, border: `1px solid ${m.accentColor === 'lime' ? 'rgba(171,214,0,0.3)' : 'rgba(0,241,254,0.3)'}`, borderRadius: '6px', padding: '2px 8px', fontSize: '9px' }}>{m.platform}</span>
                      </div>
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
