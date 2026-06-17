import { useState, useEffect, useRef } from 'react';
import './Challenges.css';

const CHALLENGES_DATA = [
  {
    id: 'score-penalties',
    icon: '⚽',
    title: 'Score 3 Penalties',
    desc: 'Take aim and beat the goalkeeper from the spot. Score 3 times to win.',
    xp: '600 XP',
    coins: '300 Coins',
    difficulty: 'Easy',
    color: 'cyan',
    accentColor: '#00f0ff',
  },
  {
    id: 'hit-target',
    icon: '🎯',
    title: 'Hit The Target',
    desc: 'Test your timing! Stop the moving indicator inside the target bullseye.',
    xp: '800 XP',
    coins: '400 Coins',
    difficulty: 'Medium',
    color: 'green',
    accentColor: '#39ff14',
  },
  {
    id: 'beat-goalkeeper',
    icon: '🧤',
    title: 'Beat The Goalkeeper',
    desc: 'Outsmart the keeper in a 1v1 duel. Pick your shot style wisely.',
    xp: '1,000 XP',
    coins: '600 Coins',
    difficulty: 'Hard',
    color: 'gold',
    accentColor: '#ffea00',
  },
  {
    id: 'sudden-death',
    icon: '🔥',
    title: 'Sudden Death Challenge',
    desc: 'High stakes! Answer the rapid-fire trivia question before time runs out.',
    xp: '1,500 XP',
    coins: '1,000 Coins',
    difficulty: 'Expert',
    color: 'red',
    accentColor: '#ff0055',
  },
];

const TRIVIA_QUESTIONS = [
  {
    question: "Which country has won the most FIFA World Cup trophies?",
    options: ["Germany", "Brazil", "Italy"],
    answer: 1, // Brazil
  },
  {
    question: "In which year was the first ever FIFA World Cup tournament held?",
    options: ["1930", "1954", "1966"],
    answer: 0, // 1930
  },
  {
    question: "Who is the all-time top goalscorer in FIFA World Cup history?",
    options: ["Pelé", "Miroslav Klose", "Lionel Messi"],
    answer: 1, // Miroslav Klose
  }
];

