import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '16px', color: 'var(--accent)' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Video Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px' }}>
        The video you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link href="/" className="watch-reels-btn">
        Return Home
      </Link>
    </div>
  );
}
