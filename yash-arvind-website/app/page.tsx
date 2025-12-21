/**
 * =============================================================================
 * HOME PAGE
 * =============================================================================
 * 
 * The main landing page of the website. This is the first impression visitors get.
 * 
 * SECTIONS:
 * 1. Hero - Large intro with name and tagline
 * 2. Key Stats - Portfolio size, GPA, key achievements
 * 3. Current Focus - What Yash is working on now
 * 4. Featured Ventures - Highlight 2-3 top projects
 * 5. Experience Preview - Brief career highlights
 * 6. CTA - Call to action to explore more
 * 
 * HOW TO CUSTOMIZE:
 * - Edit the text content directly in each section
 * - Modify the stats array to update key metrics
 * - Update featured projects in the ventures section
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Bot,
  BarChart3,
  Building2,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

// Import reusable components
import { Section, Card, Button, Tag, StatCard, ProjectCard } from '@/components';

/**
 * ---------------------------------------------------------------------------
 * KEY STATISTICS DATA
 * ---------------------------------------------------------------------------
 * Edit these to update the stats displayed on the homepage
 */
const keyStats = [
  {
    value: '$100K+',
    label: 'Portfolio Under Management',
    description: 'Personal investment portfolio with automated systems',
    highlight: true,
  },
  {
    value: '3.8',
    label: 'GPA',
    description: "Dean's List, UW-Madison",
  },
  {
    value: '70%',
    label: 'Efficiency Gain',
    description: 'AI model reduced processing time at Synechron',
  },
  {
    value: '2x',
    label: 'National Champion',
    description: 'World Robot Olympiad & FIRST Robotics',
  },
];

/**
 * ---------------------------------------------------------------------------
 * FEATURED VENTURES DATA
 * ---------------------------------------------------------------------------
 * Top projects to highlight on the homepage
 */
const featuredVentures = [
  {
    title: 'TAM',
    description: 'AI Financial Due Diligence Platform',
    longDescription: 'LangChain-powered agentic AI for PE, IB, and Corp Dev. Automates complex financial document analysis with NLP.',
    tags: ['LangChain', 'Python', 'FastAPI', 'React'],
    status: 'active' as const,
    featured: true,
    href: '/projects',
    metrics: [
      { label: 'Use Cases', value: 'PE/IB/Corp Dev' },
    ],
  },
  {
    title: 'AI Hedge Fund',
    description: 'Fully Automated Trading System',
    longDescription: 'Autonomous strategy execution, portfolio rebalancing, and risk controls powered by AI agents.',
    tags: ['Python', 'ML', 'Quantitative Finance'],
    status: 'in-progress' as const,
    featured: true,
    href: '/finance',
    metrics: [
      { label: 'Status', value: 'Building' },
    ],
  },
];

/**
 * ---------------------------------------------------------------------------
 * EXPERIENCE HIGHLIGHTS
 * ---------------------------------------------------------------------------
 */
const experienceHighlights = [
  {
    company: 'Ernst & Young (EY)',
    role: 'M&A Analyst Intern',
    period: 'June 2025 – August 2025',
    icon: Building2,
    description: 'Financial due diligence, IPO advisory, and balance sheet analysis',
  },
  {
    company: 'Zendesk',
    role: 'Business Operations & Revenue Optimization',
    period: 'Upcoming Summer',
    icon: BarChart3,
    description: 'RevOps, data-driven decision support, process optimization',
  },
  {
    company: 'Synechron',
    role: 'AI Intern',
    period: '2023',
    icon: Bot,
    description: 'Built AI cost-estimation model, 70% reduction in processing time',
  },
];

/**
 * ---------------------------------------------------------------------------
 * ANIMATION VARIANTS
 * ---------------------------------------------------------------------------
 */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * ---------------------------------------------------------------------------
 * HOME PAGE COMPONENT
 * ---------------------------------------------------------------------------
 */
