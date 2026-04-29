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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Desktop Collapse Toggle */}
        <button 
          className="nav-icon-btn desktop-only" 
          onClick={toggleCollapsed}
          title="Toggle Sidebar"
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '20px', padding: '8px' }}
        >
          ☰
        </button>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="nav-icon-btn mobile-only" 
          onClick={toggleOpen}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '20px', padding: '8px' }}
        >
          ☰
        </button>

        <Link href="/" className="nav-logo desktop-only" style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
          AdultTube
        </Link>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search premium videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="nav-actions">
        <Link href="/reels" className="watch-reels-btn">
          ✨ <span className="desktop-only">Watch Reels</span><span className="mobile-only">Reels</span>
        </Link>
      </div>
    </header>
  );
}
