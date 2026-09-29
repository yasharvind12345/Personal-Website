'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

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

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

/**
 * Plain editorial video: the frame, then a hairline control bar in mono ink
 * (play, time, seek, sound, full screen). Every control is a labelled native
 * element; the seek bar takes arrow keys (5s), Page Up/Down (10s), Home/End.
 */
export function VideoPlayer({ src, poster, title, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    const t = Math.min(Math.max(value, 0), duration || video.duration || 0);
    video.currentTime = t;
    setTime(t);
  };

  const onSeekKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const jumps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -10, PageUp: 10 };
    if (e.key in jumps) {
      e.preventDefault();
      seek(time + jumps[e.key]);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      seek(e.key === 'Home' ? 0 : duration);
    }
  };

  const fullscreen = () => {
    const video = videoRef.current as FullscreenVideo | null;
    if (!video) return;
    if (video.requestFullscreen) {
      void video.requestFullscreen().catch(() => video.webkitEnterFullscreen?.());
    } else {
      video.webkitEnterFullscreen?.(); // iOS Safari
    }
  };

  // Metadata can load before hydration, so read it once on mount as well.
  // In full screen our bar is gone, so lend the browser's controls for the duration.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) setDuration(video.duration);
    const onFs = () => {
      video.controls = document.fullscreenElement === video;
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
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
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        />
        {!started && (
          <button
            type="button"
            onClick={() => {
              toggle();
              // This button is about to go; keep focus on the equivalent control.
              toggleRef.current?.focus({ preventScroll: true });
            }}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 flex items-end justify-start focus-visible:outline-offset-[-4px]"
          >
            <span className="flex items-center gap-3 bg-ink px-5 py-4 font-mono text-xs uppercase tracking-wider text-paper transition-colors duration-200 group-hover:bg-accent">
              <svg aria-hidden="true" viewBox="0 0 10 12" className="h-3 w-2.5 fill-current">
                <path d="M0 0l10 6-10 6z" />
              </svg>
              Play demo
              {duration > 0 && <span className="num text-paper/60">{clock(duration)}</span>}
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 border-b border-rule py-3 font-mono text-xs uppercase tracking-wider text-ink md:gap-6">
        <button
          ref={toggleRef}
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          className="-my-2 w-12 py-2 text-left hover:text-accent"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <span className="num shrink-0 text-muted" aria-hidden="true">
          {clock(time)} / {clock(duration)}
        </span>
        <div className="relative h-6 flex-1 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-accent">
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-rule" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-ink"
            style={{ transform: `scaleX(${progress})` }}
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-ink"
            style={{ left: `${progress * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => seek(Number(e.target.value))}
            onKeyDown={onSeekKey}
            aria-label={`Seek ${title}`}
            aria-valuetext={`${clock(time)} of ${clock(duration)}`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (video) video.muted = !video.muted;
          }}
          aria-pressed={muted}
          aria-label={`Mute ${title}`}
          className="-my-2 hidden py-2 hover:text-accent sm:block"
        >
          {muted ? 'Sound off' : 'Sound on'}
        </button>
        <button
          type="button"
          onClick={fullscreen}
          aria-label={`Watch ${title} full screen`}
          className="-my-2 py-2 hover:text-accent"
        >
          <span className="hidden sm:inline">Full screen</span>
          <span className="sm:hidden">Full</span>
        </button>
      </div>
      <figcaption className="meta mt-3">{title}</figcaption>
    </figure>
  );
}
