/**
 * =============================================================================
 * TRAJECTORY PAGE
 * =============================================================================
 * Career journey, education, recognition, and key projects.
 * All dates corrected: Ventures = 2025, Hackathons = 2026.
 */

'use client';

import { motion } from 'framer-motion';
import {
  Trophy,
  GraduationCap,
  Briefcase,
  Award,
  Bot,
  ChevronRight,
  PhoneCall,
  Medal,
  Zap,
  Smartphone,
  Eye,
  Mic,
} from 'lucide-react';

import { Section, Card, Timeline, Tag } from '@/components';

// ─── CAREER TIMELINE ────────────────────────────────────────────────────────────
const careerTimeline = [
  {
    year: 'June 2025 – August 2025',
    title: 'Business Operations & Revenue Optimization Intern',
    subtitle: 'Zendesk',
    description: 'Incoming intern focused on business operations and revenue optimization. Working cross-functionally to identify operational efficiencies and drive data-informed revenue strategies.',
    tags: ['Business Operations', 'Revenue Optimization', 'Data Analysis', 'Strategy'],
    highlight: true,
    badge: 'Upcoming',
  },
  {
    year: 'June 2025 – August 2025',
    title: 'Mergers & Acquisitions Analyst Intern',
    subtitle: 'Ernst & Young (EY) Consulting',
    description: 'Prepared pre-acquisition financial due diligence reports (red flag reports) for real estate acquisition deals. Conducted thorough due diligence for buy/sell-side parties, from reading balance sheets to checking criminal records. Assisted in IPO advisory by preparing Independent Accountants Reports (IAR) based on forecast financial information.',
    tags: ['M&A', 'Due Diligence', 'IPO Advisory', 'Financial Analysis'],
    highlight: true,
  },
  {
    year: 'July 2023 – August 2023',
    title: 'AI Intern',
    subtitle: 'Synechron Technologies',
    description: 'Developed an AI-powered cost estimator to streamline insurance claims, reducing manual processing time by 70%. Leveraged predictive analytics for accurate damage valuation. Trained ML model on 10k+ insurance claims data, improving prediction accuracy by 34%.',
    tags: ['Python', 'AI/ML', 'Predictive Analytics', 'Insurance'],
    highlight: true,
  },
];

// ─── RECOGNITION & COMPETITIONS (all 2026) ──────────────────────────────────────
const recognitionTimeline = [
  {
    year: '2026',
    title: '🏆 Google Award — CheeseHacks Hackathon',
    subtitle: 'AuraHealth — AI Patient Follow-Up Agent',
    description: 'Won the Google Award at CheeseHacks 2026 for building AuraHealth, a full-stack AI healthcare assistant with real-time bidirectional voice streaming (Twilio WebSocket), Google STT/TTS, Gemini 2.5 Flash, and Pinecone RAG.',
    tags: ['Google Award', 'Healthcare AI', 'Voice Streaming', 'RAG'],
    highlight: true,
  },
  {
    year: '2026',
    title: '🥈 2nd Place — MadData Data Science Competition',
    subtitle: 'TAM — Transaction Analysis Machine',
    description: 'Placed second at MadData 2026 with TAM, an agentic AI-powered financial due diligence platform using Claude 4.5 Sonnet, Isolation Forest anomaly detection, and ChromaDB RAG. Team: Yash Arvind, Diya Kothari, Hriday Thakkar. Advised by Ben Rugg & Varun Kumar.',
    tags: ['Data Science', 'Financial AI', 'Agentic Workflows'],
    highlight: true,
  },
  {
    year: '2026',
    title: '⚡ Finalist — CursorHacks Hackathon',
    subtitle: 'EarningsLens — Earnings Call Deception Detection',
    description: 'Built EarningsLens: real-time deception detection for earnings calls using Claude AI with 11-signal taxonomy, ChromaDB vector search against SEC filings, per-speaker credibility scoring, and live Finnhub market data.',
    tags: ['Claude AI', 'ChromaDB', 'SEC EDGAR', 'Deception Detection'],
    highlight: false,
  },
  {
    year: '2026',
    title: '⚡ Participant — ClaudeHacks Hackathon',
    subtitle: 'HelloNeighbour — Voice-Based Campus Social App',
    description: 'Built HelloNeighbour at ClaudeHacks 2026: voice-based anonymous neighbor connection app for UW-Madison dorms with KNN (k=3) matching from scratch, Claude API for profile analysis, Web Audio waveform visualization, and Vercel deployment.',
    tags: ['Claude API', 'KNN', 'Web Audio API', 'Voice Notes'],
    highlight: false,
  },
];

