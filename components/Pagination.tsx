'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();

  function buildHref(page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `/?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  const delta = 2;
  const pages: (number | '...')[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="pagination">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className="page-btn" id="pagination-prev">
          ‹ Prev
        </Link>
      ) : (
        <span className="page-btn" style={{ opacity: 0.35, cursor: 'not-allowed' }}>‹ Prev</span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="page-btn" style={{ cursor: 'default', opacity: 0.4 }}>…</span>
        ) : (
          <Link
            key={p}
            href={buildHref(p as number)}
            className={`page-btn ${p === currentPage ? 'active' : ''}`}
            id={`pagination-page-${p}`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className="page-btn" id="pagination-next">
          Next ›
        </Link>
      ) : (
        <span className="page-btn" style={{ opacity: 0.35, cursor: 'not-allowed' }}>Next ›</span>
      )}
    </div>
  );
}
