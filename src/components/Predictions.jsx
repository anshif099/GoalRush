import { useState } from 'react';
import './Predictions.css';

const PREDICTION_CARDS = [
  {
    id: 'winner',
    title: 'Winner Prediction',
    desc: 'Pick the match winner at full time.',
    rewardXP: 100,
    rewardCoins: 150,
    type: 'select-team',
  },
  {
    id: 'score',
    title: 'Score Prediction',
    desc: 'Predict the exact final scoreline.',
    rewardXP: 300,
    rewardCoins: 500,
    type: 'score-counter',
  },
  {
    id: 'first-scorer',
    title: 'First Goal Scorer',
    desc: 'Name the player to score the first goal.',
    rewardXP: 250,
    rewardCoins: 400,
    type: 'select-player',
  },
  {
    id: 'possession',
    title: 'Possession %',
    desc: 'Predict the ball possession share range.',
    rewardXP: 150,
    rewardCoins: 200,
    type: 'slider-percent',
  },
  {
    id: 'penalties',
    title: 'Penalty Count',
    desc: 'Estimate total penalties awarded.',
    rewardXP: 200,
    rewardCoins: 300,
    type: 'penalty-selector',
  },
  {
    id: 'motm',
    title: 'Man of the Match',
    desc: 'Predict the official Man of the Match.',
    rewardXP: 220,
    rewardCoins: 350,
    type: 'motm-list',
  },
];

