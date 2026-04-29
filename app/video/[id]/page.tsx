import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getVideoById, searchVideos, formatViews, formatDate, formatDuration } from '@/lib/api';
import { Metadata } from 'next';
import NativeBanner from '@/components/NativeBanner';
import VideoPlayer from '@/components/VideoPlayer';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const video = await getVideoById(id);
    if (!video) return { title: 'Video Not Found' };
    return {
      title: `${video.title} — AdultTube`,
      description: `Watch ${video.title} in high quality. ${formatDuration(video.length_sec)} long.`,
    };
  } catch {
    return { title: 'AdultTube — Premium Entertainment' };
  }
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  
  // Defensive Data Fetching
  let video: any = null;
  let relatedVideos: any[] = [];

  try {
    const [videoData, relatedData] = await Promise.all([
      getVideoById(id).catch(() => null),
      searchVideos({ query: 'all', per_page: 12, order: 'top-weekly' }).catch(() => ({ videos: [] })),
    ]);
    
    video = videoData;
    relatedVideos = (relatedData?.videos || []).filter((v: any) => v.id !== id).slice(0, 10);
  } catch (err) {
    console.error('[VideoPage] Critical fetch error:', err);
  }

  if (!video) {
    notFound();
  }

  const ratingPercent = (parseFloat(video.rate) / 5) * 100;
  const tags = (video.keywords || '')
    .split(',')
    .map((t: string) => t.trim())
    .filter(Boolean)
    .slice(0, 20);

  return (
    <div className="video-detail-root">
      {/* Top Ad */}
      <div className="page-container" style={{ paddingBottom: 0 }}>
        <NativeBanner />
      </div>

      <div className="video-detail-container">
        {/* Main Content Area */}
        <div className="video-detail-main">
          {/* Player Section */}
          <div className="video-player-section">
            <VideoPlayer video={{ id: video.id, embed: video.embed, title: video.title }} />
          </div>

          {/* Info Section */}
          <div className="video-info-section">
            <div className="video-info-header">
              <h1 className="video-info-title">{video.title}</h1>
              
              <div className="video-info-stats">
                <div className="stat-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  {formatViews(video.views)}
                </div>
                <div className="stat-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {formatDuration(video.length_sec)}
                </div>
                <div className="stat-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  {formatDate(video.added)}
                </div>
                <div className="stat-pill accent">
                  ★ {parseFloat(video.rate).toFixed(1)}
                </div>
              </div>
            </div>

            {/* Rating Bar */}
            <div className="rating-container">
              <div className="rating-track">
                <div className="rating-fill" style={{ width: `${ratingPercent}%` }} />
              </div>
              <span className="rating-text">{ratingPercent.toFixed(0)}% Satisfaction</span>
            </div>

            {/* Download Card */}
            <div className="premium-card download-card">
              <div className="card-header">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <div>
                  <h3 className="card-title">Download in 4K Quality</h3>
                  <p className="card-subtitle">Fast, secure, and permanent offline access</p>
                </div>
              </div>
              
              <div className="download-instruction-box">
                <p>Right-click video player → Select <strong>"Copy video URL"</strong> → Paste in the downloader.</p>
              </div>

              <a 
                href="https://metube.ecotron.co.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="premium-btn-action"
              >
                OPEN DOWNLOADER
              </a>
            </div>

            <div style={{ margin: '32px 0' }}>
              <NativeBanner id="2020499" />
            </div>

            {/* Tags Cloud */}
            {tags.length > 0 && (
              <div className="video-tags-container">
                <h4 className="tags-label">Categorized in</h4>
                <div className="tag-cloud">
                  {tags.map(tag => (
                    <Link key={tag} href={`/?cat=${encodeURIComponent(tag)}`} className="tag-pill">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Source Info */}
            <div className="source-footer">
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                Source: Eporner.com External Provider
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Related Area */}
        <aside className="video-detail-sidebar">
          <div className="sidebar-ad">
            <NativeBanner id="2020499" />
          </div>

          <h2 className="sidebar-title">Discover More</h2>
          
          <div className="related-list">
            {relatedVideos.map(rv => {
              const thumb = rv.default_thumb?.src || rv.thumbs?.[0]?.src;
              return (
                <Link key={rv.id} href={`/video/${rv.id}`} className="related-item">
                  <div className="related-item-thumb">
                    {thumb && (
                      <Image
                        src={thumb}
                        alt={rv.title}
                        fill
                        sizes="160px"
                        className="thumb-img"
                        unoptimized
                      />
                    )}
                    <span className="related-duration">{formatDuration(rv.length_sec)}</span>
                  </div>
                  <div className="related-item-info">
                    <h5 className="related-item-title">{rv.title}</h5>
                    <div className="related-item-meta">
                      {formatViews(rv.views)} views • ★ {parseFloat(rv.rate).toFixed(1)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="sidebar-ad" style={{ marginTop: '32px' }}>
            <NativeBanner />
          </div>
        </aside>
      </div>
    </div>
  );
}
