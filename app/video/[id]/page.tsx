import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getVideoById, searchVideos, formatViews, formatDate } from '@/lib/api';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Metadata } from 'next';
import { trackVideoView } from '@/lib/analytics';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) return { title: 'Video Not Found — AdultTube' };
  return {
    title: `${video.title} — AdultTube`,
    description: `Watch ${video.title}. ${video.length_min} long. ${formatViews(video.views)} views. Rated ${video.rate}/5.`,
    robots: { index: false, follow: false },
  };
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const [video, related] = await Promise.all([
    getVideoById(id),
    searchVideos({ query: 'all', per_page: 12, order: 'top-weekly', thumbsize: 'big' }),
  ]);

  if (!video) notFound();

  // Track video view (fire-and-forget)
  trackVideoView(video.id, video.title).catch(() => {});

  const ratingPercent = (parseFloat(video.rate) / 5) * 100;
  const tags = video.keywords
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 20);

  const relatedVideos = related.videos.filter(v => v.id !== video.id).slice(0, 10);

  return (
    <div>
      {/* Top ad */}
      <div className="page-layout" style={{ paddingBottom: 0 }}>
        <AdPlaceholder style={{ height: 90, margin: '16px 0 0' }} label="Banner Advertisement — 728×90" />
      </div>

      <div className="video-page-layout">
        {/* Left: Video + info */}
        <div>
          {/* Player */}
          <div className="video-player-wrap">
            <iframe
              id="video-player"
              src={video.embed}
              allowFullScreen
              scrolling="no"
              allow="autoplay; fullscreen"
              title={video.title}
            />
          </div>

          {/* Title */}
          <h1 className="video-detail-title">{video.title}</h1>

          {/* Meta */}
          <div className="video-detail-meta">
            <span className="meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              {formatViews(video.views)} views
            </span>
            <span className="meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
              {video.length_min}
            </span>
            <span className="meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
              {formatDate(video.added)}
            </span>
          </div>

          {/* Rating */}
          <div className="rating-bar-wrap">
            <span style={{ fontSize: 13, color: '#ffd700', fontWeight: 700 }}>★ {parseFloat(video.rate).toFixed(2)}</span>
            <div className="rating-bar">
              <div className="rating-bar-fill" style={{ width: `${ratingPercent}%` }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/ 5.00</span>
          </div>

          {/* Mid-video ad */}
          <AdPlaceholder style={{ height: 90, margin: '20px 0' }} label="In-Content Advertisement" />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="tags-section">
              <h4>Tags</h4>
              <div className="tag-cloud">
                {tags.map(tag => (
                  <Link key={tag} href={`/?cat=${encodeURIComponent(tag)}`} className="tag">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Source link */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}
            >
              View on Eporner.com →
            </a>
          </div>
        </div>

        {/* Right: Related + Ads */}
        <aside>
          <AdPlaceholder style={{ height: 250, marginBottom: 20 }} label="Sidebar Ad — 300×250" />

          <div style={{ marginBottom: 16 }}>
            <div className="section-header">
              <h2 className="section-title" style={{ fontSize: 16 }}>Related Videos</h2>
            </div>
            <div className="related-grid">
              {relatedVideos.map(rv => {
                const thumb = rv.default_thumb?.src || rv.thumbs?.[0]?.src;
                return (
                  <Link key={rv.id} href={`/video/${rv.id}`} className="related-card">
                    <div className="related-thumb">
                      {thumb && (
                        <Image
                          src={thumb}
                          alt={rv.title}
                          fill
                          sizes="120px"
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      )}
                      <span style={{
                        position: 'absolute', bottom: 4, right: 4,
                        background: 'rgba(0,0,0,0.8)', color: '#fff',
                        fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 3
                      }}>{rv.length_min}</span>
                    </div>
                    <div className="related-info">
                      <p className="related-title">{rv.title}</p>
                      <p className="related-meta">{formatViews(rv.views)} views · ★ {parseFloat(rv.rate).toFixed(1)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <AdPlaceholder style={{ height: 250 }} label="Sidebar Ad — 300×250" />
        </aside>
      </div>
    </div>
  );
}
