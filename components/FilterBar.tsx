'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SortOrder } from '@/lib/types';

const CATEGORIES = [
  'all', 'amateur', 'teen', 'milf', 'asian', 'lesbian', 'anal',
  'blonde', 'brunette', 'big tits', 'pov', 'creampie', 'hardcore',
  'japanese', 'latina', 'redhead', 'bbw', 'ebony', 'threesome',
];

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: 'Latest', value: 'latest' },
  { label: 'Most Popular', value: 'most-popular' },
  { label: 'Top Weekly', value: 'top-weekly' },
  { label: 'Top Monthly', value: 'top-monthly' },
  { label: 'Top Rated', value: 'top-rated' },
  { label: 'Longest', value: 'longest' },
  { label: 'Shortest', value: 'shortest' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCat = searchParams.get('cat') || 'all';
  const currentOrder = (searchParams.get('order') as SortOrder) || 'latest';

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.delete('page'); // reset to page 1
    router.push(`/?${params.toString()}`);
  }

  return (
    <div>
      {/* Category chips */}
      <div className="categories-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            id={`cat-${cat.replace(/\s+/g, '-')}`}
            className={`category-chip ${currentCat === cat ? 'active' : ''}`}
            onClick={() => setParam('cat', cat)}
          >
            {cat === 'all' ? '🔥 All' : cat}
          </button>
        ))}
      </div>

      {/* Sort bar */}
      <div className="sort-bar">
        <span className="sort-label">Sort by:</span>
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            id={`sort-${opt.value}`}
            className={`sort-btn ${currentOrder === opt.value ? 'active' : ''}`}
            onClick={() => setParam('order', opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
