'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface StatItem {
  value: string;
  label: string;
  isNumeric?: boolean;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: '4.8 ⭐', label: 'App Store Rating', isNumeric: true, numericValue: 4.8, suffix: ' ⭐' },
  { value: '$10K', label: 'Revenue in 2 Weeks', isNumeric: true, numericValue: 10, prefix: '$', suffix: 'K' },
  { value: '2nd Place', label: 'MadData Hackathon', isNumeric: false },
  { value: '🏆 Google Award', label: 'CheeseHacks', isNumeric: false },
];

function CountUpNumber({ target, prefix = '', suffix = '', duration = 1.5, decimals = 0 }: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export function AnimatedStatBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-start gap-0 mt-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="px-4 py-2 sm:px-6 sm:py-3 text-center">
            <p className="font-display text-lg sm:text-xl text-accent-400 whitespace-nowrap">
              {stat.isNumeric && stat.numericValue !== undefined ? (
                <CountUpNumber
                  target={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.numericValue % 1 !== 0 ? 1 : 0}
                />
              ) : (
                stat.value
              )}
            </p>
            <p className="font-mono text-[10px] sm:text-xs text-steel-500 uppercase tracking-wider mt-0.5">
              {stat.label}
            </p>
          </div>
          {index < stats.length - 1 && (
            <div className="w-px h-8 bg-steel-800/60 hidden sm:block" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
