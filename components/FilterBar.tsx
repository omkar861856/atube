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
  { label: 'Trending', value: 'top-weekly' },
  { label: 'Popular', value: 'most-popular' },
  { label: 'Top Rated', value: 'top-rated' },
  { label: 'Longest', value: 'longest' },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCat = searchParams.get('cat') || 'all';
  const currentOrder = (searchParams.get('order') as SortOrder) || 'latest';

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.delete('page');
    router.push(`/?${params.toString()}`);
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <div className="category-bar">
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`category-tag ${currentOrder === opt.value ? 'active' : ''}`}
            onClick={() => setParam('order', opt.value)}
          >
            {opt.label}
          </button>
        ))}
        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 8px', flexShrink: 0 }} />
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-tag ${currentCat === cat ? 'active' : ''}`}
            onClick={() => setParam('cat', cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