export default function Predictions() {
  const [selections, setSelections] = useState({
    winner: null,
    scoreHome: 0,
    scoreAway: 0,
    firstScorer: '',
    possession: 50,
    penalties: null,
    motm: '',
  });

  const [locked, setLocked] = useState({
    winner: false,
    score: false,
    'first-scorer': false,
    possession: false,
    penalties: false,
    motm: false,
  });

  const handleSelectTeam = (team) => {
    if (locked.winner) return;
    setSelections(prev => ({ ...prev, winner: team }));
  };

  const adjustScore = (team, amount) => {
    if (locked.score) return;
    setSelections(prev => {
      const key = team === 'home' ? 'scoreHome' : 'scoreAway';
      const newVal = Math.max(0, prev[key] + amount);
      return { ...prev, [key]: newVal };
    });
  };

  const handleLock = (id) => {
    setLocked(prev => ({ ...prev, [id]: true }));
  };

  const handleUnlock = (id) => {
    setLocked(prev => ({ ...prev, [id]: false }));
  };

  return (
    <section id="predictions" className="predictions-section">
      {/* Animated Turf & Soccer Ball Element */}
      <div className="predictions-bg">
        <div className="turf-overlay" />
        <div className="floating-football animate-float" />
        <div className="floating-football animate-float-delay-2" />
        <div className="pred-bg-glow orb-blue" />
        <div className="pred-bg-glow orb-red" />
      </div>

      <div className="container">
        {/* Header Block */}
        <div className="pred-header fade-up">
          <div className="section-tag pred-tag">🔮 Match Predictor</div>
          <h2 className="section-title text-pred-glow">
            Predict Every <span className="text-gradient-gold">Match.</span>
          </h2>
          <p className="section-subtitle">
            Put your sports knowledge to the test. Lock in your predictions, earn points, and climb the leaderboard.
          </p>
        </div>

        {/* Live Fixture Bar */}
        <div className="live-fixture-bar fade-up">
          <div className="fixture-info">
            <span className="league-badge">FIFA WORLD CUP 2026</span>
            <span className="live-status pulse">LIVE IN 3 HOURS</span>
          </div>
          <div className="fixture-matchup">
            <div className="fixture-team">
              <span className="fixture-flag">🇺🇸</span>
              <span className="fixture-name">USA</span>
            </div>
            <div className="fixture-vs">VS</div>
            <div className="fixture-team">
              <span className="fixture-name">ENGLAND</span>
              <span className="fixture-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
            </div>
          </div>
        </div>

        {/* Prediction Cards Grid */}
        <div className="pred-grid">
          {PREDICTION_CARDS.map((card, idx) => {
            const isLocked = locked[card.id];
            const delayClass = `fade-up-delay-${(idx % 3) + 1}`;

            return (
              <div 
                key={card.id} 
                className={`pred-card ${isLocked ? 'pred-card-locked' : ''} fade-up ${delayClass}`}
              >
                {/* Locking overlay */}
                {isLocked && (
                  <div className="lock-overlay">
                    <span className="lock-icon">🔒</span>
                    <span className="lock-text">Prediction Saved</span>
                    <button className="unlock-btn" onClick={() => handleUnlock(card.id)}>
                      Edit Prediction
                    </button>
                  </div>
                )}

                <div className="pred-card-header">
                  <h3 className="pred-card-title">{card.title}</h3>
                  <p className="pred-card-desc">{card.desc}</p>
                </div>

                {/* Interactive Inner Content based on type */}
                <div className="pred-card-body">
                  {card.type === 'select-team' && (
                    <div className="team-select-wrapper">
                      <button 
                        className={`team-btn ${selections.winner === 'USA' ? 'active' : ''}`}
                        onClick={() => handleSelectTeam('USA')}
                      >
                        🇺🇸 USA
                      </button>
                      <button 
                        className={`team-btn ${selections.winner === 'DRAW' ? 'active' : ''}`}
                        onClick={() => handleSelectTeam('DRAW')}
                      >
                        🤝 DRAW
                      </button>
                      <button 
                        className={`team-btn ${selections.winner === 'ENGLAND' ? 'active' : ''}`}
                        onClick={() => handleSelectTeam('ENGLAND')}
                      >
                        🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG
                      </button>
                    </div>
                  )}

                  {card.type === 'score-counter' && (
                    <div className="score-counter-wrapper">
                      <div className="counter-col">
                        <span className="team-lbl">USA</span>
                        <div className="counter-controls">
                          <button className="ctrl-btn" onClick={() => adjustScore('home', -1)}>-</button>
                          <span className="ctrl-val">{selections.scoreHome}</span>
                          <button className="ctrl-btn" onClick={() => adjustScore('home', 1)}>+</button>
                        </div>
                      </div>
                      <div className="score-vs">:</div>
                      <div className="counter-col">
                        <span className="team-lbl">ENG</span>
                        <div className="counter-controls">
                          <button className="ctrl-btn" onClick={() => adjustScore('away', -1)}>-</button>
                          <span className="ctrl-val">{selections.scoreAway}</span>
                          <button className="ctrl-btn" onClick={() => adjustScore('away', 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {card.type === 'select-player' && (
                    <div className="player-select-wrapper">
                      <select 
                        className="player-select-dropdown"
                        value={selections.firstScorer}
                        onChange={(e) => setSelections(prev => ({ ...prev, firstScorer: e.target.value }))}
                      >
                        <option value="">Select Scorer</option>
                        <option value="Christian Pulisic">Christian Pulisic (USA)</option>
                        <option value="Harry Kane">Harry Kane (ENG)</option>
                        <option value="Bukayo Saka">Bukayo Saka (ENG)</option>
                        <option value="Timothy Weah">Timothy Weah (USA)</option>
                        <option value="Jude Bellingham">J Jude Bellingham (ENG)</option>
                      </select>
                    </div>
                  )}

                  {card.type === 'slider-percent' && (
                    <div className="slider-percent-wrapper">
                      <div className="slider-labels">
                        <span>USA: {selections.possession}%</span>
                        <span>ENG: {100 - selections.possession}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="80" 
                        value={selections.possession} 
                        className="slider-input" 
                        onChange={(e) => setSelections(prev => ({ ...prev, possession: parseInt(e.target.value) }))}
                      />
                    </div>
                  )}

                  {card.type === 'penalty-selector' && (
                    <div className="penalty-selector-wrapper">
                      {[0, 1, '2+'].map(val => (
                        <button 
                          key={val} 
                          className={`team-btn ${selections.penalties === val ? 'active' : ''}`}
                          onClick={() => setSelections(prev => ({ ...prev, penalties: val }))}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  )}

                  {card.type === 'motm-list' && (
                    <div className="motm-select-wrapper">
                      <select 
                        className="player-select-dropdown"
                        value={selections.motm}
                        onChange={(e) => setSelections(prev => ({ ...prev, motm: e.target.value }))}
                      >
                        <option value="">Select MOTM</option>
                        <option value="Christian Pulisic">Christian Pulisic (USA)</option>
                        <option value="Harry Kane">Harry Kane (ENG)</option>
                        <option value="Jude Bellingham">Jude Bellingham (ENG)</option>
                        <option value="Tyler Adams">Tyler Adams (USA)</option>
                        <option value="Matt Turner">Matt Turner (USA)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Footer and Rewards */}
                <div className="pred-card-footer">
                  <div className="pred-rewards">
                    <span className="pred-reward xp">⚡ +{card.rewardXP} XP</span>
                    <span className="pred-reward coins">🪙 +{card.rewardCoins} COINS</span>
                  </div>
                  <button className="btn btn-pred-lock" onClick={() => handleLock(card.id)}>
                    Lock Prediction
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
