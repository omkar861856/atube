'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { EpornerVideo } from '@/lib/types';
import { formatViews } from '@/lib/api';

interface Props {
  video: EpornerVideo;
}

export default function VideoCard({ video }: Props) {
  const defaultThumb = video.default_thumb?.src || video.thumbs?.[0]?.src || '';
  // Use up to 10 thumbs for the preview (skip the default thumb if possible)
  const previewThumbs = video.thumbs?.length
    ? video.thumbs.slice(0, 10).map(t => t.src)
    : [defaultThumb];

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const startPreview = useCallback(() => {
    if (previewThumbs.length < 2) return;
    setIsHovered(true);
    indexRef.current = 0;
    setPreviewSrc(previewThumbs[0]);

    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % previewThumbs.length;
      setPreviewSrc(previewThumbs[indexRef.current]);
    }, 400);
  }, [previewThumbs]);

  const stopPreview = useCallback(() => {
    setIsHovered(false);
    setPreviewSrc(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const activeSrc = isHovered && previewSrc ? previewSrc : defaultThumb;

  return (
    <Link
      href={`/video/${video.id}`}
      className="video-card"
      id={`video-${video.id}`}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      <div className="video-thumb-wrap">
        {activeSrc ? (
          <Image
            src={activeSrc}
            alt={video.title}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
            style={{ objectFit: 'cover', transition: isHovered ? 'opacity 0.15s ease' : 'none' }}
            unoptimized
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'var(--bg-hover)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32,
          }}>🎬</div>
        )}

        {/* Preview indicator bar */}
        {isHovered && previewThumbs.length > 1 && (
          <div className="preview-bar">
            {previewThumbs.map((_, i) => (
              <div
                key={i}
                className="preview-bar-segment"
                style={{ opacity: i === indexRef.current ? 1 : 0.3 }}
              />
            ))}
          </div>
        )}

        {/* Play icon on hover */}
        {isHovered && (
          <div className="preview-play-icon">▶</div>
        )}

        <span className="video-duration">{video.length_min}</span>
        {parseFloat(video.rate) >= 4.3 && (
          <span className="video-quality">HD</span>
        )}
      </div>

      <div className="video-card-info">
        <p className="video-card-title">{video.title}</p>
        <div className="video-card-meta">
          <span className="video-views">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            {formatViews(video.views)}
          </span>
          <span className="video-rating">★ {parseFloat(video.rate).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
