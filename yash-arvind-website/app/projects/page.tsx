'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Smartphone,
  Package,
  Wallet,
  ArrowRight,
} from 'lucide-react';

import { Section, ProjectCard, Tag, Button } from '@/components';

// All ventures and projects
const allVentures = [
  {
    title: 'TAM',
    description: 'AI Financial Due Diligence Platform',
    longDescription: 'Leveraged LangChain and agentic AI to develop an end-to-end financial due diligence tool, automating data extraction, analysis, and report generation. Integrated natural language processing (NLP) to parse complex financial documents, identifying key risks and opportunities with enhanced accuracy. Created a full-stack analytics platform with Python/FastAPI backend and React frontend, featuring interactive financial visualizations and automated report generation (PDF/Excel).',
    tags: ['LangChain', 'Python', 'FastAPI', 'React', 'NLP', 'Agentic AI'],
    status: 'active' as const,
    icon: <Bot size={24} />,
    metrics: [
      { label: 'Target', value: 'PE/IB/Corp Dev' },
      { label: 'Stack', value: 'Full-Stack' },
    ],
  },
  {
    title: 'Flux',
    description: 'Professional Networking App',
    longDescription: 'Designed and developed the MVP using Swift, implementing custom UI for swipe-based matching and networking. Leading a cross-functional team of six (design, development, marketing) to launch the product across campus. Authored business plan including market sizing, financial projections, and GTM strategy for seed-stage investments.',
    tags: ['Swift', 'iOS', 'Leadership', 'GTM Strategy', 'Product Management'],
    status: 'active' as const,
    icon: <Smartphone size={24} />,
    metrics: [
      { label: 'Team Size', value: '6 Engineers' },
      { label: 'Platform', value: 'iOS Native' },
    ],
  },
  {
    title: 'AI Hedge Fund',
    description: 'Autonomous Trading System',
    longDescription: 'Building fully automated AI-agent-driven infrastructure with autonomous strategy execution, portfolio rebalancing, and risk controls. Managing $100K+ portfolio using n8n automation workflows, Python-based trading engine, and ML prediction models. Implementing multi-layered risk management with position limits, stop-losses, and correlation monitoring.',
    tags: ['n8n', 'Python', 'ML', 'Quantitative Finance', 'Risk Management'],
    status: 'in-progress' as const,
    icon: <Wallet size={24} />,
    metrics: [
      { label: 'Portfolio', value: '$100K+' },
      { label: 'Status', value: 'Building' },
    ],
  },
  {
    title: 'BoxMate',
    description: 'Student Storage Marketplace',
    longDescription: 'Led branding, platform design, and customer outreach strategies to grow the user base. Successfully generated $10,000 in revenue within the first 2 weeks of operations. Performed regression analysis to optimize pricing strategy and built forecasting model using Python to predict demand.',
    tags: ['Python', 'Pricing Optimization', 'Forecasting', 'Operations', 'Growth'],
    status: 'completed' as const,
    icon: <Package size={24} />,
    metrics: [
      { label: 'Revenue', value: '$10K in 2 weeks' },
      { label: 'Status', value: 'Completed' },
    ],
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
      'Background checks & IAR reports',
    ],
  },
  {
    category: 'Valuation & Modeling',
    skills: [
      'DCF modeling',
      'Comparable company analysis',
      'Financial projections',
      'LBO analysis basics',
    ],
  },
  {
    category: 'Data & Analytics',
    skills: [
      'Predictive modeling',
      'Revenue forecasting',
      'Demand analysis',
      'Regression optimization',
    ],
  },
  {
    category: 'Automation',
    skills: [
      'Automated PDF/Excel generation',
      'n8n workflow automation',
      'Dashboard creation',
      'NLP document parsing',
    ],
  },
];

// Tech stack
const techStack = {
  languages: ['Python', 'SQL', 'R', 'Swift', 'TypeScript'],
  frameworks: ['FastAPI', 'React', 'Next.js', 'LangChain', 'Pandas', 'NumPy', 'Scikit-learn'],
  tools: ['Tableau', 'Excel', 'n8n', 'Git'],
  specializations: ['Agentic AI', 'NLP', 'Quantitative Finance', 'ML/Predictive Analytics'],
};

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
              From AI-powered financial tools to automated trading systems—each venture
              is built with a focus on real-world impact and execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ALL VENTURES */}
      <Section
        heading="Ventures & Projects"
        subheading="Technology-driven solutions with measurable impact"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {allVentures.map((venture, index) => (
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
        subheading="Core competencies developed through experience and execution"
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

      {/* TECHNICAL STACK */}
      <Section heading="Technical Stack">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages & Frameworks */}
          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl text-steel-50 mb-4">
              Languages & Frameworks
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.languages.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.frameworks.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tools & Specializations */}
          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-xl text-steel-50 mb-4">
              Tools & Specializations
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-steel-500 uppercase tracking-wider mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.specializations.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-void-900/50 text-steel-400 rounded border border-steel-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
