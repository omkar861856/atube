'use client';

import { useState, useEffect } from 'react';
import NativeBanner from './NativeBanner';

interface Props {
  video: {
    id: string;
    embed: string;
    title: string;
  };
}

export default function VideoPlayer({ video }: Props) {
  const [showAd, setShowAd] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Track view via API route to avoid server-side DB issues crashing the page
    fetch('/api/track', {
      method: 'POST',
      body: JSON.stringify({ videoId: video.id, title: video.title }),
    }).catch(() => {});

    const handleBlur = () => setHasInteracted(true);
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [video.id, video.title]);

  useEffect(() => {
    const handleFocus = () => {
      if (hasInteracted) {
        setShowAd(true);
        setHasInteracted(false);
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [hasInteracted]);

  return (
    <div 
      className="video-player-container"
      onMouseLeave={() => {
        if (hasInteracted) setShowAd(true);
      }}
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden' }}
    >
      <iframe
        id="video-player"
        src={`${video.embed}${video.embed.includes('?') ? '&' : '?'}autoplay=1`}
        width="100%"
        height="100%"
        allowFullScreen
        frameBorder="0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        title={video.title}
        loading="lazy"
        style={{ border: 'none' }}
      />

      {showAd && (
        <div className="pause-ad-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowAd(false); }}>
          <div className="pause-ad-content" style={{ maxWidth: '360px' }}>
            <button 
              onClick={() => setShowAd(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
            >
              ×
            </button>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '15px' }}>ADVERTISEMENT</div>
            <NativeBanner id="2020499" />
            <p style={{ fontSize: '12px', marginTop: '15px', color: 'var(--text-secondary)' }}>Click to resume video</p>
          </div>
        </div>
      )}
    </div>
  );
}
