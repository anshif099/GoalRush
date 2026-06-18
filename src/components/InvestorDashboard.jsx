import { useState } from 'react';
import './InvestorDashboard.css';

export default function InvestorDashboard() {
  const [projectionMonth, setProjectionMonth] = useState(6); // Default to 6 Month target

  // Calculate values dynamically based on selected slider month (1 to 6)
  const calculateMetric = (start, end, suffix, decimals = 0) => {
    const progress = (projectionMonth - 1) / 5; // 0 to 1
    const current = start + (end - start) * progress;
    return `${current.toFixed(decimals)}${suffix}`;
  };

  // Dedicated math for metrics
  const registeredUsers = calculateMetric(2, 10, 'M+');
  const dailyActiveUsers = calculateMetric(0.5, 4, 'M+', 1);
  const sponsorImpressions = calculateMetric(100, 1000, 'M+'); // 1B at month 6 (1000M)
  const revenue = calculateMetric(5, 40, ' Cr+');

  return (
    <section id="investor-projections" className="investor-section">
      <div className="investor-bg">
        <div className="investor-orb-top" />
        <div className="investor-orb-bottom" />
      </div>

      <div className="container">
        {/* Header Block */}
        <div className="investor-header fade-up">
          <div className="section-tag investor-tag">📈 Growth & Scalability</div>
          <h2 className="section-title">
            6 Month <span className="text-gradient-gold">Campaign Projections</span>
          </h2>
          <p className="section-subtitle">
            Explore Goal Rush's projected user metrics, impression growth, and revenue pipeline over our upcoming 6-month scale-up roadmap.
          </p>
        </div>

        {/* Console Dashboard Slider */}
        <div className="investor-console-card fade-up">
          <div className="console-header-bar">
            <span className="console-title-text">📊 INVESTOR FORECAST SIMULATOR</span>
            <div className="live-badge-wrap">
              <span className="live-dot" /> PROJECTED DATA
            </div>
          </div>

          <div className="console-slider-section">
            <div className="slider-meta">
              <span className="timeline-lbl">CHOOSE TIMELINE:</span>
              <span className="month-highlight">Month {projectionMonth} Target</span>
            </div>
            
            {/* Custom Interactive Slider */}
            <div className="custom-slider-container">
              <input 
                type="range" 
                min="1" 
                max="6" 
                value={projectionMonth} 
                className="investor-range-input" 

                // Yes, setProjectionMonth is correct.
                onChange={(e) => setProjectionMonth(parseInt(e.target.value))}
              />
              <div className="slider-ticks">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button 
                    key={num}
                    className={`tick-btn ${projectionMonth === num ? 'active' : ''}`}
                    onClick={() => setProjectionMonth(num)}
                  >
                    M{num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Card 1: Registered Users */}
            <div className="dash-card card-users">
              <div className="card-top">
                <span className="card-icon">👥</span>
                <span className="card-lbl">REGISTERED USERS</span>
              </div>
              <div className="card-trend-wrap">
                <div className="trend-number">{projectionMonth === 6 ? '10M+' : registeredUsers}</div>
                <div className="trend-bar-track">
                  <div className="trend-bar-fill" style={{ width: `${(projectionMonth / 6) * 100}%` }} />
                </div>
              </div>
              <div className="card-footer-stats">
                <span>Start: 2M</span>
                <span>Target: 10M+</span>
              </div>
            </div>

            {/* Card 2: Daily Active Users */}
            <div className="dash-card card-dau">
              <div className="card-top">
                <span className="card-icon">⚡</span>
                <span className="card-lbl">DAILY ACTIVE USERS</span>
              </div>
              <div className="card-trend-wrap">
                <div className="trend-number">{projectionMonth === 6 ? '4M+' : dailyActiveUsers}</div>
                <div className="trend-bar-track">
                  <div className="trend-bar-fill" style={{ width: `${(projectionMonth / 6) * 100}%` }} />
                </div>
              </div>
              <div className="card-footer-stats">
                <span>Start: 500K</span>
                <span>Target: 4M+</span>
              </div>
            </div>

            {/* Card 3: Sponsor Impressions */}
            <div className="dash-card card-impressions">
              <div className="card-top">
                <span className="card-icon">📡</span>
                <span className="card-lbl">SPONSOR IMPRESSIONS</span>
              </div>
              <div className="card-trend-wrap">
                <div className="trend-number">
                  {projectionMonth === 6 ? '1B+' : (projectionMonth === 1 ? '100M' : sponsorImpressions)}
                </div>
                <div className="trend-bar-track">
                  <div className="trend-bar-fill" style={{ width: `${(projectionMonth / 6) * 100}%` }} />
                </div>
              </div>
              <div className="card-footer-stats">
                <span>Start: 100M</span>
                <span>Target: 1B+</span>
              </div>
            </div>

            {/* Card 4: Revenue */}
            <div className="dash-card card-revenue">
              <div className="card-top">
                <span className="card-icon">₹</span>
                <span className="card-lbl">PROJECTED REVENUE</span>
              </div>
              <div className="card-trend-wrap">
                <div className="trend-number">{projectionMonth === 6 ? '₹40 Cr+' : `₹${revenue}`}</div>
                <div className="trend-bar-track">
                  <div className="trend-bar-fill" style={{ width: `${(projectionMonth / 6) * 100}%` }} />
                </div>
              </div>
              <div className="card-footer-stats">
                <span>Start: ₹5 Cr</span>
                <span>Target: ₹40 Cr+</span>
              </div>
            </div>
          </div>

          {/* Investor CTA Row */}
          <div className="dashboard-cta-footer">
            <p>Interested in our strategic expansion round? Connect with our investor relations team.</p>
            <div className="download-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  window.open('https://play.google.com/store/apps/details?id=com.goalrush.app', '_blank');
                  window.location.hash = '#register';
                }}
              >
                Android 📱
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  window.open('https://apps.apple.com/app/goalrush/id123456789', '_blank');
                  window.location.hash = '#register';
                }}
              >
                iOS 🍎
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  // Desktop web version – direct to register page
                  window.location.hash = '#register';
                }}
              >
                Desktop 💻
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
