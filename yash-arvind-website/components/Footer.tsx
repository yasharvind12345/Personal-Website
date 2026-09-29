import { profile, education } from '@/content/profile';
import { CopyEmail } from './CopyEmail';
import { KeysHint } from './keys/KeysHint';

const links = [
  profile.socials.github,
  profile.socials.linkedin,
  profile.socials.instagram,
  { label: 'Résumé', href: profile.resumePath },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" data-nav-theme="ink" className="theme-ink bg-paper text-ink">
      <div className="page-x mx-auto max-w-page pb-10 pt-24 md:pt-32">
        <div className="grid-page gap-y-10">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6">Say hello</p>
            <p className="display text-display-md">
              Building something <span className="font-serif font-normal italic tracking-normal">interesting</span>?
              <br />
              I’d like to hear about it<span className="text-accent">.</span>
            </p>
          </div>
          <div className="col-span-4 flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9">
            <CopyEmail className="link-draw display break-all text-[clamp(1.1rem,2vw,1.5rem)] leading-tight hover:text-accent" />
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-accent">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="meta mt-24 flex flex-col justify-between gap-2 border-t border-rule pt-6 sm:flex-row">
          <span>
            © {year} Yash Arvind · {profile.location} · {education.school}
          </span>
          <KeysHint>
            This site has hidden keys. Press <kbd className="text-ink">?</kbd>
          </KeysHint>
        </div>
      </div>
    </footer>
  );
}
