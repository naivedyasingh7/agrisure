import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Mail, Globe, Heart } from 'lucide-react';
import DharaLogo from './DharaLogo';

export default function Footer({ setActiveView }) {
  const currentYear = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState(null);

  const handleLinkClick = (viewId) => {
    if (setActiveView) {
      setActiveView(viewId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" style={{ padding: '80px 0 30px 0' }}>
      <div className="g-row footer-top-row">
        
        {/* Left Column: Brand Logo & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <DharaLogo variant="horizontal" theme="dark" size={220} showTagline={true} />
          <p className="-body-medium" style={{ color: 'var(--color-brightIvory400)', maxWidth: '340px', lineHeight: '1.6', fontSize: '14px', margin: 0 }}>
            AI-Powered Parametric Crop Insurance & Automated Loss Verification Platform. Transforming satellite & vision data into instant claim settlements.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-badge" title="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-badge" title="Twitter">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-badge" title="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:contact@dhara.ai" className="social-badge" title="Contact Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Columns: Standard Website Navigation & Legal Links */}
        <div className="footer-nav-columns" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          
          {/* Column 1: Navigation */}
          <div>
            <h5 style={{ color: 'var(--color-brightIvory300)', marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', fontWeight: '700' }}>
              Platform
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><a href="#home" onClick={() => handleLinkClick('home')} style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none' }}>Overview</a></li>
              <li><a href="#registry" onClick={() => handleLinkClick('registry')} style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none' }}>DCI Registry</a></li>
              <li><a href="#demo" onClick={() => handleLinkClick('demo')} style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none' }}>Claim Simulator</a></li>
              <li><a href="#audit" onClick={() => handleLinkClick('audit')} style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none' }}>Audit Records</a></li>
              <li><a href="#sentinel" onClick={() => handleLinkClick('sentinel')} style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none' }}>Sentinel Explorer</a></li>
            </ul>
          </div>

          {/* Column 2: Legal & Privacy */}
          <div>
            <h5 style={{ color: 'var(--color-brightIvory300)', marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', fontWeight: '700' }}>
              Legal & Privacy
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li>
                <button 
                  onClick={() => setLegalModal('privacy')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-brightIvory400)', padding: 0, cursor: 'pointer', fontSize: '14px' }}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal('terms')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-brightIvory400)', padding: 0, cursor: 'pointer', fontSize: '14px' }}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal('security')} 
                  style={{ background: 'none', border: 'none', color: 'var(--color-brightIvory400)', padding: 0, cursor: 'pointer', fontSize: '14px' }}
                >
                  Security & Compliance
                </button>
              </li>
              <li>
                <a href="#settings" onClick={() => handleLinkClick('settings')} style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none' }}>
                  System Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h5 style={{ color: 'var(--color-brightIvory300)', marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', fontWeight: '700' }}>
              Resources
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Documentation <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  API Reference <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--color-brightIvory400)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  GitHub Repository <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <div className="g-row">
        <div className="g-col xxl-24">
          <div className="footer-divider" style={{ margin: '40px 0 24px 0', opacity: 0.15 }}></div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="g-row footer-bottom-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--color-brightIvory400)' }}>
        <div>
          © {currentYear} Dhara AI. All rights reserved.
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', color: 'var(--color-brightIvory300)' }}>
          Crafted with <Heart size={14} fill="#e11d48" color="#e11d48" /> by <strong style={{ color: '#ffffff', letterSpacing: '0.02em' }}>ByteHounds</strong>
        </div>
      </div>

      {/* Interactive Modal for Privacy Policy / Terms / Security */}
      {legalModal && (
        <div className="modal-backdrop open" onClick={() => setLegalModal(null)}>
          <div 
            className="modal-wrapper" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '560px', padding: '32px', borderRadius: '16px', backgroundColor: 'var(--color-brightIvory25)', color: 'var(--color-stoneBrown800)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="-title-2-medium" style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={22} color="var(--color-forestGreen600)" />
                {legalModal === 'privacy' && 'Privacy Policy'}
                {legalModal === 'terms' && 'Terms of Service'}
                {legalModal === 'security' && 'Security & Compliance'}
              </h3>
              <button onClick={() => setLegalModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>✕</button>
            </div>
            
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-stoneBrown700)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {legalModal === 'privacy' && (
                <p>
                  Dhara AI values your data privacy. All field imagery, GPS coordinates, and crop telemetry collected during loss inspections are stored securely and used solely for parametric claim verification and anti-fraud auditing. We do not sell or share farm land parcel data with third-party advertisers.
                </p>
              )}
              {legalModal === 'terms' && (
                <p>
                  By accessing Dhara AI, users agree to provide authentic ground-truth crop information during field inspections. Attempted photo spoofing, GPS manipulation, or duplicate claims across parcels will lead to immediate claim rejection and user flagging on the registry.
                </p>
              )}
              {legalModal === 'security' && (
                <p>
                  Our platform enforces strict end-to-end data encryption, EXIF metadata validation, 3D gyro motion checks, and automated Sentinel-2 NDVI satellite cross-validation to ensure unalterable inspection records.
                </p>
              )}
            </div>
            
            <button 
              onClick={() => setLegalModal(null)} 
              className="button-premium dark" 
              style={{ marginTop: '24px', width: '100%', padding: '10px 0' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .social-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.08);
          color: var(--color-brightIvory300);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .social-badge:hover {
          background-color: var(--color-white);
          color: var(--color-stoneBrown800);
          transform: translateY(-2px);
        }
        .footer-nav-columns a:hover, .footer-nav-columns button:hover {
          color: var(--color-white) !important;
          text-decoration: underline !important;
        }
        @media (max-width: 768px) {
          .footer-top-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .footer-nav-columns {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
