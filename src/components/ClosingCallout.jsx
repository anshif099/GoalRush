import logoImg from '../assets/logo.png';
import './ClosingCallout.css';

export default function ClosingCallout() {
  return (
    <section id="closing-cta" className="closing-section">
      {/* Animated Sports Visual Background */}
      <div className="closing-bg">
        <div className="closing-mesh" />
        <div className="closing-glow orb-blue" />
        <div className="closing-glow orb-red" />
        <div className="closing-glow orb-green" />

        {/* Floating sports emojis */}
        <span className="float-sport sp-1 animate-float">⚽</span>
        <span className="float-sport sp-2 animate-float-delay-1">🏆</span>
        <span className="float-sport sp-3 animate-float-delay-2">🎯</span>
        <span className="float-sport sp-4 animate-float-slow">🎮</span>
        <span className="float-sport sp-5 animate-float-delay-3">🏀</span>
      </div>

      <div className="container closing-container">
        {/* Prominent Goal Rush Logo */}
        <div className="logo-badge-wrap fade-up">
          <div className="logo-glass-ring">
            <img src={logoImg} alt="Goal Rush Logo" className="closing-logo" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="closing-headline fade-up">
          Ready To Join The <br />
          <span className="text-gradient-brand">Future Of Sports</span> Engagement?
        </h2>

        <p className="closing-subtitle fade-up">
          Whether you are a die-hard fan, a brand manager, or a sports organization, Goal Rush has a place for you. Claim your spot in the arena today.
        </p>

        {/* Buttons Grid */}
        <div className="closing-buttons fade-up">
          <button 
            className="btn btn-primary btn-lg btn-glow-blue" 
            onClick={() => window.location.href='#challenges'}
            id="closing-play-btn"
          >
            Play Now ⚽
          </button>
          
          <button 
            className="btn btn-outline btn-lg btn-glass-white" 
            onClick={() => window.location.href='#contact'}
            id="closing-partner-btn"
          >
            Partner With Us 🤝
          </button>
          
          <button 
            className="btn btn-red btn-lg btn-glow-red" 
            onClick={() => window.location.href='#sponsors'}
            id="closing-sponsor-btn"
          >
            Become A Sponsor ⚡
          </button>
        </div>
      </div>
    </section>
  );
}
