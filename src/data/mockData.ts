export interface Project {
  readonly id: string;
  readonly sysId: string;
  readonly refId: string;
  readonly category: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly accentColor: 'cyan' | 'lime';
  readonly colSpan: number;
}

export interface Experience {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly companyIcon: string;
  readonly dateRange: string;
  readonly systemId: string;
  readonly metrics: readonly { label: string; description: string; icon: string; color: 'lime' | 'cyan' }[];
  readonly bullets: readonly string[];
  readonly tags: readonly { label: string; color: 'lime' | 'cyan' | 'neutral' }[];
}

export interface SkillCategory {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly icon: string;
  readonly skills: readonly string[];
  readonly accentColor: 'lime' | 'cyan' | 'neutral';
  readonly colSpan: number;
}

export interface Education {
  readonly degree: string;
  readonly institution: string;
  readonly description: string;
  readonly expectedGraduation: string;
  readonly cgpa: string;
  readonly status: string;
}

export interface Milestone {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly platform: string;
  readonly accentColor: 'lime' | 'cyan';
}

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
] as const;

export const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Email', href: '#' },
] as const;

export const heroData = {
  systemInit: 'SYSTEM.INIT()',
  name: 'NIPUN GAHANE',
  subtitle: '// AI & CLOUD-NATIVE ENGINEER',
  description:
    'Building production-grade RAG pipelines and scalable cloud architectures. Engineering high-performance distributed systems with a focus on reliability and advanced ML integration.',
  ctaPrimary: 'View Experience',
  ctaSecondary: 'Download CV',
} as const;

export const coreStack = [
  { label: 'Python', color: 'lime' as const },
  { label: 'Java', color: 'lime' as const },
  { label: 'AWS', color: 'lime' as const },
  { label: 'LLMs', color: 'cyan' as const },
  { label: 'Kubernetes', color: 'cyan' as const },
  { label: 'Docker', color: 'cyan' as const },
] as const;

export const featuredProjects: readonly Project[] = [
  {
    id: 'rag-pipeline',
    sysId: 'RAG_PIPELINE',
    refId: '[REF-RAG-01]',
    category: 'RAG_PIPELINE',
    title: 'Enterprise Knowledge Search API',
    date: 'LATENCY: <200ms',
    description:
      'Architected a high-throughput Retrieval-Augmented Generation system using Python, FastAPI, and Pinecone. Implemented semantic caching reducing API costs by 40% while maintaining high accuracy for technical queries.',
    tags: ['Python', 'FastAPI', 'Pinecone'],
    accentColor: 'lime',
    colSpan: 8,
  },
  {
    id: 'event-bus',
    sysId: 'CLOUD_ARCH',
    refId: '[REF-SYS-02]',
    category: 'CLOUD_ARCH',
    title: 'Distributed Event Bus',
    date: '',
    description:
      'Built a resilient event-driven architecture processing 1M+ daily events using Java, Spring Boot, and Apache Kafka on AWS infrastructure.',
    tags: ['Java', 'AWS', 'Kafka'],
    accentColor: 'cyan',
    colSpan: 4,
  },
];

export const allProjects: readonly Project[] = [
  {
    id: 'finance-rag',
    sysId: 'SYS.01',
    refId: '[REF-FIN-01]',
    category: 'RAG',
    title: 'Finance RAG App (SEC 10-K Q&A)',
    date: 'Mar 2026',
    description:
      'Engineered a Retrieval-Augmented Generation system designed for complex financial document analysis. Specifically tailored to parse, index, and query SEC 10-K filings, providing accurate, context-aware answers to dense financial queries using state-of-the-art vector embedding techniques.',
    tags: ['Python', 'LangChain', 'ChromaDB'],
    accentColor: 'cyan',
    colSpan: 8,
  },
  {
    id: 'inventory-system',
    sysId: 'SYS.02',
    refId: '[REF-INV-02]',
    category: 'DISTRIBUTED',
    title: 'Cloud-Native Inventory System',
    date: 'Mar 2026',
    description:
      'Architected a highly scalable inventory management platform utilizing a microservices approach. Deployed on AWS with containerized orchestration ensuring high availability and fault tolerance.',
    tags: ['React', 'Spring Boot', 'AWS', 'Docker'],
    accentColor: 'lime',
    colSpan: 4,
  },
  {
    id: 'llm-finetuning',
    sysId: 'SYS.03',
    refId: '[REF-LLM-03]',
    category: 'ML_OPS',
    title: 'Efficient LLM Finetuning (Gemma 2B)',
    date: 'Oct 2025',
    description:
      'Implemented parameter-efficient fine-tuning (PEFT) techniques to optimize the Gemma 2B model for domain-specific tasks, significantly reducing computational overhead while maintaining inference quality.',
    tags: ['Python', 'PyTorch', 'Hugging Face'],
    accentColor: 'cyan',
    colSpan: 5,
  },
  {
    id: 'spam-detection',
    sysId: 'SYS.04',
    refId: '[REF-SEC-04]',
    category: 'CLASSIFICATION',
    title: 'Real-Time Spam Detection API',
    date: 'Jan 2024',
    description:
      'Developed a robust, low-latency API endpoint utilizing custom PyTorch neural networks to analyze and classify incoming text streams in real-time, effectively identifying and filtering malicious content patterns.',
    tags: ['Python', 'Flask', 'PyTorch'],
    accentColor: 'lime',
    colSpan: 7,
  },
];

