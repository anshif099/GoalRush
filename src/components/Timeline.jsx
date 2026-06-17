import './Timeline.css';

const TIMELINE_STEPS = [
  {
    step: 'Step 1',
    title: 'Register',
    desc: 'Create your free account and set up your profile in seconds to join the ultimate sports fan community.',
    icon: '📝',
    colorClass: 'time-blue',
  },
  {
    step: 'Step 2',
    title: 'Choose Favorites',
    desc: 'Select your favorite team, club, and player to customize your experience and get tailored challenges.',
    icon: '⚽',
    colorClass: 'time-red',
  },
  {
    step: 'Step 3',
    title: 'Play Daily Challenges',
    desc: 'Engage with daily trivia, quick score predictions, and interactive mini-games on every matchday.',
    icon: '🎮',
    colorClass: 'time-green',
  },
  {
    step: 'Step 4',
    title: 'Earn XP & Coins',
    desc: 'Rack up experience points (XP), premium coins, and unlock exclusive virtual badges as you play.',
    icon: '🪙',
    colorClass: 'time-gold',
  },
  {
    step: 'Step 5',
    title: 'Redeem Rewards',
    desc: 'Spend your coins in the marketplace for real prizes, partner merchandise, match tickets, and digital collectibles.',
    icon: '🎁',
    colorClass: 'time-cyan',
  },
  {
    step: 'Step 6',
    title: 'Climb Leaderboards',
    desc: 'Compete against rival fans by city, college, or company, and see if you can claim the top global spot.',
    icon: '🏆',
    colorClass: 'time-purple',
  },
];

export default function Timeline() {
  return (
    <section id="how-it-works" className="timeline-section">
      <div className="container">
        <div className="timeline-header fade-up">
          <div className="section-tag">🏁 Getting Started</div>
          <h2 className="section-title">
            How <span className="text-gradient-blue">Goal Rush</span> Works
          </h2>
          <p className="section-subtitle">
            Follow these simple steps to start playing, predicting, and winning real-world prizes.
          </p>
        </div>

        <div className="timeline-wrapper">
          {/* Vertical central path */}
          <div className="timeline-center-line">
            <div className="timeline-progress-line" />
          </div>

          <div className="timeline-items">
            {TIMELINE_STEPS.map((item, index) => {
              const isEven = index % 2 === 0;
              const delayClass = `fade-up-delay-${(index % 3) + 1}`;
              
              return (
                <div 
                  key={item.step} 
                  className={`timeline-item ${isEven ? 'left-aligned' : 'right-aligned'} fade-up ${delayClass}`}
                >
                  {/* Anchor Node on the timeline */}
                  <div className={`timeline-node ${item.colorClass}`}>
                    <span className="node-icon">{item.icon}</span>
                  </div>

                  {/* Step Card Content */}
                  <div className="timeline-card">
                    <div className="card-glass-glow" />
                    <span className={`step-badge ${item.colorClass}`}>{item.step}</span>
                    <h3 className="step-title">{item.title}</h3>
                    <p className="step-desc">{item.desc}</p>
                    <div className="timeline-card-corner-glow" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
