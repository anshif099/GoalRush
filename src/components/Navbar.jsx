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

export default function Navbar({ currentView }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Capture the beforeinstallprompt event for PWA install
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e);
      // expose globally for other components (e.g., Footer)
      window.deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      // clean up global reference
      if (window.deferredPrompt) delete window.deferredPrompt;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update activeLink based on currentView and hash
  useEffect(() => {
    if (currentView === 'login') {
      setActiveLink('Login');
    } else if (currentView === 'register') {
      setActiveLink('Register');
    } else if (currentView === 'landing') {
      const hash = window.location.hash;
      const matchingLink = NAV_LINKS.find(link => link.href === hash);
      if (matchingLink) {
        setActiveLink(matchingLink.label);
      } else {
        setActiveLink('Home');
      }
    }
  }, [currentView]);

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
            <a href="#login" className="btn btn-outline btn-sm" id="nav-login-btn" onClick={() => setMenuOpen(false)}>Login</a>
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

