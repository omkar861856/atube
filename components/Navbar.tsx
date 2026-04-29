'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FormEvent, useState, useTransition } from 'react';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [, startTransition] = useTransition();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    startTransition(() => {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    });
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-search-container">
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              id="search-input"
              type="search"
              placeholder="Search for premium adult content..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoComplete="off"
            />
          </form>
        </div>

        <div className="nav-actions">
          <Link href="/reels" className="category-tag active" style={{ padding: '8px 16px', fontSize: '13px' }}>
            ✨ Watch Reels
          </Link>
          <button className="category-tag" style={{ border: 'none', background: 'var(--bg-hover)' }}>
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
