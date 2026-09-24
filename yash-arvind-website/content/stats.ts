import type { CountableStat } from './types';

/** Home page proof strip. `display` is what the server renders. */
export const proofStrip: CountableStat[] = [
  { display: '$2–3M', label: 'Saved annually at Zendesk' },
  {
    display: '9,000+',
    label: 'Hours saved per year',
    countTo: { value: 9000, suffix: '+' },
  },
  { display: '350', label: 'Flux users', countTo: { value: 350 } },
  {
    display: '4.8★',
    label: 'App Store rating',
    countTo: { value: 4.8, suffix: '★', decimals: 1 },
  },
  {
    display: '$100K+',
    label: 'Portfolio',
    countTo: { value: 100, prefix: '$', suffix: 'K+' },
  },
  { display: '3', label: 'Hackathon wins', countTo: { value: 3 } },
];

export const homeStatCards = [
  {
    value: '$100K+',
    label: 'Portfolio Under Management',
    description: 'Personal portfolio run on an automated AI trading system',
    highlight: true,
  },
  {
    value: '3',
    label: 'Active Ventures',
    description: 'TAM · Flux · Cortexa',
  },
  {
    value: '3',
    label: 'Hackathon Wins',
    description: 'CheeseHacks · MadData · CursorHacks',
  },
];
