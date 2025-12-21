/**
 * =============================================================================
 * FINANCE & SYSTEMS PAGE
 * =============================================================================
 * 
 * This page showcases Yash's financial expertise and the automated systems
 * he's building. This is a KEY page as it demonstrates serious financial
 * knowledge and execution capability.
 * 
 * SECTIONS:
 * 1. Hero - Financial profile introduction
 * 2. Portfolio Overview - Key metrics
 * 3. AI Hedge Fund - The main project
 * 4. Financial Skills - Expertise breakdown
 * 5. Tools & Systems - Technical infrastructure
 */

'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Bot,
  Shield,
  BarChart3,
  LineChart,
  Wallet,
  Target,
  Zap,
  Database,
  ArrowRight,
} from 'lucide-react';

// Import components
import { Section, StatCard, Tag, Card, Button } from '@/components';

/**
 * ---------------------------------------------------------------------------
 * FINANCIAL STATS
 * ---------------------------------------------------------------------------
 */
const financialStats = [
  {
    value: '$100K+',
    label: 'Portfolio Under Management',
    description: 'Personal investment portfolio with automated systems',
    icon: <Wallet className="w-6 h-6" />,
    highlight: true,
  },
  {
    value: 'Active',
    label: 'AI Hedge Fund Development',
    description: 'Building fully automated trading infrastructure',
    icon: <Bot className="w-6 h-6" />,
  },
  {
    value: 'Autonomous',
    label: 'Strategy Execution',
    description: 'AI-driven portfolio rebalancing and risk controls',
    icon: <Target className="w-6 h-6" />,
  },
];

/**
 * ---------------------------------------------------------------------------
 * HEDGE FUND FEATURES
 * ---------------------------------------------------------------------------
 */
const hedgeFundFeatures = [
  {
    title: 'Autonomous Strategy Execution',
    description: 'AI agents that analyze market conditions and execute trades based on predefined strategies without human intervention.',
    icon: Bot,
  },
  {
    title: 'Portfolio Rebalancing',
    description: 'Automated systems that continuously optimize portfolio allocation based on risk parameters and market opportunities.',
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

/**
 * ---------------------------------------------------------------------------
 * FINANCIAL EXPERTISE AREAS
 * ---------------------------------------------------------------------------
 */
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
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/**
 * ---------------------------------------------------------------------------
 * FINANCE PAGE COMPONENT
 * ---------------------------------------------------------------------------
 */
export default function FinancePage() {
  return (
    <>
      {/* =====================================================================
          PAGE HERO
          ===================================================================== */}
      <section className="pt-12 md:pt-20 pb-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/3 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Page Label */}
            <motion.div variants={fadeUpVariants} custom={0}>
              <Tag variant="accent" className="mb-6">Finance & Systems</Tag>
            </motion.div>

            {/* Page Title */}
            <motion.h1
              variants={fadeUpVariants}
              custom={0.1}
              className="font-display text-display-md md:text-display-lg text-steel-50 mb-6"
            >
              Building{' '}
              <span className="text-accent-400">Automated Financial Systems</span>
            </motion.h1>

            {/* Page Description */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.2}
              className="text-xl text-steel-400 leading-relaxed mb-8"
            >
              Managing real capital. Building autonomous trading infrastructure. 
              Operating beyond theory with a strong foundation in financial due diligence, 
              valuation, and predictive analytics.
            </motion.p>

            {/* Quick highlights */}
            <motion.div
              variants={fadeUpVariants}
              custom={0.3}
              className="flex flex-wrap gap-3"
            >
              <span className="px-4 py-2 bg-void-800/50 rounded-lg border border-steel-800/50 text-sm text-steel-300">
                <TrendingUp className="inline-block w-4 h-4 mr-2 text-accent-400" />
                Active Portfolio Management
              </span>
              <span className="px-4 py-2 bg-void-800/50 rounded-lg border border-steel-800/50 text-sm text-steel-300">
                <Bot className="inline-block w-4 h-4 mr-2 text-accent-400" />
                AI-Driven Systems
              </span>
              <span className="px-4 py-2 bg-void-800/50 rounded-lg border border-steel-800/50 text-sm text-steel-300">
                <Shield className="inline-block w-4 h-4 mr-2 text-accent-400" />
                Risk Management
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          KEY METRICS
          ===================================================================== */}
      <Section className="bg-void-900/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {financialStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={stat.icon}
                highlight={stat.highlight}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* =====================================================================
          AI HEDGE FUND SECTION
          The main feature of this page
          ===================================================================== */}
      <Section
        heading="AI-Agent-Driven Hedge Fund"
        subheading="Building fully autonomous investment infrastructure"
      >
        {/* Feature Grid */}
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

        {/* Technical Architecture Overview */}
        <motion.div
          className="p-8 rounded-xl bg-gradient-to-br from-void-800/80 to-void-900/80 border border-accent-400/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent-400/10 rounded-lg">
              <Database className="w-5 h-5 text-accent-400" />
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

      {/* =====================================================================
          FINANCIAL EXPERTISE
          Skills and knowledge areas
          ===================================================================== */}
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

      {/* =====================================================================
          TOOLS & TECHNOLOGIES
          ===================================================================== */}
      <Section heading="Tools & Technologies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Analysis Tools */}
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

          {/* Automation Tools */}
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
              {['LangChain', 'FastAPI', 'NLP', 'Agentic AI', 'PDF Generation', 'Excel Automation'].map((tool) => (
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

      {/* =====================================================================
          CTA
          ===================================================================== */}
      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-display-sm text-steel-50 mb-4">
            Interested in the Technical Details?
          </h2>
          <p className="text-steel-400 mb-8">
            I'm always happy to discuss financial systems architecture, 
            quantitative strategies, or potential collaborations.
          </p>
          <Button href="/contact" icon={<ArrowRight size={16} />}>
            Let's Talk
          </Button>
        </motion.div>
      </Section>
    </>
  );
}
