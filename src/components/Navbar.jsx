import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Challenges', href: '#challenges' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (label) => {
    setActiveLink(label);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-inner">
        {/* Logo */}
        <a href="#home" className="navbar-logo" aria-label="Goal Rush Home">
          <img src={logoImg} alt="Goal Rush" className="logo-img" />
        </a>

        {/* Center Menu */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`nav-link ${activeLink === label ? 'active' : ''}`}
                onClick={() => handleLinkClick(label)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className={`navbar-auth ${menuOpen ? 'open' : ''}`}>
          <button className="btn btn-outline btn-sm" id="nav-login-btn">Login</button>
          <button className="btn btn-primary btn-sm" id="nav-register-btn">Register</button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
