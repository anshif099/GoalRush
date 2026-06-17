import { useEffect, useRef } from 'react';
import './Hero.css';

const FLOAT_BADGES = [
  { emoji: '⚽', label: 'Penalty Challenge', color: 'blue', pos: 'top-left' },
  { emoji: '🎯', label: 'Target Kick', color: 'red', pos: 'top-right' },
  { emoji: '🏆', label: 'Daily Rewards', color: 'gold', pos: 'bottom-left' },
  { emoji: '🔥', label: 'Live Competitions', color: 'green', pos: 'bottom-right' },
];

const LIVE_SCORES = [
  { home: 'BRA', homeScore: 2, away: 'ARG', awayScore: 1, status: 'LIVE 72\'', homeFlag: '🇧🇷', awayFlag: '🇦🇷' },
  { home: 'ENG', homeScore: 1, away: 'FRA', awayScore: 1, status: 'LIVE 58\'', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇫🇷' },
];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const orbs = heroRef.current.querySelectorAll('.hero-orb');
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 8;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Animated gradient background */}
      <div className="hero-bg">
        <div className="hero-orb orb-blue" />
        <div className="hero-orb orb-red" />
        <div className="hero-orb orb-green" />
        <div className="hero-grid" />
      </div>

      {/* Ticker */}
      <div className="hero-ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="ticker-content">
              🏆 FIFA World Cup 2026 &nbsp;•&nbsp; ⚽ 500M+ Active Fans &nbsp;•&nbsp; 🎯 Daily Challenges &nbsp;•&nbsp; 🔥 Live Match Predictions &nbsp;•&nbsp; 🥇 Win Real Rewards &nbsp;•&nbsp; 🌍 50+ Sporting Events &nbsp;•&nbsp; 🎮 Play & Earn &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="section-tag fade-up">
            <span className="tag-dot" />
            🌍 Global Sports Platform 2026
          </div>

          <h1 className="hero-headline fade-up fade-up-delay-1">
            THE FAN <span className="text-gradient-blue">ENGAGEMENT</span>{' '}
            ENGINE FOR <span className="text-gradient-red">GLOBAL</span>{' '}
            <span className="text-gradient-green">SPORTS</span>
          </h1>

          <p className="hero-subheadline fade-up fade-up-delay-2">
            Play daily challenges, predict matches, earn rewards, compete with friends,
            and experience every sporting event like never before.
          </p>

          <div className="hero-ctas fade-up fade-up-delay-3">
            <button className="btn btn-primary btn-lg" id="hero-play-now-btn">
              <span>▶</span> Play Now
            </button>
            <button className="btn btn-gold btn-lg" id="hero-sponsor-btn">
              🤝 Become a Sponsor
            </button>
          </div>

          {/* Social Proof */}
          <div className="hero-social-proof fade-up fade-up-delay-4">
            <div className="avatar-stack">
              {['🧑', '👩', '👦', '🧔', '👱'].map((a, i) => (
                <span key={i} className="avatar-item" style={{ '--i': i }}>{a}</span>
              ))}
            </div>
            <p className="proof-text">
              <strong>10M+ fans</strong> already competing worldwide
            </p>
          </div>
        </div>

        {/* Right: Visual Showcase */}
        <div className="hero-visual">
          {/* Trophy Center Piece */}
          <div className="trophy-container animate-float-slow">
            <div className="trophy-glow" />
            <div className="trophy-emoji">🏆</div>
            <div className="trophy-ring ring-1" />
            <div className="trophy-ring ring-2" />
            <div className="trophy-ring ring-3" />
          </div>

          {/* Floating UI Cards */}
          <div className="float-badges">
            {FLOAT_BADGES.map(({ emoji, label, color, pos }) => (
              <div key={label} className={`float-badge badge-${color} badge-${pos} animate-float-delay-${FLOAT_BADGES.indexOf({ emoji, label, color, pos }) + 1}`}>
                <span className="badge-emoji">{emoji}</span>
                <span className="badge-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Live Score Cards */}
          <div className="live-score-stack">
            {LIVE_SCORES.map((match, i) => (
              <div key={i} className={`live-score-card animate-float-delay-${i + 1}`} style={{ '--delay': `${i * 0.3}s` }}>
                <div className="live-badge">
                  <span className="live-dot" />
                  {match.status}
                </div>
                <div className="match-teams">
                  <span className="team">{match.homeFlag} {match.home}</span>
                  <span className="score">{match.homeScore} – {match.awayScore}</span>
                  <span className="team">{match.away} {match.awayFlag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* XP / Leaderboard Card */}
          <div className="leaderboard-card animate-float">
            <div className="lb-header">
              <span>🥇 Leaderboard</span>
              <span className="lb-live">LIVE</span>
            </div>
            <div className="lb-entries">
              {[
                { rank: 1, name: 'AlexStrike', xp: '12,450', flag: '🇧🇷' },
                { rank: 2, name: 'GoalMaster', xp: '11,820', flag: '🇬🇧' },
                { rank: 3, name: 'KingFan99', xp: '10,990', flag: '🇩🇪' },
              ].map(({ rank, name, xp, flag }) => (
                <div key={rank} className="lb-row">
                  <span className={`lb-rank rank-${rank}`}>#{rank}</span>
                  <span className="lb-flag">{flag}</span>
                  <span className="lb-name">{name}</span>
                  <span className="lb-xp">{xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Card */}
          <div className="prediction-card animate-float-delay-2">
            <div className="pred-title">🎯 Today&apos;s Prediction</div>
            <div className="pred-match">Brazil vs Argentina</div>
            <div className="pred-options">
              <button className="pred-btn pred-home">BRA Win</button>
              <button className="pred-btn pred-draw">Draw</button>
              <button className="pred-btn pred-away">ARG Win</button>
            </div>
            <div className="pred-coins">💰 Win up to 500 coins!</div>
          </div>

          {/* Coins Reward Badge */}
          <div className="coins-badge animate-float-delay-3">
            <span className="coins-emoji">🪙</span>
            <div>
              <div className="coins-amount">+250</div>
              <div className="coins-label">Coins Earned!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80V40C180 0 360 60 540 40S900 0 1080 40 1260 80 1440 40V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
