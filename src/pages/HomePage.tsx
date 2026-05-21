import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { heroData, coreStack, featuredProjects } from '../data/mockData';
import CardTilt from '../components/CardTilt';
import BorderBeam from '../components/BorderBeam';
import Magnet from '../components/Magnet';
import AnimatedPage from '../components/AnimatedPage';
import BlurText from '../components/BlurText';

/* ── RAG Pipeline Visualizer Component ── */
const RagVisualizer: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'IDLE' | 'CHUNKING' | 'EMBEDDING' | 'QUERYING' | 'GENERATING'>('IDLE');
  const [logs, setLogs] = useState<Array<{ type: 'info' | 'success' | 'warn'; text: string }>>([
    { type: 'success', text: 'SYSTEM RAG_FLOW GATEWAY: ONLINE' },
    { type: 'info', text: 'Ready to receive retrieval queries. Click "RUN DIAGNOSTIC FLOW"' }
  ]);
  const consoleEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = consoleEndRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  const runFlow = () => {
    if (pipelineState !== 'IDLE') return;

    setLogs([
      { type: 'info', text: '>>> Initializing RAG validation pipeline...' }
    ]);

    // Stage 1: Document Chunking
    setPipelineState('CHUNKING');
    setLogs(prev => [...prev, { type: 'info', text: '[INGEST] Reading document stream: sec_10k_filing.pdf' }]);

    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'success', text: '[INGEST] Chunking complete: Created 14 chunks (overlap: 50)' }]);

      // Stage 2: Embedding Generation
      setPipelineState('EMBEDDING');
      setLogs(prev => [...prev, { type: 'info', text: '[EMBED] Batching chunks to embedding model (dimensions: 1536)' }]);

      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'success', text: '[EMBED] Quantized dense vectors created successfully' }]);

        // Stage 3: Vector Index Query
        setPipelineState('QUERYING');
        setLogs(prev => [...prev, { type: 'info', text: '[INDEX] Performing Cosine Similarity query on Pinecone Index' }]);

        setTimeout(() => {
          setLogs(prev => [
            ...prev,
            { type: 'success', text: '[INDEX] Found 3 matching vectors (Top similarity: 0.892)' },
            { type: 'info', text: '[CONTEXT] Injecting context segments into prompt payload' }
          ]);

          // Stage 4: LLM Answer Synthesis
          setPipelineState('GENERATING');
          setLogs(prev => [...prev, { type: 'info', text: '[LLM] Passing context + query to Gemma-2B' }]);

          setTimeout(() => {
            setLogs(prev => [
              ...prev,
              { type: 'success', text: '[LLM] Token response generated successfully (Latency: 142ms)' },
              { type: 'success', text: 'RAG RESPONSE: "Nipun has built production-grade microservices and optimized Pinecone indexing."' }
            ]);
            setPipelineState('IDLE');
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <CardTilt className="w-full max-w-[550px] h-[470px]">
      <div className="glass-panel" style={{ width: '100%', height: '100%', padding: '20px 24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', boxSizing: 'border-box' }}>
        <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="var(--tertiary)" colorTo="var(--secondary-container)" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', height: '32px', boxSizing: 'border-box' }}>
          <h4 className="font-code" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)', fontSize: '20px' }}>psychology</span>
            RAG_PIPELINE_TELEMETRY
          </h4>
          <span className="font-mono" style={{ color: pipelineState === 'IDLE' ? 'var(--outline)' : 'var(--tertiary)', fontSize: '11px' }}>
            {pipelineState === 'IDLE' ? '// STANDBY' : `// RUNNING: ${pipelineState}`}
          </span>
        </div>

        {/* Visual Pipeline Nodes & Flows */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gridTemplateRows: '1fr 40px 1fr', gap: '8px', padding: '5px 0', alignItems: 'center', height: '220px', boxSizing: 'border-box' }}>

          {/* Node 1: Doc Ingest */}
          <div className={`rag-node ${pipelineState === 'CHUNKING' ? 'active-lime' : ''}`} style={{ height: '90px', justifyContent: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: pipelineState === 'CHUNKING' ? 'var(--tertiary)' : 'var(--outline)' }}>description</span>
            <span className="font-mono" style={{ fontSize: '10px', fontWeight: 'bold' }}>1. DOC_INGEST</span>
            <span className="font-code" style={{ fontSize: '9px', color: 'var(--on-surface-variant)' }}>PDF / Raw text</span>
          </div>

          {/* Connector 1 */}
          <div className={`flow-line ${pipelineState === 'EMBEDDING' ? 'active-lime' : ''}`} style={{ height: '2px', width: '100%' }} />

          {/* Node 2: Embedding Engine */}
          <div className={`rag-node ${pipelineState === 'EMBEDDING' ? 'active-lime' : ''}`} style={{ height: '90px', justifyContent: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: pipelineState === 'EMBEDDING' ? 'var(--tertiary)' : 'var(--outline)' }}>compress</span>
            <span className="font-mono" style={{ fontSize: '10px', fontWeight: 'bold' }}>2. EMBED_ENGINE</span>
            <span className="font-code" style={{ fontSize: '9px', color: 'var(--on-surface-variant)' }}>1536 dimensions</span>
          </div>

          {/* Connector row break */}
          <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', height: '40px', paddingRight: '60px', boxSizing: 'border-box' }}>
            <div className={`flow-line ${pipelineState === 'QUERYING' ? 'active-cyan' : ''}`} style={{ width: '2px', height: '100%', transform: 'scaleY(1.5)' }} />
          </div>

          {/* Node 4: LLM Response */}
          <div className={`rag-node ${pipelineState === 'GENERATING' ? 'active-lime' : ''}`} style={{ height: '90px', justifyContent: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: pipelineState === 'GENERATING' ? 'var(--tertiary)' : 'var(--outline)' }}>quickreply</span>
            <span className="font-mono" style={{ fontSize: '10px', fontWeight: 'bold' }}>4. LLM_GEN</span>
            <span className="font-code" style={{ fontSize: '9px', color: 'var(--on-surface-variant)' }}>Gemma / GPT-4</span>
          </div>

          {/* Connector 3 */}
          <div className={`flow-line ${pipelineState === 'GENERATING' ? 'active-lime' : ''}`} style={{ height: '2px', width: '100%', transform: 'scaleX(-1)' }} />

          {/* Node 3: Vector Store (Pinecone) */}
          <div className={`rag-node ${pipelineState === 'QUERYING' ? 'active-cyan' : ''}`} style={{ height: '90px', justifyContent: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: pipelineState === 'QUERYING' ? 'var(--secondary-container)' : 'var(--outline)' }}>database</span>
            <span className="font-mono" style={{ fontSize: '10px', fontWeight: 'bold' }}>3. VECTOR_DB</span>
            <span className="font-code" style={{ fontSize: '9px', color: 'var(--on-surface-variant)' }}>Pinecone Index</span>
          </div>

        </div>

        {/* Telemetry Console */}
        <div className="telemetry-console" style={{ height: '80px', minHeight: '80px', maxHeight: '80px', overflowY: 'auto', boxSizing: 'border-box' }}>
          {logs.map((log, i) => (
            <div key={i} className={`telemetry-line ${log.type}`}>
              {log.text}
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>

        {/* Trigger Button */}
        <button
          onClick={runFlow}
          disabled={pipelineState !== 'IDLE'}
          className="cta-primary"
          style={{ width: '100%', height: '42px', justifyContent: 'center', padding: '10px', cursor: pipelineState !== 'IDLE' ? 'not-allowed' : 'pointer', opacity: pipelineState !== 'IDLE' ? 0.6 : 1, boxSizing: 'border-box' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_arrow</span>
          {pipelineState === 'IDLE' ? 'RUN DIAGNOSTIC FLOW' : 'RETRIEVING EMBEDDINGS...'}
        </button>
      </div>
    </CardTilt>
  );
};

/* ── Hero Section ── */
const HeroSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`animate-in hero-grid ${isVisible ? 'visible' : ''}`}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '48px', marginBottom: 'var(--section-gap)', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Cinematic BlurText SYSTEM.INIT() */}
        <div className="font-code" style={{ color: 'var(--tertiary)', marginBottom: '16px', minHeight: '24px' }}>
          <BlurText
            text={heroData.systemInit}
            delay={25}
            animateBy="characters"
            direction="top"
            stepDuration={0.3}
          />
        </div>

        <h1 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--on-surface)', marginBottom: '24px' }}>
          <BlurText
            text={heroData.name}
            delay={40}
            animateBy="characters"
            direction="bottom"
            stepDuration={0.4}
          />
          <br />
          <span style={{ color: 'var(--on-surface-variant)', fontSize: 'clamp(20px, 2.5vw, 32px)', display: 'inline-block', marginTop: '8px' }}>
            <BlurText
              text={heroData.subtitle}
              delay={30}
              animateBy="characters"
              direction="bottom"
              stepDuration={0.4}
            />
          </span>
        </h1>

        <p className="font-body" style={{ color: 'var(--on-surface-variant)', maxWidth: '640px', marginBottom: '40px', fontSize: '17px', lineHeight: 1.7 }}>
          {heroData.description}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Magnet>
            <Link to="/experience" className="cta-primary" style={{ display: 'inline-flex' }}>
              {heroData.ctaPrimary}
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
            </Link>
          </Magnet>
          <Magnet>
            <a
              href="https://drive.google.com/file/d/1nTHILeGvhTsBcLqAGWyKXZb5i-zW9Bmr/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel cta-secondary"
              style={{ textDecoration: 'none', display: 'inline-flex' }}
            >
              {heroData.ctaSecondary}
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>download</span>
            </a>
          </Magnet>
        </div>
      </div>

      {/* Rag Visualizer component replacing static orb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RagVisualizer />
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
          <CardTilt
            key={p.id}
            className={`stagger-${i + 1}`}
            style={{
              gridColumn: `span ${p.colSpan}`,
            }}
          >
            <div
              className="glass-panel card-glow"
              style={{
                width: '100%', height: '100%', padding: '32px', display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden', borderRadius: '12px',
              }}
            >
              <BorderBeam
                size={180}
                duration={12}
                delay={i * 2}
                borderWidth={1.5}
                colorFrom={p.accentColor === 'lime' ? 'var(--tertiary)' : 'var(--secondary-container)'}
                colorTo="transparent"
              />
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
          </CardTilt>
        ))}
      </div>
    </section>
  );
};

/* ── System Terminal Console ── */
const SystemTerminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Initializing secure connection to NIPUN_GAHANE_PORTFOLIO...',
    'System: Version 4.1.2 // Protocols: SSL, SSH, RAG_API',
    'Type "help" to list available telemetry commands.',
    ''
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = terminalEndRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];
    switch (cmd) {
      case 'help':
      case '?':
        response = [
          'Available commands:',
          '  about    - Print professional overview',
          '  skills   - List technical core stack details',
          '  projects - Show top engineering initiatives',
          '  status   - Run diagnostics on portfolio systems',
          '  clear    - Clear console display logs',
          '  socials  - Fetch secure contact coordinates'
        ];
        break;
      case 'about':
        response = [
          'NIPUN GAHANE // AI & Cloud-Native Engineer',
          '  Building production-grade RAG pipelines and scalable architectures.',
          '  Currently serving as an Apprentice at Standard Chartered GBS.',
          '  Focused on high-performance indexing, API latencies, and neural networks.'
        ];
        break;
      case 'skills':
        response = [
          'Core stack components online:',
          '  - Languages: Python, Java, JavaScript, TypeScript, C++, Go, SQL',
          '  - AI & ML: LangChain, PyTorch, TensorFlow, ChromaDB, Pinecone, LlamaIndex',
          '  - Cloud & Infra: AWS (EC2, Lambda, S3, RDS), Docker, Kubernetes, CI/CD'
        ];
        break;
      case 'projects':
        response = [
          'Active deployments detected:',
          '  - Enterprise Knowledge Search API [LATENCY: <200ms]',
          '  - Finance RAG Q&A (SEC 10-K Analysis)',
          '  - Distributed Event Bus (Kafka & Spring Boot)',
          '  - Efficient LLM Finetuning (Gemma 2B via PEFT)'
        ];
        break;
      case 'status':
        response = [
          'Running system diagnostics...',
          '  [OK]  Vector DB (Pinecone Instance): Connected [Ping: 12ms]',
          '  [OK]  FastAPI Endpoint Gateway: Active [Load: 0.14%]',
          '  [OK]  Model Embedding Latency: Nominal [180ms avg]',
          '  [OK]  Apprenticeship Ledger: Standard Chartered GBS [Active]',
          '  Status Code: 200 // Uptime: 99.98% // Node: Cloud-Native'
        ];
        break;
      case 'socials':
        response = [
          'Secure Connection Ports:',
          '  - GitHub:   github.com/nipungahane',
          '  - LinkedIn: linkedin.com/in/nipungahane',
          '  - Email:    nipun.gahane.work@gmail.com'
        ];
        break;
      case 'clear':
        setHistory([]);
        setInputValue('');
        return;
      default:
        response = [
          `Command not recognized: "${cmd}". Type "help" or "?" for all commands.`
        ];
    }

    setHistory((prev) => [...prev, `nipun@portfolio:~$ ${inputValue}`, ...response, '']);
    setInputValue('');
  };

  return (
    <section className="terminal-container" style={{ marginBottom: 'var(--section-gap)', padding: '0', display: 'flex', flexDirection: 'column' }}>
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="terminal-dot" style={{ backgroundColor: '#ff5f56' }} />
          <span className="terminal-dot" style={{ backgroundColor: '#ffbd2e' }} />
          <span className="terminal-dot" style={{ backgroundColor: '#27c93f' }} />
          <span style={{ color: 'var(--on-surface-variant)', fontSize: '12px', fontWeight: 'bold', marginLeft: '6px' }}>nipun_gahane@sys-console:~</span>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--outline)' }}>terminal</span>
      </div>
      <div style={{ padding: '20px', height: '240px', minHeight: '240px', maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--on-surface)', fontSize: '13px', lineHeight: '1.5', boxSizing: 'border-box' }}>
        {history.map((line, idx) => (
          <div key={idx} style={{ whiteSpace: 'pre-wrap', color: line.startsWith('nipun@') ? 'var(--tertiary)' : line.includes('[OK]') ? 'var(--secondary-container)' : 'var(--on-surface-variant)' }}>
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      <form onSubmit={handleCommand} className="terminal-input-container">
        <div className="terminal-input-line">
          <span className="terminal-prompt">nipun@portfolio:~$</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type 'help' or 'status'..."
            className="terminal-textbox"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </form>
    </section>
  );
};

/* ── Page Shell ── */
const HomePage: React.FC = () => (
  <AnimatedPage>
    <main className="page-enter" style={{ flexGrow: 1, paddingTop: '128px', paddingBottom: 'var(--section-gap)', paddingLeft: 'var(--margin-desktop)', paddingRight: 'var(--margin-desktop)', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      <HeroSection />
      <CoreStack />
      <SystemTerminal />
      <FeaturedProjects />
    </main>
  </AnimatedPage>
);

export default HomePage;
