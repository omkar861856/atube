'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSidebar } from './SidebarContext';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { toggleOpen, toggleCollapsed } = useSidebar();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="navbar-fixed">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '36px', height: '36px', 
            background: 'var(--accent-gradient)', 
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#000', fontWeight: 900, fontSize: '18px'
          }}>A</div>
          <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-1.5px' }}>
            ADULT<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>TUBE</span>
          </span>
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch} style={{ width: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search premium entertainment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: '48px' }}
          />
        </form>
      </div>

      <div className="nav-actions">
        <Link href="/reels" className="watch-reels-btn">
          WATCH REELS
        </Link>
      </div>
    </header>
  );
}
