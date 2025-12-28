/**
 * =============================================================================
 * TRAJECTORY PAGE
 * =============================================================================
 * 
 * This page shows Yash's career journey, education, and major achievements
 * in a chronological timeline format.
 * 
 * SECTIONS:
 * 1. Header - Page introduction
 * 2. Career Timeline - Internships and work experience
 * 3. Education Timeline - Academic journey
 * 4. Awards & Recognition - Championships and honors
 * 
 * HOW TO CUSTOMIZE:
 * - Edit the careerTimeline array to update work experience
 * - Edit the educationTimeline array to update academic history
 * - Edit the awards array to update achievements
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
} from 'lucide-react';

// Import reusable components
import { Section, Card, Timeline, Tag } from '@/components';

/**
 * ---------------------------------------------------------------------------
 * CAREER TIMELINE DATA
 * ---------------------------------------------------------------------------
 * Edit these to update work experience
 * Events are displayed in order (most recent first recommended)
 */
const careerTimeline = [
  {
    year: 'June 2025 - August 2025',
    title: 'Mergers & Acquisitions Analyst Intern',
    subtitle: 'Ernst & Young (EY) Consulting',
    description:
      'Prepared pre-acquisition financial due diligence reports (red flag reports) for real estate acquisition deals. Conducted thorough due diligence for buy/sell-side parties, from reading balance sheets to checking criminal records. Assisted in IPO advisory by preparing Independent Accountants Reports (IAR) based on forecast financial information.',
    tags: ['M&A', 'Due Diligence', 'IPO Advisory', 'Financial Analysis'],
    highlight: true,
  },
  {
    year: 'July 2023 - August 2023',
    title: 'AI Intern',
    subtitle: 'Synechron Technologies',
    description:
      'Developed an AI-powered cost estimator to streamline insurance claims, reducing manual processing time by 70%. Leveraged predictive analytics for accurate damage valuation. Trained ML model on 10k+ insurance claims data, improving prediction accuracy by 34%.',
    tags: ['Python', 'AI/ML', 'Predictive Analytics', 'Insurance'],
    highlight: true,
  },
];

/**
 * ---------------------------------------------------------------------------
 * EDUCATION TIMELINE DATA
 * ---------------------------------------------------------------------------
 * Edit these to update academic history
 */
const educationTimeline = [
  {
    year: 'September 2024 - December 2027',
    title: 'University of Wisconsin-Madison',
    subtitle: 'B.S. Data Science & Economics',
    description:
      "Junior pursuing dual degree in Data Science and Economics. Dean's List student with 3.8 GPA. Coursework in machine learning, quantitative methods, financial modeling, and predictive analytics. Active in entrepreneurship and finance communities.",
    tags: ['3.8 GPA', "Dean's List", 'Data Science', 'Economics'],
    highlight: true,
  },
];

/**
 * ---------------------------------------------------------------------------
 * KEY PROJECTS DATA
 * ---------------------------------------------------------------------------
 * Edit these to update major projects and ventures
 */
const projects = [
  {
    title: 'TAM',
    type: 'Financial AI Platform',
    year: '2024',
    description:
      'Leveraged LangChain and agentic AI to develop an end-to-end financial due diligence tool, automating data extraction, analysis, and report generation. Created a full-stack analytics platform with Python/FastAPI backend and React frontend.',
    icon: Bot,
    highlight: true,
  },
  {
    title: 'Flux',
    type: 'Campus Networking App',
    year: '2024',
    description:
      'Designed and developed the MVP using Swift, implementing custom UI for swipe-based matching and networking. Leading a cross-functional team of six to launch the product across campus.',
    icon: Trophy,
    highlight: true,
  },
  {
    title: 'BoxMate',
    type: 'E-commerce Platform',
    year: '2024',
    description:
      'Led branding, platform design, and customer outreach strategies. Successfully generated $10,000 in revenue within the first 2 weeks of operations. Performed regression analysis to optimize pricing strategy.',
    icon: Award,
    highlight: false,
  },
];

/**
 * ---------------------------------------------------------------------------
 * ANIMATION VARIANTS
 * ---------------------------------------------------------------------------
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
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
 * TRAJECTORY PAGE COMPONENT
 * ---------------------------------------------------------------------------
 */
export default function TrajectoryPage() {
  return (
    <main className="min-h-screen bg-void-950">
      {/* 
        =========================================================================
        HERO SECTION
        =========================================================================
        Simple header introducing the page
      */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Page Label */}
            <motion.p
              variants={fadeInUp}
              className="text-accent-400 font-mono text-sm uppercase tracking-wider mb-4"
            >
              The Journey
            </motion.p>

            {/* Main Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-steel-50 mb-6"
            >
              Trajectory
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-steel-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              From AI-powered insurance systems to M&A due diligence.
              A path built on technical depth, financial acumen, and
              entrepreneurial execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/*
        =========================================================================
        CAREER EXPERIENCE SECTION
        =========================================================================
        Work history displayed in timeline format
      */}
      <Section id="career" heading="Experience" subheading="Professional Journey">
        <div className="max-w-3xl mx-auto">
          <Timeline events={careerTimeline} />
        </div>
      </Section>

      {/*
        =========================================================================
        EDUCATION SECTION
        =========================================================================
        Academic history displayed in timeline format
      */}
      <Section
        id="education"
        heading="Education"
        subheading="Academic Foundation"
        className="bg-void-900/30"
      >
        <div className="max-w-3xl mx-auto">
          <Timeline events={educationTimeline} />
        </div>
      </Section>

      {/*
        =========================================================================
        KEY PROJECTS SECTION
        =========================================================================
        Major projects and ventures
      */}
      <Section
        id="projects"
        heading="Key Projects"
        subheading="Building Real-World Solutions"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={fadeInUp}>
              <Card
                variant={project.highlight ? 'accent' : 'default'}
                className="h-full"
              >
                {/* Project Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    project.highlight
                      ? 'bg-accent-400/20 text-accent-400'
                      : 'bg-steel-800 text-steel-400'
                  }`}
                >
                  <project.icon className="w-6 h-6" />
                </div>

                {/* Project Type Badge */}
                <span
                  className={`inline-block font-mono text-xs uppercase tracking-wider mb-2 ${
                    project.highlight ? 'text-accent-400' : 'text-steel-500'
                  }`}
                >
                  {project.type}
                </span>

                {/* Project Title */}
                <h3 className="font-display text-xl text-steel-50 mb-1">
                  {project.title}
                </h3>

                {/* Year */}
                <p className="text-steel-500 text-sm mb-3">{project.year}</p>

                {/* Description */}
                <p className="text-steel-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 
        =========================================================================
        SKILLS HIGHLIGHT
        =========================================================================
        Technical and soft skills developed through the journey
      */}
      <Section className="bg-void-900/30">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-display text-2xl md:text-3xl text-steel-50 mb-6"
            >
              What This Journey Built
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3"
            >
              {[
                'Python',
                'SQL',
                'R',
                'LangChain',
                'FastAPI',
                'React',
                'Financial Due Diligence',
                'Valuation Modeling',
                'Predictive Analytics',
                'Machine Learning',
                'NLP',
                'Strategic Problem-Solving',
                'Leadership',
              ].map((skill) => (
                <Tag key={skill} variant="accent" size="md">
                  {skill}
                </Tag>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
