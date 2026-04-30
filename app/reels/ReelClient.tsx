'use client';

import { EpornerVideo } from '@/lib/types';
import { useRef, useState, useEffect, useCallback } from 'react';
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
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/videos/search?vertical=true&count=3&page=${nextPage}`);
      const data = await res.json();
      
      if (data.videos && data.videos.length > 0) {
        setVideos((prev) => [...prev, ...data.videos]);
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

  // Infinite scroll trigger: when user scrolls on the second reel of the batch - load the next 3
  useEffect(() => {
    const currentIndex = videos.findIndex(v => v.id === activeTab);
    
    // Trigger if we are on the 2nd reel of the current batch
    // Batch 1: index 1 triggers
    // Batch 2: index 4 triggers
    // ... and so on
    if (currentIndex !== -1 && currentIndex % 3 === 1 && currentIndex > (page - 1) * 3 - 2) {
      fetchMoreVideos();
    }
  }, [activeTab, videos, page, fetchMoreVideos]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      ref={containerRef}
      id="snap_container"
      className="snap snap-y snap-mandatory h-[calc(100vh-var(--header-height))] overflow-y-scroll scroll-smooth bg-black scrollbar-hide"
    >
      {videos.map((video, index) => (
        <div 
          key={`${video.id}-${index}`} 
          className="snap-always snap-center mx-auto rounded-lg w-full h-[80vh] my-[8vh] flex items-center justify-center"
        >
          <div className="w-full h-full max-w-[450px]">
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
      
      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-40 flex items-center justify-center w-full">
        {loading && (
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
