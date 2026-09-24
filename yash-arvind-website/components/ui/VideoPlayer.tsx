'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}

export function VideoPlayer({ src, poster, title, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setHasStarted(true);
    } else {
      video.pause();
    }
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div
      className={`relative group rounded-xl overflow-hidden bg-void-950 border border-steel-800/50 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={title}
        className="w-full aspect-video object-cover"
        onEnded={() => {
          setIsPlaying(false);
          setHasStarted(false);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="metadata"
        playsInline
      />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          !isPlaying
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'
        }`}
      >
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-void-950/30 to-transparent pointer-events-none" />
        )}

        {/* Full-area play/pause control */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          className="absolute inset-0 z-10 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-400"
        >
          <span className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent-400/90 hover:bg-accent-400 transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] motion-safe:hover:scale-105">
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-void-950" aria-hidden="true" />
            ) : (
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-void-950 ml-1" aria-hidden="true" />
            )}
          </span>
        </button>

        {!hasStarted && (
          <div className="absolute bottom-4 left-4 right-16 z-10 pointer-events-none">
            <p className="font-mono text-xs text-accent-400 uppercase tracking-wider mb-1">Demo video</p>
            <p className="font-display text-lg sm:text-xl text-steel-50">{title}</p>
          </div>
        )}

        <button
          type="button"
          className="absolute bottom-4 right-4 z-20 p-2 rounded-lg bg-void-900/80 text-steel-400 hover:text-steel-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent-400"
          onClick={handleFullscreen}
          aria-label={`Watch ${title} fullscreen`}
        >
          <Maximize2 size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
