import Link from 'next/link';
import Image from 'next/image';
import { EpornerVideo } from '@/lib/types';
import { formatViews } from '@/lib/api';

interface Props {
  video: EpornerVideo;
}

export default function VideoCard({ video }: Props) {
  const thumb = video.default_thumb?.src || video.thumbs?.[0]?.src;

  return (
    <Link href={`/video/${video.id}`} className="video-card" id={`video-${video.id}`}>
      <div className="video-thumb-wrap">
        {thumb ? (
          <Image
            src={thumb}
            alt={video.title}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🎬</div>
        )}
        <span className="video-duration">{video.length_min}</span>
        {video.rate && parseFloat(video.rate) >= 4.3 && (
          <span className="video-quality">HD</span>
        )}
      </div>
      <div className="video-card-info">
        <p className="video-card-title">{video.title}</p>
        <div className="video-card-meta">
          <span className="video-views">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            {formatViews(video.views)}
          </span>
          <span className="video-rating">
            ★ {parseFloat(video.rate).toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
