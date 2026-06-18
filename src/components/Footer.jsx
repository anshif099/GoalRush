import logoImg from '../assets/logo.png';
import './Footer.css';

const FOOTER_LINKS = {
  Platform: ['How It Works', 'Features', 'Daily Challenges', 'Leaderboard', 'Mobile App'],
  Sponsors: ['Advertise', 'Brand Partnerships', 'Media Kit', 'Case Studies', 'Analytics'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Investors'],
  Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const SOCIALS = [
  { icon: '𝕏', label: 'X (Twitter)', href: '#' },
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '▶️', label: 'YouTube', href: '#' },
  { icon: '💼', label: 'LinkedIn', href: '#' },
  { icon: '🎮', label: 'Discord', href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer-cta-banner">
        <div className="container footer-cta-inner">
          <div className="cta-text">
            <h2 className="cta-headline">Ready to Play?</h2>
            <p className="cta-sub">Join 10M+ fans and start your Goal Rush journey today.</p>
          </div>
          <div className="cta-actions">
            <button className="btn btn-gold btn-lg" id="footer-play-now-btn">⚽ Play Now — It&apos;s Free</button>
            <button className="btn btn-outline btn-lg" id="footer-download-btn" onClick={(e)=>{e.preventDefault(); alert('Installing app...'); if (window.deferredPrompt) { window.deferredPrompt.prompt(); window.deferredPrompt.userChoice.then(() => { delete window.deferredPrompt; localStorage.setItem('postInstallRedirect','login'); window.location.hash='#login'; }); } else { // fallback
                localStorage.setItem('postInstallRedirect','login');
                window.location.hash='#login';
              } }}>⬇️ Download App</button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }} id="footer-sponsor-btn">
              🤝 Become a Sponsor
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src={logoImg} alt="Goal Rush" className="footer-logo" />
            </div>
            <p className="footer-tagline">
              The world&apos;s leading fan engagement platform. Play. Predict. Win. Repeat.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(({ icon, label, href }) => (
                <a key={label} href={href} className="social-btn" aria-label={label} title={label} id={`footer-social-${label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {icon}
                </a>
              ))}
            </div>
            <div className="footer-badges">
              <div className="app-badge" id="footer-appstore-btn">🍎 App Store</div>
              <div className="app-badge" id="footer-playstore-btn">▶ Google Play</div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="footer-col">
              <h4 className="footer-col-title">{section}</h4>
              <ul className="footer-links">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link" id={`footer-link-${link.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © 2026 Goal Rush. All rights reserved. Built for fans, by fans. 🌍
          </p>
          <div className="footer-bottom-right">
            <span className="footer-badge-tag">🏆 FIFA World Cup 2026 Partner</span>
            <span className="footer-badge-tag">🌍 180+ Countries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
