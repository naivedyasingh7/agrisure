import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveView }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (viewId) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="g-row footer-top-row">
        
        {/* Left Column: Brand Logo */}
        <div>
          <h2 className="footer-logo">KrishiNetra AI</h2>
          <p className="-body-medium" style={{ color: 'var(--color-brightIvory400)', marginTop: '16px', maxWidth: '300px' }}>
            From Crop Image to Claim Decision in Seconds. Hackathon project concept.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-badge">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-badge">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-badge">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Right Column: Office coordinates */}
        <div className="footer-offices">
          <div className="office-info">
            <h5>Delhi HQ</h5>
            <p>
              Krishi Bhavan, Sector 1<br />
              New Delhi, 110001, India<br /><br />
              <strong>info@krishinetra.ai</strong><br />
            </p>
          </div>

          <div className="office-info">
            <h5>Research Lab</h5>
            <p>
              IIT Delhi Research Park,<br />
              Block C, Hauz Khas<br />
              New Delhi, 110016, India
            </p>
          </div>

          <div className="office-info">
            <h5>Field Station</h5>
            <p>
              Condeixa Agricultural Co-op<br />
              Condeixa-a-Velha, Portugal
            </p>
          </div>
        </div>

      </div>

      <div className="g-row">
        <div className="g-col xxl-24">
          <div className="footer-divider"></div>
        </div>
      </div>

      <div className="g-row footer-bottom-row">
        
        {/* Sitemap */}
        <div className="footer-links">
          <a href="#home" onClick={() => handleLinkClick('home')}>Overview</a>
          <a href="#registry" onClick={() => handleLinkClick('registry')}>DCI Registry</a>
          <a href="#demo" onClick={() => handleLinkClick('demo')}>Live Inspector</a>
          <a href="#audit" onClick={() => handleLinkClick('audit')}>History & Records</a>
        </div>

        {/* Technical credentials links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
          >
            Code Repository <ArrowUpRight size={12} />
          </a>
          <span style={{ fontSize: '12px' }}>
            © {currentYear} KrishiNetra AI · Agrisure Insurance Hackathon.
          </span>
        </div>

      </div>

      <style>{`
        .social-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--color-brightIvory300);
          transition: var(--transition-smooth);
        }
        .social-badge:hover {
          background-color: var(--color-white);
          color: var(--color-stoneBrown800);
          transform: scale(1.1);
        }
      `}</style>
    </footer>
  );
}
