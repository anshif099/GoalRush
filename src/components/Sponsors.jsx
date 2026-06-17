import { useState } from 'react';
import './Sponsors.css';

const BRANDS = [
  { name: 'Nike', logo: '🏃', color: '#111111' },
  { name: 'Adidas', logo: '⚡', color: '#000000' },
  { name: 'Coca-Cola', logo: '🥤', color: '#E10613' },
  { name: 'Samsung', logo: '📱', color: '#1428A0' },
  { name: 'Visa', logo: '💳', color: '#1A1F71' },
  { name: 'Amazon', logo: '📦', color: '#FF9900' },
];

const SPONSORSHIP_PACKAGES = [
  {
    id: 'presenting',
    title: 'Presenting Sponsor',
    desc: 'Platform-wide native takeover. Maximize visibility with main screen banner overlays and load displays.',
    reach: '50M+ Mo. Reach',
    icon: '🏆',
    colorClass: 'pkg-blue',
  },
  {
    id: 'challenge',
    title: 'Challenge Sponsor',
    desc: 'Host customized daily gameplay challenges, branded quizzes, and sports trivia to engage fans directly.',
    reach: '15M+ Plays/Wk',
    icon: '🎯',
    colorClass: 'pkg-green',
  },
  {
    id: 'goal',
    title: 'Goal Sponsor',
    desc: 'Own the highlight moments! Branded animations and notifications trigger globally whenever a live goal is scored.',
    reach: '200M+ Highlights',
    icon: '⚽',
    colorClass: 'pkg-red',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard Sponsor',
    desc: 'Align your brand with sports achievement. Sponsor local, corporate, or global ranking leaderboards.',
    reach: '30M+ Mo. Views',
    icon: '📈',
    colorClass: 'pkg-gold',
  },
  {
    id: 'lucky-draw',
    title: 'Lucky Draw Sponsor',
    desc: 'Promote direct conversion. Sponsor high-stakes sweeps, lucky draw events, and physical reward vouchers.',
    reach: '8.9% Avg. CTR',
    icon: '🎁',
    colorClass: 'pkg-cyan',
  },
  {
    id: 'prediction',
    title: 'Match Prediction Sponsor',
    desc: 'Natively place your brand inside match prediction cards and stats overlays across 50+ world leagues.',
    reach: '45M+ Predictions',
    icon: '🔮',
    colorClass: 'pkg-purple',
  },
];

export default function Sponsors() {
  const [activeTab, setActiveTab] = useState('nike');

  return (
    <section id="sponsors" className="sponsors-section">
      <div className="sponsors-bg" />

      <div className="container">
        {/* Trusted Partners Ticker Header */}
        <div className="sponsors-top fade-up">
          <p className="sponsors-eyebrow">PARTNERING WITH THE BEST</p>
          <div className="sponsors-logos-row">
            {BRANDS.map(({ name, logo, color }) => (
              <div 
                key={name} 
                className={`sponsor-logo-card ${activeTab === name.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTab(name.toLowerCase())}
                title={name}
              >
                <span className="sponsor-emoji">{logo}</span>
                <span className="sponsor-name" style={{ color }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading */}
        <div className="sponsors-intro-block fade-up">
          <div className="section-tag sponsor-tag">🤝 For Brands & Sponsors</div>
          <h2 className="section-title">
            Turn Sports Fans <span className="text-gradient-green">Into Customers</span>
          </h2>
          <p className="section-subtitle">
            Leverage native, gamified ad units to reach highly engaged fans. Scale your campaigns, capture direct conversions, and monitor performance in real-time.
          </p>
        </div>

        {/* 6 Sponsorship Cards */}
        <div className="sponsorship-grid">
          {SPONSORSHIP_PACKAGES.map((pkg, idx) => (
            <div 
              key={pkg.id} 
              className={`sponsorship-card ${pkg.colorClass} fade-up fade-up-delay-${(idx % 3) + 1}`}
            >
              <div className="sponsorship-card-glow" />
              <div className="sponsorship-card-inner">
                <div className="sponsorship-icon-wrap">
                  <span className="sponsorship-icon">{pkg.icon}</span>
                </div>
                <h3 className="sponsorship-title">{pkg.title}</h3>
                <p className="sponsorship-desc">{pkg.desc}</p>
                <div className="sponsorship-reach">
                  <span className="reach-indicator" />
                  <span className="reach-text">{pkg.reach}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor Analytics Dashboard Preview */}
        <div className="dashboard-preview-wrapper fade-up">
          <div className="dashboard-header">
            <div className="db-title-group">
              <span className="db-icon">📊</span>
              <div>
                <h3 className="db-title">Sponsor Analytics Dashboard</h3>
                <p className="db-desc">Real-time engagement tracking, ROI conversion reports, and campaign analytics.</p>
              </div>
            </div>
            <span className="db-live-indicator"><span className="live-pulse-dot" />LIVE CAMPAIGN</span>
          </div>

          <div className="dashboard-body">
            {/* Left Col: KPI metrics grid */}
            <div className="db-metrics-column">
              {[
                { label: 'Campaign Impressions', value: '48.9M', change: '+24.5%', positive: true },
                { label: 'Interactive CTR', value: '8.92%', change: '+1.8%', positive: true },
                { label: 'Direct Conversions', value: '142.4K', change: '+12.4%', positive: true },
                { label: 'Avg. Engagement Time', value: '4m 18s', change: '+42s', positive: true },
              ].map((kpi) => (
                <div key={kpi.label} className="db-kpi-card">
                  <span className="kpi-label">{kpi.label}</span>
                  <span className="kpi-value">{kpi.value}</span>
                  <span className={`kpi-change ${kpi.positive ? 'pos' : 'neg'}`}>
                    {kpi.positive ? '↑' : '↓'} {kpi.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Col: Graphical performance simulator */}
            <div className="db-chart-column">
              <div className="chart-header">
                <span className="chart-label">Engagement Spike (Live Match Hours)</span>
                <span className="chart-legend">📈 Conversion Index</span>
              </div>
              <div className="chart-visual">
                {/* Simulated CSS bars chart */}
                <div className="bar-chart-bars">
                  {[45, 65, 55, 85, 70, 95, 80, 100, 75, 90, 85, 95].map((height, i) => (
                    <div key={i} className="chart-bar-container">
                      <div className="chart-bar-fill" style={{ height: `${height}%` }}>
                        <div className="bar-hover-val">{Math.round(height * 2.4)}K</div>
                      </div>
                      <span className="chart-bar-lbl">{i + 1}H</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="dashboard-footer-ctas">
            <button className="btn btn-primary btn-lg" id="sponsors-partner-btn">
              Become a Sponsor 🤝
            </button>
            <button className="btn btn-outline" id="sponsors-media-btn">
              Download Media Kit 📄
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
