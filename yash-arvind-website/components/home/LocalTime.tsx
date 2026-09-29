'use client';

import { useEffect, useState } from 'react';

const format = (timeZone: string) =>
  new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' });

/**
 * Current time in Yash's time zone, updated on the minute. The server renders
 * a fixed placeholder so hydration always matches.
 */
export function LocalTime({
  place = 'Madison',
  timeZone = 'America/Chicago',
  zoneLabel = 'CT',
  className = '',
}: {
  place?: string;
  timeZone?: string;
  zoneLabel?: string;
  className?: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = format(timeZone);
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    let interval: number | undefined;
    // Align to the next minute boundary, then tick every minute.
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <span className={className}>
      {place}{' '}
      <span className="num text-ink">{time ?? '--:-- --'}</span> {zoneLabel}
    </span>
  );
}
