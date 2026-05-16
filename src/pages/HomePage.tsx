import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { heroData, coreStack, featuredProjects } from '../data/mockData';

/* ── Typewriter Hook ── */
function useTypewriter(text: string, speed = 60, delay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

/* ── Hero Section ── */
const HeroSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { displayed: initText, done: initDone } = useTypewriter(heroData.systemInit, 50, 300);
  const { displayed: subtitleText } = useTypewriter(heroData.subtitle, 40, 1200);

  return (
    <section
      ref={ref}
      className={`animate-in hero-grid ${isVisible ? 'visible' : ''}`}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: 'var(--section-gap)' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Typewriter SYSTEM.INIT() */}
        <div className={`font-code ${!initDone ? 'cursor-blink' : ''}`} style={{ color: 'var(--tertiary)', marginBottom: '16px', minHeight: '24px' }}>
          {initText}
        </div>

        <h1 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--on-surface)', marginBottom: '24px' }}>
          {heroData.name}
          <br />
          <span className="cursor-blink" style={{ color: 'var(--on-surface-variant)', fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
            {subtitleText}
          </span>
        </h1>

        <p className="font-body" style={{ color: 'var(--on-surface-variant)', maxWidth: '640px', marginBottom: '40px', fontSize: '17px', lineHeight: 1.7 }}>
          {heroData.description}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/experience" className="cta-primary">
            {heroData.ctaPrimary}
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
          </Link>
          <a
            href="https://drive.google.com/file/d/1nTHILeGvhTsBcLqAGWyKXZb5i-zW9Bmr/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel cta-secondary"
            style={{ textDecoration: 'none' }}
          >
            {heroData.ctaSecondary}
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>download</span>
          </a>
        </div>
      </div>

      {/* Hero Orb with pulse rings */}
      <div className="hero-orb-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-orb glass-panel" style={{
          width: '100%', maxWidth: '380px', aspectRatio: '1', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'visible', borderColor: 'rgba(171,214,0,0.2)',
        }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(171,214,0,0.12) 0%, rgba(0,241,254,0.05) 50%, transparent 70%)' }} />
          <span className="material-symbols-outlined" style={{ fontSize: '72px', color: 'var(--tertiary)', opacity: 0.4, zIndex: 1 }}>memory</span>

          {/* Orbit lines */}
          <div className="animate-spin-slow" style={{ position: 'absolute', width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(171,214,0,0.3), transparent)' }} />
          <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,241,254,0.15), transparent)', transform: 'rotate(60deg)', animation: 'spin-slow 6s linear infinite reverse' }} />

          {/* Orbiting dot */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'orbit 8s linear infinite' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--secondary-container)', transform: 'translate(-50%, -50%)', boxShadow: '0 0 8px rgba(0,241,254,0.6)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Core Stack ── */
const CoreStack: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className={`animate-in ${isVisible ? 'visible' : ''}`} style={{ marginBottom: 'var(--section-gap)' }}>
      <h2 className="font-code bracket-header" style={{ color: 'var(--on-surface-variant)', marginBottom: '24px' }}>CORE_STACK</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {coreStack.map((s, i) => (
          <span
            key={s.label}
            className={`tech-tag ${s.color}`}
            style={{ animationDelay: `${i * 0.08}s`, animation: 'fadeSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}
          >
            {s.label}
          </span>
        ))}
        <Link to="/skills" className="tech-tag neutral" style={{ textDecoration: 'none', cursor: 'pointer' }}>+ View All Skills</Link>
      </div>
    </section>
  );
};

/* ── Featured Projects ── */
const FeaturedProjects: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className={`animate-in ${isVisible ? 'visible' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '16px' }}>
        <h2 className="font-headline bracket-header" style={{ fontSize: '32px', color: 'var(--on-surface)' }}>FEATURED_PROJECTS</h2>
        <Link to="/projects" className="font-code" style={{ color: 'var(--tertiary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'transform 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
          ALL_PROJECTS <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_outward</span>
        </Link>
      </div>
      <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
        {featuredProjects.map((p, i) => (
          <div
            key={p.id}
            className={`glass-panel card-glow stagger-${i + 1}`}
            style={{
              gridColumn: `span ${p.colSpan}`, padding: '32px', display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Accent corner badge */}
            <div style={{
              position: 'absolute', top: 0, right: 0, padding: '6px 12px', fontSize: '13px',
              fontFamily: "'JetBrains Mono'", fontWeight: 500, letterSpacing: '0.05em',
              color: p.accentColor === 'lime' ? 'var(--tertiary)' : 'var(--secondary-container)',
              backgroundColor: p.accentColor === 'lime' ? 'rgba(171,214,0,0.08)' : 'rgba(0,241,254,0.08)',
              borderBottom: '1px solid', borderLeft: '1px solid',
              borderColor: p.accentColor === 'lime' ? 'rgba(171,214,0,0.2)' : 'rgba(0,241,254,0.2)',
            }}>
              {p.refId}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="font-mono" style={{ color: p.accentColor === 'lime' ? 'var(--secondary-container)' : 'var(--tertiary)' }}>{p.sysId}</span>
              {p.date && (
                <>
                  <span style={{ color: 'var(--outline-variant)' }}>|</span>
                  <span className="font-code" style={{ color: 'var(--on-surface-variant)', fontSize: '12px' }}>{p.date}</span>
                </>
              )}
            </div>

            <h3 className="font-headline" style={{ fontSize: p.colSpan > 4 ? '28px' : '20px', color: 'var(--on-surface)', marginBottom: '12px' }}>{p.title}</h3>
            <p className="font-body" style={{ color: 'var(--on-surface-variant)', marginBottom: '24px', fontSize: p.colSpan > 4 ? '16px' : '14px', lineHeight: 1.7 }}>{p.description}</p>

            <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {p.tags.map((t) => <span key={t} className="tech-tag neutral" style={{ fontSize: '12px', padding: '2px 8px' }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Page Shell ── */
const HomePage: React.FC = () => (
  <main className="page-enter" style={{ flexGrow: 1, paddingTop: '128px', paddingBottom: 'var(--section-gap)', paddingLeft: 'var(--margin-desktop)', paddingRight: 'var(--margin-desktop)', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
    <HeroSection />
    <CoreStack />
    <FeaturedProjects />
  </main>
);

export default HomePage;
