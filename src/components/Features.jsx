import './Features.css';

const FEATURES = [
  {
    icon: '⚽',
    title: 'Daily Challenges',
    desc: 'Complete match predictions, skill challenges, and trivia quizzes every day to rack up XP and climb the leaderboard.',
    color: 'blue',
    tags: ['Free to Play', 'Daily'],
  },
  {
    icon: '🎯',
    title: 'Match Prediction Engine',
    desc: 'Use real-time stats and AI-powered insights to make smart predictions across 50+ sporting events worldwide.',
    color: 'red',
    tags: ['AI Powered', 'Real-Time'],
  },
  {
    icon: '🏆',
    title: 'Rewards & Prizes',
    desc: 'Earn coins, XP badges, exclusive merchandise, and real-world prizes from top sponsor brands.',
    color: 'gold',
    tags: ['Real Prizes', 'Sponsor Backed'],
  },
  {
    icon: '🌍',
    title: 'Global Leaderboards',
    desc: 'Compete with millions of fans worldwide. Local, national, and global leaderboards with weekly resets.',
    color: 'green',
    tags: ['10M+ Players', 'Weekly Reset'],
  },
  {
    icon: '📡',
    title: 'Live Score Integration',
    desc: 'Get real-time scores, match updates, and live statistics from leagues around the world, all in one platform.',
    color: 'blue',
    tags: ['Live Data', '50+ Leagues'],
  },
  {
    icon: '🤝',
    title: 'Sponsor Activations',
    desc: 'Brands engage fans directly with custom challenges, exclusive offers, and experiential campaigns built into gameplay.',
    color: 'red',
    tags: ['For Brands', 'Measurable ROI'],
  },
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="features-header fade-up">
          <div className="section-tag">⚡ Platform Features</div>
          <h2 className="section-title">
            Everything Fans & <span className="text-gradient-blue">Brands Need</span>
          </h2>
          <p className="section-subtitle">
            A complete sports engagement ecosystem — from daily challenges to global brand activations.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feat, i) => (
            <div key={feat.title} className={`feature-card feature-${feat.color} fade-up fade-up-delay-${(i % 3) + 1}`}>
              <div className={`feat-icon-wrap ficon-${feat.color}`}>
                <span className="feat-icon">{feat.icon}</span>
              </div>
              <div className="feat-body">
                <h3 className="feat-title">{feat.title}</h3>
                <p className="feat-desc">{feat.desc}</p>
                <div className="feat-tags">
                  {feat.tags.map(tag => (
                    <span key={tag} className={`feat-tag ftag-${feat.color}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="feat-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
