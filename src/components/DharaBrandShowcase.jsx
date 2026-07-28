import React, { useState } from 'react';
import DharaLogo from './DharaLogo';
import { Copy, Check, Sun, Moon, Grid, Layers, Palette, Type, Shield, Terminal } from 'lucide-react';

export default function DharaBrandShowcase() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [showcaseTheme, setShowcaseTheme] = useState('dark');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const brandColors = [
    { name: 'Deep Forest', hex: '#08120D', rgb: 'rgb(8, 18, 13)', role: 'Primary Background & Mark Fill', text: '#F8FAF7' },
    { name: 'Natural Green', hex: '#69C36D', rgb: 'rgb(105, 195, 109)', role: 'Secondary Accent & AI Designation', text: '#08120D' },
    { name: 'Golden Wheat', hex: '#E8C547', rgb: 'rgb(232, 197, 71)', role: 'Gold Accent Highlights', text: '#08120D' },
    { name: 'Soft Cyan', hex: '#67D6FF', rgb: 'rgb(103, 214, 255)', role: 'Tech Telemetry Accent', text: '#08120D' },
    { name: 'Off White', hex: '#F8FAF7', rgb: 'rgb(248, 250, 247)', role: 'Light Mode Canvas & Surfaces', text: '#08120D' }
  ];

  // SVG Raw code string for copying
  const monogramSvgCode = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 24 18 H 52 C 70 18 82 32 82 50 C 82 68 70 82 52 82 H 24 Z" fill="#08120D" />
  <path d="M 36 30 L 52 30 C 62 30 70 38 70 50 C 70 62 62 70 52 70 L 36 70 Z" fill="#F8FAF7" />
  <path d="M 52 32 L 64 68 H 54 L 51 58 H 43 L 40 68 H 30 Z M 47 44 L 45 51 H 49 Z" fill="#08120D" />
  <circle cx="47" cy="40" r="3.5" fill="#69C36D" />
</svg>`;

  const primaryHorizontalSvgCode = `<svg viewBox="0 0 320 70" width="320" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0, 5) scale(0.65)">
    <path d="M 24 18 H 52 C 70 18 82 32 82 50 C 82 68 70 82 52 82 H 24 Z" fill="#FFFFFF" />
    <path d="M 36 30 L 52 30 C 62 30 70 38 70 50 C 70 62 62 70 52 70 L 36 70 Z" fill="#08120D" />
    <path d="M 52 32 L 64 68 H 54 L 51 58 H 43 L 40 68 H 30 Z M 47 44 L 45 51 H 49 Z" fill="#FFFFFF" />
    <circle cx="47" cy="40" r="3.5" fill="#69C36D" />
  </g>
  <text x="80" y="44" font-family="'Sora', sans-serif" font-weight="800" font-size="34" fill="#FFFFFF" letter-spacing="-1px">Dhara</text>
  <text x="195" y="44" font-family="'Sora', sans-serif" font-weight="600" font-size="28" fill="#69C36D" letter-spacing="1px">AI</text>
  <text x="80" y="62" font-family="'Manrope', sans-serif" font-weight="600" font-size="10" fill="rgba(255,255,255,0.7)" letter-spacing="1.8px">WHERE EARTH MEETS INTELLIGENCE.</text>
