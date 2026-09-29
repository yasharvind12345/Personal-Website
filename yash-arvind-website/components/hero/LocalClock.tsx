'use client';

import { useEffect, useState } from 'react';

/**
 * Live time in Madison, ticking each second. The server renders a fixed
 * placeholder of the same shape so hydration always matches.
 */
export function LocalClock({ timeZone, className = '' }: { timeZone: string; className?: string }) {
  const [parts, setParts] = useState<{ time: string; zone: string } | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    });
    let timer = 0;
    const tick = () => {
      const p = fmt.formatToParts(new Date());
      const get = (t: string) => p.find((x) => x.type === t)?.value ?? '';
      // Some engines render midnight as 24.
      const hour = get('hour') === '24' ? '00' : get('hour');
      setParts({ time: `${hour}:${get('minute')}:${get('second')}`, zone: get('timeZoneName') });
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [timeZone]);

  return (
    <span className={className}>
      <time className="num text-ink" suppressHydrationWarning>
        {parts?.time ?? '--:--:--'}
      </time>{' '}
      {parts?.zone ?? 'CT'}
    </span>
  );
}
