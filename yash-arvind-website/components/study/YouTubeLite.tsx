'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubeLiteProps {
  id: string;
  title: string;
  className?: string;
}

/**
 * A still and a play button; the YouTube player (privacy-enhanced domain) is
 * only requested once the visitor presses play. The still is YouTube's
 * auto-generated frame from a quarter of the way in, so it doesn't repeat the
 * cover, which is the video's own thumbnail.
 */
export function YouTubeLite({ id, title, className = '' }: YouTubeLiteProps) {
  const [active, setActive] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxres1.jpg`);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The button that had focus is gone; hand focus to the player.
  useEffect(() => {
    if (active) frameRef.current?.focus();
  }, [active]);

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden bg-ink">
        {active ? (
          <iframe
            ref={frameRef}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${title} (loads YouTube)`}
            className="group absolute inset-0 block h-full w-full focus-visible:outline-offset-[-4px]"
          >
            {/* External still; next/image would need a remote pattern for one thumbnail. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-0 left-0 flex items-center gap-3 bg-ink px-5 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-200 group-hover:bg-accent">
              <svg aria-hidden="true" viewBox="0 0 10 12" className="h-3 w-2.5 fill-current">
                <path d="M0 0l10 6-10 6z" />
              </svg>
              Play film
            </span>
          </button>
        )}
      </div>
      <figcaption className="meta mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1">
        <span>{title}</span>
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw hover:text-ink"
        >
          Watch on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}
