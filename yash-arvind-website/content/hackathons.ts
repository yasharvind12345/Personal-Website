import type { Hackathon, Recognition } from './types';

/** 2026 hackathon projects. TAM's full write-up lives in caseStudies. */
export const hackathons: Hackathon[] = [
  {
    name: 'AuraHealth',
    tagline: 'AI patient follow-up agent',
    award: '🏆 Google Award',
    event: 'CheeseHacks 2026',
    won: true,
    description:
      'Calls patients after a consultation using Twilio WebSocket voice streaming, Google STT/TTS, and Gemini 2.5 Flash. Pinecone RAG supplies consultation context, Cloud Scheduler runs follow-ups, and urgent triage sends SMS alerts to doctors.',
    tags: ['Twilio', 'Google STT/TTS', 'Gemini 2.5 Flash', 'Pinecone', 'Cloud Scheduler'],
    githubUrl: 'https://github.com/L-Gupta/cheeseHacks26',
  },
  {
    name: 'TAM',
    tagline: 'AI financial due diligence',
    award: '🥈 2nd Place',
    event: 'MadData 2026',
    won: true,
    description:
      'AI financial due-diligence platform that generates a per-company report in under 8 seconds.',
    tags: ['Claude API', 'LangGraph', 'Isolation Forest', 'ChromaDB'],
    href: '/work/tam',
  },
  {
    name: 'EarningsLens',
    tagline: 'Earnings-call deception detection',
    award: '🥇 1st Place',
    event: 'CursorHacks 2026',
    won: true,
    description:
      'Claude with forced tool use and an 11-signal deception taxonomy, cross-referenced against SEC filings via ChromaDB. Scores credibility per speaker and pulls live Finnhub data.',
    tags: ['Claude', 'ChromaDB', 'SEC filings', 'Finnhub'],
    githubUrl: 'https://github.com/L-Gupta/cursorHacks26',
  },
  {
    name: 'HelloNeighbour',
    tagline: 'Voice-based anonymous dorm connection app',
    award: 'Participant',
    event: 'ClaudeHacks 2026',
    won: false,
    description:
      'Voice-based anonymous neighbor connection app scoped for UW-Madison dorms. Features KNN (k=3) matching algorithm from scratch, Claude API for profile analysis and meetup suggestions, Web Audio waveform visualization, and 15-second voice notes. Deployed to Vercel.',
    tags: ['Next.js', 'Claude API', 'KNN (from scratch)', 'Web Audio API', 'Vercel'],
    githubUrl: 'https://github.com/L-Gupta/claudeHacks26',
  },
];

export const recognition: Recognition[] = [
  { title: '🏆 Google Award, CheeseHacks', detail: 'AuraHealth', year: '2026' },
  { title: '🥇 1st Place, CursorHacks', detail: 'EarningsLens', year: '2026' },
  { title: '🥈 2nd Place, MadData', detail: 'TAM', year: '2026' },
  {
    title: 'Summer AI Lab (SAIL), UW-Madison',
    detail:
      'Accepted, Summer 2026. Program co-sponsored by OpenAI, focused on agentic AI development.',
    year: '2026',
  },
];
