import './Sponsors.css';

const SPONSORS = [
  { name: 'Nike', logo: '🏃', color: '#111111', desc: 'Official Sportswear Partner' },
  { name: 'Adidas', logo: '⚡', color: '#000000', desc: 'Official Kit Sponsor' },
  { name: 'Coca-Cola', logo: '🥤', color: '#E10613', desc: 'Official Beverage Partner' },
  { name: 'Samsung', logo: '📱', color: '#1428A0', desc: 'Technology Partner' },
  { name: 'Visa', logo: '💳', color: '#1A1F71', desc: 'Official Payment Partner' },
  { name: 'Amazon', logo: '📦', color: '#FF9900', desc: 'Cloud & Commerce Partner' },
];

const SPONSOR_BENEFITS = [
  { icon: '📊', title: '500M+ Impressions', desc: 'Reach fans across 50+ live sporting events globally' },
  { icon: '🎯', title: 'Targeted Engagement', desc: 'Custom challenges and activations built around your brand' },
  { icon: '📈', title: 'Measurable ROI', desc: 'Real-time analytics dashboard with conversion tracking' },
  { icon: '🌍', title: 'Global Reach', desc: '180+ countries, 50+ languages, fully localized campaigns' },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="sponsors-bg" />

      <div className="container">
        {/* Trusted Brands */}
        <div className="sponsors-top fade-up">
          <p className="sponsors-eyebrow">Trusted by Global Brands</p>
          <div className="sponsors-logos-row">
            {SPONSORS.map(({ name, logo, color }) => (
              <div key={name} className="sponsor-logo-card" title={name}>
                <span className="sponsor-emoji" style={{ filter: 'grayscale(0)' }}>{logo}</span>
                <span className="sponsor-name" style={{ color }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sponsors-content">
          <div className="sponsors-left fade-up">
            <div className="section-tag" style={{ background: 'rgba(0,166,81,0.08)', borderColor: 'rgba(0,166,81,0.2)', color: 'var(--emerald-green)' }}>
              🤝 For Sponsors & Brands
            </div>
            <h2 className="section-title">
              Connect Your Brand with <span className="text-gradient-green">500M+</span> Fans
            </h2>
            <p className="section-subtitle">
              Goal Rush gives brands direct access to the most engaged fans in sports. Custom activations, real-time analytics, and measurable impact.
            </p>

            <div className="sponsor-benefits">
              {SPONSOR_BENEFITS.map(({ icon, title, desc }) => (
                <div key={title} className="benefit-row">
                  <div className="benefit-icon-wrap">
                    <span>{icon}</span>
                  </div>
                  <div>
                    <div className="benefit-title">{title}</div>
                    <div className="benefit-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sponsor-ctas">
              <button className="btn btn-primary btn-lg" id="become-sponsor-main-btn">
                🤝 Become a Sponsor
              </button>
              <button className="btn btn-outline" id="download-media-kit-btn">
                📄 Download Media Kit
              </button>
            </div>
          </div>

          <div className="sponsors-right fade-up fade-up-delay-2">
            <div className="sponsor-showcase">
              <div className="showcase-header">
                <span className="showcase-title">📊 Sponsor Dashboard</span>
                <span className="showcase-live">LIVE</span>
              </div>

              <div className="showcase-metrics">
                {[
                  { label: 'Campaign Reach', value: '2.4M', change: '+18%', up: true },
                  { label: 'Fan Interactions', value: '847K', change: '+32%', up: true },
                  { label: 'Click-Through Rate', value: '8.9%', change: '+2.1%', up: true },
                  { label: 'Avg. Engagement', value: '4m 12s', change: '+45s', up: true },
                ].map(({ label, value, change, up }) => (
                  <div key={label} className="metric-card">
                    <div className="metric-label">{label}</div>
                    <div className="metric-value">{value}</div>
                    <div className={`metric-change ${up ? 'change-up' : 'change-down'}`}>
                      {up ? '↑' : '↓'} {change}
                    </div>
                  </div>
                ))}
              </div>

              <div className="showcase-brands">
                <div className="brands-label">Active Campaigns</div>
                <div className="brands-list">
                  {SPONSORS.slice(0, 4).map(({ name, logo }) => (
                    <div key={name} className="active-brand">
                      <span>{logo}</span>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
