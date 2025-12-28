'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Smartphone,
  Package,
  Truck,
  Wallet,
  TrendingUp,
  Shield,
  BarChart3,
  LineChart,
  Target,
  ArrowRight,
} from 'lucide-react';

import { Section, ProjectCard, Tag, Button } from '@/components';

// Featured technology ventures
const featuredVentures = [
  {
    title: 'TAM',
    description: 'AI Financial Due Diligence Platform',
    longDescription: `Built for PE, IB, and Corp Dev use cases. Uses LangChain and agentic AI
    to parse complex financial documents, automate red-flag detection, and generate
    comprehensive PDF & Excel reports. Python/FastAPI backend with React analytics frontend.`,
    tags: ['LangChain', 'Python', 'FastAPI', 'React', 'NLP'],
    status: 'active' as const,
    featured: true,
    icon: <Bot size={24} />,
    metrics: [
      { label: 'Target Users', value: 'PE/IB' },
      { label: 'Tech', value: 'Agentic AI' },
    ],
  },
  {
    title: 'AI Hedge Fund',
    description: 'Autonomous Trading System',
    longDescription: `Fully automated AI-agent-driven infrastructure with autonomous strategy
    execution, portfolio rebalancing, and risk controls. Managing $100K+ portfolio with
    Python-based trading engine and ML prediction models.`,
    tags: ['Python', 'ML', 'Quantitative Finance', 'Risk Management'],
    status: 'active' as const,
    featured: true,
    icon: <Wallet size={24} />,
    metrics: [
      { label: 'Portfolio', value: '$100K+' },
      { label: 'Status', value: 'Active' },
    ],
  },
  {
    title: 'Flux',
    description: 'Professional Networking App',
    longDescription: `iOS app with swipe-based matching for professional networking.
    Led a cross-functional team of 6 engineers. Developed GTM strategy and executed
    campus rollout. Built with Swift for native iOS experience.`,
    tags: ['Swift', 'iOS', 'Leadership', 'GTM Strategy'],
    status: 'active' as const,
    featured: true,
    icon: <Smartphone size={24} />,
    metrics: [
      { label: 'Team Size', value: '6' },
      { label: 'Platform', value: 'iOS' },
    ],
  },
];

// Startup ventures
const startupVentures = [
  {
    title: 'BoxMate',
    description: 'Student Storage Marketplace',
    longDescription: `On-demand storage platform for college students. Generated $10,000
    in revenue within the first 2 weeks of launch. Implemented regression-based pricing
    optimization and demand forecasting with Python.`,
    tags: ['Python', 'Pricing Optimization', 'Forecasting'],
    status: 'completed' as const,
    icon: <Package size={24} />,
    metrics: [
      { label: 'Revenue', value: '$10K' },
      { label: 'Timeline', value: '2 weeks' },
    ],
  },
  {
    title: 'Quicko',
    description: 'Quick-Commerce Startup',
    longDescription: `Registered company focused on 15-minute delivery for American
    college towns. Inspired by Zepto/Blinkit model. Operations, logistics, and
    unit-economics driven approach.`,
    tags: ['Operations', 'Logistics', 'Unit Economics'],
    status: 'in-progress' as const,
    icon: <Truck size={24} />,
    metrics: [
      { label: 'Model', value: 'Quick Commerce' },
      { label: 'Delivery', value: '15 min' },
    ],
  },
];

// Hedge fund features
const hedgeFundFeatures = [
  {
    title: 'Autonomous Strategy Execution',
    description: 'AI agents analyze market conditions and execute trades based on predefined strategies without human intervention.',
    icon: Bot,
  },
  {
    title: 'Portfolio Rebalancing',
    description: 'Automated systems continuously optimize portfolio allocation based on risk parameters and market opportunities.',
    icon: BarChart3,
  },
  {
    title: 'Risk Controls',
    description: 'Multi-layered risk management with position limits, stop-losses, and correlation monitoring.',
    icon: Shield,
  },
  {
    title: 'Predictive Analytics',
    description: 'Machine learning models for market forecasting, sentiment analysis, and opportunity identification.',
    icon: LineChart,
  },
];

