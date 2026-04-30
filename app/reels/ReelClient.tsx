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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/videos/search?page=${nextPage}&per_page=20&query=vertical mobile pov amateur`);
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

  useEffect(() => {
    // Observer for active video
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.8 }
    );

    const slides = document.querySelectorAll('.reel-item-container');
    slides.forEach((slide) => videoObserver.observe(slide));

    // Observer for infinite scroll
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      scrollObserver.observe(loadMoreRef.current);
    }

    return () => {
      videoObserver.disconnect();
      scrollObserver.disconnect();
    };
  }, [videos, fetchMoreVideos]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      ref={containerRef}
      className="snap-y snap-mandatory h-[calc(100vh-var(--header-height))] overflow-y-scroll scroll-smooth bg-black scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {videos.map((video, index) => (
        <div 
          key={`${video.id}-${index}`} 
          data-index={index}
          className="reel-item-container snap-always snap-center mx-auto w-full h-[80vh] my-[10vh] flex items-center justify-center"
        >
          <div className="w-full h-full max-w-[450px]">
            <ReelVideo 
              video={video} 
              isActive={activeIndex === index}
              isMuted={isMuted}
              onToggleMute={toggleMute}
              index={index}
            />
          </div>
        </div>
      ))}
      
      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="w-8 h-8 border-4 border-silver/30 border-t-silver rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
