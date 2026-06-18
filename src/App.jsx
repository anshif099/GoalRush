import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import PlatformFeatures from './components/PlatformFeatures';
import Timeline from './components/Timeline';
import Features from './components/Features';
import AIPersonalization from './components/AIPersonalization';
import Challenges from './components/Challenges';
import Predictions from './components/Predictions';
import Rewards from './components/Rewards';
import Marketplace from './components/Marketplace';
import Sponsors from './components/Sponsors';
import InvestorDashboard from './components/InvestorDashboard';
import Community from './components/Community';
import CityLeaderboard from './components/CityLeaderboard';
import Contact from './components/Contact';
import ClosingCallout from './components/ClosingCallout';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  // Unified routing: handle hash and pathname (e.g., /login, /register)
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#login' || path === '/login') {
        setCurrentView('login');
        window.scrollTo(0, 0);
      } else if (hash === '#register' || path === '/register') {
        setCurrentView('register');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('landing');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Scroll-triggered fade-up animations (re-runs when currentView changes back to landing)
  useEffect(() => {
    if (currentView !== 'landing') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });

  // After install redirect handling
  useEffect(() => {
    const redirect = localStorage.getItem('postInstallRedirect');
    if (redirect === 'login') {
      localStorage.removeItem('postInstallRedirect');
      window.location.hash = '#login';
    }
  }, []);
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]);

  return (
    <div className="app">
      <Navbar currentView={currentView} />
      <main>
        {currentView === 'landing' && (
          <>
            <Hero />
            <Stats />
            <PlatformFeatures />
            <Timeline />
            <Features />
            <AIPersonalization />
            <Challenges />
            <Predictions />
            <Rewards />
            <Marketplace />
            <Sponsors />
            <InvestorDashboard />
            <Community />
            <CityLeaderboard />
            <Contact />
            <ClosingCallout />
          </>
        )}
        {currentView === 'login' && <Login />}
        {currentView === 'register' && <Register />}
      </main>
      {currentView === 'landing' && <Footer />}
    </div>
  );
}

export default App;