</svg>`;

  const isDarkCanvas = showcaseTheme === 'dark';

  return (
    <div
      style={{
        backgroundColor: isDarkCanvas ? '#08120D' : '#F8FAF7',
        color: isDarkCanvas ? '#F8FAF7' : '#08120D',
        minHeight: '100vh',
        padding: '60px 0 120px 0',
        transition: 'background-color 0.4s ease, color 0.4s ease'
      }}
    >
      <div className="g-row" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Header & Theme Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ 
                backgroundColor: isDarkCanvas ? 'rgba(105,195,109,0.15)' : 'rgba(105,195,109,0.2)', 
                color: '#69C36D', 
                fontSize: '12px', 
                fontWeight: '700', 
                padding: '4px 12px', 
                borderRadius: '20px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' 
              }}>
                D+A Monogram Identity
              </span>
              <span style={{ color: isDarkCanvas ? 'rgba(255,255,255,0.4)' : 'rgba(8,18,13,0.4)', fontSize: '12px' }}>
                Redesign v2.0 • Premium Tech Mark
              </span>
            </div>
            
            <h1 style={{ 
              fontFamily: "'Sora', sans-serif", 
              fontSize: 'clamp(36px, 3vw + 20px, 56px)', 
              fontWeight: '800', 
              letterSpacing: '-0.03em',
              margin: 0,
              lineHeight: 1.1 
            }}>
              Dhara AI
            </h1>
            
            <p style={{ 
              fontFamily: "'Manrope', sans-serif", 
              fontSize: '18px', 
              color: isDarkCanvas ? '#69C36D' : '#3E7A41', 
              fontWeight: '600', 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase',
              marginTop: '8px'
            }}>
              Where Earth Meets Intelligence.
            </p>
          </div>

          {/* Interactive Controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                border: `1px solid ${showGridOverlay ? '#69C36D' : (isDarkCanvas ? 'rgba(255,255,255,0.15)' : 'rgba(8,18,13,0.15)')}`,
                backgroundColor: showGridOverlay ? 'rgba(105,195,109,0.15)' : 'transparent',
                color: showGridOverlay ? '#69C36D' : (isDarkCanvas ? '#F8FAF7' : '#08120D'),
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              <Grid size={16} /> Grid Specs {showGridOverlay ? '(ON)' : '(OFF)'}
            </button>

            <button
              onClick={() => setShowcaseTheme(isDarkCanvas ? 'light' : 'dark')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                border: `1px solid ${isDarkCanvas ? 'rgba(255,255,255,0.15)' : 'rgba(8,18,13,0.15)'}`,
                backgroundColor: isDarkCanvas ? 'rgba(255,255,255,0.06)' : 'rgba(8,18,13,0.06)',
                color: isDarkCanvas ? '#F8FAF7' : '#08120D',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              {isDarkCanvas ? <Sun size={16} color="#E8C547" /> : <Moon size={16} color="#08120D" />}
              {isDarkCanvas ? 'Light Canvas' : 'Dark Canvas'}
            </button>
          </div>
        </div>

        {/* Section 1: All 13 Deliverables Showcase Matrix */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <Layers size={20} color="#69C36D" />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '24px', fontWeight: '700', margin: 0 }}>
              Complete 13 Deliverables Suite
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            
            {/* Deliverable 1 & 3: Primary Logo & Horizontal Lockup (Dark) */}
            <div style={{
              backgroundColor: '#08120D',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              {showGridOverlay && (
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(105,195,109,0.2) 1px, transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none', borderRadius: '16px' }} />
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#69C36D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>01. Primary Horizontal (Dark Theme)</span>
                <button 
                  onClick={() => copyToClipboard(primaryHorizontalSvgCode, 'primary-dark')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
                >
                  {copiedKey === 'primary-dark' ? <Check size={14} color="#69C36D" /> : <Copy size={14} />}
                  {copiedKey === 'primary-dark' ? 'Copied SVG' : 'Copy SVG'}
                </button>
              </div>

              <div style={{ margin: '30px 0' }}>
                <DharaLogo variant="primary" theme="dark" size={240} showTagline={true} />
              </div>

              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Main brand header & dark interface placement</span>
            </div>

            {/* Deliverable 6: Light Theme Version */}
            <div style={{
              backgroundColor: '#F8FAF7',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid rgba(8,18,13,0.12)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              {showGridOverlay && (
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(8,18,13,0.15) 1px, transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none', borderRadius: '16px' }} />
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#3E7A41', textTransform: 'uppercase', letterSpacing: '0.1em' }}>02. Light Theme Version</span>
                <button 
                  onClick={() => copyToClipboard(primaryHorizontalSvgCode, 'primary-light')}
                  style={{ background: 'none', border: 'none', color: 'rgba(8,18,13,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
                >
                  {copiedKey === 'primary-light' ? <Check size={14} color="#3E7A41" /> : <Copy size={14} />}
                  {copiedKey === 'primary-light' ? 'Copied SVG' : 'Copy SVG'}
                </button>
              </div>

              <div style={{ margin: '30px 0' }}>
                <DharaLogo variant="primary" theme="light" size={240} showTagline={true} />
              </div>

              <span style={{ fontSize: '12px', color: 'rgba(8,18,13,0.5)' }}>White papers, invoices, light mode app</span>
            </div>

            {/* Deliverable 2: Icon-Only Monogram Mark */}
            <div style={{
              backgroundColor: isDarkCanvas ? 'rgba(255,255,255,0.03)' : 'rgba(8,18,13,0.03)',
              borderRadius: '16px',
              padding: '36px',
              border: `1px solid ${isDarkCanvas ? 'rgba(255,255,255,0.1)' : 'rgba(8,18,13,0.1)'}`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              {showGridOverlay && (
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(105,195,109,0.2) 1px, transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none', borderRadius: '16px' }} />
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#69C36D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>03. D+A Monogram Symbol</span>
                <button 
                  onClick={() => copyToClipboard(monogramSvgCode, 'icon-only')}
                  style={{ background: 'none', border: 'none', color: isDarkCanvas ? 'rgba(255,255,255,0.6)' : 'rgba(8,18,13,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
                >
                  {copiedKey === 'icon-only' ? <Check size={14} color="#69C36D" /> : <Copy size={14} />}
                  {copiedKey === 'icon-only' ? 'Copied SVG' : 'Copy SVG'}
                </button>
              </div>

              <div style={{ margin: '20px auto' }}>
                <DharaLogo variant="icon" theme={isDarkCanvas ? 'dark' : 'light'} size={80} />
              </div>

              <span style={{ fontSize: '12px', color: isDarkCanvas ? 'rgba(255,255,255,0.4)' : 'rgba(8,18,13,0.5)', textAlign: 'center' }}>Standalone monogram mark for UI badges</span>
            </div>

            {/* Deliverable 4: Vertical Lockup */}
            <div style={{
              backgroundColor: isDarkCanvas ? 'rgba(255,255,255,0.03)' : 'rgba(8,18,13,0.03)',
              borderRadius: '16px',
              padding: '36px',
              border: `1px solid ${isDarkCanvas ? 'rgba(255,255,255,0.1)' : 'rgba(8,18,13,0.1)'}`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#E8C547', textTransform: 'uppercase', letterSpacing: '0.1em' }}>04. Vertical Lockup</span>
                <span style={{ fontSize: '11px', opacity: 0.5 }}>Centered</span>
              </div>

              <div style={{ margin: '20px 0' }}>
                <DharaLogo variant="vertical" theme={isDarkCanvas ? 'dark' : 'light'} size={170} showTagline={true} />
              </div>

              <span style={{ fontSize: '12px', color: isDarkCanvas ? 'rgba(255,255,255,0.4)' : 'rgba(8,18,13,0.5)', textAlign: 'center' }}>Covers, splash screens & posters</span>
            </div>

            {/* Deliverable 7: Monochrome Version */}
            <div style={{
              backgroundColor: '#000000',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid rgba(255,255,255,0.15)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>05. Pure Monochrome (Dark)</span>
                <span style={{ fontSize: '11px', color: '#888' }}>100% Solid White</span>
              </div>

              <div style={{ margin: '30px 0' }}>
                <DharaLogo variant="primary" theme="monochrome-dark" size={220} showTagline={true} />
              </div>

              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Single-color laser print, engraving, fax</span>
            </div>

            {/* Deliverables 8 & 9: Mobile App Icon & Favicon */}
            <div style={{
              backgroundColor: isDarkCanvas ? 'rgba(255,255,255,0.03)' : 'rgba(8,18,13,0.03)',
              borderRadius: '16px',
              padding: '36px',
              border: `1px solid ${isDarkCanvas ? 'rgba(255,255,255,0.1)' : 'rgba(8,18,13,0.1)'}`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#69C36D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>06. App Icon & Favicon Suite</span>
                <span style={{ fontSize: '11px', opacity: 0.5 }}>iOS / Android / Web</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', margin: '20px 0' }}>
                {/* 512px Tile Preview */}
                <div style={{ textAlign: 'center' }}>
                  <DharaLogo variant="app-icon" theme="dark" size={84} />
                  <span style={{ fontSize: '11px', display: 'block', marginTop: '8px', opacity: 0.6 }}>App Icon (512px)</span>
                </div>

                {/* Favicon 16x16 Tab Preview */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    backgroundColor: '#1E2320', 
                    padding: '8px 14px', 
                    borderRadius: '8px 8px 0 0',
                    border: '1px solid rgba(255,255,255,0.1)' 
                  }}>
                    <DharaLogo variant="favicon" theme="dark" size={18} />
                    <span style={{ fontSize: '11px', color: '#FFF', fontWeight: '500' }}>Dhara AI — Dashboard</span>
                  </div>
                  <span style={{ fontSize: '11px', display: 'block', marginTop: '8px', opacity: 0.6 }}>Favicon (16/32px)</span>
                </div>
              </div>

              <span style={{ fontSize: '12px', color: isDarkCanvas ? 'rgba(255,255,255,0.4)' : 'rgba(8,18,13,0.5)', textAlign: 'center' }}>Tested and legible at 16x16px</span>
            </div>

          </div>
        </div>

        {/* Section 2: Color Palette Swatches */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <Palette size={20} color="#E8C547" />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '24px', fontWeight: '700', margin: 0 }}>
              Brand Color Palette Specifications
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {brandColors.map((color, idx) => (
              <div 
                key={idx}
                onClick={() => copyToClipboard(color.hex, `color-${idx}`)}
                style={{
                  backgroundColor: color.hex,
                  color: color.text,
                  padding: '24px',
                  borderRadius: '14px',
                  border: `1px solid ${color.hex === '#F8FAF7' ? 'rgba(8,18,13,0.15)' : 'transparent'}`,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', opacity: 0.8 }}>
                    {color.name}
                  </span>
                  {copiedKey === `color-${idx}` ? (
                    <Check size={16} color={color.text} />
                  ) : (
                    <Copy size={14} style={{ opacity: 0.6 }} />
                  )}
                </div>

                <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '22px', fontWeight: '700' }}>
                  {color.hex}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
                  {color.rgb}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '12px', opacity: 0.9 }}>
                  {color.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Typography Guidelines */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <Type size={20} color="#67D6FF" />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '24px', fontWeight: '700', margin: 0 }}>
              Typography Hierarchy & Scale
            </h2>
          </div>

          <div style={{ 
            backgroundColor: isDarkCanvas ? 'rgba(255,255,255,0.03)' : 'rgba(8,18,13,0.03)', 
            borderRadius: '16px', 
            padding: '40px',
            border: `1px solid ${isDarkCanvas ? 'rgba(255,255,255,0.1)' : 'rgba(8,18,13,0.1)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '36px'
          }}>
            {/* Display Sora Specimen */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#69C36D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                Primary Header Font — Sora (Bold 800)
              </span>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 2.5vw, 42px)', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                Dhara AI — Precision Earth Intelligence
              </div>
            </div>

            {/* AI Designation Specimen */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#69C36D', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                AI Tech Modifier — Sora (SemiBold 600 in #69C36D)
              </span>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '28px', fontWeight: '600', color: '#69C36D', letterSpacing: '0.04em' }}>
                Dhara <span style={{ color: '#69C36D' }}>AI</span>
              </div>
            </div>

            {/* Manrope Tagline Specimen */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#E8C547', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                Tagline Font — Manrope (SemiBold 600, Generous Letter Spacing)
              </span>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: isDarkCanvas ? 'rgba(255,255,255,0.8)' : '#08120D' }}>
                WHERE EARTH MEETS INTELLIGENCE.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
