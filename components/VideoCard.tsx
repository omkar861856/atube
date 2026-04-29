'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useCallback, useEffect } from 'react';
import { EpornerVideo } from '@/lib/types';
import { formatViews, formatDuration } from '@/lib/api';

interface Props {
  video: EpornerVideo;
}

export default function VideoCard({ video }: Props) {
  const defaultThumb = video.default_thumb?.src || video.thumbs?.[0]?.src || '';
  const previewThumbs = video.thumbs?.length
    ? video.thumbs.slice(0, 10).map(t => t.src)
    : [defaultThumb];

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const startPreview = useCallback(() => {
    if (previewThumbs.length < 2) return;
    setIsHovered(true);
    indexRef.current = 0;
    setPreviewSrc(previewThumbs[0]);

    if (intervalRef.current) clearInterval(intervalRef.current);
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

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              startPreview();
            } else {
              stopPreview();
            }
          });
        },
        { threshold: 0.6 }
      );

      if (cardRef.current) observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, [startPreview, stopPreview]);

  const activeSrc = isHovered && previewSrc ? previewSrc : defaultThumb;

  return (
    <Link
      href={`/video/${video.id}`}
      className="video-card"
      id={`video-${video.id}`}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      ref={cardRef}
    >
      <div className="video-thumb-container">
        {activeSrc ? (
          <Image
            src={activeSrc}
            alt={video.title}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="video-thumb"
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

        <span className="video-badge">{parseFloat(video.rate) >= 4.5 ? 'Premium' : 'HD'}</span>
        <span className="video-duration">{formatDuration(video.length_sec)}</span>

        {isHovered && previewThumbs.length > 1 && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
            background: 'rgba(0,0,0,0.5)', display: 'flex', gap: '2px', padding: '0 4px', zIndex: 10
          }}>
            {previewThumbs.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: '100%', borderRadius: '2px',
                  background: i === indexRef.current ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
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
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>★ {parseFloat(video.rate).toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
