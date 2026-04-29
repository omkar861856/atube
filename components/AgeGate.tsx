'use client';

import { useEffect, useState } from 'react';

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('age_verified');
    if (!verified) setVisible(true);
  }, []);

  function handleEnter() {
    sessionStorage.setItem('age_verified', '1');
    setVisible(false);
  }

  function handleLeave() {
    window.location.href = 'https://www.google.com';
  }

  if (!visible) return null;

  return (
    <div className="age-gate-overlay" role="dialog" aria-modal="true" aria-label="Age Verification">
      <div className="age-gate-content">
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔥</div>
        <h1 className="age-gate-title">AdultTube</h1>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
          Adult Content Ahead
        </p>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>
          This platform contains explicit adult entertainment. By entering, you certify that you are at least <strong>18 years of age</strong> and have the legal right to view such material in your jurisdiction.
        </p>

        <button id="age-gate-enter" className="btn-confirm" onClick={handleEnter}>
          I am 18 or older - Enter
        </button>
        
        <button 
          id="age-gate-leave" 
          onClick={handleLeave}
          style={{ 
            background: 'none', border: 'none', color: 'var(--text-muted)', 
            marginTop: '24px', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
            textDecoration: 'underline'
          }}
        >
          Exit Website
        </button>

        <div style={{ marginTop: '40px', opacity: 0.3, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Restricted To Adults • RTA-5042
        </div>
      </div>
    </div>
  );
}
