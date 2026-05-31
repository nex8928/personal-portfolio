import React, { useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { experiences } from '../data/mockData';
import AnimatedPage from '../components/AnimatedPage';
import CardTilt from '../components/CardTilt';
import BorderBeam from '../components/BorderBeam';
import { motion, useScroll, useSpring } from 'framer-motion';

const ExperiencePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 75%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <AnimatedPage>
      <main className="page-enter" style={{ flexGrow: 1, paddingTop: '128px', paddingBottom: 'var(--section-gap)', paddingLeft: 'var(--margin-desktop)', paddingRight: 'var(--margin-desktop)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.05, backgroundImage: 'linear-gradient(to right, #444748 1px, transparent 1px), linear-gradient(to bottom, #444748 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <SectionHeader title="EXPERIENCE_LOG" subtitle="> Initializing professional timeline. Fetching latest deployment records..." />
        <div ref={containerRef} style={{ position: 'relative', maxWidth: '1100px', zIndex: 10 }}>
          {/* Vertical timeline line - Background Track */}
          <div className="timeline-line" style={{ position: 'absolute', left: '16.666%', top: '16px', bottom: 0, width: '1px', backgroundColor: 'var(--outline-variant)', transform: 'translateX(-50%)', opacity: 0.3 }} />

          {/* Vertical timeline line - Animated Progress */}
          <motion.div
            style={{
              position: 'absolute',
              left: '16.666%',
              top: '16px',
              bottom: 0,
              width: '2px',
              backgroundColor: 'var(--tertiary)',
              boxShadow: '0 0 10px var(--tertiary), 0 0 20px rgba(171,214,0,0.5)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
              scaleY: scaleY,
              zIndex: 15
            }}
          />

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
    </AnimatedPage>
  );
};

interface ExperienceCardProps {
  readonly experience: typeof experiences[number];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
} as const;

const nodeVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    boxShadow: '0 0 12px var(--tertiary)',
    transition: { type: 'spring', stiffness: 220, damping: 15 }
  }
} as const;

const metricVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
} as const;

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience: exp }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      className="timeline-grid"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)', marginBottom: 'var(--section-gap)', position: 'relative' }}
    >
      {/* Date & Node */}
      <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', paddingRight: '48px', paddingTop: '16px', position: 'relative' }}>
        <motion.div
          variants={nodeVariants}
          className="timeline-node"
          style={{
            position: 'absolute',
            right: 0,
            top: '24px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'var(--background)',
            border: '2px solid var(--tertiary)',
            transform: 'translateX(50%)',
            zIndex: 20
          }}
        />
        <span className="font-code timeline-date-desktop" style={{ color: 'var(--tertiary)' }}>{exp.dateRange}</span>
      </div>

      {/* Card */}
      <CardTilt
        className="w-full"
        style={{
          gridColumn: 'span 8',
        }}
      >
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
          <BorderBeam size={260} duration={16} borderWidth={1.5} colorFrom="var(--tertiary)" colorTo="var(--secondary-container)" />
          
          {/* Inner Core */}
          <article 
            className="cyber-card" 
            onMouseMove={handleMouseMove} 
            style={{ 
              width: '100%', 
              height: '100%', 
              padding: '32px', 
              borderRadius: 'calc(24px - 8px)', 
              position: 'relative', 
              overflow: 'hidden',
              backgroundColor: 'var(--surface-container-low)',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
              boxSizing: 'border-box'
            }}
          >
            {/* Glow line on top */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--tertiary), transparent)', opacity: 0, transition: 'opacity 0.5s', zIndex: 2 }} />

            {/* Inner Content with z-index wrapper */}
            <div style={{ position: 'relative', zIndex: 2 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                {exp.metrics.map((m) => (
                  <motion.div 
                    key={m.label} 
                    variants={metricVariants}
                    style={{ 
                      backgroundColor: 'rgba(19,19,19,0.5)', 
                      border: '1px solid rgba(68,71,72,0.5)', 
                      padding: '16px', 
                      borderRadius: '4px' 
                    }}
                  >
                    <span className="font-code" style={{ color: m.color === 'lime' ? 'var(--tertiary)' : 'var(--secondary-container)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '15px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'inherit' }}>{m.icon}</span>
                      {m.label}
                    </span>
                    <span className="font-body" style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{m.description}</span>
                  </motion.div>
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
            </div>
          </article>
        </div>
      </CardTilt>
    </motion.div>
  );
};

export default ExperiencePage;
