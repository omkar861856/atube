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
        <div className="reel-video-wrapper" style={{ height: 'calc(100vh - var(--header-height))' }}>
          <iframe
            key={`reel-${video.id}-${isMuted ? 'muted' : 'unmuted'}-${activeIndex === index ? 'active' : 'inactive'}`}
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

          <div className="reel-side-actions" style={{ zIndex: 1000 }}>
            <div className="reel-action-btn" onClick={() => setIsMuted(!isMuted)}>
              <span style={{ fontSize: '20px', display: 'flex' }}>
                {isMuted ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                )}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600 }}>{isMuted ? 'MUTED' : 'SOUND'}</span>
            </div>
            
            <div className="reel-action-btn" onClick={() => setAutoplay(!autoplay)}>
              <span style={{ fontSize: '20px', display: 'flex' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600 }}>AUTO</span>
            </div>

            <Link href={`/video/${video.id}`} className="reel-action-btn" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '20px', display: 'flex' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 12-8.5 6V6Z"/><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="22" y1="7" y2="7"/><line x1="2" x2="22" y1="17" y2="17"/></svg>
              </span>
              <span style={{ fontSize: '10px', fontWeight: 600 }}>FULL</span>
            </Link>
          </div>

          {/* Navigation Arrows - Moved to be more prominent */}
          <div className="reel-nav-controls" style={{ z-index: 1000 }}>
            {index > 0 && (
              <button className="reel-nav-btn" onClick={() => scrollTo(index - 1)} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid #fff' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m18 15-6-6-6 6"/></svg>
              </button>
            )}
            {index < videos.length - 1 && (
              <button className="reel-nav-btn" onClick={() => scrollTo(index + 1)} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid #fff' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            )}
          </div>
          
          <button className="reel-fullscreen-btn" onClick={toggleFullscreen}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
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
