/**
 * =============================================================================
 * BEYOND PAGE
 * =============================================================================
 * 
 * This page showcases Yash's life outside of work and tech - athletics,
 * social impact initiatives, and personal interests.
 * 
 * SECTIONS:
 * 1. Header - Page introduction
 * 2. Athletics - Sports and martial arts
 * 3. Social Impact - Community work and giving back
 * 4. Interests - Hobbies and personal pursuits
 * 
 * HOW TO CUSTOMIZE:
 * - Edit the athletics array to update sports activities
 * - Edit the socialImpact section to update community work
 * - Edit the interests array to update hobbies
 */

'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  Globe,
  Lightbulb,
  Target,
  Swords,
  Medal,
  BookOpen,
  Music,
  Gamepad2,
  Camera,
  Mountain,
} from 'lucide-react';

// Import reusable components
import { Section, Card, Tag } from '@/components';

/**
 * ---------------------------------------------------------------------------
 * ATHLETICS DATA
 * ---------------------------------------------------------------------------
 * Edit these to update sports and physical activities
 */
const athletics = [
  {
    name: 'Karate',
    achievement: 'Black Belt',
    description:
      'Earned black belt through years of dedicated training. Developed discipline, focus, and mental resilience that translates to all areas of life.',
    icon: Swords,
    highlight: true,
  },
  {
    name: 'Soccer',
    achievement: 'Competitive Player',
    description:
      'Team sport that taught collaboration, strategy under pressure, and the importance of every role in achieving collective goals.',
    icon: Target,
    highlight: false,
  },
  {
    name: 'Badminton',
    achievement: 'Active Player',
    description:
      'Fast-paced sport requiring quick reflexes and strategic thinking. Regular player for fitness and competitive spirit.',
    icon: Medal,
    highlight: false,
  },
];

/**
 * ---------------------------------------------------------------------------
 * SOCIAL IMPACT DATA
 * ---------------------------------------------------------------------------
 * Edit this to update community work and social initiatives
 */
const socialImpact = {
  title: 'STEM Lab in Rural India',
  description:
    'Founded and equipped a STEM education lab in a rural Indian community, providing access to technology and hands-on learning for students who otherwise would have limited exposure to computer science and robotics.',
  impact: [
    {
      metric: '100+',
      label: 'Students Impacted',
    },
    {
      metric: 'Ongoing',
      label: 'Program Status',
    },
    {
      metric: 'STEM',
      label: 'Focus Area',
    },
  ],
  details: [
    'Provided computers and robotics kits',
    'Established curriculum for hands-on learning',
    'Created sustainable program with local teachers',
    'Focused on underserved communities',
  ],
};

/**
 * ---------------------------------------------------------------------------
 * INTERESTS DATA
 * ---------------------------------------------------------------------------
 * Edit these to update hobbies and personal interests
 */
