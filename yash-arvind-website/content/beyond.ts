import {
  Swords,
  Target,
  Medal,
  Zap,
  Rocket,
  BookOpen,
  Gamepad2,
  Camera,
  Mountain,
  type LucideIcon,
} from 'lucide-react';

/** Content for the /beyond page. */

export const beyondIntro =
  'The discipline of a black belt. The teamwork of competitive sports. The purpose of giving back. Who I am when the laptop closes.';

export const athletics: {
  name: string;
  achievement: string;
  description: string;
  icon: LucideIcon;
  highlight: boolean;
}[] = [
  {
    name: 'Karate',
    achievement: 'Black Belt',
    description:
      'Earned black belt through years of dedicated training. Developed discipline, focus, and mental resilience that translates to all areas of life.',
    icon: Swords,
    highlight: true,
  },
  {
    name: 'Soccer',
    achievement: 'Competitive Player',
    description:
      'Team sport that taught collaboration, strategy under pressure, and the importance of every role in achieving collective goals.',
    icon: Target,
    highlight: false,
  },
  {
    name: 'Badminton',
    achievement: 'Active Player',
    description:
      'Fast-paced sport requiring quick reflexes and strategic thinking. Regular player for fitness and competitive spirit.',
    icon: Medal,
    highlight: false,
  },
];

export const socialImpact = {
  title: 'STEM Lab in Rural India',
  description:
    'Founded and equipped a STEM education lab in a rural Indian community, providing access to technology and hands-on learning for students who otherwise would have limited exposure to computer science and robotics.',
  impact: [
    { metric: '100+', label: 'Students Impacted' },
    { metric: 'Ongoing', label: 'Program Status' },
    { metric: 'STEM', label: 'Focus Area' },
  ],
  details: [
    'Provided computers and robotics kits',
    'Established curriculum for hands-on learning',
    'Created sustainable program with local teachers',
    'Focused on underserved communities',
  ],
};

export const community: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Active Hackathon Builder',
    description:
      'Regular competitor and builder at UW-Madison and national hackathons. Built and shipped 3+ projects under hackathon conditions in 2026.',
    icon: Zap,
  },
  {
    title: 'Startup Community',
    description:
      "Actively engaged in UW-Madison's entrepreneurship ecosystem, co-founding ventures and mentoring early-stage founders.",
    icon: Rocket,
  },
];

export const interests: { name: string; description: string; icon: LucideIcon }[] = [
  { name: 'Reading', description: 'Finance, technology, and business strategy books', icon: BookOpen },
  { name: 'Gaming', description: 'Strategy games and competitive esports', icon: Gamepad2 },
  { name: 'Photography', description: 'Capturing moments and visual storytelling', icon: Camera },
  { name: 'Hiking', description: 'Exploring nature and staying active outdoors', icon: Mountain },
];

export const commonThread =
  "Earning a black belt, building a STEM lab, and shipping a product all take the same approach: find the real problem, build something that works, and keep iterating until it's right. It's how I build products.";
