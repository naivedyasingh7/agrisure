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
import CropDetailModal from './components/CropDetailModal';

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
  
  // Transition and Loader states
  const [curtainState, setCurtainState] = useState('idle');
  const [loading, setLoading] = useState(true);
  
  // Global claims state for demonstration loop
  const [claimsCount, setClaimsCount] = useState(3);

  // Fetch initial stats from Python backend API
  useEffect(() => {
    fetch('http://localhost:8000/api/stats')
      .then(res => res.json())
      .then(data => {
        setClaimsCount(data.claimsPending);
      })
      .catch(err => console.log("Backend offline, using local simulation state:", err));
  }, []);

  // 1. Initialize Lenis Smooth Scroll on Mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate loader complete after 1.8 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  // 3. Scroll Intersection Observer for Image Reveals & Slide-ins
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Scan for revealable items
    const elements = document.querySelectorAll('.image-reveal, .animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [activeView, loading]);

  // 4. Animated Page Curtain Navigation
  const changeView = (newView) => {
    if (newView === activeView) return;
    
    setCurtainState('enter');
    
    setTimeout(() => {
      setActiveView(newView);
      window.scrollTo(0, 0);
      setCurtainState('exit');
    }, 450);

    setTimeout(() => {
      setCurtainState('idle');
    }, 900);
  };

  const handleApproveClaim = () => {
    setClaimsCount(prev => Math.max(0, prev - 1));
  };

  const handleResetClaims = () => {
    setClaimsCount(3);
  };

  const handleOpenCropModal = (crop) => {
    setSelectedCropModal(crop || 'rice');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Brand Intro Loader */}
      <div className={`intro-loader ${!loading ? 'fade-out' : ''}`}>
        <h1 className="intro-logo">KrishiNetra AI</h1>
        <div className="intro-progress-container">
          <div className="intro-progress-bar"></div>
        </div>
      </div>

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
            
            <CompanyHighlight setActiveView={changeView} onCropClick={handleOpenCropModal} />
            
            <LeadershipHighlight setActiveView={changeView} />
            
            <WorkflowOverview />
          </>
        )}

        {activeView === 'registry' && <DciRegistry onCropClick={handleOpenCropModal} />}

        {activeView === 'demo' && (
          <ClaimSimulator onApproveClaim={handleApproveClaim} onCropClick={handleOpenCropModal} />
        )}

        {(activeView === 'audit' || activeView === 'tech') && <AuditDashboard onCropClick={handleOpenCropModal} />}

        {activeView === 'settings' && <SettingsView />}
      </main>

      {/* Footer element */}
      <Footer setActiveView={changeView} />

      {/* Crop Intelligence Modal */}
      {selectedCropModal && (
        <CropDetailModal 
          crop={selectedCropModal} 
          onClose={() => setSelectedCropModal(null)} 
          onActionClick={(cropId) => {
            setSelectedCropModal(null);
            changeView(cropId === 'rice' ? 'registry' : cropId === 'cotton' ? 'demo' : 'tech');
          }} 
        />
      )}

    </div>
  );
}
