/**
 * Shared types for all site content.
 * Every page reads from the files in /content, so a fact only lives in one place.
 */

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

/** A stat that renders its final value on the server and can count up on the client. */
export interface CountableStat {
  display: string;
  label: string;
  countTo?: {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  };
}

export interface Decision {
  title: string;
  body: string;
}

export interface MediaImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface AppReview {
  user: string;
  title: string;
  text: string;
  date: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle?: string;
  org?: string;
  role?: string;
  period?: string;
  award?: string;
  /** One line for cards. */
  tagline: string;
  /** One-line result with a number, shown in the work list. Falls back to the first metric. */
  outcome?: string;
  /** Functions or stakeholders worked with, when there is no named team. */
  collaborators?: string[];
  /** Two sentences max; also used as the meta description. */
  summary: string;
  metrics: Metric[];
  /** Sections render in this order and are omitted when empty. */
  problem: string[];
  whatIDid: { intro?: string; points: string[] };
  decisions: Decision[];
  impact: string[];
  next: string[];
  stack: string[];
  team?: { members: string[]; advisors: string[] };
  links: ExternalLink[];
  video?: { src: string; poster?: string; title: string };
  images?: MediaImage[];
  reviews?: AppReview[];
}

export interface ExperienceProduct {
  name: string;
  description: string;
  href?: string;
}

export interface Experience {
  org: string;
  title: string;
  period: string;
  summary: string;
  points: string[];
  products?: ExperienceProduct[];
  note?: string;
  tags: string[];
}

export interface Hackathon {
  name: string;
  tagline: string;
  award: string;
  event: string;
  won: boolean;
  description: string;
  tags: string[];
  githubUrl?: string;
  href?: string;
}

export interface Recognition {
  title: string;
  detail: string;
  year: string;
}

export interface Venture {
  name: string;
  tagline: string;
  status: 'in-progress' | 'completed';
  description: string;
  tags: string[];
  metric?: Metric;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