// ─── EDUCATION ──────────────────────────────────────────────────────────────────
const educationTimeline = [
  {
    year: 'September 2024 – December 2027',
    title: 'University of Wisconsin-Madison',
    subtitle: 'B.S. Data Science & Economics',
    description: "Junior pursuing dual degree in Data Science and Economics. Dean's List student with 3.8 GPA. Coursework in machine learning, quantitative methods, financial modeling, and predictive analytics. Active in entrepreneurship and finance communities.",
    tags: ['3.8 GPA', "Dean's List", 'Data Science', 'Economics'],
    highlight: true,
  },
];

// ─── KEY PROJECTS (dates corrected) ─────────────────────────────────────────────
const projects = [
  {
    title: 'TAM',
    type: 'Active Venture',
    year: '2025 – present',
    description: 'Agentic AI financial due diligence platform. Claude 4.5 Sonnet + Isolation Forest ML. Self-correcting extraction workflow with ChromaDB RAG. Full-stack Next.js + FastAPI. 2nd place MadData 2026. Interest from American Family Insurance & EY.',
    icon: Bot,
    highlight: true,
  },
  {
    title: 'Flux',
    type: 'Active Venture',
    year: '2025 – present',
    description: 'iOS co-founder matching app live on the App Store (4.8★, 6 ratings). Team of 6. Swift native. v2.1.0 with Google Drive resume uploads. Real user reviews: "Found my co-founder on this app."',
    icon: Smartphone,
    highlight: true,
  },
  {
    title: 'AuraHealth',
    type: 'Hackathon — CheeseHacks 2026',
    year: '2026',
    description: 'AI patient follow-up agent with bidirectional WebSocket voice streaming (Twilio ↔ Backend), Gemini 2.5 Flash, Pinecone RAG, and automated Cloud Scheduler triggers. Won the Google Award.',
    icon: PhoneCall,
    highlight: true,
  },
  {
    title: 'EarningsLens',
    type: 'Hackathon — CursorHacks 2026',
    year: '2026',
    description: 'Earnings call deception detection via Claude AI forced tool use, 11-signal taxonomy, ChromaDB SEC filing search, per-speaker credibility scoring, and live Finnhub market data.',
    icon: Eye,
    highlight: false,
  },
  {
    title: 'HelloNeighbour',
    type: 'Hackathon — ClaudeHacks 2026',
    year: '2026',
    description: 'Voice-based anonymous dorm connection app. KNN (k=3) matching from scratch, Claude API profile analysis, Web Audio waveform visualization, 15s voice notes.',
    icon: Mic,
    highlight: false,
  },
  {
    title: 'BoxMate',
    type: 'Past Venture',
    year: '2025 (completed)',
    description: 'Student storage marketplace. $10K revenue in 2 weeks. Regression analysis for pricing optimization. Python forecasting model.',
    icon: Award,
    highlight: false,
  },
];

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── TIMELINE WITH BADGES ──────────────────────────────────────────────────────
function TimelineWithBadges({ events }: { events: typeof careerTimeline }) {
  return (
    <motion.div className="relative" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-400/50 via-steel-800 to-transparent" />
      <div className="space-y-12">
        {events.map((event) => (
          <motion.div key={`${event.year}-${event.title}`} variants={fadeInUp} className="relative pl-8 md:pl-12">
            <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full transform -translate-x-1/2 ${event.highlight ? 'bg-accent-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-steel-700 border border-steel-600'}`}>
              {event.highlight && <span className="absolute inset-0 rounded-full bg-accent-400 animate-ping opacity-20" />}
            </div>
            <div className="group">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`inline-block font-mono text-xs uppercase tracking-wider ${event.highlight ? 'text-accent-400' : 'text-steel-500'}`}>{event.year}</span>
                {'badge' in event && event.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded-full border bg-blue-500/10 text-blue-400 border-blue-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
                    </span>
                    {event.badge}
                  </span>
                )}
              </div>
              <h3 className={`font-display text-xl md:text-2xl mb-1 ${event.highlight ? 'text-steel-50' : 'text-steel-200'}`}>{event.title}</h3>
              {event.subtitle && <p className="text-steel-400 font-medium mb-2">{event.subtitle}</p>}
              {event.description && <p className="text-steel-500 text-sm leading-relaxed max-w-2xl">{event.description}</p>}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {event.tags.map((tag) => <span key={tag} className="px-2 py-0.5 text-xs font-mono text-steel-500 bg-steel-900/50 rounded border border-steel-800/50">{tag}</span>)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── PAGE COMPONENT ─────────────────────────────────────────────────────────────
export default function TrajectoryPage() {
  return (
    <main className="min-h-screen bg-void-950">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.p variants={fadeInUp} className="text-accent-400 font-mono text-sm uppercase tracking-wider mb-4 text-center">The Journey</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl text-steel-50 mb-6 text-center">Trajectory</motion.h1>
            <motion.p variants={fadeInUp} className="text-steel-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-center">
              From AI-powered insurance systems to M&A due diligence. A path built on technical depth, financial acumen, and entrepreneurial execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Career Experience */}
      <Section id="career" heading="Experience" subheading="Professional Journey">
        <div className="max-w-3xl mx-auto">
          <TimelineWithBadges events={careerTimeline} />
        </div>
      </Section>

      {/* Recognition & Competitions */}
      <Section id="recognition" heading="Recognition & Competitions" subheading="Awards and hackathon results — all 2026" className="bg-void-900/30">
        <div className="max-w-3xl mx-auto">
          <Timeline events={recognitionTimeline} />
        </div>
      </Section>

      {/* Education */}
      <Section id="education" heading="Education" subheading="Academic Foundation">
        <div className="max-w-3xl mx-auto">
          <Timeline events={educationTimeline} />
        </div>
      </Section>

      {/* Key Projects */}
      <Section id="projects" heading="Key Projects" subheading="Ventures started 2025 · Hackathons built 2026" className="bg-void-900/30">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <motion.div key={project.title} variants={fadeInUp}>
              <Card variant={project.highlight ? 'accent' : 'default'} className="h-full">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${project.highlight ? 'bg-accent-400/20 text-accent-400' : 'bg-steel-800 text-steel-400'}`}>
                  <project.icon className="w-6 h-6" />
                </div>
                <span className={`inline-block font-mono text-xs uppercase tracking-wider mb-2 ${project.highlight ? 'text-accent-400' : 'text-steel-500'}`}>{project.type}</span>
                <h3 className="font-display text-xl text-steel-50 mb-1">{project.title}</h3>
                <p className="text-steel-500 text-sm mb-3">{project.year}</p>
                <p className="text-steel-400 text-sm leading-relaxed">{project.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Skills Highlight */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl text-steel-50 mb-6">What This Journey Built</motion.h2>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
              {['Python', 'SQL', 'R', 'Swift', 'LangChain', 'FastAPI', 'React', 'Financial Due Diligence', 'Valuation Modeling', 'Predictive Analytics', 'Machine Learning', 'NLP', 'ChromaDB', 'Pinecone', 'Strategic Problem-Solving', 'Leadership'].map((skill) => (
                <Tag key={skill} variant="accent" size="md">{skill}</Tag>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
