'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Bot,
  Smartphone,
  Package,
  Wallet,
  ArrowRight,
  PhoneCall,
  Mic,
  BarChart3,
  ShoppingCart,
  Trophy,
  Medal,
  Zap,
  Github,
  ExternalLink,
  Star,
  Play,
  ChevronRight,
  Eye,
  Users,
  FileText,
  Shield,
  Cpu,
} from 'lucide-react';

import { Section, ProjectCard, Tag, Button, VideoPlayer } from '@/components';

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── FLUX APP STORE REVIEWS (scraped) ───────────────────────────────────────────
const fluxReviews = [
  { user: 'Vashishth S', title: 'Cofounder', text: 'Found my co-founder on this app in my uni… we were the perfect connection and we are now in the product development stage!', date: 'Nov 2025' },
  { user: 'CTC-WI', title: 'Love the App', text: 'Simple, easy, and straightforward way to connect with talent entrepreneurs!', date: 'Oct 2025' },
  { user: 'MysteryCoder456', title: 'Useful', text: 'Helped me find a co founder for my comp sci project', date: 'Oct 2025' },
];

// ─── TAM TECH ARCHITECTURE ──────────────────────────────────────────────────────
const tamTechStack = {
  frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts'],
  backend: ['FastAPI', 'SQLAlchemy', 'Pydantic', 'Python'],
  ai: ['Claude 4.5 Sonnet', 'Hugging Face Transformers', 'Isolation Forest (sklearn)', 'ChromaDB'],
  reports: ['Playwright (Headless Chromium)', 'PDF/Excel generation'],
};

// ─── RECOGNITION DATA ───────────────────────────────────────────────────────────
const recognition = [
  { award: '🏆 Google Award', event: 'CheeseHacks 2026', project: 'AuraHealth', icon: <Trophy size={24} /> },
  { award: '🥈 2nd Place', event: 'MadData 2026', project: 'TAM', icon: <Medal size={24} /> },
  { award: '⚡ Finalist', event: 'CursorHacks 2026', project: 'EarningsLens', icon: <Zap size={24} /> },
];

// ─── FINANCIAL EXPERTISE ────────────────────────────────────────────────────────
const expertiseAreas = [
  { category: 'Due Diligence', skills: ['Financial statement analysis', 'Red-flag identification', 'Balance sheet deep-dives', 'Background checks & IAR reports'] },
  { category: 'Valuation & Modeling', skills: ['DCF modeling', 'Comparable company analysis', 'Financial projections', 'LBO analysis basics'] },
  { category: 'Data & Analytics', skills: ['Predictive modeling', 'Revenue forecasting', 'Demand analysis', 'Regression optimization'] },
  { category: 'Automation', skills: ['Automated PDF/Excel generation', 'n8n workflow automation', 'Dashboard creation', 'NLP document parsing'] },
];

// ─── TECH STACK ─────────────────────────────────────────────────────────────────
const techStack = {
  languages: ['Python', 'SQL', 'R', 'Swift', 'TypeScript'],
  frameworks: ['FastAPI', 'React', 'Next.js', 'LangChain', 'Pandas', 'NumPy', 'Scikit-learn'],
  tools: ['Tableau', 'Excel', 'n8n', 'Git', 'ChromaDB', 'Pinecone'],
  specializations: ['Agentic AI', 'NLP', 'Quantitative Finance', 'ML/Predictive Analytics'],
};