const interests = [
  {
    name: 'Reading',
    description: 'Finance, technology, and business strategy books',
    icon: BookOpen,
  },
  {
    name: 'Gaming',
    description: 'Strategy games and competitive esports',
    icon: Gamepad2,
  },
  {
    name: 'Photography',
    description: 'Capturing moments and visual storytelling',
    icon: Camera,
  },
  {
    name: 'Hiking',
    description: 'Exploring nature and staying active outdoors',
    icon: Mountain,
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
 * BEYOND PAGE COMPONENT
 * ---------------------------------------------------------------------------
 */
export default function BeyondPage() {
  return (
    <main className="min-h-screen bg-void-950">
      {/* 
        =========================================================================
        HERO SECTION
        =========================================================================
        Simple header introducing the page
      */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            {/* Page Label */}
            <motion.p
              variants={fadeInUp}
              className="text-accent-400 font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4"
            >
              Outside the Screen
            </motion.p>

            {/* Main Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-steel-50 mb-4 sm:mb-6"
            >
              Beyond
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-steel-400 text-base sm:text-lg md:text-xl leading-relaxed"
            >
              The discipline of a black belt. The teamwork of competitive sports.
              The purpose of giving back. Who I am when the laptop closes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 
        =========================================================================
        ATHLETICS SECTION
        =========================================================================
        Sports and martial arts achievements
      */}
      <Section id="athletics" heading="Athletics" subheading="Physical Discipline">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {athletics.map((sport) => (
            <motion.div key={sport.name} variants={fadeInUp}>
              <Card
                variant={sport.highlight ? 'accent' : 'default'}
                className="h-full"
              >
                {/* Sport Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    sport.highlight
                      ? 'bg-accent-400/20 text-accent-400'
                      : 'bg-steel-800 text-steel-400'
                  }`}
                >
                  <sport.icon className="w-6 h-6" />
                </div>

                {/* Achievement Badge */}
                <span
                  className={`inline-block font-mono text-xs uppercase tracking-wider mb-2 ${
                    sport.highlight ? 'text-accent-400' : 'text-steel-500'
                  }`}
                >
                  {sport.achievement}
                </span>

                {/* Sport Name */}
                <h3 className="font-display text-lg sm:text-xl text-steel-50 mb-3">
                  {sport.name}
                </h3>

                {/* Description */}
                <p className="text-steel-400 text-sm sm:text-base leading-relaxed">
                  {sport.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 
        =========================================================================
        SOCIAL IMPACT SECTION
        =========================================================================
        Community work and giving back
      */}
      <Section
        id="impact"
        heading="Social Impact"
        subheading="Giving Back"
        className="bg-void-900/30"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <Card variant="accent" className="relative overflow-hidden">
            {/* Background Gradient Orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-400/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-steel-50 mb-2">
                    {socialImpact.title}
                  </h3>
                  <p className="text-steel-400 text-sm sm:text-base leading-relaxed">
                    {socialImpact.description}
                  </p>
                </div>
              </div>

              {/* Impact Metrics */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              >
                {socialImpact.impact.map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-4 bg-void-950/50 rounded-lg"
                  >
                    <div className="font-display text-2xl md:text-3xl text-accent-400 mb-1">
                      {item.metric}
                    </div>
                    <div className="text-steel-500 text-xs sm:text-sm">{item.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Details List */}
              <motion.div variants={fadeInUp}>
                <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-steel-500 mb-4">
                  What We Built
                </h4>
                <ul className="space-y-3">
                  {socialImpact.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                      <span className="text-steel-300 text-sm sm:text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* 
        =========================================================================
        INTERESTS SECTION
        =========================================================================
        Hobbies and personal pursuits
      */}
      <Section id="interests" heading="Interests" subheading="What I Enjoy">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {interests.map((interest) => (
            <motion.div key={interest.name} variants={fadeInUp}>
              <Card
                variant="ghost"
                className="text-center group hover:border-steel-700/50 transition-colors h-full"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-steel-800/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-steel-800 transition-colors">
                  <interest.icon className="w-6 h-6 text-steel-400 group-hover:text-accent-400 transition-colors" />
                </div>

                {/* Name */}
                <h3 className="font-display text-base sm:text-lg text-steel-50 mb-2">
                  {interest.name}
                </h3>

                {/* Description */}
                <p className="text-steel-500 text-xs sm:text-sm">{interest.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* 
        =========================================================================
        PHILOSOPHY SECTION
        =========================================================================
        Personal values and approach to life
      */}
      <Section className="bg-void-900/30">
        <div className="text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent-400/10 flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-accent-400" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-xl sm:text-2xl md:text-3xl text-steel-50 mb-4 sm:mb-6"
            >
              The Common Thread
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-steel-400 text-base sm:text-lg leading-relaxed"
            >
              Whether it&apos;s earning a black belt, building a STEM lab, or
              shipping code at midnight—the approach is the same. Show up.
              Put in the work. Iterate until it&apos;s right. That discipline
              doesn&apos;t stay on the mat or in the IDE. It carries through
              everything.
            </motion.p>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
