/**
 * Life outside work, shown under "Off the clock" in the About section.
 * Only specific, verifiable things. Hackathons and startups live in the Log.
 */

export interface BeyondItem {
  label: string;
  title: string;
  body: string;
}

export const beyond: BeyondItem[] = [
  {
    label: 'Giving back',
    title: 'A STEM lab in rural India',
    body: 'Founded and equipped it for an underserved rural community: computers, robotics kits, and a hands-on curriculum, run with local teachers as an ongoing program. 100+ students so far, and still running.',
  },
  {
    label: 'Discipline',
    title: 'Karate',
    body: 'Black belt, earned over years of training.',
  },
  {
    label: 'Community',
    title: 'Student founders',
    body: 'I mentor early-stage founders in UW–Madison’s entrepreneurship community.',
  },
];
