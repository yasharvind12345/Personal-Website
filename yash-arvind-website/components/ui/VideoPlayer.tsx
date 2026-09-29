'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}

const clock = (t: number) => {
  if (!Number.isFinite(t)) return '0:00';
  const s = Math.floor(t);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/**
 * Plain editorial video: the frame, then a hairline control bar in mono
 * (play, time, seek, fullscreen). Every control is a labelled native element.
 */
export function VideoPlayer({ src, poster, title, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setTime(value);
  };

  // Metadata can load before hydration, so read it once on mount as well.
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) setDuration(video.duration);
  }, []);

  const progress = duration ? time / duration : 0;

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden bg-ink">
        <video
          ref={videoRef}
          // No poster: jump a frame in so the video shows its own opening shot.
          src={poster ? src : `${src}#t=0.1`}
          poster={poster}
          aria-label={title}
          className="h-full w-full object-cover"
          preload="metadata"
          playsInline
          onClick={toggle}
          onPlay={() => {
            setPlaying(true);
            setStarted(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        />
        {!started && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 flex items-end justify-start focus-visible:outline-offset-[-4px]"
          >
            <span className="flex items-center gap-3 bg-ink px-5 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-200 group-hover:bg-accent">
              Play demo
              {duration > 0 && <span className="text-paper/60">{clock(duration)}</span>}
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 border-b border-rule py-3 font-mono text-xs uppercase tracking-wider md:gap-6">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          className="w-12 text-left hover:text-accent"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <span className="num shrink-0 text-muted" aria-hidden="true">
          {clock(time)} / {clock(duration)}
        </span>
        <div className="video-seek relative h-5 flex-1">
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-rule" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-ink"
            style={{ transform: `scaleX(${progress})` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label={`Seek ${title}`}
            aria-valuetext={`${clock(time)} of ${clock(duration)}`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <button
          type="button"
          onClick={() => videoRef.current?.requestFullscreen?.()}
          aria-label={`Watch ${title} fullscreen`}
          className="hover:text-accent"
        >
          Full screen
        </button>
      </div>
      <figcaption className="meta mt-3">{title}</figcaption>
    </figure>
  );
}
