'use client';

import { useState, useEffect } from 'react';
import NativeBanner from './NativeBanner';

interface Props {
  video: {
    embed: string;
    title: string;
  };
}

export default function VideoPlayer({ video }: Props) {
  const [showAd, setShowAd] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Detect when the user clicks into the iframe
    const handleBlur = () => {
      setHasInteracted(true);
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  useEffect(() => {
    // Detect when the user clicks back to our window (likely after interacting with the video)
    const handleFocus = () => {
      if (hasInteracted) {
        // They were in the video, now they are back. This is a good time to show the ad
        // as they might have paused or finished watching.
        setShowAd(true);
        setHasInteracted(false); // Reset for next interaction
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [hasInteracted]);

  return (
    <div 
      className="video-player-container"
      onMouseLeave={() => {
        // Also show ad when mouse leaves the player area
        // This covers the case where they pause and move mouse away
        if (hasInteracted) setShowAd(true);
      }}
    >
      <div className="video-player-wrap">
        <iframe
          id="video-player"
          src={video.embed}
          width="100%"
          height="100%"
          allowFullScreen
          scrolling="no"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          title={video.title}
          loading="lazy"
        />
      </div>

      {showAd && (
        <div 
          className="pause-ad-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAd(false);
          }}
        >
          <div className="pause-ad-content">
            <button className="pause-ad-close" onClick={() => setShowAd(false)}>×</button>
            <div className="pause-ad-label">ADVERTISEMENT</div>
            <NativeBanner />
            <p style={{ fontSize: 11, marginTop: 15, color: 'var(--text-secondary)' }}>
              Video paused? Click to resume.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
