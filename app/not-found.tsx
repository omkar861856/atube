import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎬</div>
      <h1 style={{ fontSize: 48, fontWeight: 900, color: 'var(--accent)', marginBottom: 8 }}>404</h1>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
        Video Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
        The video you're looking for may have been removed or doesn't exist.
      </p>
      <Link href="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '14px 32px', borderRadius: 12 }}>
        ← Back to Home
      </Link>
    </div>
  );
}
