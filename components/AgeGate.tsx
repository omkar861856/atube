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
      <div className="age-gate-modal">
        <div className="age-gate-logo">🔞</div>
        <div className="age-gate-site">AdultTube</div>

        <p className="age-gate-warning">
          This website contains <strong>explicit adult content</strong> intended for adults only.
        </p>
        <p className="age-gate-legal">
          By entering you confirm that you are <strong>18 years of age or older</strong>, and that you agree to our
          Terms of Service. If you are under 18, please leave immediately.
        </p>

        <div className="age-gate-btns">
          <button id="age-gate-enter" className="btn-primary" onClick={handleEnter}>
            I am 18+ — Enter
          </button>
          <button id="age-gate-leave" className="btn-secondary" onClick={handleLeave}>
            Leave
          </button>
        </div>

        <div className="rta-badge">
          <span>🛡️</span>
          <span>RTA Labeled — Parental Controls Compatible</span>
        </div>
      </div>
    </div>
  );
}
