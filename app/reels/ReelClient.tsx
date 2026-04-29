'use client';

import { EpornerVideo } from '@/lib/types';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

interface Props {
  videos: EpornerVideo[];
}

export default function ReelClient({ videos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    const slides = document.querySelectorAll('.reel-slide');
    slides.forEach((slide) => observerRef.current?.observe(slide));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="reels-container">
      {videos.map((video, index) => (
        <section 
          key={video.id} 
          className="reel-slide" 
          data-index={index}
        >
          <div className="reel-video-wrapper">
            <iframe
              src={`https://www.eporner.com/embed/${video.id}/?autoplay=${activeIndex === index ? 1 : 0}`}
              className="reel-video"
              allow="autoplay; fullscreen"
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
            
            <div className="reel-overlay">
              <div className="reel-info">
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{video.title}</h3>
                <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
                  🔥 {video.views.toLocaleString()} • ⭐ {video.rate}
                </p>
              </div>
            </div>

            <div className="reel-actions">
              <div className="reel-action-btn">
                <span>❤️</span>
                <span style={{ fontSize: '12px' }}>Like</span>
              </div>
              <div className="reel-action-btn">
                <span>💬</span>
                <span style={{ fontSize: '12px' }}>Chat</span>
              </div>
              <Link href={`/video/${video.id}`} className="reel-action-btn" style={{ textDecoration: 'none' }}>
                <span>🎬</span>
                <span style={{ fontSize: '12px' }}>Full</span>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
