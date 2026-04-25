'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

/**
 * VideoPlayer - Custom styled video player with gold accent controls
 * matching the site's dark/gold theme.
 */
export function VideoPlayer({ src, poster, title, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setShowOverlay(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className={`relative group rounded-xl overflow-hidden bg-void-950 border border-steel-800/50 cursor-pointer ${className}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full aspect-video object-cover"
        onEnded={handleVideoEnd}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="metadata"
        playsInline
      />

      {/* Play/Pause overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showOverlay || !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-void-950/30 to-transparent" />

        {/* Play button */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent-400/90 hover:bg-accent-400 transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] hover:scale-105">
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-void-950" />
          ) : (
            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-void-950 ml-1" />
          )}
        </div>

        {/* Title overlay at bottom */}
        {title && !isPlaying && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <p className="font-mono text-xs text-accent-400 uppercase tracking-wider mb-1">
              Demo Video
            </p>
            <p className="font-display text-lg sm:text-xl text-steel-50">
              {title}
            </p>
          </div>
        )}

        {/* Fullscreen button */}
        <button
          className="absolute bottom-4 right-4 z-10 p-2 rounded-lg bg-void-900/80 text-steel-400 hover:text-steel-50 transition-colors"
          onClick={handleFullscreen}
          aria-label="Fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}
