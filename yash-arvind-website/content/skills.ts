import type { SkillGroup } from './types';

/** Skills grouped for a product audience, product first. */
export const skills: SkillGroup[] = [
  {
    category: 'Product',
    skills: [
      '0→1 product development',
      'Requirements definition',
      'Scope triage & prioritization',
      'Customer discovery',
      'Stakeholder management up to VP/SVP',
      'Exec communication',
      'GTM',
    ],
  },
  {
    category: 'Finance',
    skills: [
      'Financial due diligence',
      'DCF valuation',
      'Red-flag analysis',
      'Revenue operations / Quote-to-Cash',
      'Portfolio management',
    ],
  },
  {
    category: 'Data & Analytics',
    skills: ['SQL', 'Snowflake', 'Python', 'R', 'Tableau', 'Power BI', 'Excel financial modeling'],
  },
  {
    category: 'AI',
    skills: [
      'Claude API',
      'LangChain / LangGraph',
      'RAG',
      'ChromaDB',
      'Pinecone',
      'Agentic workflows / MCP',
      'Evals',
    ],
  },
  {
    category: 'Engineering',
    skills: ['FastAPI', 'Next.js / React', 'TypeScript', 'Swift', 'n8n', 'Git'],
  },
  {
    category: 'Business Tools',
    skills: ['Salesforce (CPQ + CRM)', 'Zuora', 'Jira', 'Confluence'],
  },
];
