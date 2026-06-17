import { useState, useEffect } from 'react';
import './AIPersonalization.css';

const MOCK_PROFILES = [
  {
    id: 'brazil',
    label: '🇧🇷 Brazil Fan',
    focus: 'Brazil Challenges',
    persona: 'Yellow & Green Enthusiast',
    matchAccuracy: '98.4%',
    cards: [
      {
        title: 'Samba Skill Challenge',
        desc: 'Predict Neymar Jr dribbles, key passes, and shooting accuracy for the match against Argentina.',
        reward: '⚡ +500 XP | 🪙 +250 Coins',
        category: 'GAMEPLAY CHALLENGE',
        aiReason: 'Recommended based on your support for Seleção Brasileira.',
      },
      {
        title: 'Seleção Trivia Quest',
        desc: 'Unlock special rewards by scoring 10/10 on the 1970 and 2002 World Cup championship rosters.',
        reward: '🎟️ 1x Gold Ticket',
        category: 'TRIVIA CHALLENGE',
        aiReason: 'Matched to your high historical trivia engagement score.',
      },
    ],
  },
  {
    id: 'messi',
    label: '🐐 Messi Fan',
    focus: 'Messi Challenges',
    persona: 'GOAT Statisticians Club',
    matchAccuracy: '99.1%',
    cards: [
      {
        title: 'The GOAT Assist Predictor',
        desc: 'Will Messi assist or score in the first 30 minutes of Inter Miami vs LAFC? Lock in your answer.',
        reward: '⚡ +800 XP | 🪙 +400 Coins',
        category: 'LIVE PREDICTION',
        aiReason: 'Matched due to your 100% participation in previous Messi fixtures.',
      },
      {
        title: 'Camp Nou to Florida Trivia',
        desc: 'Answer rapid-fire questions about Lionel Messi\'s career records, balloon d\'or wins, and club trophies.',
        reward: '🏅 Exclusive GOAT Badge',
        category: 'TRIVIA CHALLENGE',
        aiReason: 'High match confidence based on your unlocked badges.',
      },
    ],
  },
  {
    id: 'arsenal',
    label: '🔴 Arsenal Fan',
    focus: 'Arsenal Predictions',
    persona: 'North London Tactician',
    matchAccuracy: '97.5%',
    cards: [
      {
        title: 'Derby Scoreline Predictor',
        desc: 'Arsenal vs Tottenham. Predict the exact full-time score, card count, and first goal scorer.',
        reward: '⚡ +1,200 XP | 🪙 +600 Coins',
        category: 'FIXTURE PREDICTION',
        aiReason: 'High priority match recommendation based on your favorited club: Arsenal.',
      },
      {
        title: 'Gunners Stats Engine',
        desc: 'Estimate Saka\'s crosses completed and Arsenal\'s clean-sheet probability against Chelsea.',
        reward: '🪙 +300 Coins',
        category: 'FANTASY INSIGHTS',
        aiReason: 'Recommended due to your preference for key midfielder stats.',
      },
    ],
  },
];

export default function AIPersonalization() {
  const [activeProfile, setActiveProfile] = useState('brazil');
  const [isScanning, setIsScanning] = useState(false);
  const [displayedProfile, setDisplayedProfile] = useState(MOCK_PROFILES[0]);

  const selectProfile = (profileId) => {
    if (profileId === activeProfile) return;
    setIsScanning(true);
    setActiveProfile(profileId);
  };

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        const found = MOCK_PROFILES.find(p => p.id === activeProfile);
        setDisplayedProfile(found);
        setIsScanning(false);
      }, 900); // 900ms mock scan animation
      return () => clearTimeout(timer);
    }
  }, [activeProfile, isScanning]);

  return (
    <section id="ai-personalization" className="ai-section">
      {/* Sci-fi holographic grid */}
      <div className="ai-mesh-bg">
        <div className="ai-pulse-ring ring-1" />
        <div className="ai-pulse-ring ring-2" />
        <div className="ai-digital-grid" />
      </div>

      <div className="container">
        <div className="ai-header fade-up">
          <div className="section-tag ai-tag">🧠 Neural Personalization</div>
          <h2 className="section-title text-ai-glow">
            Every Fan Gets A <span className="text-gradient-purple">Personalized Experience</span>
          </h2>
          <p className="section-subtitle">
            Goal Rush's AI engine analyzes your behavior, preferences, and support patterns to generate customized feeds and challenges instantly.
          </p>
        </div>

        {/* Profile Selector Console */}
        <div className="ai-console fade-up">
          <div className="console-header">
            <span className="console-title">🤖 AI PROFILE SELECTOR CONSOLE</span>
            <div className="console-leds">
              <span className={`led-green ${isScanning ? 'pulse' : ''}`} />
              <span className="led-blue" />
            </div>
          </div>

          <div className="console-body">
            <div className="profile-tabs-wrapper">
              <span className="profile-select-lbl">SIMULATE FAN BIOMETRICS:</span>
              <div className="profile-tabs">
                {MOCK_PROFILES.map(prof => (
                  <button
                    key={prof.id}
                    className={`profile-tab ${activeProfile === prof.id ? 'active' : ''}`}
                    onClick={() => selectProfile(prof.id)}
                  >
                    {prof.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Scanner Overlay */}
            <div className="scanner-container">
              {isScanning ? (
                <div className="neural-scanner">
                  <div className="scan-line" />
                  <div className="scan-text">SCANNING FAN DNA... ALIGNING INTEREST MATRIX...</div>
                </div>
              ) : (
                <div className="scanner-result-bar">
                  <div className="result-kpi">
                    <span className="kpi-lbl">MATCH RATING:</span>
                    <span className="kpi-val val-green">{displayedProfile.matchAccuracy}</span>
                  </div>
                  <div className="result-kpi">
                    <span className="kpi-lbl">TARGET OUTLET:</span>
                    <span className="kpi-val val-purple">{displayedProfile.focus}</span>
                  </div>
                  <div className="result-kpi">
                    <span className="kpi-lbl">SEGMENT:</span>
                    <span className="kpi-val val-cyan">{displayedProfile.persona}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation Cards */}
        <div className="ai-recommendations-grid">
          {displayedProfile.cards.map((card, idx) => (
            <div
              key={card.title}
              className={`ai-rec-card fade-up fade-up-delay-${idx + 1} ${isScanning ? 'card-loading' : ''}`}
            >
              {/* Card glowing border */}
              <div className="rec-card-border" />
              
              <div className="rec-card-inner">
                {/* AI Badge */}
                <div className="rec-card-top">
                  <span className="rec-badge">{card.category}</span>
                  <span className="ai-confidence-badge">🤖 99% AI Match</span>
                </div>

                <h3 className="rec-card-title">{card.title}</h3>
                <p className="rec-card-desc">{card.desc}</p>

                {/* AI Rationale tag */}
                <div className="ai-rationale-box">
                  <div className="rationale-spark">✨</div>
                  <p className="rationale-text">{card.aiReason}</p>
                </div>

                {/* Card Footer */}
                <div className="rec-card-footer">
                  <div className="rec-reward-wrap">
                    <span className="rec-reward-lbl">REWARDS ON COMPLETION:</span>
                    <span className="rec-reward-val">{card.reward}</span>
                  </div>
                  <button className="btn btn-rec-action" id={`ai-challenge-${idx}-btn`}>
                    ACCEPT CHALLENGE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
