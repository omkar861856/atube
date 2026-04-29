'use client';

export default function Footer() {
  return (
    <footer style={{ 
      marginTop: 'auto', padding: '60px 0 40px', borderTop: '1px solid var(--border)', 
      background: 'var(--bg-primary)', position: 'relative', zIndex: 10
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ fontSize: '24px' }}>🔥</div>
              <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>AdultTube</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, maxWidth: '400px' }}>
              The world's most advanced adult entertainment platform. We bring you the highest quality content in a premium, ad-free viewing experience.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/?order=latest" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Latest Videos</a></li>
              <li><a href="/?order=top-weekly" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Trending Content</a></li>
              <li><a href="/reels" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Vertical Reels</a></li>
              <li><a href="/?order=top-rated" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Top Rated</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>DMCA Notice</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>2257 Compliance</a></li>
            </ul>
          </div>
        </div>

        <div style={{ 
          paddingTop: '32px', borderTop: '1px solid var(--border)', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            © 2026 AdultTube. All content is powered by Eporner API. Models are 18+ years of age.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '12px' }}>
            <span>🛡️ RTA Labeled</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>🔞 18 U.S.C. 2257</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
