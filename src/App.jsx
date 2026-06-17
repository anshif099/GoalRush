import { useEffect } from 'react';
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
import Footer from './components/Footer';
import './App.css';

function App() {
  // Scroll-triggered fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
