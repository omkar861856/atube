'use client';

import { EpornerVideo } from '@/lib/types';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import NativeBanner from '@/components/NativeBanner';

interface Props {
  videos: EpornerVideo[];
}

export default function ReelClient({ videos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.7 }
    );

    const slides = document.querySelectorAll('.reel-slide');
    slides.forEach((slide) => observerRef.current?.observe(slide));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    const slides = document.querySelectorAll('.reel-slide');
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Helper to render a video or an ad
  const renderItem = (video: EpornerVideo, index: number) => {
    const isAd = (index + 1) % 6 === 0;

    if (isAd) {
      return (
        <section key={`ad-${index}`} className="reel-slide" data-index={index}>
          <div className="reel-video-wrapper ad-slide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', padding: '20px' }}>
            <div style={{ marginBottom: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>SPONSORED ADVERTISEMENT</div>
            <NativeBanner id="2020499" />
            <button 
              onClick={() => scrollTo(index + 1)}
              style={{ marginTop: '40px', padding: '12px 24px', borderRadius: '30px', background: 'var(--accent)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
            >
              Continue Watching →
            </button>
          </div>
        </section>
      );
    }

    return (
      <section key={video.id} className="reel-slide" data-index={index}>
        <div className="reel-video-wrapper">
          <iframe
            src={`https://www.eporner.com/embed/${video.id}/?autoplay=${(autoplay && activeIndex === index) ? 1 : 0}&muted=${isMuted ? 1 : 0}`}
            className="reel-video"
            allow="autoplay; fullscreen"
            frameBorder="0"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
          
          <div className="reel-overlay">
            <div className="reel-info">
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{video.title}</h3>
              <p style={{ margin: '6px 0 0', opacity: 0.9, fontSize: '0.85rem' }}>
                🔥 {video.views.toLocaleString()} • ⭐ {video.rate}
              </p>
            </div>
          </div>

          <div className="reel-side-actions">
            <div className="reel-action-btn" onClick={() => setIsMuted(!isMuted)}>
              <span style={{ fontSize: '24px' }}>{isMuted ? '🔇' : '🔊'}</span>
              <span style={{ fontSize: '10px' }}>{isMuted ? 'Muted' : 'Sound'}</span>
            </div>
            
            <div className="reel-action-btn" onClick={() => setAutoplay(!autoplay)}>
              <span style={{ fontSize: '24px' }}>{autoplay ? '🔄' : '⏸️'}</span>
              <span style={{ fontSize: '10px' }}>Auto</span>
            </div>

            <Link href={`/video/${video.id}`} className="reel-action-btn" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '24px' }}>🎬</span>
              <span style={{ fontSize: '10px' }}>Full</span>
            </Link>
          </div>

          {/* Navigation Arrows */}
          <div className="reel-nav-controls">
            {index > 0 && (
              <button className="reel-nav-btn" onClick={() => scrollTo(index - 1)}>▲</button>
            )}
            {index < videos.length - 1 && (
              <button className="reel-nav-btn" onClick={() => scrollTo(index + 1)}>▼</button>
            )}
          </div>
          
          <button className="reel-fullscreen-btn" onClick={toggleFullscreen}>
            ⛶
          </button>
        </div>
      </section>
    );
  };

  return (
    <div ref={containerRef} className="reels-container">
      {videos.map((video, index) => renderItem(video, index))}
    </div>
  );
}
