import { Suspense } from 'react';
import { searchVideos } from '@/lib/api';
import { SortOrder } from '@/lib/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import FilterBar from '@/components/FilterBar';
import AdPlaceholder from '@/components/AdPlaceholder';
import NativeBanner from '@/components/NativeBanner';
import { trackPageView } from '@/lib/analytics';

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    order?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;

  // q (search) takes priority over cat (category chip).
  // cat='all' is the "show everything" chip — map to Eporner keyword 'all'.
  const query =
    params.q?.trim() ||
    (params.cat && params.cat !== 'all' ? params.cat : 'all');

  const order = (params.order as SortOrder) || 'latest';
  const page = Math.max(1, parseInt(params.page || '1', 10));

  const [data] = await Promise.all([
    searchVideos({ query, per_page: 24, page, thumbsize: 'big', order, gay: 0, lq: 1 }),
    // Fire-and-forget analytics (non-blocking)
    trackPageView({ path: '/', query, order, page }).catch(() => {}),
  ]);

  const totalPages = Math.min(data.total_pages || 0, 100);

  const sectionTitle = params.q
    ? `Results for "${params.q}"`
    : params.cat && params.cat !== 'all'
    ? params.cat.charAt(0).toUpperCase() + params.cat.slice(1)
    : order === 'top-weekly'
    ? '🔥 Trending This Week'
    : order === 'most-popular'
    ? '💎 Most Popular'
    : order === 'top-rated'
    ? '⭐ Top Rated'
    : '🆕 Latest Videos';

  return (
    <div className="page-layout">
      {/* Hero Native Banner */}
      <NativeBanner />

      {/* Filter Bar */}
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>

      <div className="content-grid">
        {/* Main Content */}
        <div>
          <div className="section-header">
            <h1 className="section-title">{sectionTitle}</h1>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {data.total_count.toLocaleString()} videos
            </span>
          </div>

          {data.videos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <h3>No videos found</h3>
              <p>Try a different search term</p>
            </div>
          ) : (
            <>
              <div className="video-grid">
                {data.videos.slice(0, 12).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>

              <AdPlaceholder style={{ height: 90, margin: '28px 0' }} label="Mid-Content Advertisement — 728×90" />

              <div className="video-grid">
                {data.videos.slice(12).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </>
          )}

          {/* Pagination — always shown if totalPages > 1 */}
          {totalPages > 1 && (
            <Suspense fallback={null}>
              <Pagination currentPage={page} totalPages={totalPages} />
            </Suspense>
          )}
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          <AdPlaceholder style={{ height: 250 }} label="Sidebar Ad — 300×250" />

          <div className="sidebar-widget">
            <h3>🔥 Hot Searches</h3>
            <div className="tag-cloud">
              {['teen', 'milf', 'amateur', 'asian', 'anal', 'pov', 'lesbian', 'big tits', 'creampie', 'blonde', 'threesome', 'hardcore'].map(tag => (
                <a key={tag} href={`/?cat=${encodeURIComponent(tag)}`} className="tag">{tag}</a>
              ))}
            </div>
          </div>

          <AdPlaceholder style={{ height: 250 }} label="Sidebar Ad — 300×250" />

          <div className="sidebar-widget">
            <h3>📊 Browse By</h3>
            <div className="tag-cloud">
              {[
                { label: '🆕 Latest', href: '/?order=latest' },
                { label: '💎 Popular', href: '/?order=most-popular' },
                { label: '🔥 Weekly', href: '/?order=top-weekly' },
                { label: '⭐ Top Rated', href: '/?order=top-rated' },
                { label: '⏱️ Longest', href: '/?order=longest' },
              ].map(item => (
                <a key={item.href} href={item.href} className="tag">{item.label}</a>
              ))}
            </div>
          </div>

          <AdPlaceholder style={{ height: 600 }} label="Sidebar Ad — 300×600" />
        </aside>
      </div>
    </div>
  );
}
