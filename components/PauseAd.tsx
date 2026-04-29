'use client';

import { useState, useEffect, useCallback } from 'react';
import NativeBanner from './NativeBanner';

export default function PauseAd() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Logic: When the window loses focus, it means the user clicked the iframe (likely playing/pausing)
    // We can't know which, but we can show the ad when they move their mouse AWAY from the video
    // after interacting with it.
    
    const handleBlur = () => {
      // User clicked into the iframe
      // We don't show the ad immediately because they might be playing
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  const showAd = () => setIsVisible(true);
  const hideAd = () => setIsVisible(false);

  return (
    <div 
      className="pause-ad-overlay"
      style={{
        display: isVisible ? 'flex' : 'none',
      }}
      onClick={(e) => {
        // If clicking the overlay background, hide it
        if (e.target === e.currentTarget) hideAd();
      }}
    >
      <div className="pause-ad-content">
        <button className="pause-ad-close" onClick={hideAd}>×</button>
        <div className="pause-ad-label">ADVERTISEMENT</div>
        <NativeBanner />
        <p style={{ fontSize: 11, marginTop: 15, color: 'var(--text-secondary)' }}>
          Video paused? Click to resume.
        </p>
      </div>
    </div>
  );
}
