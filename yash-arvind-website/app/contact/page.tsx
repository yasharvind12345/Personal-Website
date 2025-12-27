t includes direct contact methods.
   *
   * HOW TO CUSTOMIZE:
 * -----------------
    * 1. Update the "contactInfo" object with your real email and social links
 * 2. Modify the "availability" message as needed
 */

  import { motion } from 'framer-motion';
import {
    Mail,
    Linkedin,
    Github,
    Instagram,
    Clock,
    ArrowUpRight,
    MessageSquare,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

// =============================================================================
// CONTACT INFORMATION - UPDATE THESE WITH YOUR REAL DETAILS
// =============================================================================

const contactInfo = {
    // Primary email address
    email: 'yasharvind12345@gmail.com', // UPDATE THIS
    // Response time expectation
    responseTime: '24-48 hours',
    // Your timezone
    timezone: 'CST',
    // Social media links - UPDATE ALL OF THESE
    socials: [
      {
              name: 'LinkedIn',
              url: 'https://www.linkedin.com/in/yash-arvind-294516218/', // UPDATE THIS
              icon: <Linkedin className="w-5 h-5" />,
              handle: '@yasharvind',
      },
      {
              name: 'GitHub',
              url: 'https://github.com/yasharvind12345', // UPDATE THIS
              icon: <Github className="w-5 h-5" />,
              handle: '@yasharvind',
      },
      {
              name: 'Instagram',
              url: 'https://www.instagram.com/__yash.a/', // UPDATE THIS
              icon: <Instagram className="w-5 h-5" />,
              handle: '@__yash.a',
      },
        ],
};

// Current availability status
const availability = {
    status: 'open', // 'open' | 'limited' | 'closed'
    message: 'Open to summer internships for 2027',
};

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ContactPage() {
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
                                  </span>span>
                        
                          {/* Main headline */}
                                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-steel-50 mb-6">
                                              Let's{' '}
                                              <span className="text-accent-400">connect</span>span>
                                  </h1>h1>
                        
                          {/* Subtitle */}
                                  <p className="text-lg text-steel-400 leading-relaxed">
                                              Whether you're interested in collaborating, have an opportunity to discuss, or just want to chat about fintech and AI—I'd love to hear from you.
                                  </p>p>
                        </motion.div>motion.div>
                </Section>Section>
          
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
                                                                            <div
                                                                                                className={`
                                                                                                                    p-3 rounded-lg
                                                                                                                                        ${
                                                                                                                                                                availability.status === 'open'
                                                                                                                                                                  ? 'bg-green-500/10 text-green-400'
                                                                                                                                                                  : 'bg-amber-500/10 text-amber-400'
                                                                                                                                          }
                                                                                                                                                            `}
                                                                                              >
                                                                                              <MessageSquare className="w-5 h-5" />
                                                                            </div>div>
                                                                            <div>
                                                                                              <div className="flex items-center gap-2 mb-1">
                                                                                                                  <h3 className="font-medium text-steel-50">
                                                                                                                                        Availability
                                                                                                                    </h3>h3>
                                                                                                                  <span
                                                                                                                                          className={`
                                                                                                                                                                  inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full
                                                                                                                                                                                          ${
                                                                                                                                                                                                                      availability.status === 'open'
                                                                                                                                                                                                                        ? 'bg-green-500/10 text-green-400'
                                                                                                                                                                                                                        : 'bg-amber-500/10 text-amber-400'
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                          `}
                                                                                                                                        >
                                                                                                                                        <span
                                                                                                                                                                  className={`
                                                                                                                                                                                            w-1.5 h-1.5 rounded-full animate-pulse
                                                                                                                                                                                                                      ${
                                                                                                                                                                                                                                                    availability.status === 'open'
                                                                                                                                                                                                                                                      ? 'bg-green-400'
                                                                                                                                                                                                                                                      : 'bg-amber-400'
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                          `}
                                                                                                                                                                />
                                                                                                                    {availability.status}
                                                                                                                    </span>span>
                                                                                                </div>div>
                                                                                              <p className="text-sm text-steel-400">
                                                                                                {availability.message}
                                                                                                </p>p>
                                                                            </div>div>
                                                            </div>div>
                                              </Card>Card>
                                  
                                    {/* Direct Email */}
                                              <div>
                                                            <h3 className="text-sm font-medium text-steel-300 mb-4">
                                                                            Email Directly
                                                            </h3>h3>
                                                            <a
                                                                              href={`mailto:${contactInfo.email}`}
                                                                              className="group flex items-center gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800 hover:border-accent-400/30 transition-colors"
                                                                            >
                                                                            <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400">
                                                                                              <Mail className="w-5 h-5" />
                                                                            </div>div>
                                                                            <div className="flex-1">
                                                                                              <p className="text-steel-50 font-medium group-hover:text-accent-400 transition-colors">
                                                                                                {contactInfo.email}
                                                                                                </p>p>
                                                                                              <p className="text-xs text-steel-500">
                                                                                                                  Usually responds within {contactInfo.responseTime}
                                                                                                </p>p>
                                                                            </div>div>
                                                                            <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors" />
                                                            </a>a>
                                              </div>div>
                                  
                                    {/* Social Links */}
                                              <div>
                                                            <h3 className="text-sm font-medium text-steel-300 mb-4">
                                                                            Connect on Social
                                                            </h3>h3>
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
                                                                                        </div>div>
                                                                                      <div className="flex-1">
                                                                                                            <p className="text-steel-200 text-sm font-medium">
                                                                                                              {social.name}
                                                                                                              </p>p>
                                                                                                            <p className="text-xs text-steel-500">
                                                                                                              {social.handle}
                                                                                                              </p>p>
                                                                                        </div>div>
                                                                                      <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors" />
                                                                  </a>a>
                                                                ))}
                                                            </div>div>
                                              </div>div>
                                  
                                    {/* Response Info */}
                                              <div className="flex items-center gap-6 text-sm text-steel-500 pt-4 border-t border-void-800">
                                                            <div className="flex items-center gap-2">
                                                                            <Clock className="w-4 h-4" />
                                                                            <span>{contactInfo.timezone}</span>span>
                                                            </div>div>
                                                            <div className="flex items-center gap-2">
                                                                            <Mail className="w-4 h-4" />
                                                                            <span>{contactInfo.responseTime} response</span>span>
                                                            </div>div>
                                              </div>div>
                                  </motion.div>motion.div>
                        </div>div>
                
                  {/* Additional Note */}
                        <p className="mt-6 text-sm text-steel-500 text-center">
                                  Prefer email? Reach out directly at{' '}
                                  <a
                                                href={`mailto:${contactInfo.email}`}
                                                className="text-accent-400 hover:underline"
                                              >
                                    {contactInfo.email}
                                  </a>a>
                        </p>p>
                </Section>Section>
          </main>main>
        );
}</main>
