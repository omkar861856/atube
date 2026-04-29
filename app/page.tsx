import { Suspense } from 'react';
import { searchVideos } from '@/lib/api';
import { SortOrder } from '@/lib/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import FilterBar from '@/components/FilterBar';
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

  const query =
    params.q?.trim() ||
    (params.cat && params.cat !== 'all' ? params.cat : 'all');

  const order = (params.order as SortOrder) || 'latest';
  const page = Math.max(1, parseInt(params.page || '1', 10));

  const [data] = await Promise.all([
    searchVideos({ query, per_page: 30, page, thumbsize: 'big', order, gay: 0, lq: 1 }),
    trackPageView({ path: '/', query, order, page }).catch(() => {}),
  ]);

  const totalPages = Math.min(data.total_pages || 0, 100);

  const sectionTitle = params.q
    ? `Results for "${params.q}"`
    : params.cat && params.cat !== 'all'
    ? params.cat.charAt(0).toUpperCase() + params.cat.slice(1)
    : order === 'top-weekly'
    ? '🔥 Trending Now'
    : order === 'most-popular'
    ? '💎 Most Popular'
    : order === 'top-rated'
    ? '⭐ Top Rated'
    : '🆕 Recently Added';

  return (
    <div className="page-container">
      {/* Hero Banner */}
      <NativeBanner />

      <div className="section-header" style={{ marginTop: '24px' }}>
        <h1 className="section-title">{sectionTitle}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {data.total_count.toLocaleString()} premium videos
          </span>
        </div>
      </div>

      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>

      {data.videos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
          <h3>No videos found for your request</h3>
          <p>Try exploring other categories or search terms</p>
        </div>
      ) : (
        <>
          <div className="video-grid">
            {data.videos.slice(0, 15).map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          <div style={{ margin: '48px 0' }}>
            <NativeBanner id="2020499" />
          </div>

          <div className="video-grid">
            {data.videos.slice(15).map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </>
      )}

      {totalPages > 1 && (
        <Suspense fallback={null}>
          <div style={{ marginTop: '60px' }}>
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
