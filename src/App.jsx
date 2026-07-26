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

export default function App() {
  const [activeView, setActiveView] = useState('home');
  
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Initial Brand Loader Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
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
    setCurtainState('covering');
    
    setTimeout(() => {
      setActiveView(newView);
      window.scrollTo(0, 0);
      setCurtainState('uncovering');
      
      setTimeout(() => {
        setCurtainState('idle');
      }, 600);
    }, 600);
  };

  const handleApproveClaim = (newCount) => {
    if (typeof newCount === 'number') {
      setClaimsCount(newCount);
    } else {
      setClaimsCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleResetClaims = () => {
    setClaimsCount(3);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
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
      />

      {/* Main page content area */}
      <main style={{ flexGrow: 1 }}>
        {activeView === 'home' && (
          <>
            <Hero setActiveView={changeView} />
            
            <CollectionsCTA setActiveView={changeView} />
            
            <CompanyHighlight setActiveView={changeView} />
            
            <LeadershipHighlight setActiveView={changeView} />
            
            <WorkflowOverview />
          </>
        )}

        {activeView === 'registry' && <DciRegistry />}

        {activeView === 'demo' && (
          <ClaimSimulator onApproveClaim={handleApproveClaim} />
        )}

        {(activeView === 'audit' || activeView === 'tech') && <AuditDashboard />}
      </main>

      {/* Footer element */}
      <Footer setActiveView={changeView} />

    </div>
  );
}
