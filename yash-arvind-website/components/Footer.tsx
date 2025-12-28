/**
 * =============================================================================
 * FOOTER COMPONENT
 * =============================================================================
 * 
 * This component renders the website footer that appears on every page.
 * 
 * FEATURES:
 * - Copyright notice
 * - Quick navigation links
 * - Social media links
 * - Contact information
 * 
 * HOW TO CUSTOMIZE:
 * - Update social links with your actual profiles
 * - Modify the layout for different footer designs
 * - Add additional sections as needed
 */

import Link from 'next/link';
import { Linkedin, Mail, ArrowUpRight, Instagram } from 'lucide-react';

/**
 * ---------------------------------------------------------------------------
 * FOOTER LINKS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Edit these arrays to customize the footer navigation
 */

// Main navigation links
const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Ventures' },
  { href: '/trajectory', label: 'Trajectory' },
  { href: '/beyond', label: 'Outside the Screen' },
  { href: '/contact', label: 'Contact' },
];

// Social media links
const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/yash-arvind-294516218/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/__yash.a/',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'mailto:yasharvind12345@gmail.com',
    label: 'Email',
    icon: Mail,
  },
];

/**
 * ---------------------------------------------------------------------------
 * FOOTER COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Footer() {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-steel-800/50 bg-void-950">
      {/* 
        Decorative gradient line at the top
        Creates visual separation between content and footer
      */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/20 to-transparent" />

      <div className="container-custom py-16 md:py-20">
        {/* 
          Main Footer Grid
          3 columns on desktop, stacks on mobile
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* 
            Column 1: Brand & Description
          */}
          <div className="md:col-span-1">
            {/* Name/Logo */}
            <Link
              href="/"
              className="inline-block font-display text-2xl text-steel-50 hover:text-accent-400 transition-colors mb-4"
            >
              <span className="text-accent-400">Y</span>ash Arvind
            </Link>
            
            {/* Brief description */}
            <p className="text-steel-500 text-sm leading-relaxed max-w-xs">
              Building AI-driven financial systems. 
              Fintech founder mindset with engineering execution.
            </p>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-6">
              {/* Pulsing green dot indicates availability */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-steel-500 font-mono">
                Open to opportunities
              </span>
            </div>
          </div>

          {/* 
            Column 2: Quick Links
          */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-steel-500 mb-4">
              Navigation
            </h3>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-steel-400 hover:text-steel-100 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 
            Column 3: Connect/Social
          */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-steel-500 mb-4">
              Connect
            </h3>
            
            {/* Social Links */}
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-steel-400 hover:text-accent-400 transition-colors group"
                  >
                    <Icon size={16} />
                    <span className="text-sm">{link.label}</span>
                    <ArrowUpRight 
                      size={12} 
                      className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" 
                    />
                  </a>
                );
              })}
            </div>

            {/* Location */}
            <div className="mt-6 pt-6 border-t border-steel-800/50">
              <p className="text-xs text-steel-600 font-mono">
                Based in the United States
              </p>
              <p className="text-xs text-steel-600 font-mono mt-1">
                University of Wisconsin–Madison
              </p>
            </div>
          </div>
        </div>

        {/* 
          Bottom Bar: Copyright
        */}
        <div className="mt-16 pt-8 border-t border-steel-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright text */}
            <p className="text-xs text-steel-600">
              © {currentYear} Yash Arvind. All rights reserved.
            </p>
            
            {/* Built with badge */}
            <p className="text-xs text-steel-600 font-mono">
              Built with Next.js + TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