export default function Challenges() {
  const [activeGame, setActiveGame] = useState(null); // 'score-penalties' | 'hit-target' | etc.
  const [gameState, setGameState] = useState(null);
  const [triviaTimer, setTriviaTimer] = useState(10);
  const timerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer logic for Sudden Death trivia
  useEffect(() => {
    if (activeGame === 'sudden-death' && gameState && gameState.status === 'playing') {
      if (triviaTimer > 0) {
        timerRef.current = setTimeout(() => setTriviaTimer(prev => prev - 1), 1000);
      } else {
        setGameState(prev => ({ ...prev, status: 'lost', message: 'Time ran out! Better luck next time.' }));
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [activeGame, gameState, triviaTimer]);

  const startNewGame = (gameId) => {
    setActiveGame(gameId);
    if (timerRef.current) clearInterval(timerRef.current);

    if (gameId === 'score-penalties') {
      setGameState({
        scored: 0,
        missed: 0,
        shots: [],
        status: 'playing',
        message: 'Choose a target corner to take a penalty shot!',
      });
    } else if (gameId === 'hit-target') {
      setGameState({
        hits: 0,
        attempts: 0,
        status: 'playing',
        message: 'Click SHOOT when the moving bar aligns with the center target!',
        progress: 50,
        direction: 1,
      });
    } else if (gameId === 'beat-goalkeeper') {
      setGameState({
        status: 'playing',
        message: 'Choose your shooting style to outwit the goalkeeper!',
        result: null,
      });
    } else if (gameId === 'sudden-death') {
      const qIndex = Math.floor(Math.random() * TRIVIA_QUESTIONS.length);
      setTriviaTimer(10);
      setGameState({
        status: 'playing',
        questionIndex: qIndex,
        message: 'Question loaded. Pick the correct answer!',
      });
    }
  };

  const closeGame = () => {
    setActiveGame(null);
    setGameState(null);
  };

  // Game 1: Penalty Shootout Logic
  const handlePenaltyShot = (cornerName) => {
    if (!gameState || gameState.status !== 'playing') return;

    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    // Goalkeeper dives to a random corner
    const gkCorner = corners[Math.floor(Math.random() * corners.length)];
    const isGoal = cornerName !== gkCorner;

    const newScored = isGoal ? gameState.scored + 1 : gameState.scored;
    const newMissed = !isGoal ? gameState.missed + 1 : gameState.missed;
    const isWon = newScored >= 3;
    const isLost = newMissed >= 3;

    let gameStatus = 'playing';
    let msg = isGoal 
      ? `⚽ GOAL! You shot ${cornerName.replace('-', ' ')} and beat the keeper!` 
      : `🧤 SAVED! Goalkeeper guessed right and dove ${gkCorner.replace('-', ' ')}!`;

    if (isWon) {
      gameStatus = 'won';
      msg = '🏆 CHAMPION! You successfully scored 3 penalties and beat the keeper!';
    } else if (isLost) {
      gameStatus = 'lost';
      msg = '❌ DEFEAT! Goalkeeper blocked 3 shots. Practice makes perfect!';
    }

    setGameState(prev => ({
      ...prev,
      scored: newScored,
      missed: newMissed,
      status: gameStatus,
      message: msg,
      lastShot: { player: cornerName, keeper: gkCorner, goal: isGoal }
    }));
  };

  // Game 2: Hit The Target Loop simulation
  useEffect(() => {
    let animationFrame;
    if (activeGame === 'hit-target' && gameState && gameState.status === 'playing') {
      const updateSlider = () => {
        setGameState(prev => {
          if (!prev || prev.status !== 'playing') return prev;
          let nextProgress = prev.progress + (prev.direction * 3.5);
          let nextDirection = prev.direction;

          if (nextProgress >= 100) {
            nextProgress = 100;
            nextDirection = -1;
          } else if (nextProgress <= 0) {
            nextProgress = 0;
            nextDirection = 1;
          }

          return {
            ...prev,
            progress: nextProgress,
            direction: nextDirection,
          };
        });
        animationFrame = requestAnimationFrame(updateSlider);
      };
      animationFrame = requestAnimationFrame(updateSlider);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [activeGame, gameState?.status]);

  const handleTargetShoot = () => {
    if (!gameState || gameState.status !== 'playing') return;

    const currentVal = gameState.progress;
    // Target zone is the center: 43% to 57%
    const isHit = currentVal >= 42 && currentVal <= 58;

    const newHits = isHit ? gameState.hits + 1 : gameState.hits;
    const newAttempts = gameState.attempts + 1;
    const isWon = newHits >= 3;
    const isLost = newAttempts >= 5 && newHits < 3;

    let gameStatus = 'playing';
    let msg = isHit 
      ? `🎯 BULLSEYE! Perfect shot at the center!` 
      : `💨 MISSED! Your shot was off-target (${Math.round(currentVal)}%).`;

    if (isWon) {
      gameStatus = 'won';
      msg = '🏆 VICTORY! You hit the target 3 times!';
    } else if (isLost) {
      gameStatus = 'lost';
      msg = '❌ OUT OF ATTEMPTS! You only got ' + newHits + '/5 hits.';
    }

    setGameState(prev => ({
      ...prev,
      hits: newHits,
      attempts: newAttempts,
      status: gameStatus,
      message: msg,
    }));
  };

  // Game 3: Beat Goalkeeper Logic
  const handleGKShotType = (shotType) => {
    if (!gameState || gameState.status !== 'playing') return;

    // GK defensive style: Flat Footed, Aggressive Rush, Curved Shield
    const gkDefenses = ['flat-footed', 'aggressive-rush', 'curved-shield'];
    const gkChoice = gkDefenses[Math.floor(Math.random() * gkDefenses.length)];

    let beats = false;
    if (shotType === 'Power Shot' && gkChoice === 'flat-footed') beats = true;
    if (shotType === 'Chip Shot (Panenka)' && gkChoice === 'aggressive-rush') beats = true;
    if (shotType === 'Curved Shot' && gkChoice === 'curved-shield') beats = true;

    // Randomize a little so other styles have a small chance
    if (!beats && Math.random() < 0.25) {
      beats = true;
    }

    let gameStatus = 'playing';
    let msg = '';
    
    if (beats) {
      gameStatus = 'won';
      msg = `🏆 GOAL! Your ${shotType} completely bypassed the goalie's ${gkChoice.replace('-', ' ')} guard!`;
    } else {
      gameStatus = 'lost';
      msg = `🧤 SAVED! Goalkeeper countered your ${shotType} with a perfect ${gkChoice.replace('-', ' ')} save!`;
    }

    setGameState(prev => ({
      ...prev,
      status: gameStatus,
      message: msg,
      result: beats ? 'goal' : 'saved',
    }));
  };

  // Game 4: Sudden Death Trivia
  const handleTriviaAnswer = (optionIdx) => {
    if (!gameState || gameState.status !== 'playing') return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const question = TRIVIA_QUESTIONS[gameState.questionIndex];
    const isCorrect = optionIdx === question.answer;

    setGameState(prev => ({
      ...prev,
      status: isCorrect ? 'won' : 'lost',
      message: isCorrect 
        ? '🏆 CORRECT! You nailed the sudden death question!' 
        : `❌ WRONG! The correct answer was: ${question.options[question.answer]}.`,
    }));
  };

  return (
    <section id="challenges" className="challenges-section">
      {/* Sci-fi Neon Mesh BG */}
      <div className="challenges-gaming-bg">
        <div className="gaming-grid-overlay" />
        <div className="gaming-neon-orb green-glow" />
        <div className="gaming-neon-orb purple-glow" />
      </div>

      <div className="container">
        <div className="challenges-header fade-up">
          <div className="gaming-arena-tag">🔥 Challenge Arena</div>
          <h2 className="section-title text-gaming-glow">
            Interactive <span className="neon-text-red">Challenge Showcase</span>
          </h2>
          <p className="section-subtitle">
            Enter the arena, test your reflexes, and claim real rewards directly inside the web browser!
          </p>
        </div>

        {/* Challenge Grid */}
        <div className="challenges-gaming-grid">
          {CHALLENGES_DATA.map((ch) => {
            const isCurrent = activeGame === ch.id;
            
            return (
              <div 
                key={ch.id} 
                className={`gaming-card card-${ch.color} fade-up ${isCurrent ? 'game-expanded' : ''}`}
                style={{ '--accent': ch.accentColor }}
              >
                <div className="card-gaming-border" />
                <div className="gaming-card-inner">
                  {/* Normal Card Content (Hidden when active game is this one) */}
                  {!isCurrent && (
                    <>
                      <div className="gaming-card-top">
                        <span className={`difficulty-pill pill-${ch.difficulty.toLowerCase()}`}>
                          {ch.difficulty}
                        </span>
                        <div className="neon-led" />
                      </div>

                      <div className="gaming-card-icon-wrap">
                        <span className="gaming-icon">{ch.icon}</span>
                      </div>

                      <h3 className="gaming-card-title">{ch.title}</h3>
                      <p className="gaming-card-desc">{ch.desc}</p>

                      <div className="gaming-card-rewards">
                        <div className="reward-glow-badge xp-badge">
                          <span className="reward-prefix">⚡</span> {ch.xp}
                        </div>
                        <div className="reward-glow-badge coin-badge">
                          <span className="reward-prefix">🪙</span> {ch.coins}
                        </div>
                      </div>

                      <button 
                        className={`btn btn-gaming-play button-${ch.color}`}
                        onClick={() => startNewGame(ch.id)}
                      >
                        PLAY NOW
                      </button>
                    </>
                  )}

                  {/* Active Gaming Interface */}
                  {isCurrent && gameState && (
                    <div className="gaming-interface-container">
                      <div className="gaming-interface-header">
                        <span className="game-badge">🎮 LIVE GAME</span>
                        <button className="game-close-btn" onClick={closeGame}>×</button>
                      </div>

                      {/* GAME 1: SCORE PENALTIES */}
                      {ch.id === 'score-penalties' && (
                        <div className="gameplay-area penalty-shootout">
                          <h4 className="gameplay-title">PENALTY SHOOTOUT ({gameState.scored}/3 GOALS)</h4>
                          <p className="gameplay-status">{gameState.message}</p>
                          
                          {/* Goal Post Target Selector */}
                          <div className="goal-post-container">
                            <div className="goal-net">
                              <div className="goal-row">
                                <button className="goal-corner top-left" onClick={() => handlePenaltyShot('top-left')} disabled={gameState.status !== 'playing'}>Top Left</button>
                                <button className="goal-corner top-right" onClick={() => handlePenaltyShot('top-right')} disabled={gameState.status !== 'playing'}>Top Right</button>
                              </div>
                              <div className="goal-row">
                                <button className="goal-corner bottom-left" onClick={() => handlePenaltyShot('bottom-left')} disabled={gameState.status !== 'playing'}>Bottom Left</button>
                                <button className="goal-corner bottom-right" onClick={() => handlePenaltyShot('bottom-right')} disabled={gameState.status !== 'playing'}>Bottom Right</button>
                              </div>
                            </div>
                            <div className="goalkeeper-stand">🧤</div>
                          </div>

                          <div className="game-scoreboard">
                            <span>Goals Scored: {gameState.scored} ⚽</span>
                            <span>Keeper Saves: {gameState.missed} 🧤</span>
                          </div>
                        </div>
                      )}

                      {/* GAME 2: HIT THE TARGET */}
                      {ch.id === 'hit-target' && (
                        <div className="gameplay-area precision-hit">
                          <h4 className="gameplay-title">TARGET ACCURACY ({gameState.hits}/3 HITS)</h4>
                          <p className="gameplay-status">{gameState.message}</p>

                          {/* Interactive Slider Bar */}
                          <div className="accuracy-bar-container">
                            <div className="accuracy-target-zone" />
                            <div 
                              className="accuracy-indicator" 
                              style={{ left: `${gameState.progress}%` }} 
                            />
                          </div>

                          <button 
                            className="btn btn-gaming-shoot"
                            onClick={handleTargetShoot}
                            disabled={gameState.status !== 'playing'}
                          >
                            🎯 SHOOT!
                          </button>

                          <div className="game-scoreboard">
                            <span>Target Hits: {gameState.hits} / 3</span>
                            <span>Attempts Left: {5 - gameState.attempts}</span>
                          </div>
                        </div>
                      )}

                      {/* GAME 3: BEAT THE GOALKEEPER */}
                      {ch.id === 'beat-goalkeeper' && (
                        <div className="gameplay-area beat-gk">
                          <h4 className="gameplay-title">TACTICAL DUEL</h4>
                          <p className="gameplay-status">{gameState.message}</p>

                          {gameState.status === 'playing' ? (
                            <div className="gk-tactical-buttons">
                              <button className="btn btn-tactic" onClick={() => handleGKShotType('Power Shot')}>🔥 Power Shot</button>
                              <button className="btn btn-tactic" onClick={() => handleGKShotType('Chip Shot (Panenka)')}>🚀 Panenka Chip</button>
                              <button className="btn btn-tactic" onClick={() => handleGKShotType('Curved Shot')}>🌀 Curved Finesse</button>
                            </div>
                          ) : (
                            <div className="gk-duel-visual">
                              {gameState.result === 'goal' ? '⚽ GOAL! Ball hit the net.' : '🧤 SAVED! Goalie caught it.'}
                            </div>
                          )}
                        </div>
                      )}

                      {/* GAME 4: SUDDEN DEATH TRIVIA */}
                      {ch.id === 'sudden-death' && (
                        <div className="gameplay-area sudden-trivia">
                          <h4 className="gameplay-title">SUDDEN DEATH TRIVIA</h4>
                          
                          {gameState.status === 'playing' ? (
                            <>
                              <div className="trivia-countdown">
                                ⏳ Time Left: <span className="countdown-number">{triviaTimer}s</span>
                              </div>
                              <p className="trivia-question">
                                {TRIVIA_QUESTIONS[gameState.questionIndex].question}
                              </p>
                              <div className="trivia-options-grid">
                                {TRIVIA_QUESTIONS[gameState.questionIndex].options.map((opt, i) => (
                                  <button 
                                    key={opt}
                                    className="btn btn-trivia-option"
                                    onClick={() => handleTriviaAnswer(i)}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </>
                          ) : (
                            <p className="gameplay-status text-center">{gameState.message}</p>
                          )}
                        </div>
                      )}

                      {/* End Screen Actions */}
                      {gameState.status !== 'playing' && (
                        <div className="gameplay-endscreen">
                          <div className={`endscreen-alert ${gameState.status}`}>
                            {gameState.status === 'won' ? (
                              <>
                                <h4>🏆 CHALLENGE COMPLETE!</h4>
                                <p>You have unlocked the rewards of this challenge!</p>
                              </>
                            ) : (
                              <>
                                <h4>💀 FAILED</h4>
                                <p>Try again to claim the rewards.</p>
                              </>
                            )}
                          </div>
                          <div className="endscreen-buttons">
                            <button className="btn btn-gaming-replay" onClick={() => startNewGame(ch.id)}>PLAY AGAIN</button>
                            <button className="btn btn-gaming-quit" onClick={closeGame}>QUIT</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
