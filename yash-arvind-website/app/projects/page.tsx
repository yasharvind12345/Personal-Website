/**
 * =============================================================================
 * PROJECTS / VENTURES PAGE
 * =============================================================================
 * 
 * Showcases all ventures and projects that Yash has built or is building.
 * 
 * SECTIONS:
 * 1. Hero - Page introduction
 * 2. Featured Ventures - TAM, Flux, etc.
 * 3. Startups - BoxMate, Quicko
 * 4. Technical Projects - Other builds
 * 
 * HOW TO CUSTOMIZE:
 * - Edit the venture data objects to update project information
 * - Add new projects to the appropriate array
 * - Modify the grid layout as needed
 */

'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Smartphone,
  Package,
  Truck,
  Layers,
  ArrowRight,
} from 'lucide-react';

// Import components
import { Section, ProjectCard, Tag } from '@/components';

/**
 * ---------------------------------------------------------------------------
 * VENTURES DATA
 * ---------------------------------------------------------------------------
 * Add or modify projects here
 */

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

// Startup ventures with business impact
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
    transition: { staggerChildren: 0.15 },
  },
};

/**
 * ---------------------------------------------------------------------------
 * PROJECTS PAGE COMPONENT
 * ---------------------------------------------------------------------------
 */
export default function ProjectsPage() {
  return (
    <>
      {/* =====================================================================
          PAGE HERO
          ===================================================================== */}
      <section className="pt-12 md:pt-20 pb-16">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Page Label */}
            <motion.div variants={fadeUpVariants} custom={0}>
              <Tag variant="accent" className="mb-6">Ventures & Projects</Tag>
            </motion.div>

            {/* Page Title */}
            <motion.h1
              variants={fadeUpVariants}
              custom={0.1}
              className="font-display text-display-md md:text-display-lg text-steel-50 mb-6"
            >
              Building at the Intersection of{' '}
              <span className="text-accent-400">AI</span> and{' '}
              <span className="text-accent-400">Finance</span>
            </motion.h1>

            {/* Page Description */}
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

      {/* =====================================================================
          FEATURED VENTURES
          Main technology projects
          ===================================================================== */}
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

      {/* =====================================================================
          STARTUP VENTURES
          Business-focused projects
          ===================================================================== */}
      <Section
        heading="Startup Ventures"
        subheading="Businesses with real revenue and market validation"
        className="bg-void-900/50"
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

      {/* =====================================================================
          TECHNICAL SKILLS APPLIED
          Overview of technical capabilities
          ===================================================================== */}
      <Section heading="Technical Foundation">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI & Machine Learning */}
          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="p-3 bg-accent-400/10 rounded-lg w-fit mb-4">
              <Bot className="w-6 h-6 text-accent-400" />
            </div>
            <h3 className="font-display text-xl text-steel-50 mb-3">
              AI & Machine Learning
            </h3>
            <ul className="space-y-2 text-sm text-steel-400">
              <li>• LangChain & Agentic AI</li>
              <li>• NLP for Document Parsing</li>
              <li>• Scikit-learn, Pandas, NumPy</li>
              <li>• Predictive Analytics</li>
            </ul>
          </motion.div>

          {/* Backend & APIs */}
          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-3 bg-accent-400/10 rounded-lg w-fit mb-4">
              <Layers className="w-6 h-6 text-accent-400" />
            </div>
            <h3 className="font-display text-xl text-steel-50 mb-3">
              Backend & Systems
            </h3>
            <ul className="space-y-2 text-sm text-steel-400">
              <li>• Python / FastAPI</li>
              <li>• SQL Databases</li>
              <li>• Automated Report Generation</li>
              <li>• API Design & Integration</li>
            </ul>
          </motion.div>

          {/* Frontend & Mobile */}
          <motion.div
            className="p-6 rounded-xl bg-void-800/30 border border-steel-800/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-3 bg-accent-400/10 rounded-lg w-fit mb-4">
              <Smartphone className="w-6 h-6 text-accent-400" />
            </div>
            <h3 className="font-display text-xl text-steel-50 mb-3">
              Frontend & Mobile
            </h3>
            <ul className="space-y-2 text-sm text-steel-400">
              <li>• React / Next.js / TypeScript</li>
              <li>• Swift (iOS Development)</li>
              <li>• Tailwind CSS</li>
              <li>• Data Visualization</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* =====================================================================
          CTA SECTION
          ===================================================================== */}
      <Section className="text-center">
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
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-400 text-void-950 font-medium rounded-lg hover:bg-accent-300 transition-colors"
          >
            Get in Touch
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </Section>
    </>
  );
}