// Financial expertise areas
const expertiseAreas = [
  {
    category: 'Due Diligence',
    skills: [
      'Financial statement analysis',
      'Red-flag identification',
      'Balance sheet deep-dives',
      'Background checks',
    ],
  },
  {
    category: 'Valuation',
    skills: [
      'DCF modeling',
      'Comparable company analysis',
      'Precedent transactions',
      'LBO analysis basics',
    ],
  },
  {
    category: 'Analytics',
    skills: [
      'Predictive modeling',
      'Revenue forecasting',
      'Demand analysis',
      'Regression optimization',
    ],
  },
  {
    category: 'Reporting',
    skills: [
      'Automated PDF generation',
      'Excel financial models',
      'Dashboard creation',
      'IPO advisory reports',
    ],
  },
];

// Animation variants
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
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function ProjectsPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="pt-12 md:pt-20 pb-16">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUpVariants} custom={0}>
              <Tag variant="accent" className="mb-6">Ventures</Tag>
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
              From AI-powered financial tools to quick-commerce startups—each venture
              is built with a focus on real-world impact and sustainable growth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED VENTURES */}
      <Section
        heading="Featured Ventures"
        subheading="Technology-driven solutions for complex problems"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredVentures.map((venture, index) => (
            <motion.div
              key={venture.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...venture} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AI HEDGE FUND DEEP DIVE */}
      <Section
        heading="AI Hedge Fund Infrastructure"
        subheading="Autonomous investment systems built from the ground up"
        className="bg-void-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {hedgeFundFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30 hover:border-steel-700/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-3 bg-accent-400/10 rounded-lg w-fit mb-4 group-hover:bg-accent-400/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="font-display text-xl text-steel-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-steel-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Architecture */}
        <motion.div
          className="p-8 rounded-xl bg-gradient-to-br from-void-800/80 to-void-900/80 border border-accent-400/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent-400/10 rounded-lg">
              <Target className="w-5 h-5 text-accent-400" />
            </div>
            <h3 className="font-display text-xl text-steel-50">
              Technical Infrastructure
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-steel-500 mb-3">
                Data Layer
              </h4>
              <ul className="space-y-2 text-sm text-steel-400">
                <li>• Real-time market data feeds</li>
                <li>• Historical price databases</li>
                <li>• Alternative data sources</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-steel-500 mb-3">
                Execution Layer
              </h4>
              <ul className="space-y-2 text-sm text-steel-400">
                <li>• Python-based trading engine</li>
                <li>• Broker API integrations</li>
                <li>• Order management system</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-steel-500 mb-3">
                Intelligence Layer
              </h4>
              <ul className="space-y-2 text-sm text-steel-400">
                <li>• ML prediction models</li>
                <li>• Strategy optimization</li>
                <li>• Risk monitoring agents</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* STARTUP VENTURES */}
      <Section
        heading="Startup Ventures"
        subheading="Businesses with real revenue and market validation"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {startupVentures.map((venture, index) => (
            <motion.div
              key={venture.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...venture} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FINANCIAL EXPERTISE */}
      <Section
        heading="Financial Expertise"
        subheading="Core competencies developed through experience and study"
        className="bg-void-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.category}
              className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-display text-lg text-steel-50 mb-4">
                {area.category}
              </h3>
              <ul className="space-y-2">
                {area.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-steel-400 flex items-start gap-2"
                  >
                    <span className="text-accent-400 mt-1">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TOOLS & TECHNOLOGIES */}
      <Section heading="Tools & Technologies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl text-steel-50 mb-4">
              Analysis & Modeling
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'R', 'Tableau', 'Excel'].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-xl text-steel-50 mb-4">
              Automation & AI
            </h3>
            <div className="flex flex-wrap gap-2">
              {['LangChain', 'FastAPI', 'NLP', 'Agentic AI', 'React', 'Next.js', 'Swift'].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section className="text-center bg-void-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-display-sm text-steel-50 mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-steel-400 mb-8">
            Always open to discussing new ventures, technical challenges,
            or investment opportunities.
          </p>
          <Button href="/contact" icon={<ArrowRight size={16} />}>
            Get in Touch
          </Button>
        </motion.div>
      </Section>
    </>
  );
}
