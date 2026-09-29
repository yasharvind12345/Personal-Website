import type { SkillGroup } from './types';

/** Skills, grouped as on the résumé, product first. */
export const skills: SkillGroup[] = [
  {
    category: 'Product',
    skills: [
      'Product discovery',
      'Requirements definition',
      'Prioritization & scope trade-offs',
      'Roadmapping',
      'Cross-functional collaboration',
      'Stakeholder management up to VP/SVP',
      'GTM strategy',
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      'Claude API',
      'LangChain / LangGraph',
      'RAG',
      'Agent orchestration',
      'Tool use',
      'Prompt & eval design',
      'NLP / NER',
      'FinBERT',
      'spaCy',
      'PyTorch',
      'scikit-learn',
    ],
  },
  {
    category: 'Engineering & Data',
    skills: ['Python', 'SQL', 'R', 'FastAPI', 'REST APIs', 'PostgreSQL', 'ChromaDB', 'Snowflake', 'Redis / Celery', 'Docker', 'Git'],
  },
  {
    category: 'Systems & Analytics',
    skills: [
      'Jira',
      'Confluence',
      'Salesforce CRM / CPQ',
      'Zuora',
      'Tableau',
      'Power BI',
      'Advanced Excel',
      'Financial modeling',
      'DCF valuation',
    ],
  },
];
