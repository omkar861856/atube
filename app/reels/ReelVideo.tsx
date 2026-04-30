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
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDoubleTap = () => {
    setIsLiked(true);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  // Intersection Observer logic for immersive activation
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
        threshold: 0.5,
        root: rootRef.current,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [video.id, rootRef, setActiveTab]);

  // Precise progress simulation for immersive UX
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isActive) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.2));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isActive]);

  return (
    <div ref={containerRef} className="h-full w-full flex justify-center items-center relative group select-none">
      <div
        className="reel-video-wrapper relative flex justify-center items-center overflow-hidden h-full w-full max-w-[450px] bg-black rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 transition-transform duration-500 hover:scale-[1.01]"
        onDoubleClick={handleDoubleTap}
      >
        {/* Background Blur / Poster */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat blur-2xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${video.default_thumb.src})` }}
        />

        <iframe
          src={`https://www.eporner.com/embed/${video.id}/?autoplay=${isPlaying && isActive ? 1 : 0}&muted=${isMuted ? 1 : 0}&controls=0`}
          className="relative z-10 h-full w-full pointer-events-none object-cover"
          allow="autoplay; fullscreen"
          frameBorder="0"
        />
        
        {/* Double Tap Heart Animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <svg className="w-24 h-24 text-white fill-current animate-ping opacity-75" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}

        {/* Interaction Overlay - Premium Design */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 cursor-pointer bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-100 transition-all duration-300"
        >
          {/* Top Info (New) */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
            <div className="flex flex-col">
              <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-md">Trending Reel</span>
            </div>
            <div className="flex gap-2">
               <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold text-white/90 border border-white/10">HD 4K</span>
            </div>
          </div>

          {/* Centered Play/Pause (Visible on Pause) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-30 animate-in fade-in zoom-in duration-200">
               <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
               </div>
            </div>
          )}

          {/* Immersive Side Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6 p-2 z-40 items-center">
            {/* Profile */}
            <div className="w-12 h-12 rounded-full border-2 border-white p-0.5 mb-2 relative">
               <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-black text-white">AT</div>
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-black rounded-full p-0.5 border border-black">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
               </div>
            </div>

            <button 
              className={`flex flex-col items-center gap-1 group/btn ${isLiked ? 'text-white' : 'text-white/70'}`}
              onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            >
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                <svg className={`w-6 h-6 ${isLiked ? 'fill-current' : 'fill-none'} stroke-current`} strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold drop-shadow-md">14.2K</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white/70">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold drop-shadow-md">842</span>
            </button>

            <button 
              className="flex flex-col items-center gap-1 text-white/70"
              onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
            >
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                {isMuted ? (
                  <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] font-bold drop-shadow-md">{isMuted ? 'Muted' : 'Sound'}</span>
            </button>
          </div>

          {/* Bottom Info Section */}
          <div className="absolute bottom-0 w-full p-6 pb-8 flex flex-col gap-3 z-40 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center gap-3">
              <span className="text-white font-black text-sm tracking-tight drop-shadow-lg">@AdultTube</span>
              <div className="px-2 py-0.5 bg-silver/20 backdrop-blur-md border border-silver/30 rounded flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-silver rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-silver uppercase tracking-widest">Live</span>
              </div>
            </div>
            
            <p className="text-white text-sm font-bold line-clamp-2 leading-relaxed drop-shadow-xl max-w-[85%]">
              {video.title}
            </p>

            <div className="flex items-center gap-4 mt-2">
               <Link 
                  href={`/video/${video.id}`}
                  className="px-6 py-2 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  Watch Full HD
                </Link>
                <div className="flex items-center gap-1.5 text-white/60">
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                   <span className="text-[10px] font-bold">12:45</span>
                </div>
            </div>
          </div>

          {/* Progress Bar - Immersive UX Requirement */}
          <div className="absolute bottom-0 left-0 w-full bg-white/10 h-1 z-50">
            <div className="bg-white h-full transition-all duration-100 ease-linear shadow-[0_0_10px_white]" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelVideo;
