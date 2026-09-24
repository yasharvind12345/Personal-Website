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
 * - Links, socials, and location come from content/profile.ts
 */

import Link from 'next/link';
import { Linkedin, Mail, ArrowUpRight, Instagram, Github } from 'lucide-react';
import { navLinks, profile, education } from '@/content/profile';

const socialLinks = [
  { ...profile.socials.linkedin, icon: Linkedin, external: true },
  { ...profile.socials.github, icon: Github, external: true },
  { ...profile.socials.instagram, icon: Instagram, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, external: false },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-steel-800/50 bg-void-950">
      {/* Decorative gradient line at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/20 to-transparent" />

      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Brand & Description */}
          <div>
            <Link
              href="/"
              className="inline-block font-display text-2xl text-steel-50 hover:text-accent-400 transition-colors mb-4 rounded-md"
            >
              <span className="text-accent-400">Y</span>ash Arvind
            </Link>

            <p className="text-steel-500 text-sm leading-relaxed max-w-xs">{profile.headline}</p>

            <div className="flex items-center gap-2 mt-6">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-steel-500 font-mono">
                Open to PM / APM, BizOps, and AI product roles
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-steel-500 mb-4">
              Navigation
            </h2>
            <nav className="space-y-3" aria-label="Footer">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block w-fit text-steel-400 hover:text-steel-100 transition-colors text-sm rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Connect/Social */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-steel-500 mb-4">
              Connect
            </h2>

            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex w-fit items-center gap-3 text-steel-400 hover:text-accent-400 transition-colors group rounded"
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span className="text-sm">{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      aria-hidden="true"
                      className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-steel-800/50">
              <p className="text-xs text-steel-600 font-mono">{profile.location}</p>
              <p className="text-xs text-steel-600 font-mono mt-1">{education.school}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-16 pt-8 border-t border-steel-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-steel-600">
              © {currentYear} Yash Arvind. All rights reserved.
            </p>
            <p className="text-xs text-steel-600 font-mono">Built with Next.js + TypeScript</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
