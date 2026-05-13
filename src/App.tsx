import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  Contact,
  Download,
  FolderGit2,
  Mail,
  MoveUpRight,
  Network,
  Sparkles,
} from 'lucide-react'
import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import './index.css'

const HeroCanvas = lazy(() => import('./components/HeroCanvas'))

const profileLinks = {
  github: 'https://github.com/advitp686',
  linkedin: 'https://www.linkedin.com/in/advit-pandey-1a733130a/',
  email: 'connect@advitpandey.dev',
  resume: '/Advit-Pandey-Resume.pdf',
}

const projects = [
  {
    title: 'Adaptive Task Management System',
    eyebrow: 'Agentic planning system',
    description:
      'A backend-first planner that uses local Gemma models through llama.cpp to decompose goals, monitor task state, and propose replanning while SQLite stays the source of truth.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Gemma', 'llama.cpp'],
    link: 'https://github.com/advitp686/Capstone-2026-TaskMangement',
    accent: 'blue',
    stats: ['Local LLM', 'Policy layer', 'Goal revision'],
  },
  {
    title: 'Plant Health Management App',
    eyebrow: 'Computer vision workflow',
    description:
      'A plant disease diagnosis app built around transfer learning, CNN inference, backend integration, and a mobile-friendly decision support interface.',
    tags: ['PyTorch', 'CNN', 'Transfer learning', 'Node.js'],
    link: 'https://github.com/advitp686/Carbomato-Plant-Health-Detecting-App',
    accent: 'teal',
    stats: ['99.8% accuracy', 'Vision model', 'Field use case'],
  },
  {
    title: 'AI-Powered News Workflows',
    eyebrow: 'NLP and recommendation systems',
    description:
      'Internship work around NLP categorization, sentiment analysis, and collaborative filtering for more personalized news discovery.',
    tags: ['NLP', 'Sentiment', 'Recommendations'],
    link: profileLinks.github,
    accent: 'plum',
    stats: ['Categorization', 'Ranking', 'Personalization'],
  },
  {
    title: 'Upcoming GenAI Build',
    eyebrow: 'Reserved for next launch',
    description:
      'A public project slot for a RAG or agentic AI system with an architecture view, demo flow, and measurable evaluation notes.',
    tags: ['RAG', 'Agents', 'Evaluation'],
    link: profileLinks.github,
    accent: 'gold',
    stats: ['In progress', 'Demo-ready', 'Case study'],
  },
]

const experiences = [
  {
    company: 'Tech Mahindra',
    role: 'AI/ML Intern',
    period: 'May 2025 - Present',
    description:
      'Developing fraud detection workflows for banking transactions using XGBoost, anomaly detection, feature pipelines, and production-minded inference patterns.',
  },
  {
    company: 'Department of Computer Science, IIT Patna',
    role: 'Data Science Intern',
    period: 'May 2024 - Feb 2025',
    description:
      'Fine-tuned LLM and NLP pipelines, built scraping workflows for 50,000+ data points, and experimented with transformer-based extraction systems.',
  },
  {
    company: 'Your Engineering',
    role: 'AI Intern',
    period: 'May 2025 - Oct 2025',
    description:
      'Built AI-powered news workflows for content categorization, sentiment analysis, and collaborative-filtering recommendations.',
  },
]

const skillGroups = [
  {
    label: 'AI and LLM',
    skills: ['LangChain', 'LangGraph', 'RAG', 'Tool calling', 'Embeddings', 'Vector stores', 'llama.cpp', 'Evaluation'],
  },
  {
    label: 'ML and data',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    label: 'Backend and tools',
    skills: ['FastAPI', 'Node.js', 'REST APIs', 'SQLite', 'Git', 'AWS', 'Google Cloud'],
  },
  {
    label: 'Languages',
    skills: ['Python', 'SQL', 'Java', 'C++'],
  },
]

const agentNodes = [
  { label: 'Intent', detail: 'Goal enters', x: 4, y: 16, accent: 'blue', active: true },
  { label: 'Planner', detail: 'Breaks work into steps', x: 54, y: 16, accent: 'plum' },
  { label: 'Tools', detail: 'APIs, retrieval, models', x: 29, y: 42, accent: 'teal' },
  { label: 'Memory', detail: 'State and task history', x: 4, y: 68, accent: 'gold' },
  { label: 'Evaluate', detail: 'Checks quality and risk', x: 54, y: 68, accent: 'green' },
  { label: 'Response', detail: 'Useful answer or action', x: 29, y: 86, accent: 'blue', active: true },
]

const agentEdges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
]

function TiltProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 20 })

  return (
    <motion.article
      className={`project-card accent-${project.accent}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left) / rect.width - 0.5)
        y.set((event.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <div className="project-visual">
        <div className="orb one" />
        <div className="orb two" />
        <div className="orb three" />
        <svg viewBox="0 0 280 160" role="presentation" aria-hidden="true">
          <path d="M44 92 C86 36, 126 124, 170 72 S230 70, 242 38" />
          <circle cx="44" cy="92" r="8" />
          <circle cx="126" cy="112" r="6" />
          <circle cx="170" cy="72" r="7" />
          <circle cx="242" cy="38" r="8" />
        </svg>
      </div>
      <div className="project-copy">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-stats">
        {project.stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </div>
      <div className="project-footer">
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </motion.article>
  )
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  )
}

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Advit Pandey home">
          Advit Pandey
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#lab">Lab</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="icon-button resume-link" href={profileLinks.resume} target="_blank" rel="noreferrer">
          <Download size={16} />
          Resume
        </a>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-atmosphere" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">AI/ML Developer - GenAI - Agentic AI</p>
          <h1 className="hero-name">Advit Pandey</h1>
          <p className="hero-title">Building useful AI systems from models, tools, and feedback loops.</p>
          <p className="hero-summary">
            I am a Computer Science and Data Analytics student at IIT Patna on the BS degree track, focused on GenAI
            engineering, agentic workflows, local LLMs, and applied machine learning systems.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              <Sparkles size={17} />
              View work
            </a>
            <a className="secondary-button" href={profileLinks.resume} target="_blank" rel="noreferrer">
              <Download size={17} />
              Download resume
            </a>
          </div>
          <div className="social-row" aria-label="Profile links">
            <a href={profileLinks.github} target="_blank" rel="noreferrer">
              <FolderGit2 size={18} />
              GitHub
            </a>
            <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
              <Contact size={18} />
              LinkedIn
            </a>
            <a href={`mailto:${profileLinks.email}`}>
              <Mail size={18} />
              Email
            </a>
          </div>
        </motion.div>
        <motion.div
          className="hero-object"
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="hero-canvas-fallback" />}>
            <HeroCanvas />
          </Suspense>
        </motion.div>
      </section>

      <section className="signal-strip" aria-label="Profile highlights">
        <div>
          <strong>IIT Patna</strong>
          <span>BS CS and Data Analytics, expected 2027</span>
        </div>
        <div>
          <strong>3 internships</strong>
          <span>AI/ML, data science, NLP</span>
        </div>
        <div>
          <strong>50K+ data points</strong>
          <span>Scraping and dataset pipelines</span>
        </div>
        <div>
          <strong>99.8%</strong>
          <span>Plant disease classification result</span>
        </div>
      </section>

      <section className="section" id="work">
        <SectionHeading eyebrow="Selected work" title="AI projects with real system shape">
          Each project is framed around the problem, the system, and the engineering choices behind it.
        </SectionHeading>
        <div className="project-grid">
          {projects.map((project, index) => (
            <TiltProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="lab-section" id="lab">
        <div className="lab-copy">
          <p className="eyebrow">AI Lab</p>
          <h2>Agent workflows, made visible.</h2>
          <p>
            My strongest direction is building AI systems that move beyond a single prompt: they plan, call tools, keep
            state, evaluate output, and return useful actions.
          </p>
          <div className="lab-points">
            <span>
              <BrainCircuit size={17} />
              Local LLM experiments
            </span>
            <span>
              <Network size={17} />
              Tool-using agents
            </span>
            <span>
              <MoveUpRight size={17} />
              Evaluation loops
            </span>
          </div>
        </div>

        <motion.div
          className="agent-map"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true" role="presentation">
            {agentEdges.map(([from, to], index) => {
              const start = agentNodes[from]
              const end = agentNodes[to]
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={start.x + 21}
                  y1={start.y + 7}
                  x2={end.x + 21}
                  y2={end.y + 7}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.08 * index }}
                />
              )
            })}
          </svg>
          {agentNodes.map((node, index) => (
            <motion.div
              key={node.label}
              className={`agent-node accent-${node.accent}${node.active ? ' is-active' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
            >
              <span />
              <strong>{node.label}</strong>
              <small>{node.detail}</small>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section experience-section" id="experience">
        <SectionHeading eyebrow="Experience" title="Applied AI work in real contexts">
          Internships that connect model work with data pipelines, product behavior, and reliability.
        </SectionHeading>
        <div className="timeline">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              className="timeline-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className="timeline-dot" />
              <div>
                <h3>{item.company}</h3>
                <p className="timeline-meta">
                  {item.role} / {item.period}
                </p>
              </div>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="skills-section" id="skills">
        <SectionHeading eyebrow="Skills" title="Focused stack for GenAI and ML engineering" />
        <div className="skills-list">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.label}>
              <h3>{group.label}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let's build useful AI.</h2>
          <p>
            Open to AI Engineer, GenAI Engineer, Agentic AI Engineer, and ML Developer roles. Public contact stays
            focused on email and professional links.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-button" href={`mailto:${profileLinks.email}`}>
            <Mail size={17} />
            {profileLinks.email}
          </a>
          <a className="secondary-button" href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            <Contact size={17} />
            LinkedIn
          </a>
          <a className="secondary-button" href={profileLinks.github} target="_blank" rel="noreferrer">
            <FolderGit2 size={17} />
            GitHub
          </a>
        </div>
      </section>

      <footer>
        <span>advitpandey.dev</span>
        <a href="#top">
          Back to top
          <ArrowUp size={15} />
        </a>
      </footer>
    </main>
  )
}

export default App
