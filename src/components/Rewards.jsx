import './Rewards.css';

const REWARD_TIERS = [
  {
    tier: 'Bronze Fan',
    icon: '🥉',
    xpRange: '0 – 2,000 XP',
    perks: ['Daily coin bonuses', 'Exclusive avatar frames', 'Community badge'],
    color: '#cd7f32',
    bgColor: 'rgba(205, 127, 50, 0.08)',
  },
  {
    tier: 'Silver Fan',
    icon: '🥈',
    xpRange: '2,001 – 8,000 XP',
    perks: ['2x coin multiplier', 'Exclusive challenges', 'Brand discount codes', 'Priority leaderboard'],
    color: '#9AA5B8',
    bgColor: 'rgba(154, 165, 184, 0.08)',
    featured: false,
  },
  {
    tier: 'Gold Fan',
    icon: '🥇',
    xpRange: '8,001 – 20,000 XP',
    perks: ['5x coin multiplier', 'Real merchandise', 'VIP match experiences', 'Sponsor meet & greets', 'Early access features'],
    color: '#D4AF37',
    bgColor: 'rgba(212, 175, 55, 0.1)',
    featured: true,
  },
  {
    tier: 'Legend',
    icon: '👑',
    xpRange: '20,001+ XP',
    perks: ['10x coin multiplier', 'Match tickets', 'Exclusive NFT trophies', 'Brand ambassador deals', 'Annual gala invite'],
    color: '#0047AB',
    bgColor: 'rgba(0, 71, 171, 0.08)',
  },
];

export default function Rewards() {
  return (
    <section id="rewards" className="rewards-section">
      <div className="rewards-bg-gradient" />

      <div className="container">
        <div className="rewards-header fade-up">
          <div className="section-tag" style={{ background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.3)', color: '#7a5a00' }}>
            🪙 Rewards Program
          </div>
          <h2 className="section-title">
            The More You Play, <br />the More You <span className="text-gradient-gold">Win</span>
          </h2>
          <p className="section-subtitle">
            Four fan tiers. Real rewards. Real experiences. Earn your way to the top.
          </p>
        </div>

        <div className="rewards-grid">
          {REWARD_TIERS.map((tier, i) => (
            <div
              key={tier.tier}
              className={`reward-card ${tier.featured ? 'reward-featured' : ''} fade-up fade-up-delay-${i + 1}`}
              style={{ '--tier-color': tier.color, '--tier-bg': tier.bgColor }}
            >
              {tier.featured && <div className="featured-badge">⭐ Most Popular</div>}

              <div className="tier-icon">{tier.icon}</div>
              <div className="tier-name" style={{ color: tier.color }}>{tier.tier}</div>
              <div className="tier-xp">{tier.xpRange}</div>

              <ul className="tier-perks">
                {tier.perks.map(perk => (
                  <li key={perk} className="tier-perk">
                    <span className="perk-check">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${tier.featured ? 'btn-gold' : 'btn-outline'} btn-sm tier-btn`}
                style={!tier.featured ? { color: tier.color, borderColor: `${tier.color}40` } : {}}
                id={`tier-${tier.tier.toLowerCase().replace(/\s+/g, '-')}-btn`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Reward Visual Strip */}
        <div className="rewards-strip fade-up">
          {['🪙', '🏆', '👕', '🎟️', '📱', '🍕', '✈️', '⚽'].map((emoji, i) => (
            <div key={i} className="strip-item" style={{ animationDelay: `${i * 0.15}s` }}>
              <span>{emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
