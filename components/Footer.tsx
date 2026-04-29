export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="logo-icon">🔥</div>
              <span style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(135deg,#fff,var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AdultTube
              </span>
            </div>
            <p>
              Your #1 destination for free HD adult videos. Thousands of premium videos available in 4K quality. Powered by Eporner API.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/?order=latest">Latest Videos</a></li>
              <li><a href="/?order=most-popular">Most Popular</a></li>
              <li><a href="/?order=top-rated">Top Rated</a></li>
              <li><a href="/?order=top-weekly">This Week</a></li>
              <li><a href="/?order=longest">Long Videos</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><a href="/?cat=amateur">Amateur</a></li>
              <li><a href="/?cat=teen">Teen</a></li>
              <li><a href="/?cat=milf">MILF</a></li>
              <li><a href="/?cat=asian">Asian</a></li>
              <li><a href="/?cat=lesbian">Lesbian</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">DMCA</a></li>
              <li><a href="#">2257 Statement</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 AdultTube. All content is provided by Eporner.com API. All models are 18+ years old.</div>
          <div className="footer-rta">
            <span>🛡️</span>
            <span>RTA Labeled</span>
            <span style={{ margin: '0 6px', opacity: 0.4 }}>|</span>
            <span>18 U.S.C. 2257</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
