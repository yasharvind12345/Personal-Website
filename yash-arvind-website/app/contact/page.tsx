'use client';

/**
 * =============================================================================
 * CONTACT PAGE - /contact
 * =============================================================================
 * 
 * This page provides ways for people to get in touch with you.
 * It includes direct contact methods and a simple contact form.
 * 
 * HOW TO CUSTOMIZE:
 * -----------------
 * 1. Update the "contactInfo" object with your real email and social links
 * 2. Modify the "availability" message as needed
 * 3. The form currently just logs to console - you'll need to connect it
 *    to a backend service (see FORM INTEGRATION NOTE below)
 * 
 * FORM INTEGRATION NOTE:
 * ----------------------
 * The contact form needs a backend to actually send messages. Options:
 * - Formspree (formspree.io) - Free tier available, easy setup
 * - Netlify Forms - If you deploy to Netlify
 * - Custom API route - Add /app/api/contact/route.ts
 * - Email service like Resend, SendGrid, or Mailgun
 * 
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// =============================================================================
// CONTACT INFORMATION - UPDATE THESE WITH YOUR REAL DETAILS
// =============================================================================

const contactInfo = {
  // Primary email address
  email: 'yash@example.com', // UPDATE THIS
  
  // Response time expectation
  responseTime: '24-48 hours',
  
  // Your timezone
  timezone: 'EST',
  
  // Social media links - UPDATE ALL OF THESE
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yasharvind', // UPDATE THIS
      icon: <Linkedin className="w-5 h-5" />,
      handle: '@yasharvind',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/yasharvind', // UPDATE THIS
      icon: <Github className="w-5 h-5" />,
      handle: '@yasharvind',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yasharvind', // UPDATE THIS
      icon: <Twitter className="w-5 h-5" />,
      handle: '@yasharvind',
    },
  ],
};

// Current availability status
const availability = {
  status: 'open', // 'open' | 'limited' | 'closed'
  message: 'Open to full-time opportunities starting 2025',
};

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ContactPage() {
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    // =========================================================================
    // FORM SUBMISSION LOGIC
    // =========================================================================
    // Replace this with your actual form submission logic
    // Example with Formspree:
    // 
    // try {
    //   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formState),
    //   });
    //   if (response.ok) {
    //     setSubmitStatus('success');
    //     setFormState({ name: '', email: '', subject: '', message: '' });
    //   } else {
    //     setSubmitStatus('error');
    //   }
    // } catch (error) {
    //   setSubmitStatus('error');
    // }
    // =========================================================================

    // Simulate form submission for demo
    console.log('Form submitted:', formState);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

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
            Contact
          </span>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-steel-50 mb-6">
            Let's{' '}
            <span className="text-accent-400">connect</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-steel-400 leading-relaxed">
            Whether you're interested in collaborating, have an opportunity to discuss, 
            or just want to chat about fintech and AI—I'd love to hear from you.
          </p>
        </motion.div>
      </Section>

      {/* ================================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================================== */}
      <Section className="pb-24">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column - Contact Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Availability Status */}
            <Card variant="accent">
              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-lg
                  ${availability.status === 'open' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-amber-500/10 text-amber-400'
                  }
                `}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-steel-50">Availability</h3>
                    <span className={`
                      inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full
                      ${availability.status === 'open'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-amber-500/10 text-amber-400'
                      }
                    `}>
                      <span className={`
                        w-1.5 h-1.5 rounded-full animate-pulse
                        ${availability.status === 'open' ? 'bg-green-400' : 'bg-amber-400'}
                      `} />
                      {availability.status}
                    </span>
                  </div>
                  <p className="text-sm text-steel-400">
                    {availability.message}
                  </p>
                </div>
              </div>
            </Card>

            {/* Direct Email */}
            <div>
              <h3 className="text-sm font-medium text-steel-300 mb-4">
                Email Directly
              </h3>
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800 hover:border-accent-400/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-steel-50 font-medium group-hover:text-accent-400 transition-colors">
                    {contactInfo.email}
                  </p>
                  <p className="text-xs text-steel-500">
                    Usually responds within {contactInfo.responseTime}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-medium text-steel-300 mb-4">
                Connect on Social
              </h3>
              <div className="space-y-2">
                {contactInfo.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-void-900/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-void-800 text-steel-400 group-hover:text-accent-400 transition-colors">
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-steel-200 text-sm font-medium">
                        {social.name}
                      </p>
                      <p className="text-xs text-steel-500">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Info */}
            <div className="flex items-center gap-6 text-sm text-steel-500 pt-4 border-t border-void-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{contactInfo.timezone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{contactInfo.responseTime} response</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <h2 className="text-xl font-display text-steel-50 mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-steel-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg bg-void-900 border border-void-700 text-steel-50 placeholder-steel-600 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-steel-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-void-900 border border-void-700 text-steel-50 placeholder-steel-600 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium text-steel-300 mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-void-900 border border-void-700 text-steel-50 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400 transition-colors"
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="opportunity">Job Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="investment">Investment Discussion</option>
                    <option value="speaking">Speaking/Writing</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-steel-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me what you're thinking..."
                    className="w-full px-4 py-3 rounded-lg bg-void-900 border border-void-700 text-steel-50 placeholder-steel-600 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading' || submitStatus === 'success'}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                      ${submitStatus === 'success'
                        ? 'bg-green-500/10 text-green-400 cursor-not-allowed'
                        : submitStatus === 'loading'
                        ? 'bg-accent-400/50 text-void-950 cursor-wait'
                        : 'bg-accent-400 text-void-950 hover:bg-accent-300'
                      }
                    `}
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitStatus === 'error' && (
                    <span className="flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again.
                    </span>
                  )}
                </div>
              </form>
            </Card>

            {/* Additional Note */}
            <p className="mt-6 text-sm text-steel-500 text-center">
              Prefer email? Reach out directly at{' '}
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-accent-400 hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
