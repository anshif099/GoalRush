import { useState, useEffect } from 'react';
import './CityLeaderboard.css';

const INITIAL_CITIES = [
  { id: 'kochi', name: 'Kochi', points: 1248500, activeFans: 15420, peakAccuracy: '78%' },
  { id: 'calicut', name: 'Calicut', points: 1180200, activeFans: 12900, peakAccuracy: '76%' },
  { id: 'trivandrum', name: 'Trivandrum', points: 950400, activeFans: 9840, peakAccuracy: '74%' },
  { id: 'thrissur', name: 'Thrissur', points: 890900, activeFans: 8520, peakAccuracy: '72%' },
];

export default function CityLeaderboard() {
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [votedCity, setVotedCity] = useState(null);

  // Sorting helper
  const getSortedCities = () => {
    return [...cities].sort((a, b) => b.points - a.points);
  };

  const handleCheer = (cityId) => {
    setCities(prev => 
      prev.map(c => {
        if (c.id === cityId) {
          return { ...c, points: c.points + 75000 }; // Boost by 75,000 points
        }
        return c;
      })
    );
    setVotedCity(cityId);
    setTimeout(() => setVotedCity(null), 1000); // Reset cheer animation
  };

  // Find index of city in sorted array to compute CSS top position
  const sortedList = getSortedCities();

  const getTrophy = (rank) => {
    switch (rank) {
      case 0: return '🏆';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <section id="city-leaderboard" className="leaderboard-section">
      {/* Mesh Background */}
      <div className="leaderboard-bg">
        <div className="leaderboard-glow-left" />
        <div className="leaderboard-glow-right" />
      </div>

      <div className="container">
        <div className="leaderboard-header-wrap fade-up">
          <div className="section-tag leader-tag">🏆 Local Pride</div>
          <h2 className="section-title">
            Battle For <span className="text-gradient-blue">Your City</span>
          </h2>
          <p className="section-subtitle">
            Compete locally to put your city on the global map. Cheer for your hometown and watch them climb the rankings in real-time.
          </p>
        </div>

        <div className="leaderboard-main fade-up">
          {/* Stats Bar */}
          <div className="leaderboard-stats-row">
            <div className="lbl-stat">Active Fans: <strong>46,680</strong></div>
            <div className="lbl-stat">Daily Matches: <strong>24,000+</strong></div>
            <div className="lbl-stat text-pulse">⚡ LIVE BROADCASTING</div>
          </div>

          {/* Interactive Leaderboard Box */}
          <div className="leaderboard-box">
            {/* Columns header */}
            <div className="leaderboard-cols-header">
              <span className="col-rank">RANK</span>
              <span className="col-city">CITY</span>
              <span className="col-points">LIVE POINTS</span>
              <span className="col-action">SUPPORT</span>
            </div>

            {/* List Body with Absolute Transition heights */}
            <div className="leaderboard-list">
              {cities.map((city) => {
                const sortedIndex = sortedList.findIndex(c => c.id === city.id);
                const isWinner = sortedIndex === 0;
                const isVoting = votedCity === city.id;

                return (
                  <div
                    key={city.id}
                    className={`leaderboard-row ${isWinner ? 'row-first' : ''} ${isVoting ? 'row-cheering' : ''}`}
                    style={{
                      transform: `translateY(${sortedIndex * 84}px)`,
                    }}
                  >
                    {/* Rank */}
                    <div className="row-col col-rank">
                      <span className="rank-trophy">{getTrophy(sortedIndex)}</span>
                      <span className="rank-num">#{sortedIndex + 1}</span>
                    </div>

                    {/* City details */}
                    <div className="row-col col-city">
                      <span className="city-name">{city.name}</span>
                      <span className="city-subtext">👤 {city.activeFans.toLocaleString()} Fans</span>
                    </div>

                    {/* Live Points */}
                    <div className="row-col col-points">
                      <span className="points-val">{city.points.toLocaleString()}</span>
                      <span className="accuracy-val">Accuracy: {city.peakAccuracy}</span>
                    </div>

                    {/* Action button */}
                    <div className="row-col col-action">
                      <button 
                        className="btn btn-cheer"
                        onClick={() => handleCheer(city.id)}
                        id={`cheer-${city.id}-btn`}
                      >
                        Cheer 📣
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
