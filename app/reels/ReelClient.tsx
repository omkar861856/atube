'use client';

import { EpornerVideo } from '@/lib/types';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

interface Props {
  videos: EpornerVideo[];
}

export default function ReelClient({ videos }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="reels-container">
      {videos.map((video, index) => (
        <section key={video.id} className="reel-slide">
          <div className="reel-video-wrapper">
            <iframe
              src={`https://www.eporner.com/embed/${video.id}/?autoplay=${activeIndex === index ? 1 : 0}`}
              className="reel-video"
              allow="autoplay; fullscreen"
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                scale: '1.5', // Zoom in to make it feel more vertical if it's horizontal
                transform: 'translateY(10%)'
              }}
            />
            
            <div className="reel-overlay">
              <div className="reel-info">
                <h3>{video.title}</h3>
                <p>🔥 {video.views.toLocaleString()} views • ⭐ {video.rate}</p>
              </div>
            </div>

            <div className="reel-actions">
              <div className="reel-action-btn">
                <span>❤️</span>
                <span style={{ fontSize: '10px' }}>Like</span>
              </div>
              <div className="reel-action-btn">
                <span>💬</span>
                <span style={{ fontSize: '10px' }}>99+</span>
              </div>
              <Link href={`/video/${video.id}`} className="reel-action-btn" style={{ textDecoration: 'none' }}>
                <span>🔗</span>
                <span style={{ fontSize: '10px' }}>Full</span>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
