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
        {/* Desktop Collapse Toggle */}
        <button 
          className="nav-icon-btn desktop-only" 
          onClick={toggleCollapsed}
          title="Toggle Sidebar"
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="nav-icon-btn mobile-only" 
          onClick={toggleOpen}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>

        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '6px' }} />
          <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px' }}>ADULT<span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>TUBE</span></span>
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
            style={{ paddingLeft: '48px', height: '48px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}
          />
        </form>
      </div>

      <div className="nav-actions">
        <Link href="/reels" className="watch-reels-btn" style={{ background: 'none', border: '1px solid var(--border)', boxShadow: 'none' }}>
          WATCH REELS
        </Link>
      </div>
    </header>
  );
}
