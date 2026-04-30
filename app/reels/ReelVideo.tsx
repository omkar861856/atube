'use client';

import React, { useRef, useState, useEffect, RefObject } from 'react';
import { EpornerVideo } from '@/lib/types';
import Link from 'next/link';

interface ReelVideoProps {
  video: EpornerVideo;
  isActive: boolean;
  setActiveTab: (id: string) => void;
  rootRef: RefObject<HTMLDivElement | null>;
  isMuted: boolean;
  onToggleMute: () => void;
}

const ReelVideo: React.FC<ReelVideoProps> = ({ 
  video, 
  isActive, 
  setActiveTab,
  rootRef,
  isMuted, 
  onToggleMute
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Intersection Observer logic from Reels-main
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveTab(video.id);
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.6,
        root: rootRef.current,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [video.id, rootRef, setActiveTab]);

  // Simulated progress bar logic - since we use iframe
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isActive) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isActive]);

  return (
    <div ref={containerRef} className="h-full flex justify-center space-x-1">
      <div
        className="reel-video-wrapper relative flex justify-center items-center overflow-hidden h-full w-[335px] sm:w-[380px] bg-black rounded-xl bg-center bg-cover bg-no-repeat shadow-2xl"
        style={{ backgroundImage: `url(${video.default_thumb.src})` }}
      >
        <iframe
          src={`https://www.eporner.com/embed/${video.id}/?autoplay=${isPlaying && isActive ? 1 : 0}&muted=${isMuted ? 1 : 0}&controls=0`}
          className="h-full w-full pointer-events-none object-cover border border-gray-200 rounded-lg dark:border-gray-800"
          allow="autoplay; fullscreen"
          frameBorder="0"
        />
        
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 cursor-pointer bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-300"
        >
          <div className="absolute top-4 left-4 z-30">
            {!isPlaying ? (
              <svg className="w-8 h-8 text-white fill-current drop-shadow-md" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white fill-current drop-shadow-md" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-6 p-2">
            <div className="flex flex-col items-center gap-1">
              <button className="p-3 rounded-full bg-gray-900/40 backdrop-blur-md text-white hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <span className="text-[10px] font-bold text-white uppercase">Like</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="p-3 rounded-full bg-gray-900/40 backdrop-blur-md text-white hover:scale-110 transition-transform" onClick={(e) => { e.stopPropagation(); onToggleMute(); }}>
                {isMuted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
              <span className="text-[10px] font-bold text-white uppercase">{isMuted ? 'Muted' : 'Sound'}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Link 
                href={`/video/${video.id}`}
                className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
              <span className="text-[10px] font-bold text-white uppercase">Full</span>
            </div>
          </div>

          <div className="absolute bottom-0 w-full p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-800">
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                  AT
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">@AdultTube</span>
                <span className="text-white/60 text-[10px] font-medium">Verified Producer</span>
              </div>
              <button className="ml-2 px-4 py-1.5 bg-white text-black rounded-full text-xs font-black uppercase tracking-tighter">
                Follow
              </button>
            </div>
            
            <p className="text-white text-sm font-medium line-clamp-2 leading-snug drop-shadow-lg">
              {video.title}
            </p>

            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-2">
              <div className="bg-white h-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col justify-end p-3 gap-6 mb-4">
        <div className="flex flex-col items-center gap-1 group">
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/40 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase transition-colors">Like</span>
        </div>

        <div className="flex flex-col items-center gap-1 group" onClick={onToggleMute}>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/40 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all">
            {isMuted ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase transition-colors">{isMuted ? 'Mute' : 'Audio'}</span>
        </div>

        <div className="flex flex-col items-center gap-1 group">
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800/40 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase transition-colors">Chat</span>
        </div>
      </div>
    </div>
  );
};

export default ReelVideo;
