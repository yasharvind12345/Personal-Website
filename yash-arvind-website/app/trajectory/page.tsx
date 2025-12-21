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
  Medal,
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
    year: '2024',
    title: 'AI Development Intern',
    subtitle: 'Synechron',
    description:
      'Developed AI models that achieved 70% efficiency improvement in document processing. Built automated workflows using LangChain and Python for financial services clients.',
    tags: ['Python', 'LangChain', 'AI/ML', 'Financial Services'],
    highlight: true,
  },
  {
    year: '2023',
    title: 'Technology Analyst Intern',
    subtitle: 'EY (Ernst & Young)',
    description:
      'Worked on technology consulting projects for enterprise clients. Gained exposure to digital transformation initiatives and client-facing delivery.',
    tags: ['Consulting', 'Tech Strategy', 'Enterprise'],
    highlight: false,
  },
  {
    year: '2022',
    title: 'Product & Engineering Intern',
    subtitle: 'Zendesk',
    description:
      'Contributed to product development and engineering initiatives. Worked with cross-functional teams on SaaS platform improvements.',
    tags: ['SaaS', 'Product', 'Engineering'],
    highlight: false,
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
    year: '2022 - Present',
    title: 'University of Wisconsin-Madison',
    subtitle: 'B.S. Computer Science & Data Science',
    description:
      "Dean's List student with 3.8 GPA. Coursework in machine learning, algorithms, data structures, and quantitative methods. Active in entrepreneurship and finance communities.",
    tags: ['3.8 GPA', "Dean's List", 'CS', 'Data Science'],
    highlight: true,
  },
  {
    year: '2018 - 2022',
    title: 'High School',
    subtitle: 'STEM Focus',
    description:
      'Strong foundation in mathematics and computer science. Active in robotics competitions and technology clubs. National-level achievements in robotics.',
    tags: ['STEM', 'Robotics', 'Mathematics'],
    highlight: false,
  },
];

/**
 * ---------------------------------------------------------------------------
 * AWARDS & ACHIEVEMENTS DATA
 * ---------------------------------------------------------------------------
 * Edit these to update recognition and honors
 */
const awards = [
  {
    title: 'World Robot Olympiad',
    type: 'National Champion',
    year: '2019',
    description:
      'Won the national championship in the World Robot Olympiad, demonstrating advanced robotics engineering and problem-solving skills.',
    icon: Trophy,
    highlight: true,
  },
  {
    title: 'FIRST Robotics Competition',
    type: 'National Champion',
    year: '2020',
    description:
      'Led team to national victory in FIRST Robotics Competition, combining engineering, programming, and strategic thinking.',
    icon: Medal,
    highlight: true,
  },
  {
    title: "Dean's List",
    type: 'Academic Honor',
    year: '2022-2024',
    description:
      'Consistently recognized for academic excellence at University of Wisconsin-Madison with a 3.8 GPA.',
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
            className="max-w-3xl"
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
              className="text-steel-400 text-lg md:text-xl leading-relaxed"
            >
              From robotics championships to Wall Street-adjacent AI systems.
              A path built on technical depth, competitive drive, and
              relentless execution.
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
        <div className="max-w-3xl">
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
        <div className="max-w-3xl">
          <Timeline events={educationTimeline} />
        </div>
      </Section>

      {/* 
        =========================================================================
        AWARDS & RECOGNITION SECTION
        =========================================================================
        Major achievements and honors
      */}
      <Section
        id="awards"
        heading="Recognition"
        subheading="Achievements & Awards"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {awards.map((award, index) => (
            <motion.div key={award.title} variants={fadeInUp}>
              <Card
                variant={award.highlight ? 'accent' : 'default'}
                className="h-full"
              >
                {/* Award Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    award.highlight
                      ? 'bg-accent-400/20 text-accent-400'
                      : 'bg-steel-800 text-steel-400'
                  }`}
                >
                  <award.icon className="w-6 h-6" />
                </div>

                {/* Award Type Badge */}
                <span
                  className={`inline-block font-mono text-xs uppercase tracking-wider mb-2 ${
                    award.highlight ? 'text-accent-400' : 'text-steel-500'
                  }`}
                >
                  {award.type}
                </span>

                {/* Award Title */}
                <h3 className="font-display text-xl text-steel-50 mb-1">
                  {award.title}
                </h3>

                {/* Year */}
                <p className="text-steel-500 text-sm mb-3">{award.year}</p>

                {/* Description */}
                <p className="text-steel-400 text-sm leading-relaxed">
                  {award.description}
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
                'TypeScript',
                'React',
                'LangChain',
                'Machine Learning',
                'Quantitative Finance',
                'Financial Modeling',
                'System Design',
                'Technical Leadership',
                'Problem Solving',
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
