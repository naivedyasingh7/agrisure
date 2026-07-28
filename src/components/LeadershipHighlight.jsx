import React from 'react';
import { PINTEREST_IMAGES } from '../assets/images';
import { ArrowRight } from 'lucide-react';

export default function LeadershipHighlight({ setActiveView }) {
  return (
    <section className="leadership-highlight-section" style={{ padding: '80px 0', borderTop: '1px solid rgba(36, 31, 33, 0.1)' }}>
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
        
        {/* Left column - Partner profile & statement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div className="category-tag -forest" style={{ alignSelf: 'flex-start', fontSize: '12px', padding: '6px 14px' }}>
            Platform Philosophy
          </div>

          <blockquote className="animate-on-scroll" style={{ borderLeft: '4px solid var(--color-stoneBrown700)', paddingLeft: '24px' }}>
            <h2 className="-title-2-medium" style={{ fontSize: '32px', color: 'var(--color-stoneBrown800)', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.3' }}>
              "We don't just detect crops — we verify truth."
            </h2>
          </blockquote>

          <p className="-body-medium animate-on-scroll" style={{ color: 'var(--color-stoneBrown700)', lineHeight: '1.6' }}>
            Our mission is to establish absolute trust between farmers and insurance institutions. By combining guided video motion streams (which prevent fake photo uploads) with GPS lock verification, Sentinel satellite NDVI index validation, and local weather telemetry, we create a secure and automated payout engine.
          </p>

          <button 
            onClick={() => {
              setActiveView('demo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="button-premium outline"
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Launch Claim Simulator <ArrowRight size={14} />
          </button>
        </div>

        {/* Right column - Project environment location view */}
        <div className="image-reveal" style={{ height: '460px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
          <img 
            src={PINTEREST_IMAGES.sustainabilityLand} 
            alt="DCI satellite inspection" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            backgroundColor: 'rgba(36, 31, 33, 0.75)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Sentinel-2 Ground Truthing Sector
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1023px) {
          .leadership-highlight-section > .g-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .leadership-highlight-section .image-reveal {
            height: 350px !important;
          }
        }
      `}</style>
    </section>
  );
}
