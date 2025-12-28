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
  Instagram,
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
  email: 'yasharvind12345@gmail.com', // UPDATE THIS
  
  // Response time expectation
  responseTime: '24-48 hours',
  
  // Your timezone
  timezone: 'EST',
  
  // Social media links - UPDATE ALL OF THESE
  socials: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yash-arvind-294516218/',
      icon: <Linkedin className="w-5 h-5" />,
      handle: 'yash-arvind-294516218',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/__yash.a/',
      icon: <Instagram className="w-5 h-5" />,
      handle: '@__yash.a',
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
          className="max-w-3xl mx-auto text-center"
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
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
                <div className="flex-1">
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
              <h3 className="text-sm font-medium text-steel-300 mb-4 text-center">
                Email Directly
              </h3>
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800 hover:border-accent-400/30 transition-colors"
              >
                <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-steel-50 font-medium group-hover:text-accent-400 transition-colors truncate">
                    {contactInfo.email}
                  </p>
                  <p className="text-xs text-steel-500">
                    Usually responds within {contactInfo.responseTime}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors flex-shrink-0" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-medium text-steel-300 mb-4 text-center">
                Connect on Social
              </h3>
              <div className="space-y-3">
                {contactInfo.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800 hover:border-accent-400/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-void-800 text-steel-400 group-hover:text-accent-400 transition-colors">
                      {social.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-steel-200 text-sm font-medium">
                        {social.name}
                      </p>
                      <p className="text-xs text-steel-500 truncate">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-steel-500 pt-4 border-t border-void-800">
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
        </div>
      </Section>
    </main>
  );
}
