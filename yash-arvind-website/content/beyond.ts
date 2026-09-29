/** Life outside work, shown at the end of /about. Only specific, verifiable things. */

export interface BeyondItem {
  label: string;
  title: string;
  body: string;
}

export const beyond: BeyondItem[] = [
  {
    label: 'Giving back',
    title: 'A STEM lab in rural India',
    body: 'Founded and equipped a STEM lab in an underserved rural community: computers, robotics kits, and a hands-on curriculum, run as an ongoing program with local teachers. It has reached 100+ students and is still running.',
  },
  {
    label: 'Discipline',
    title: 'Karate, black belt',
    body: 'Earned over years of training.',
  },
  {
    label: 'Hackathons',
    title: 'Building against the clock',
    body: 'A regular at UW–Madison and national hackathons. Four builds since 2025; three of them placed or won an award.',
  },
  {
    label: 'Startups',
    title: 'UW–Madison founder community',
    body: 'Co-founded TAM, Flux, and Cortexa, and mentor early-stage founders in the university’s entrepreneurship community.',
  },
];
