import { SplitReveal } from '@/components/motion/SplitReveal';
import { profile, education } from '@/content/profile';
import { skills } from '@/content/skills';
import { beyond } from '@/content/beyond';
import { getGitHubActivity } from '@/lib/github';
import { ContributionGraph } from './ContributionGraph';
import { RelativeTime } from './RelativeTime';
import '@/app/styles/about.css';

const graduation = education.period.split(/\s+[–-]\s+/).pop() ?? education.period;

/** "a · b · c" where the dot rides at the end of each item, so no line starts with one. */
function Dotted({ items }: { items: string[] }) {
  return items.map((item, i) => (
    <span key={item}>
      <span className="whitespace-nowrap">
        {item}
        {i < items.length - 1 ? <span className="text-muted"> ·</span> : null}
      </span>{' '}
    </span>
  ));
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="about-row grid-page gap-y-3 border-t border-rule py-7 md:py-9">
      <h3 className="meta col-span-4 pt-1 md:col-span-3">{label}</h3>
      <div className="col-span-4 md:col-span-9">{children}</div>
    </div>
  );
}

/** (04) About: a short bio, then an index of facts, the toolbox, and live GitHub activity. */
export async function About() {
  const github = await getGitHubActivity();

  return (
    <section id="about" aria-labelledby="about-title" className="page-x mx-auto max-w-page pb-24 pt-24 md:pb-36 md:pt-32">
      <p className="meta mb-5 md:mb-7">
        <span className="num">(04)</span> About
      </p>
      <SplitReveal as="h2" id="about-title" className="display text-display-lg">
        Yash, <span className="font-serif font-normal italic tracking-normal">briefly</span>
        <span className="text-accent">.</span>
      </SplitReveal>

      <div className="grid-page mt-12 gap-y-8 md:mt-20">
        <p className="about-bio col-span-4 md:col-span-9 md:col-start-4">
          I turn ambiguous financial, billing, and AI workflows into shipped products, then measure what they
          changed.
        </p>
        <p className="col-span-4 max-w-prose text-lg leading-relaxed text-muted md:col-span-6 md:col-start-4">
          Based in {profile.location.replace(', WI', ', Wisconsin')}. Before co-founding TAM, an AI due-diligence
          platform, I did financial due diligence on a live M&amp;A deal at EY.
        </p>
      </div>

      <div className="mt-16 border-b border-rule md:mt-24">
        <Row label="Education">
          <p className="text-lg leading-snug md:text-xl">
            {education.school.replace('University of Wisconsin–Madison', 'UW–Madison')}
            <span className="text-muted">, </span>
            {education.degree}
            <span className="text-muted">, </span>
            <span className="whitespace-nowrap">{graduation}</span>
          </p>
          <p className="meta mt-3 normal-case tracking-normal">
            <Dotted items={education.coursework} />
          </p>
        </Row>

        <Row label="Toolbox">
          <dl className="grid gap-y-4">
            {skills.map((group) => (
              <div key={group.category} className="grid gap-x-6 gap-y-1 md:grid-cols-[10rem_minmax(0,1fr)]">
                <dt className="meta pt-[0.3rem] text-ink">{group.category}</dt>
                <dd className="text-base leading-relaxed md:text-[1.0625rem]">
                  <Dotted items={group.skills} />
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        {github ? (
          <Row label="Lately">
            <ContributionGraph days={github.days} />
            <p className="about-gh-caption">
              <span>
                <span className="num text-ink">{github.total.toLocaleString('en-US')}</span> contributions in the
                last year
              </span>
              {github.lastPush ? (
                <span>
                  Last push:{' '}
                  <a
                    href={github.lastPush.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw text-ink hover:text-accent"
                  >
                    {github.lastPush.repo}
                  </a>{' '}
                  · <RelativeTime iso={github.lastPush.at} />
                </span>
              ) : null}
              <a
                href={github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-ink hover:text-accent md:ml-auto"
              >
                GitHub<span aria-hidden="true"> ↗</span>
              </a>
            </p>
          </Row>
        ) : null}

        <Row label="Off the clock">
          <ul className="grid gap-x-8 gap-y-8 md:grid-cols-3">
            {beyond.map((item) => (
              <li key={item.title}>
                <p className="text-xl font-medium leading-snug">{item.title}</p>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </section>
  );
}
