/**
 * =============================================================================
 * CONTACT PAGE - /contact
 * =============================================================================
 *
 * Direct contact methods. Email, socials, and availability come from
 * content/profile.ts.
 */

import { Mail, Linkedin, Instagram, Github, MapPin, Plane, ArrowUpRight, MessageSquare } from 'lucide-react';

import { Section, Card } from '@/components';
import { profile } from '@/content/profile';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Yash Arvind about PM / APM, BizOps, and AI product roles. Graduating May 2027; open to San Francisco, New York, and Washington, DC.',
  path: '/contact',
});

const socials = [
  { ...profile.socials.linkedin, icon: Linkedin },
  { ...profile.socials.github, icon: Github },
  { ...profile.socials.instagram, icon: Instagram },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-12 md:pt-20 pb-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center hero-in">
            <p className="text-accent-400 text-sm font-mono tracking-wider uppercase mb-4">Contact</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-steel-50 mb-6">
              Let&apos;s <span className="text-accent-400">connect</span>
            </h1>
            <p className="text-lg text-steel-400 leading-relaxed">
              Hiring for a PM / APM, BizOps, or AI product role, or building something where AI
              could make your team faster? I&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <Section className="!pt-0">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Availability */}
          <Card variant="accent" hover={false}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10 text-green-400" aria-hidden="true">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-sans font-medium text-steel-50">Availability</h2>
                  <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 motion-safe:animate-pulse" aria-hidden="true" />
                    open
                  </span>
                </div>
                <p className="text-sm text-steel-400">{profile.availability}</p>
              </div>
            </div>
          </Card>

          {/* Direct Email */}
          <div>
            <h2 className="font-sans text-sm font-medium text-steel-300 mb-4 text-center">Email Directly</h2>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800 hover:border-accent-400/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-accent-400/10 text-accent-400" aria-hidden="true">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-steel-50 font-medium group-hover:text-accent-400 transition-colors truncate">
                  {profile.email}
                </p>
                <p className="text-xs text-steel-500">Usually responds within {profile.responseTime}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors flex-shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="font-sans text-sm font-medium text-steel-300 mb-4 text-center">Connect Online</h2>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-lg bg-void-900/50 border border-void-800 hover:border-accent-400/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-void-800 text-steel-400 group-hover:text-accent-400 transition-colors" aria-hidden="true">
                      <social.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-steel-200 text-sm font-medium">{social.label}</p>
                      <p className="text-xs text-steel-500 truncate">{social.handle}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-steel-600 group-hover:text-accent-400 transition-colors flex-shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & timezone */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-steel-500 pt-4 border-t border-void-800 text-center">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {profile.location} · {profile.timezone}
            </p>
            <p className="flex items-center gap-2">
              <Plane className="w-4 h-4" aria-hidden="true" />
              {profile.relocation}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
