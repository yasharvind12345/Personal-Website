'use client';

/**
 * =============================================================================
  * CONTACT PAGE - /contact
   * =============================================================================
    *
     * This page provides ways for people to get in touch with you.
      * Features direct contact methods with a clean, professional layout.
       */

import { motion } from 'framer-motion';
import {
    Mail,
    Linkedin,
    Instagram,
    ArrowUpRight,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';

export default function ContactPage() {
    const contactLinks = [
      {
              label: 'Email',
              value: 'yasharvind12345@gmail.com',
              href: 'mailto:yasharvind12345@gmail.com',
              icon: Mail,
      },
      {
              label: 'LinkedIn',
              value: 'linkedin.com/in/yash-arvind',
              href: 'https://www.linkedin.com/in/yash-arvind-294516218/',
              icon: Linkedin,
      },
      {
              label: 'Instagram',
              value: '@__yash.a',
              href: 'https://www.instagram.com/__yash.a/',
              icon: Instagram,
      },
        ];

    return (
          <main className="min-h-screen">
            {/* ================================================================== */}
            {/* HEADER SECTION WITH CONTACT INFO */}
            {/* ================================================================== */}
                <Section className="pt-32 pb-20">
                        <div className="max-w-4xl">
                          {/* Page Label */}
                                  <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6 }}
                                              >
                                              <span className="text-accent-400 text-sm font-mono tracking-wider uppercase mb-4 block">
                                                            Get in Touch
                                              </span>span>
                                  
                                    {/* Main Heading */}
                                              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-steel-50 mb-4">
                                                            Let's <span className="text-accent-400">connect</span>span>
                                              </h1>h1>
                                  
                                    {/* Subtitle */}
                                              <p className="text-lg text-steel-300 leading-relaxed mb-12 max-w-2xl">
                                                            Whether you're interested in collaborating, discussing fintech and AI, or just want to chat—I'd love to hear from you.
                                              </p>p>
                                  </motion.div>motion.div>
                        
                          {/* Contact Information Grid */}
                                  <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, staggerChildren: 0.1 }}
                                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                              >
                                    {contactLinks.map((contact, index) => {
                                                              const IconComponent = contact.icon;
                                                              return (
                                                                                <motion.a
                                                                                                    key={contact.label}
                                                                                                    href={contact.href}
                                                                                                    target={contact.label !== 'Email' ? '_blank' : undefined}
                                                                                                    rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                                                                                                    initial={{ opacity: 0, y: 20 }}
                                                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                                                    viewport={{ once: true }}
                                                                                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                                                                                    className="group p-6 rounded-lg bg-gradient-to-br from-void-900/80 to-void-900/40 border border-void-700 hover:border-accent-400/50 transition-all duration-300"
                                                                                                  >
                                                                                                  <div className="flex items-start gap-4">
                                                                                                    {/* Icon */}
                                                                                                                      <div className="p-3 rounded-lg bg-accent-400/10 text-accent-400 group-hover:bg-accent-400/20 transition-colors">
                                                                                                                                            <IconComponent className="w-5 h-5" />
                                                                                                                        </div>div>
                                                                                                  
                                                                                                    {/* Content */}
                                                                                                                      <div className="flex-1 min-w-0">
                                                                                                                                            <h3 className="text-sm font-medium text-steel-300 mb-1">
                                                                                                                                              {contact.label}
                                                                                                                                              </h3>h3>
                                                                                                                                            <p className="text-steel-200 font-medium break-all group-hover:text-accent-400 transition-colors">
                                                                                                                                              {contact.value}
                                                                                                                                              </p>p>
                                                                                                                        </div>div>
                                                                                                  
                                                                                                    {/* Arrow Icon */}
                                                                                                                      <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors flex-shrink-0 mt-0.5" />
                                                                                                    </div>div>
                                                                                </motion.a>motion.a>
                                                                              );
                                              })}
                                  </motion.div>motion.div>
                        
                          {/* Footer Note */}
                                  <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3, duration: 0.6 }}
                                                className="mt-16 pt-12 border-t border-void-700"
                                              >
                                              <p className="text-steel-500 text-sm">
                                                            I typically respond within 24-48 hours. Looking forward to connecting with you!
                                              </p>p>
                                  </motion.div>motion.div>
                        </div>div>
                </Section>Section>
          </main>main>
        );
}</main>
