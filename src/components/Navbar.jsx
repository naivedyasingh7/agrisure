import React, { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, claimsCount, onOpenClaims }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'registry', label: 'DCI Registry' },
    { id: 'demo', label: 'Live Inspector' },
  ];

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <a href="#home" onClick={() => handleNavClick('home')} className="logo-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          KrishiNetra AI
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#audit"
            className={`nav-link ${activeView === 'audit' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('audit');
            }}
          >
            History & Records
          </a>
        </nav>

        {/* Claims Pending Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onOpenClaims}
            className="button-premium outline"
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderColor: 'var(--color-red)',
              color: 'var(--color-red)',
              backgroundColor: 'rgba(255, 0, 77, 0.05)'
            }}
          >
            <ShieldCheck size={16} />
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Claims Pending ({claimsCount})
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--color-brightIvory25)',
            borderBottom: '1px solid rgba(36, 31, 33, 0.1)',
            padding: '20px var(--grid-margin)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            zIndex: 499,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#tech"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              handleNavClick('tech');
            }}
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            Tech Stack
          </a>
        </div>
      )}

      {/* Inline media queries */}
      <style>{`
        @media (max-width: 1023px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
