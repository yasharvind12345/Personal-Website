import type { Venture } from './types';

/** Other ventures and projects that don't have a full case study. */
export const ventures: Venture[] = [
  {
    name: 'AI Hedge Fund',
    tagline: 'Autonomous trading system',
    status: 'in-progress',
    description:
      'Building automated AI-agent-driven infrastructure with strategy execution, portfolio rebalancing, and risk controls. $100K+ portfolio using n8n, Python trading engine, and ML models.',
    tags: ['n8n', 'Python', 'ML'],
    metric: { value: '$100K+', label: 'Portfolio' },
  },
  {
    name: 'Stock Trading System',
    tagline: 'Algorithmic trading engine + LLM',
    status: 'completed',
    description:
      'Full-stack platform integrating PAMR (Passive Aggressive Mean Reversion) algorithm with LLM-based market commentary. Next.js frontend, PostgreSQL, Python engine, Marketstack API.',
    tags: ['Next.js', 'PostgreSQL', 'Python', 'Marketstack'],
  },
  {
    name: 'BoxMate',
    tagline: 'Student storage marketplace',
    status: 'completed',
    description:
      'Led branding, platform design, and customer outreach. Generated $10K in revenue in the first 2 weeks. Ran regression analysis for pricing and built a Python forecasting model.',
    tags: ['Python', 'Pricing', 'Forecasting'],
    metric: { value: '$10K', label: 'Revenue in first 2 weeks' },
  },
];
