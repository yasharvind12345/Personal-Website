import type { CountableStat } from '@/content/types';
import { CountUp } from './CountUp';

interface ProofStripProps {
  stats: CountableStat[];
  className?: string;
}

/** Row of headline numbers. Values are server-rendered; see CountUp. */
export function ProofStrip({ stats, className = '' }: ProofStripProps) {
  return (
    <dl
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px rounded-xl overflow-hidden border border-steel-800/50 bg-steel-800/50 ${className}`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse bg-void-900 px-4 py-5 sm:px-5 sm:py-6">
          <dt className="font-mono text-[10px] sm:text-xs text-steel-500 uppercase tracking-wider mt-1">
            {stat.label}
          </dt>
          <dd className="font-display text-2xl sm:text-3xl text-accent-400 whitespace-nowrap tabular-nums">
            <CountUp display={stat.display} countTo={stat.countTo} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