export const experiences: readonly Experience[] = [
  {
    id: 'sc-gbs-01',
    role: 'Apprentice',
    company: 'Standard Chartered GBS',
    companyIcon: 'corporate_fare',
    dateRange: 'Jul 2025 – Present',
    systemId: 'ID: SC-GBS-01',
    metrics: [
      {
        label: '+40% Efficiency',
        description: 'Data retrieval optimized via custom RAG pipelines.',
        icon: 'trending_up',
        color: 'lime',
      },
      {
        label: '-25% Downtime',
        description: 'Reduction achieved through robust infrastructure monitoring.',
        icon: 'trending_down',
        color: 'cyan',
      },
    ],
    bullets: [
      'Developed complex <strong>RAG (Retrieval-Augmented Generation) pipelines</strong>, significantly improving the accuracy and efficiency of data retrieval workflows.',
      'Architected and built high-performance RESTful APIs utilizing <strong>Spring Boot</strong> to form the backbone of a scalable microservices architecture.',
      'Implemented proactive infrastructure monitoring solutions, ensuring critical system reliability and establishing rapid-response protocols.',
      'Actively participated in structured <strong>Agile</strong> development cycles, contributing meaningfully to daily stand-ups, technical refinements, and sprint planning.',
    ],
    tags: [
      { label: 'RAG Pipelines', color: 'lime' },
      { label: 'Spring Boot', color: 'cyan' },
      { label: 'RESTful APIs', color: 'neutral' },
      { label: 'Microservices', color: 'neutral' },
      { label: 'Infrastructure Monitoring', color: 'neutral' },
      { label: 'Agile', color: 'neutral' },
    ],
  },
];

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'languages',
    moduleId: '[MOD_01]',
    title: 'Core Languages',
    icon: 'data_object',
    skills: ['Python', 'C++', 'Java', 'JavaScript / TypeScript', 'SQL', 'Go'],
    accentColor: 'lime',
    colSpan: 8,
  },
  {
    id: 'cloud',
    moduleId: '[MOD_02]',
    title: 'Cloud / Infra',
    icon: 'cloud',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
    accentColor: 'neutral',
    colSpan: 4,
  },
  {
    id: 'ai-ml',
    moduleId: '[MOD_03]',
    title: 'AI & Machine Learning',
    icon: 'memory',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'LLM Integration', 'Computer Vision', 'LangChain', 'LlamaIndex', 'Hugging Face', 'OpenAI API', 'RAG Pipelines', 'ChromaDB', 'Pinecone'],
    accentColor: 'cyan',
    colSpan: 5,
  },
  {
    id: 'tools',
    moduleId: '[MOD_04]',
    title: 'Tools & Frameworks',
    icon: 'build',
    skills: ['React.js', 'Node.js', 'FastAPI', 'Git', 'Linux', 'PostgreSQL', 'MongoDB'],
    accentColor: 'neutral',
    colSpan: 7,
  },
];

export const education: Education = {
  degree: 'B.Tech in Computer Science & Engineering',
  institution: 'SRM Institute of Science and Technology',
  description:
    'Comprehensive study of core computer science principles, algorithms, and advanced software engineering methodologies.',
  expectedGraduation: 'April 2025',
  cgpa: '8.2 / 10.0',
  status: 'STATUS: ACTIVE',
};

export const milestones: readonly Milestone[] = [
  {
    title: 'Algorithmic Problem Solving',
    description:
      'Successfully solved 300+ complex algorithmic challenges on LeetCode, optimizing for time and space complexity.',
    icon: 'code_blocks',
    platform: 'LEETCODE',
    accentColor: 'lime',
  },
  {
    title: 'Deep Learning Specialization',
    description:
      'Advanced certification covering neural networks, hyperparameter tuning, CNNs, and sequence models.',
    icon: 'workspace_premium',
    platform: 'DEEPLEARNING.AI',
    accentColor: 'cyan',
  },
];
