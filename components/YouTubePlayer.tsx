'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: { playVideo: () => void; setVolume: (v: number) => void; unMute: () => void } }) => void;
            onError?: () => void;
          };
        },
      ) => { destroy: () => void };
    };
    onYouTubeIframeAPIReady?: () => void;
    _ytApiPromise?: Promise<void>;
  }
}

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (window._ytApiPromise) return window._ytApiPromise;

  window._ytApiPromise = new Promise((resolve) => {
    const existing = document.getElementById('youtube-iframe-api');
    if (!existing) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve();
    };
  });

  return window._ytApiPromise;
}

type YouTubePlayerProps = {
  videoId: string;
  playlistId?: string;
  className?: string;
  volume?: number;
};

export function YouTubePlayer({ videoId, playlistId, className, volume = 40 }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await loadYouTubeAPI();
      if (cancelled || !containerRef.current || !window.YT?.Player) return;

      const playerVars: Record<string, string | number> = {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      };

      if (playlistId) {
        playerVars.list = playlistId;
        playerVars.listType = 'playlist';
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars,
        events: {
          onReady: (event) => {
            event.target.setVolume(volume);
            event.target.unMute();
            event.target.playVideo();
          },
        },
      });
    })();

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId, playlistId, volume]);

  return <div ref={containerRef} className={className} />;
}
