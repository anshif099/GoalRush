import { useEffect, useRef } from 'react';
import './PlatformFeatures.css';

const PLATFORM_FEATURES = [
  {
    id: 'feat-daily-challenges',
    icon: '🎮',
    title: 'Daily Challenges',
    desc: 'Play new sports games every day.',
    colorClass: 'plat-blue',
    accentColor: '#0047AB',
    glowGradient: 'linear-gradient(135deg, #0047AB, #0066FF)',
  },
  {
    id: 'feat-match-predictions',
    icon: '🎯',
    title: 'Match Predictions',
    desc: 'Predict scores, winners and player performances.',
    colorClass: 'plat-red',
    accentColor: '#E10613',
    glowGradient: 'linear-gradient(135deg, #E10613, #FF4D5A)',
  },
  {
    id: 'feat-rewards-marketplace',
    icon: '🪙',
    title: 'Rewards Marketplace',
    desc: 'Redeem points for real rewards.',
    colorClass: 'plat-gold',
    accentColor: '#D4AF37',
    glowGradient: 'linear-gradient(135deg, #D4AF37, #F5D65E)',
  },
  {
    id: 'feat-referral-engine',
    icon: '🚀',
    title: 'Referral Engine',
    desc: 'Invite friends and unlock exclusive prizes.',
    colorClass: 'plat-green',
    accentColor: '#00A651',
    glowGradient: 'linear-gradient(135deg, #00A651, #00D068)',
  },
  {
    id: 'feat-community-competitions',
    icon: '🏢',
    title: 'Community Competitions',
    desc: 'Compete by city, college, and company.',
    colorClass: 'plat-cyan',
    accentColor: '#00B4DB',
    glowGradient: 'linear-gradient(135deg, #00B4DB, #0083B0)',
  },
  {
    id: 'feat-sponsor-activations',
    icon: '🤝',
    title: 'Sponsor Activations',
    desc: 'Exclusive branded challenges and campaigns.',
    colorClass: 'plat-purple',
    accentColor: '#8E2DE2',
    glowGradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
  },
];

export default function PlatformFeatures() {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight cursor follow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // 3D Card Tilt math
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 10; // Max 10 degrees pitch
    const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 degrees yaw

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section id="platform-features" className="platform-features-section">
      {/* Decorative Orbs */}
      <div className="plat-bg-glows">
        <div className="plat-glow plat-glow-left" />
        <div className="plat-glow plat-glow-right" />
      </div>

      <div className="container">
        <div className="plat-header fade-up">
          <div className="section-tag">🏆 Engagement Engine</div>
          <h2 className="section-title">
            One Platform. <span className="text-gradient-brand">Every Fan.</span> Every Sport.
          </h2>
          <p className="section-subtitle">
            Experience the next generation of sports fan engagement. Play, predict, compete, and redeem.
          </p>
        </div>

        <div className="plat-grid">
          {PLATFORM_FEATURES.map((feat, index) => (
            <div
              key={feat.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`plat-card ${feat.colorClass} fade-up fade-up-delay-${(index % 3) + 1}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                '--accent-color': feat.accentColor,
                '--glow-gradient': feat.glowGradient,
              }}
            >
              {/* Spotlight Overlay */}
              <div className="plat-card-spotlight" />
              
              {/* Glowing Outline border */}
              <div className="plat-card-border" />

              <div className="plat-card-inner">
                {/* Icon Wrapper */}
                <div className="plat-icon-container">
                  <div className="plat-icon-glow" />
                  <span className="plat-card-icon" role="img" aria-label={feat.title}>
                    {feat.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="plat-card-content">
                  <h3 className="plat-card-title">{feat.title}</h3>
                  <p className="plat-card-desc">{feat.desc}</p>
                </div>

                {/* Action Arrow link lookalike */}
                <div className="plat-card-action">
                  <span className="action-text">Explore Feature</span>
                  <svg
                    className="action-arrow-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
