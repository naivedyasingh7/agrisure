import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionsCTA from './components/CollectionsCTA';
import CompanyHighlight from './components/CompanyHighlight';
import LeadershipHighlight from './components/LeadershipHighlight';
import WorkflowOverview from './components/WorkflowOverview';
import Footer from './components/Footer';

// Views
import DciRegistry from './components/DciRegistry';
import ClaimSimulator from './components/ClaimSimulator';
import AuditDashboard from './components/AuditDashboard';
import SettingsView from './components/SettingsView';
import TechStackView from './components/TechStackView';
import SentinelExplorer from './components/SentinelExplorer';
import CropDetailModal from './components/CropDetailModal';
<<<<<<< Updated upstream
=======
import DharaBrandShowcase from './components/DharaBrandShowcase';
import DharaLogo from './components/DharaLogo';
>>>>>>> Stashed changes

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedCropModal, setSelectedCropModal] = useState(null);
  
  // Site-Wide Dark Theme State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('agrisure_theme') === 'dark';
  });

  // Sync Dark Theme to Document Body
  useEffect(() => {
    localStorage.setItem('agrisure_theme', darkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const [loading, setLoading] = useState(true);
  const [curtainState, setCurtainState] = useState('idle');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Global claims state for demonstration loop
  const [claimsCount, setClaimsCount] = useState(3);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll Reveal Animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeView]);

  // Page Transition Handler
  const changeView = (newView) => {
    if (newView === activeView) return;

    setCurtainState('covering');
    setTimeout(() => {
      setActiveView(newView);
      window.scrollTo(0, 0);
      setCurtainState('uncovering');
      setTimeout(() => {
        setCurtainState('idle');
      }, 500);
    }, 400);
  };

  const handleResetClaims = () => {
    setClaimsCount(3);
  };

  const handleOpenCropModal = (crop) => {
    setSelectedCropModal(crop || 'rice');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Simple Dhara AI Logo Splash Screen */}
      {loading && (
        <div className={`intro-loader ${!loading ? 'fade-out' : ''}`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <DharaLogo variant="vertical" theme="dark" size={200} showTagline={true} />
          </div>
          <div className="intro-progress-container" style={{ marginTop: '28px' }}>
            <div className="intro-progress-bar"></div>
          </div>
        </div>
      )}

      {/* Page Wipe Curtain */}
      <div className={`transition-curtain ${curtainState}`}></div>

      {/* Navigation header */}
      <Navbar 
        activeView={activeView}
        setActiveView={changeView}
        claimsCount={claimsCount}
        onOpenClaims={handleResetClaims}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main page content area */}
      <main style={{ flexGrow: 1 }}>
        {activeView === 'home' && (
          <>
            <Hero setActiveView={changeView} onCropClick={handleOpenCropModal} />
            
            <CollectionsCTA setActiveView={changeView} onCropClick={handleOpenCropModal} />
            
            <CompanyHighlight />

            <LeadershipHighlight />

            <WorkflowOverview setActiveView={changeView} />
          </>
        )}

<<<<<<< Updated upstream
        {activeView === 'sentinel' && <SentinelExplorer />}

        {activeView === 'registry' && <DciRegistry onCropClick={handleOpenCropModal} />}

        {activeView === 'demo' && (
          <ClaimSimulator onApproveClaim={handleApproveClaim} onCropClick={handleOpenCropModal} />
=======
        {activeView === 'dci-registry' && (
          <DciRegistry setActiveView={changeView} />
>>>>>>> Stashed changes
        )}

        {activeView === 'claim-simulator' && (
          <ClaimSimulator setActiveView={changeView} setClaimsCount={setClaimsCount} />
        )}

        {activeView === 'audit' && (
          <AuditDashboard setActiveView={changeView} />
        )}

        {activeView === 'sentinel' && (
          <SentinelExplorer setActiveView={changeView} />
        )}

        {activeView === 'settings' && (
          <SettingsView setActiveView={changeView} darkMode={darkMode} setDarkMode={setDarkMode} />
        )}

        {activeView === 'tech-stack' && (
          <TechStackView setActiveView={changeView} />
        )}

        {activeView === 'dhara-brand' && (
          <DharaBrandShowcase setActiveView={changeView} />
        )}
      </main>

      {/* Footer component */}
      <Footer setActiveView={changeView} />

      {/* Crop Inspection Modal */}
      {selectedCropModal && (
        <CropDetailModal 
          cropKey={selectedCropModal} 
          onClose={() => setSelectedCropModal(null)} 
        />
      )}
    </div>
  );
}
