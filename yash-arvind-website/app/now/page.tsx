'use client';

/**
 * =============================================================================
 * NOW PAGE - /now
 * =============================================================================
 * 
 * This page shows what you're currently focused on. It's inspired by Derek Sivers'
 * /now page movement (nownownow.com). Update this regularly to show what's on
 * your mind and what you're working on.
 * 
 * HOW TO CUSTOMIZE:
 * -----------------
 * 1. Update the "lastUpdated" date whenever you make changes
 * 2. Edit the "currentFocus" array with your active priorities
 * 3. Modify "openTo" with opportunities you're seeking
 * 4. Change "reading" and "thinking" sections to reflect your interests
 * 
 */

import { motion } from 'framer-motion';
import { 
  Clock, 
  Briefcase, 
  BookOpen, 
  Brain,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Target,
  Rocket,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

// =============================================================================
// NOW PAGE DATA - Update this whenever your focus changes
// =============================================================================

// When was this page last updated?
const lastUpdated = 'December 2024'; // UPDATE THIS WHEN YOU MAKE CHANGES

// Where are you based?
const location = 'United States'; // UPDATE WITH YOUR LOCATION

// =============================================================================
// CURRENT FOCUS - What are you actively working on?
// =============================================================================

const currentFocus = [
  {
    title: 'AI Hedge Fund Development',
    description: 'Building autonomous trading systems with machine learning-driven decision making. Currently focused on risk management frameworks and multi-strategy portfolio construction.',
    status: 'active',
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    title: 'TAM - AI Due Diligence Platform',
    description: 'Scaling the AI-powered due diligence platform. Working on expanding analysis capabilities and improving accuracy of financial document processing.',
    status: 'active',
    icon: <Target className="w-5 h-5" />,
  },
  {
    title: 'Final Year Coursework',
    description: 'Completing advanced coursework in machine learning, financial engineering, and distributed systems while maintaining strong academic performance.',
    status: 'ongoing',
    icon: <BookOpen className="w-5 h-5" />,
  },
];

// =============================================================================
// OPEN TO - What opportunities are you seeking?
// =============================================================================

const openTo = [
  {
    type: 'Full-time Roles',
    description: 'Quantitative development, trading technology, or fintech product roles starting 2025',
    priority: 'high',
  },
  {
    type: 'Investment Opportunities',
    description: 'Conversations about early-stage fintech and AI infrastructure startups',
    priority: 'medium',
  },
  {
    type: 'Collaborations',
    description: 'Technical co-founders and advisors for fintech ventures',
    priority: 'medium',
  },
  {
    type: 'Speaking & Writing',
    description: 'Discussions about AI in finance, student entrepreneurship, and building in public',
    priority: 'low',
  },
];

// =============================================================================
// READING & THINKING - What's influencing your work?
// =============================================================================

const currentReading = [
  {
    title: 'Advances in Financial Machine Learning',
    author: 'Marcos López de Prado',
    type: 'book',
  },
  {
    title: 'The Man Who Solved the Market',
    author: 'Gregory Zuckerman',
    type: 'book',
  },
  {
    title: 'Research papers on transformer architectures for time series',
    author: '',
    type: 'research',
  },
];

const thinkingAbout = [
  'How LLMs can improve financial due diligence workflows',
  'The future of retail quant trading with AI',
  'Building antifragile systems in volatile markets',
  'Balancing academic rigor with startup velocity',
];

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function NowPage() {
  return (
    <main className="min-h-screen">
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <Section className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Page label */}
          <span className="text-accent-400 text-sm font-mono tracking-wider uppercase mb-4 block">
            Now
          </span>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-steel-50 mb-6">
            What I'm{' '}
            <span className="text-accent-400">focused</span> on
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-steel-400 leading-relaxed mb-8">
            This page is a snapshot of my current priorities, projects, and thinking. 
            Inspired by the <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:underline">/now page movement</a>.
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-steel-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Updated {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ================================================================== */}
      {/* CURRENT FOCUS SECTION */}
      {/* ================================================================== */}
      <Section>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display text-steel-50">Current Focus</h2>
          </div>

          <div className="space-y-4">
            {currentFocus.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="group">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="p-3 rounded-lg bg-void-800 text-accent-400 group-hover:bg-accent-400/10 transition-colors">
                      {item.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-steel-50">
                          {item.title}
                        </h3>
                        {/* Status indicator */}
                        <span className={`
                          inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full
                          ${item.status === 'active' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-steel-800 text-steel-400'
                          }
                        `}>
                          {item.status === 'active' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          )}
                          {item.status}
                        </span>
                      </div>
                      <p className="text-steel-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ================================================================== */}
      {/* OPEN TO SECTION */}
      {/* ================================================================== */}
      <Section>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display text-steel-50">Open To</h2>
            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {openTo.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-steel-50 mb-2">
                        {item.type}
                      </h3>
                      <p className="text-sm text-steel-400">
                        {item.description}
                      </p>
                    </div>
                    {/* Priority indicator */}
                    <Tag 
                      variant={
                        item.priority === 'high' ? 'success' : 
                        item.priority === 'medium' ? 'warning' : 'default'
                      }
                      className="flex-shrink-0"
                    >
                      {item.priority}
                    </Tag>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA to contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Button href="/contact" variant="primary">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* ================================================================== */}
      {/* READING & THINKING SECTION */}
      {/* ================================================================== */}
      <Section className="pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Currently Reading */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display text-steel-50">Currently Reading</h2>
            </div>

            <div className="space-y-4">
              {currentReading.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800"
                >
                  <div className="w-1 h-full min-h-[40px] rounded-full bg-accent-400/30" />
                  <div>
                    <p className="text-steel-200 font-medium text-sm">
                      {item.title}
                    </p>
                    {item.author && (
                      <p className="text-steel-500 text-xs mt-1">
                        by {item.author}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Thinking About */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400">
                <Brain className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display text-steel-50">Thinking About</h2>
            </div>

            <div className="space-y-3">
              {thinkingAbout.map((thought, index) => (
                <motion.div
                  key={thought}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <ArrowRight className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                  <span className="text-steel-300">{thought}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