// ─── COMPONENT ──────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  return (
    <>
      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ PAGE HERO                                                          ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <section className="pt-12 md:pt-20 pb-16">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUpVariants} custom={0}>
              <Tag variant="accent" className="mb-6">Ventures & Projects</Tag>
            </motion.div>
            <motion.h1
              variants={fadeUpVariants}
              custom={0.1}
              className="font-display text-display-md md:text-display-lg text-steel-50 mb-6"
            >
              Building at the Intersection of{' '}
              <span className="text-accent-400">AI</span> and{' '}
              <span className="text-accent-400">Finance</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              custom={0.2}
              className="text-xl text-steel-400 leading-relaxed"
            >
              From AI-powered financial due diligence to campus networking — each venture
              solves a real problem with production-grade engineering.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ RECOGNITION SHELF                                                  ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section heading="Recognition" subheading="Awards and competition results">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {recognition.map((item, i) => (
            <motion.div
              key={item.event}
              className="p-5 rounded-xl bg-void-800/30 border border-accent-400/15 hover:border-accent-400/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent-400/10 rounded-lg text-accent-400">{item.icon}</div>
                <span className="text-xs font-mono text-steel-500 uppercase tracking-wider">{item.project}</span>
              </div>
              <h3 className="font-display text-xl text-accent-400 mb-1">{item.award}</h3>
              <p className="text-steel-400 text-sm">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ 🚀 ACTIVE VENTURES                                                ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section
        heading="Active Ventures"
        subheading="Currently building — started 2025, ongoing"
        className="bg-void-900/30"
      >
        {/* ── TAM ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* TAM Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="p-3 bg-accent-400/10 rounded-xl">
              <Bot className="w-7 h-7 text-accent-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display text-2xl md:text-3xl text-steel-50">TAM</h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-full border bg-green-500/10 text-green-400 border-green-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Active
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full border bg-amber-400/10 text-amber-400 border-amber-400/25">🥈 2nd Place — MadData 2026</span>
              </div>
              <p className="text-accent-400 text-sm mt-1">Transaction Analysis Machine — AI Financial Due Diligence Platform</p>
            </div>
            <a
              href="https://github.com/diyakayy/maddata2026"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-steel-500 hover:text-steel-200 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>

          {/* TAM Demo Video */}
          <VideoPlayer
            src="/videos/tam-demo.mp4"
            poster="/images/tam-dashboard.png"
            title="TAM — Full Product Demo"
            className="mb-6"
          />

          {/* TAM Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30">
              <h4 className="font-display text-lg text-steel-50 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-accent-400" />
                What TAM Does
              </h4>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                TAM automates the grueling, highly manual process of Financial Due Diligence (FDD),
                transforming weeks of &quot;grunt work&quot; into seconds of automated insight. Built for
                Private Equity analysts and M&A professionals.
              </p>
              <ul className="space-y-2">
                {[
                  'Quality of Earnings (QoE) — Reported vs. Adjusted EBITDA analysis',
                  'Net Working Capital (NWC) — Working Capital Peg calculations',
                  'Cash Conversion Cycle (CCC) — Operational efficiency metrics',
                  'Discounted Cash Flow (DCF) — 5-year projections & NPV',
                  'Automated PDF/Excel report generation via Playwright',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-steel-400">
                    <ChevronRight size={14} className="text-accent-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30">
              <h4 className="font-display text-lg text-steel-50 mb-3 flex items-center gap-2">
                <Cpu size={18} className="text-accent-400" />
                AI & ML Engine
              </h4>
              <ul className="space-y-3">
                <li className="text-sm text-steel-400">
                  <span className="text-steel-200 font-medium">Document Classification (NLP)</span> — Hybrid Hugging Face Transformers + keyword-heuristics to identify financial document types
                </li>
                <li className="text-sm text-steel-400">
                  <span className="text-steel-200 font-medium">Anomaly Detection (Unsupervised ML)</span> — Scikit-Learn Isolation Forest for multivariate outlier detection across financial metrics
                </li>
                <li className="text-sm text-steel-400">
                  <span className="text-steel-200 font-medium">Agentic Extraction</span> — Self-correcting extraction loop using Claude 4.5 Sonnet with statistical validation + re-examination
                </li>
                <li className="text-sm text-steel-400">
                  <span className="text-steel-200 font-medium">RAG Q&A</span> — ChromaDB vector database for context-aware financial document querying
                </li>
              </ul>
            </div>
          </div>

          {/* TAM Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <motion.div
              className="rounded-xl overflow-hidden border border-steel-800/30 bg-void-800/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 border-b border-steel-800/30">
                <p className="font-mono text-xs text-steel-500 uppercase tracking-wider">System Architecture</p>
              </div>
              <Image src="/images/tam-architecture.png" alt="TAM System Architecture" width={600} height={400} className="w-full h-auto" />
            </motion.div>
            <motion.div
              className="rounded-xl overflow-hidden border border-steel-800/30 bg-void-800/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 border-b border-steel-800/30">
                <p className="font-mono text-xs text-steel-500 uppercase tracking-wider">Agentic Extraction Workflow</p>
              </div>
              <Image src="/images/tam-workflow.png" alt="TAM Agentic Workflow" width={600} height={400} className="w-full h-auto" />
            </motion.div>
          </div>

          {/* TAM Tech Stack */}
          <div className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30 mb-4">
            <p className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(tamTechStack).map(([category, techs]) => (
                <div key={category}>
                  <p className="text-xs text-accent-400 font-medium uppercase mb-2">{category}</p>
                  <div className="flex flex-wrap gap-1">
                    {techs.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs font-mono text-steel-400 bg-steel-900/50 rounded border border-steel-800/50">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-steel-500">
            <span>Team: <span className="text-steel-300">Yash Arvind, Diya Kothari, Hriday Thakkar</span></span>
            <span>·</span>
            <span>Advisors: <span className="text-steel-300">Ben Rugg & Varun Kumar</span></span>
            <span>·</span>
            <span>Interest from: <span className="text-accent-400">American Family Insurance, EY</span></span>
          </div>
        </motion.div>

        {/* ── FLUX ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Flux Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="p-3 bg-accent-400/10 rounded-xl">
              <Smartphone className="w-7 h-7 text-accent-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display text-2xl md:text-3xl text-steel-50">Flux</h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded-full border bg-green-500/10 text-green-400 border-green-500/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Live on App Store
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full border bg-emerald-400/10 text-emerald-400 border-emerald-400/25">4.8 ⭐ · 6 Ratings</span>
              </div>
              <p className="text-accent-400 text-sm mt-1">Student Startup Co-Founder Matching · iOS Native</p>
            </div>
            <a
              href="https://apps.apple.com/us/app/flux-student-startup-network/id6742727564"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-400 text-void-950 text-sm font-medium hover:bg-accent-300 transition-colors"
            >
              <ExternalLink size={14} />
              App Store
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Flux Description — 3 cols */}
            <div className="lg:col-span-3 p-6 rounded-xl bg-void-800/30 border border-steel-800/30">
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Designed and developed the MVP using Swift, implementing custom UI for swipe-based matching
                and networking. Leading a cross-functional team of six (design, development, marketing) to launch
                across campus. Authored business plan including market sizing, financial projections, and GTM
                strategy for seed-stage investments. Latest version (v2.1.0) features Google Drive resume uploads
                and brand new landing page.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Swift', 'iOS Native', 'Firebase', 'Product Management', 'GTM Strategy'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs font-mono text-steel-500 bg-steel-900/50 rounded border border-steel-800/50">{tag}</span>
                ))}
              </div>
              <div className="flex gap-6 pt-4 border-t border-steel-800/30">
                <div>
                  <p className="font-display text-xl text-steel-50">6</p>
                  <p className="text-xs font-mono text-steel-500 uppercase">Team Members</p>
                </div>
                <div>
                  <p className="font-display text-xl text-steel-50">v2.1.0</p>
                  <p className="text-xs font-mono text-steel-500 uppercase">Latest Version</p>
                </div>
                <div>
                  <p className="font-display text-xl text-steel-50">4.8 ⭐</p>
                  <p className="text-xs font-mono text-steel-500 uppercase">App Store Rating</p>
                </div>
              </div>
            </div>

            {/* Flux Reviews — 2 cols */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-void-800/30 border border-steel-800/30">
              <p className="font-mono text-xs text-steel-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star size={12} className="text-accent-400" />
                App Store Reviews
              </p>
              <div className="space-y-4">
                {fluxReviews.map((review) => (
                  <div key={review.user} className="p-3 rounded-lg bg-void-900/50 border border-steel-800/20">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-steel-200">&quot;{review.title}&quot;</p>
                      <div className="flex text-accent-400 text-xs">★★★★★</div>
                    </div>
                    <p className="text-xs text-steel-400 leading-relaxed mb-2">&quot;{review.text}&quot;</p>
                    <p className="text-xs text-steel-600">— {review.user} · {review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ 🏆 HACKATHON PROJECTS (2026)                                       ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section
        heading="Hackathon Projects"
        subheading="Shipped under pressure — all built in 2026"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AuraHealth */}
          <ProjectCard
            title="AuraHealth"
            description="AI Patient Follow-Up Agent"
            longDescription="Won the Google Award at CheeseHacks 2026. AI-powered healthcare assistant that calls patients post-consultation via Twilio WebSocket streaming, Google STT/TTS, and Gemini 2.5 Flash. Uses Pinecone RAG for consultation context and Cloud Scheduler for automated follow-ups. High-urgency triage triggers SMS alerts to doctors."
            tags={['FastAPI', 'Next.js', 'WebSockets', 'Gemini', 'Twilio', 'Pinecone', 'Google Cloud']}
            status="hackathon"
            icon={<PhoneCall size={24} />}
            githubUrl="https://github.com/L-Gupta/cheeseHacks26"
            awardBadges={[{ label: '🏆 Google Award — CheeseHacks 2026', variant: 'gold' }]}
            metrics={[
              { label: 'Event', value: 'CheeseHacks 2026' },
            ]}
          />

          {/* EarningsLens (NEW) */}
          <ProjectCard
            title="EarningsLens"
            description="Real-Time Earnings Call Deception Detection"
            longDescription="Built at CursorHacks 2026. Analyzes earnings call transcripts using Claude AI with forced tool use and an 11-signal deception taxonomy (hedging, deflection, overclaiming, etc.). Cross-references against SEC filings via ChromaDB vector search. Tracks per-speaker credibility scores and pulls live market data via Finnhub."
            tags={['React', 'FastAPI', 'Claude AI', 'ChromaDB', 'SEC EDGAR', 'Finnhub']}
            status="hackathon"
            icon={<Eye size={24} />}
            githubUrl="https://github.com/L-Gupta/cursorHacks26"
            awardBadges={[{ label: '⚡ CursorHacks 2026', variant: 'purple' }]}
            metrics={[
              { label: 'Event', value: 'CursorHacks 2026' },
            ]}
          />

          {/* HelloNeighbour */}
          <ProjectCard
            title="HelloNeighbour"
            description="Voice-Based Anonymous Dorm Connection App"
            longDescription="Built at ClaudeHacks 2026. Voice-based anonymous neighbor connection app scoped for UW-Madison dorms. Features KNN (k=3) matching algorithm from scratch, Claude API for profile analysis and meetup suggestions, Web Audio waveform visualization, and 15-second voice notes. Deployed to Vercel."
            tags={['Next.js', 'Claude API', 'KNN (from scratch)', 'Web Audio API', 'Vercel']}
            status="hackathon"
            icon={<Mic size={24} />}
            githubUrl="https://github.com/L-Gupta/claudeHacks26"
            awardBadges={[{ label: '⚡ ClaudeHacks 2026', variant: 'purple' }]}
            metrics={[
              { label: 'Event', value: 'ClaudeHacks 2026' },
            ]}
          />
        </div>
      </Section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ 📦 PAST PROJECTS                                                   ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section
        heading="Past Projects"
        subheading="Completed work and earlier ventures"
        className="bg-void-900/30"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard
            title="BoxMate"
            description="Student Storage Marketplace"
            longDescription="Led branding, platform design, and customer outreach strategies. Generated $10,000 in revenue within the first 2 weeks. Performed regression analysis to optimize pricing strategy and built forecasting model using Python."
            tags={['Python', 'Pricing Optimization', 'Forecasting', 'Operations']}
            status="completed"
            icon={<Package size={24} />}
            metrics={[{ label: 'Revenue', value: '$10K in 2 weeks' }]}
            size="compact"
          />
          <ProjectCard
            title="AI Hedge Fund"
            description="Autonomous Trading System"
            longDescription="Building automated AI-agent-driven infrastructure with strategy execution, portfolio rebalancing, and risk controls. $100K+ portfolio using n8n, Python trading engine, and ML models."
            tags={['n8n', 'Python', 'ML', 'Quantitative Finance']}
            status="in-progress"
            icon={<Wallet size={24} />}
            metrics={[{ label: 'Portfolio', value: '$100K+' }]}
            size="compact"
          />
          <ProjectCard
            title="Stock Trading System"
            description="Algorithmic Trading Engine + LLM"
            longDescription="Full-stack platform integrating PAMR (Passive Aggressive Mean Reversion) algorithm with LLM-based market commentary. Next.js frontend, PostgreSQL, Python engine, Marketstack API."
            tags={['Next.js', 'Python', 'PostgreSQL', 'PAMR', 'LLM APIs']}
            status="completed"
            icon={<BarChart3 size={24} />}
            size="compact"
          />
        </div>
      </Section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ FINANCIAL EXPERTISE                                                ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section heading="Financial Expertise" subheading="Core competencies developed through experience and execution">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseAreas.map((area, i) => (
            <motion.div
              key={area.category}
              className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-display text-lg text-steel-50 mb-4">{area.category}</h3>
              <ul className="space-y-2">
                {area.skills.map((skill) => (
                  <li key={skill} className="text-sm text-steel-400 flex items-start gap-2">
                    <span className="text-accent-400 mt-1">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ TECHNICAL STACK                                                     ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section heading="Technical Stack" className="bg-void-900/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-display text-xl text-steel-50 mb-4">Languages & Frameworks</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.languages.map((t) => <span key={t} className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50">{t}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.frameworks.map((t) => <span key={t} className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50">{t}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="font-display text-xl text-steel-50 mb-4">Tools & Specializations</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map((t) => <span key={t} className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50">{t}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.specializations.map((t) => <span key={t} className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50">{t}</span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ╔══════════════════════════════════════════════════════════════════════╗
          ║ CTA                                                                ║
          ╚══════════════════════════════════════════════════════════════════════╝ */}
      <Section className="text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <h2 className="font-display text-display-sm text-steel-50 mb-4">Interested in Collaborating?</h2>
          <p className="text-steel-400 mb-8">Always open to discussing new ventures, technical challenges, or investment opportunities.</p>
          <Button href="/contact" icon={<ArrowRight size={16} />}>Get in Touch</Button>
        </motion.div>
      </Section>
    </>
  );
}
