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
        <Link href={buildHref(currentPage - 1)} className="page-btn prev-next" id="pagination-prev">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          <span className="desktop-only">PREVIOUS</span>
        </Link>
      ) : (
        <span className="page-btn prev-next disabled">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          <span className="desktop-only">PREVIOUS</span>
        </span>
      )}

      {/* Page numbers */}
      <div className="page-numbers">
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="page-ellipsis">•••</span>
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
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className="page-btn prev-next" id="pagination-next">
          <span className="desktop-only">NEXT</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      ) : (
        <span className="page-btn prev-next disabled">
          <span className="desktop-only">NEXT</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      )}
    </div>
  );
}
