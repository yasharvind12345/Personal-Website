import type { CaseStudy, Hackathon, Venture } from '@/content/types';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { workIcon } from './icons';

export function CaseStudyCard({
  study,
  featured = false,
  size = 'default',
}: {
  study: CaseStudy;
  featured?: boolean;
  size?: 'default' | 'compact';
}) {
  const Icon = workIcon(study.slug);
  const eyebrow = [study.org, study.role].filter(Boolean).join(' · ') || undefined;

  return (
    <ProjectCard
      title={study.title}
      eyebrow={eyebrow}
      description={study.tagline}
      href={`/work/${study.slug}`}
      icon={<Icon size={size === 'compact' ? 20 : 24} />}
      featured={featured}
      size={size}
      metrics={study.metrics.slice(0, 2)}
      awardBadges={study.award ? [{ label: study.award, variant: 'gold' }] : []}
    />
  );
}

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const Icon = workIcon(hackathon.name);

  return (
    <ProjectCard
      title={hackathon.name}
      description={hackathon.tagline}
      longDescription={hackathon.description}
      href={hackathon.href}
      githubUrl={hackathon.githubUrl}
      icon={<Icon size={20} />}
      size="compact"
      tags={hackathon.tags}
      awardBadges={[
        {
          label: `${hackathon.award} · ${hackathon.event}`,
          variant: hackathon.won ? 'gold' : 'purple',
        },
      ]}
    />
  );
}

export function VentureCard({ venture }: { venture: Venture }) {
  const Icon = workIcon(venture.name);

  return (
    <ProjectCard
      title={venture.name}
      description={venture.tagline}
      longDescription={venture.description}
      status={venture.status}
      icon={<Icon size={20} />}
      size="compact"
      tags={venture.tags}
      metrics={venture.metric ? [venture.metric] : []}
    />
  );
}
