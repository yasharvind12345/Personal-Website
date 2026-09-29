import { Link } from 'next-view-transitions';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { CopyEmail } from '@/components/CopyEmail';
import { SectionHead } from '@/components/about/SectionHead';
import { ExperienceTimeline } from '@/components/about/ExperienceTimeline';
import { profile, education } from '@/content/profile';
import { experience } from '@/content/experience';
import { hackathons, recognition } from '@/content/hackathons';
import { skills } from '@/content/skills';
import { beyond } from '@/content/beyond';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Résumé and background: AI product at Zendesk, M&A consulting at EY, AI engineering at Synechron. Data Science & Economics at UW–Madison, graduating May 2027.',
  path: '/about',
});

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Studying', value: `${education.degree}, UW–Madison` },
  { label: 'Graduating', value: profile.graduation },
  { label: 'Open to', value: profile.roles.join(' · ') },
];

// Newest first; ties keep their original order.
const awards = [...recognition]
  .sort((a, b) => Number(b.year) - Number(a.year))
  .map((r) => ({ ...r, hackathon: hackathons.find((h) => h.name === r.detail) }));

export default function AboutPage() {
  return (
    <div className="page-x mx-auto max-w-page pb-20 md:pb-28">
      {/* Intro */}
      <section aria-labelledby="about-title" className="pt-12 md:pt-20">
        <SplitReveal as="h1" id="about-title" immediate className="display text-display-xl">
          About<span className="text-accent">.</span>
        </SplitReveal>

        <div className="grid-page mt-12 gap-y-12 md:mt-20">
          <dl className="col-span-4 self-start border-t border-rule md:col-span-4">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-b border-rule py-3">
                <dt className="meta pt-0.5">{f.label}</dt>
                <dd className="text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="col-span-4 md:col-span-8">
            <p className="max-w-3xl text-2xl leading-snug md:text-[2rem] md:leading-[1.2] md:tracking-[-0.01em]">
              {profile.summary[0]}
            </p>
            {profile.summary.slice(1).map((p) => (
              <p key={p} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                Résumé (PDF) ↗
              </a>
              <CopyEmail label="Copy email" className="btn" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="pt-28 md:pt-40">
        <SectionHead index="01" id="experience" title="Experience" />
        <ExperienceTimeline items={experience} />
      </section>

      {/* Education */}
      <section aria-labelledby="education" className="pt-28 md:pt-40">
        <SectionHead index="02" id="education" title="Education" />
        <div className="grid-page gap-y-6">
          <div className="col-span-4">
            <h3 className="display text-display-sm">{education.school}</h3>
            <p className="meta num mt-3">{education.period}</p>
          </div>
          <div className="col-span-4 md:col-span-8">
            <p className="text-xl font-medium leading-snug md:text-2xl">{education.degree}</p>
            <p className="meta num mt-3">GPA {education.gpa}</p>
            <div className="mt-8 max-w-3xl border-t border-rule pt-4">
              <p className="meta mb-2">Coursework</p>
              <p className="text-lg leading-relaxed">{education.coursework.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section aria-labelledby="recognition" className="pt-28 md:pt-40">
        <SectionHead index="03" id="recognition" title="Recognition" />
        <ul className="border-b border-rule">
          {awards.map((r) => {
            const h = r.hackathon;
            return (
              <li key={r.title} className="grid-page gap-y-1 border-t border-rule py-5">
                <span className="meta num col-span-4 pt-1 md:col-span-1">{r.year}</span>
                <p className="col-span-4 text-lg font-medium leading-snug md:col-span-3 md:col-start-2">
                  {h ? (
                    <>
                      <span className="text-accent">{h.award}</span>
                      <span className="text-muted">, </span>
                      {h.event.replace(/\s\d{4}$/, '')}
                    </>
                  ) : (
                    r.title
                  )}
                </p>
                <div className="col-span-4 text-muted md:col-span-8 md:col-start-5">
                  {h ? (
                    <p>
                      {h.href ? (
                        <Link href={h.href} className="link-draw font-medium text-ink hover:text-accent">
                          {h.name} →
                        </Link>
                      ) : h.githubUrl ? (
                        <a
                          href={h.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw font-medium text-ink hover:text-accent"
                        >
                          {h.name} ↗
                        </a>
                      ) : (
                        <span className="font-medium text-ink">{h.name}</span>
                      )}
                      <span className="ml-3">{h.tagline}</span>
                    </p>
                  ) : (
                    <p>{r.detail}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="pt-28 md:pt-40">
        <SectionHead index="04" id="skills" title="Skills" />
        <dl className="border-b border-rule">
          {skills.map((group) => (
            <div key={group.category} className="grid-page gap-y-2 border-t border-rule py-5">
              <dt className="meta col-span-4 pt-1.5">{group.category}</dt>
              <dd className="col-span-4 text-lg leading-relaxed md:col-span-8">
                {group.skills.map((s, i) => (
                  <span key={s}>
                    {i > 0 ? <span className="text-muted"> · </span> : null}
                    <span className="whitespace-nowrap">{s}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Beyond */}
      <section aria-labelledby="beyond" className="pt-28 md:pt-40">
        <SectionHead index="05" id="beyond" title="Outside work" />
        <ul className="border-b border-rule">
          {beyond.map((item) => (
            <li key={item.title} className="grid-page gap-y-2 border-t border-rule py-6 md:py-8">
              <p className="meta col-span-4 pt-2">{item.label}</p>
              <div className="col-span-4 md:col-span-8">
                <h3 className="text-xl font-medium leading-snug md:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