export default function HomePage() {
  return (
    <>
      {/* =====================================================================
          HERO SECTION
          The main introduction section with name and tagline
          ===================================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient orb effect */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/3 rounded-full blur-[120px]" />
          
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div
              variants={fadeUpVariants}
              custom={0}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-void-800/80 border border-steel-800/50 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-steel-400">Building in public</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUpVariants}
              custom={0.1}
              className="font-display text-display-lg md:text-display-xl lg:text-display-2xl text-steel-50 mb-6"
            >
              <span className="text-accent-400">Yash</span> Arvind
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.2}
              className="text-xl md:text-2xl text-steel-400 mb-4 max-w-2xl leading-relaxed"
            >
              Building <span className="text-steel-200">AI-driven financial systems</span>.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.3}
              className="text-lg text-steel-500 mb-8 max-w-2xl leading-relaxed"
            >
              Data Science & Economics at UW-Madison. Managing a six-figure portfolio
              while building automated hedge fund infrastructure. Fintech-first, AI-native.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.4}
              className="flex flex-wrap gap-4"
            >
              <Button href="/projects" icon={<ArrowRight size={16} />}>
                View Ventures
              </Button>
              <Button href="/finance" variant="secondary">
                Finance & Systems
              </Button>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.5}
              className="mt-16 pt-8 border-t border-steel-800/50"
            >
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <p className="font-mono text-xs text-steel-500 uppercase tracking-wider">
                    Education
                  </p>
                  <p className="text-steel-200 mt-1">
                    B.S. Data Science & Economics
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-steel-500 uppercase tracking-wider">
                    Focus
                  </p>
                  <p className="text-steel-200 mt-1">
                    Quantitative Finance · Agentic AI
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-steel-500 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-steel-200 mt-1">
                    United States
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-steel-700 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-steel-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          KEY STATS SECTION
          Display important metrics and achievements
          ===================================================================== */}
      <Section className="bg-void-900/50">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {keyStats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeUpVariants} custom={index * 0.1}>
              <StatCard
                value={stat.value}
                label={stat.label}
                description={stat.description}
                highlight={stat.highlight}
              />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* =====================================================================
          WHAT I'M BUILDING SECTION
          Current focus and active projects
          ===================================================================== */}
      <Section
        heading="What I'm Building"
        subheading="Systems that operate at the intersection of AI and capital markets"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredVentures.map((venture) => (
            <ProjectCard key={venture.title} {...venture} />
          ))}
        </div>

        {/* Additional context */}
        <motion.div
          className="mt-12 p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-400/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <h3 className="font-display text-lg text-steel-50 mb-2">
                Autonomous Financial Systems
              </h3>
              <p className="text-steel-400 text-sm leading-relaxed">
                Building toward a fully automated AI-agent-driven hedge fund with autonomous 
                strategy execution, portfolio rebalancing, and risk controls. Strong foundation 
                in financial due diligence, valuation, forecasting, and predictive analytics.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Link to projects page */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button href="/projects" variant="ghost" icon={<ArrowRight size={16} />}>
            View All Ventures
          </Button>
        </motion.div>
      </Section>

      {/* =====================================================================
          EXPERIENCE PREVIEW SECTION
          Brief career highlights
          ===================================================================== */}
      <Section
        heading="Experience"
        subheading="Building real-world expertise in finance and technology"
        className="bg-void-900/50"
      >
        <div className="space-y-4">
          {experienceHighlights.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.company}
                className="group p-6 rounded-xl bg-void-800/30 border border-steel-800/30 hover:border-steel-700/50 transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-void-900/50 rounded-lg text-steel-400 group-hover:text-accent-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-display text-lg text-steel-50">
                        {exp.company}
                      </h3>
                      <span className="text-xs font-mono text-steel-500">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-accent-400 mb-2">{exp.role}</p>
                    <p className="text-sm text-steel-400">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Link to trajectory page */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button href="/trajectory" variant="ghost" icon={<ArrowRight size={16} />}>
            View Full Trajectory
          </Button>
        </motion.div>
      </Section>

      {/* =====================================================================
          EDUCATION HIGHLIGHT
          Quick education summary
          ===================================================================== */}
      <Section>
        <motion.div
          className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-void-800/80 to-void-900/80 border border-steel-800/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-accent-400/10 rounded-xl">
              <GraduationCap className="w-8 h-8 text-accent-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-display text-2xl text-steel-50 mb-2">
                University of Wisconsin–Madison
              </h3>
              <p className="text-steel-300 mb-1">
                B.S. in Data Science & Economics
              </p>
              <p className="text-steel-500 text-sm">
                Junior (Sep 2024 – Dec 2027) · Dean's List · 3.8 GPA
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Tag variant="accent">Data Science</Tag>
              <Tag variant="default">Economics</Tag>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* =====================================================================
          CTA SECTION
          Final call to action
          ===================================================================== */}
      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-display-sm md:text-display-md text-steel-50 mb-4">
            Let's Connect
          </h2>
          <p className="text-steel-400 text-lg mb-8 max-w-xl mx-auto">
            Open to opportunities in fintech, quantitative finance, and AI systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" icon={<ArrowRight size={16} />}>
              Get in Touch
            </Button>
            <Button
              href="https://linkedin.com/in/yasharvind"
              variant="secondary"
              external
              icon={<ArrowUpRight size={16} />}
            >
              LinkedIn
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
