'use client';

import { EpornerVideo } from '@/lib/types';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import ReelVideo from './ReelVideo';

interface Props {
  initialVideos: EpornerVideo[];
}

export default function ReelClient({ initialVideos }: Props) {
  const [videos, setVideos] = useState<EpornerVideo[]>(initialVideos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(initialVideos[0]?.id || "");
  const [isMuted, setIsMuted] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/videos/search?vertical=true&count=3&page=${nextPage}`);
      const data = await res.json();
      
      if (data.videos && data.videos.length > 0) {
        setVideos((prev) => {
          // Filter duplicates just in case
          const existingIds = new Set(prev.map(v => v.id));
          const newVideos = data.videos.filter((v: any) => !existingIds.has(v.id));
          return [...prev, ...newVideos];
        });
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more videos:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Infinite scroll trigger logic: "when the user scrolls on the second reel - load the next 3"
  // Logic: Each batch is 3 videos. Trigger at index 1, 4, 7...
  useEffect(() => {
    const currentIndex = videos.findIndex(v => v.id === activeTab);
    
    if (currentIndex !== -1) {
      const isSecondOfBatch = currentIndex % 3 === 1;
      const isAlreadyLoaded = currentIndex < (page - 1) * 3;
      
      if (isSecondOfBatch && !isAlreadyLoaded && !loading) {
        console.log('Triggering next batch load at index:', currentIndex);
        fetchMoreVideos();
      }
    }
  }, [activeTab, videos, page, loading, fetchMoreVideos]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      ref={containerRef}
      id="snap_container"
      className="reels-container"
    >
      {videos.map((video, index) => (
        <div 
          key={`${video.id}-${index}`} 
          className="reel-slide"
        >
          <div className="w-full h-full max-w-[450px] py-4 sm:py-8 px-2">
            <ReelVideo 
              video={video} 
              isActive={video.id === activeTab}
              setActiveTab={setActiveTab}
              rootRef={containerRef}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
          </div>
        </div>
      ))}
      
      {/* Loading Placeholder for next batch */}
      {loading && (
        <div className="reel-slide">
           <div className="w-full h-[80vh] max-w-[450px] bg-white/5 rounded-3xl animate-pulse flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                 <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                 <span className="text-white/40 text-xs font-black uppercase tracking-widest">Loading Next Reels...</span>
              </div>
           </div>
        </div>
      )}

      {/* End of feed indicator */}
      {!hasMore && (
        <div className="reel-slide">
           <div className="w-full h-[80vh] max-w-[450px] flex items-center justify-center text-center p-12">
              <div className="flex flex-col items-center gap-6">
                 <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                 <h4 className="text-white font-black text-xl">You've caught up!</h4>
                 <p className="text-white/40 text-sm">Follow more creators to see new reels in your feed.</p>
                 <button 
                   onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                   className="mt-4 px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest"
                 >
                   Back to Top
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
