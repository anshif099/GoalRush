import './Challenges.css';

const CHALLENGES = [
  {
    icon: '⚽',
    type: 'DAILY',
    title: 'Penalty Challenge',
    desc: 'Predict the outcome of 5 penalty kicks and score perfect to win big.',
    xp: '500 XP',
    coins: '250 Coins',
    players: '24,891',
    color: 'blue',
    timeLeft: '08:32:14',
    difficulty: 'Easy',
  },
  {
    icon: '🎯',
    type: 'LIVE',
    title: 'Golden Boot Race',
    desc: 'Predict who will score next in the Brazil vs Argentina showdown.',
    xp: '1,200 XP',
    coins: '800 Coins',
    players: '89,240',
    color: 'red',
    timeLeft: 'LIVE NOW',
    difficulty: 'Hard',
  },
  {
    icon: '🏟️',
    type: 'WEEKLY',
    title: 'Stadium Trivia',
    desc: 'Answer 10 questions about World Cup stadiums and football history.',
    xp: '750 XP',
    coins: '400 Coins',
    players: '12,334',
    color: 'green',
    timeLeft: '3 Days Left',
    difficulty: 'Medium',
  },
];

export default function Challenges() {
  return (
    <section id="challenges" className="challenges-section">
      <div className="challenges-bg">
        <div className="chall-orb-left" />
        <div className="chall-orb-right" />
      </div>

      <div className="container">
        <div className="challenges-header fade-up">
          <div className="section-tag" style={{ background: 'rgba(225,6,19,0.08)', borderColor: 'rgba(225,6,19,0.2)', color: 'var(--bright-red)' }}>
            🔥 Active Challenges
          </div>
          <h2 className="section-title">
            Win Every Day with <span className="text-gradient-red">Real Challenges</span>
          </h2>
          <p className="section-subtitle">
            Daily, weekly, and live challenges powered by real match data. Compete. Predict. Earn.
          </p>
        </div>

        <div className="challenges-grid">
          {CHALLENGES.map((ch, i) => (
            <div key={ch.title} className={`challenge-card chall-${ch.color} fade-up fade-up-delay-${i + 1}`}>
              <div className="chall-top">
                <div className={`chall-badge badge-type-${ch.color}`}>
                  {ch.timeLeft === 'LIVE NOW' ? <><span className="live-dot" />{ch.timeLeft}</> : ch.timeLeft}
                </div>
                <div className={`chall-difficulty diff-${ch.difficulty.toLowerCase()}`}>{ch.difficulty}</div>
              </div>

              <div className="chall-icon-wrap">
                <span className="chall-icon">{ch.icon}</span>
              </div>

              <div className="chall-type-label">{ch.type} CHALLENGE</div>
              <h3 className="chall-title">{ch.title}</h3>
              <p className="chall-desc">{ch.desc}</p>

              <div className="chall-rewards">
                <div className="reward-item">
                  <span className="reward-icon">⚡</span>
                  <span className="reward-value">{ch.xp}</span>
                </div>
                <div className="reward-item">
                  <span className="reward-icon">🪙</span>
                  <span className="reward-value">{ch.coins}</span>
                </div>
              </div>

              <div className="chall-footer">
                <span className="chall-players">👥 {ch.players} playing</span>
                <button className={`btn btn-sm chall-btn-${ch.color}`} id={`challenge-${ch.title.toLowerCase().replace(/\s+/g, '-')}-btn`}>
                  Play Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="challenges-cta fade-up">
          <p>Ready to compete with millions of fans?</p>
          <button className="btn btn-primary btn-lg" id="view-all-challenges-btn">
            View All Challenges 🏆
          </button>
        </div>
      </div>
    </section>
  );
}
