'use client';

import { useEffect, useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Sep 28" on the server (the page is cached for a day), "3 hours ago" once it runs in the browser. */
export function RelativeTime({ iso }: { iso: string }) {
  const date = new Date(iso);
  const absolute = `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
  const [text, setText] = useState(absolute);

  useEffect(() => {
    const seconds = (date.getTime() - Date.now()) / 1000;
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const abs = Math.abs(seconds);
    if (abs < 60) setText('just now');
    else if (abs < 3600) setText(rtf.format(Math.round(seconds / 60), 'minute'));
    else if (abs < 86400) setText(rtf.format(Math.round(seconds / 3600), 'hour'));
    else if (abs < 86400 * 30) setText(rtf.format(Math.round(seconds / 86400), 'day'));
    else setText(absolute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iso]);

  return (
    <time dateTime={iso} title={date.toISOString().slice(0, 10)}>
      {text}
    </time>
  );
}
