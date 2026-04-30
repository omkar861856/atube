'use client';

import React, { useRef, useState, useEffect } from 'react';
import { EpornerVideo } from '@/lib/types';
import Link from 'next/link';

interface ReelVideoProps {
  video: EpornerVideo;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  index: number;
}

const ReelVideo: React.FC<ReelVideoProps> = ({ 
  video, 
  isActive, 
  isMuted, 
  onToggleMute,
  index 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full flex justify-center space-x-1">
      <div
        className="video-wrapper relative flex justify-center items-center overflow-hidden h-full w-[335px] sm:w-[380px] bg-black rounded-xl bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${video.default_thumb.src})` }}
      >
        {isActive ? (
          <iframe
            src={`https://www.eporner.com/embed/${video.id}/?autoplay=${isPlaying ? 1 : 0}&muted=${isMuted ? 1 : 0}&controls=0`}
            className="h-full w-full pointer-events-none object-cover border border-gray-200 rounded-lg dark:border-gray-800"
            allow="autoplay; fullscreen"
            frameBorder="0"
          />
        ) : (
          <img
            src={video.default_thumb.src}
            className="object-cover object-center w-full h-full rounded-lg"
            alt={video.title}
          />
        )}
        
        {/* Interaction Overlay */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-20 cursor-pointer bg-gradient-to-t from-black/60 via-transparent to-transparent"
        >
          {/* Play/Pause Icon */}
          <div className="absolute top-4 left-4 z-30">
            {!isPlaying ? (
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>

          {/* Mobile Side Actions */}
          <div className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-6 p-2">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white" onClick={(e) => { e.stopPropagation(); onToggleMute(); }}>
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 w-full p-4 flex flex-col gap-2">
            <h3 className="text-white font-bold text-sm line-clamp-2 drop-shadow-lg">
              {video.title}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-silver to-white p-[1px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">
                    AT
                  </div>
                </div>
                <span className="text-white text-xs font-semibold">@AdultTube</span>
              </div>
              <Link 
                href={`/video/${video.id}`}
                className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Full Video
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Side Actions */}
      <div className="hidden sm:flex flex-col justify-end p-3 gap-6">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all" onClick={onToggleMute}>
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReelVideo;
