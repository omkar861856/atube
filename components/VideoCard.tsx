'use client';

import Image from 'next/image';
import { useRef, useState, useCallback, useEffect } from 'react';
import { EpornerVideo } from '@/lib/types';
import { formatViews, formatDuration } from '@/lib/api';
import Link from 'next/link';

interface Props {
  video: EpornerVideo;
}

export default function VideoCard({ video }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewTimer = useRef<NodeJS.Timeout | null>(null);

  const previewThumbs = video.thumbs.filter(t => t.size === 'medium');
  const mainThumb = video.default_thumb?.src || previewThumbs[0]?.src;

  const startPreview = useCallback(() => {
    if (previewThumbs.length <= 1) return;
    previewTimer.current = setInterval(() => {
      setPreviewIndex(prev => (prev + 1) % previewThumbs.length);
    }, 800);
  }, [previewThumbs]);

  const stopPreview = useCallback(() => {
    if (previewTimer.current) {
      clearInterval(previewTimer.current);
      previewTimer.current = null;
    }
    setPreviewIndex(0);
  }, []);

  useEffect(() => {
    if (isHovered) startPreview();
    else stopPreview();
    return () => stopPreview();
  }, [isHovered, startPreview, stopPreview]);

  return (
    <Link 
      href={`/video/${video.id}`}
      className="video-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="video-thumb-container">
        {mainThumb ? (
          <Image
            src={isHovered && previewThumbs[previewIndex] ? previewThumbs[previewIndex].src : mainThumb}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="video-thumb"
            unoptimized
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', background: '#111', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'var(--text-muted)'
          }}>No Image</div>
        )}

        <span className="video-badge" style={{ background: 'var(--accent-gradient)', color: '#000', fontWeight: 900 }}>
          {parseFloat(video.rate) >= 4.5 ? 'PLATINUM' : 'HD'}
        </span>
        <span className="video-duration">{formatDuration(video.length_sec)}</span>

        {isHovered && previewThumbs.length > 1 && (
          <div className="preview-indicator" style={{ position: 'absolute', top: '12px', right: '12px', color: '#fff' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          </div>
        )}

        {isHovered && previewThumbs.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
            background: 'rgba(0,0,0,0.5)', display: 'flex', gap: '2px', padding: '0 4px', zIndex: 10
          }}>
            {previewThumbs.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '100%',
                  background: i === previewIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="video-card-body">
        <h3 className="video-title">{video.title}</h3>
        <div className="video-meta">
          <span>{formatViews(video.views)} views</span>
          <span style={{ color: 'var(--accent)' }}>★ {parseFloat(video.rate).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
