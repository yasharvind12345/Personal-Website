import { Link } from 'next-view-transitions';
import { navLinks, profile, education } from '@/content/profile';
import { CopyEmail } from './CopyEmail';

const socials = [profile.socials.linkedin, profile.socials.github, profile.socials.instagram];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" data-nav-theme="ink" className="theme-ink bg-paper text-ink">
      <div className="page-x mx-auto max-w-page pb-10 pt-24 md:pt-32">
        <p className="meta mb-6">Contact</p>
        <p className="display max-w-5xl text-display-lg">
          Let’s build <span className="font-serif font-normal italic tracking-normal">something</span>
          <span className="text-accent">.</span>
        </p>
        <p className="mt-8 max-w-prose text-lg text-muted">{profile.cta}</p>

        <div className="mt-10">
          <CopyEmail className="link-draw display text-display-sm hover:text-accent" />
          <p className="meta mt-3">Click to copy · replies within {profile.responseTime}</p>
        </div>

        <div className="grid-page mt-24 gap-y-10 border-t border-rule pt-8">
          <div className="col-span-2 md:col-span-3">
            <p className="meta mb-3">Pages</p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/" className="link-draw hover:text-accent">
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-draw hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-accent">
                  Résumé ↗
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="meta mb-3">Elsewhere</p>
            <ul className="space-y-1.5 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-accent">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-6 md:text-right">
            <p className="meta mb-3">Based in</p>
            <p className="text-sm">
              {profile.location} · {education.school}
            </p>
            <p className="mt-1 text-sm text-muted">{profile.relocation}</p>
          </div>
        </div>

        <div className="meta mt-16 flex flex-col justify-between gap-2 sm:flex-row">
          <span>© {year} Yash Arvind</span>
          <span>Designed and built in Madison, WI</span>
        </div>
      </div>
    </footer>
  );
}
