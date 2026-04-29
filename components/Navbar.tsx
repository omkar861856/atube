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
        <Link href="/" className="logo">
          <div className="logo-icon">🔥</div>
          <span className="logo-text">AdultTube</span>
          <span className="logo-badge">18+</span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            id="search-input"
            type="search"
            placeholder="Search videos..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </form>

        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/?order=top-weekly" className="nav-link">Trending</Link>
          <Link href="/?order=most-popular" className="nav-link">Popular</Link>
          <Link href="/?order=top-rated" className="nav-link">Top Rated</Link>
          <Link href="/?order=longest" className="nav-link">Long Videos</Link>
        </div>
      </div>
    </nav>
  );
}
