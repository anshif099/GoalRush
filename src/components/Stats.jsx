import { useEffect, useRef, useState } from 'react';
import './Stats.css';

const STATS = [
  { value: 10, suffix: 'M+', label: 'Active Fans', icon: '🌍', color: 'blue' },
  { value: 500, suffix: 'M+', label: 'Sponsor Impressions', icon: '📡', color: 'red' },
  { value: 100, suffix: '+', label: 'Brand Partners', icon: '🤝', color: 'green' },
  { value: 50, suffix: '+', label: 'Sporting Events', icon: '🏅', color: 'gold' },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, icon, color, started }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className={`stat-card stat-${color} fade-up`}>
      <div className={`stat-icon-wrap icon-${color}`}>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
      <div className={`stat-bar bar-${color}`} />
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="stats-section" ref={sectionRef}>
      {/* Animated bg gradient */}
      <div className="stats-bg">
        <div className="stats-orb stats-orb-blue" />
        <div className="stats-orb stats-orb-red" />
        <div className="stats-orb stats-orb-green" />
      </div>

      <div className="container stats-container">
        <div className="stats-header fade-up">
          <div className="section-tag">📊 Platform Scale</div>
          <h2 className="section-title">
            Powering the World&apos;s <span className="text-gradient-blue">Biggest</span> Sports Moments
          </h2>
          <p className="section-subtitle">
            From everyday fans to global brands, Goal Rush connects millions across every sporting event on earth.
          </p>
        </div>

        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
