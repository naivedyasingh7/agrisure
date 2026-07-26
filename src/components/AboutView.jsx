import React from 'react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function AboutView() {
  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      
      {/* Header */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-14 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-urbanCoral)' }}>Since 2026</span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            We design, build, and deploy multi-source agricultural verification technologies across India.
          </h1>
        </div>
      </div>

      {/* Main Image */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-24">
          <div className="image-reveal-container" style={{ height: '420px', borderRadius: '16px', overflow: 'hidden' }}>
            <img 
              src={PINTEREST_IMAGES.heroCover} 
              alt="KrishiNetra AI agritech lab" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=1000';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
            />
          </div>
        </div>
      </div>

      {/* Brand values / coordinates */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }}>
        
        {/* Story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className="-title-3-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
            Ecosystem Verification is our Core Principle
          </h3>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown700)', lineHeight: '1.7' }}>
            KrishiNetra AI rose from a mission to turn complex crop insurance audits into instantaneous, tamper-proof assessments. Over the last decade, we have pioneered the use of Digital Crop Identities (DCI) fusing satellite NDVI indexes with smartphone compass vectors and weather telemetry.
          </p>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown700)', lineHeight: '1.7' }}>
            From high-value cotton fields needing pest loss analysis to flood-affected Basmati rice fields requiring cloudburst confirmation, our AI models evaluate claims within seconds.
          </p>
        </div>

        {/* Highlight Quote */}
        <div 
          style={{ 
            backgroundColor: 'var(--color-brightIvory100)', 
            padding: '40px', 
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={PINTEREST_IMAGES.designerProfile} 
              alt="Dr. Amit Verma" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400';
              }}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', flexShrink: 0 }} 
            />
            <div>
              <h4 className="-title-8-medium" style={{ fontSize: '16px' }}>Dr. Amit Verma</h4>
              <p className="-body-smaller-medium">Chief Agritech Architect</p>
            </div>
          </div>
          <p className="-body-medium" style={{ fontStyle: 'italic', color: 'var(--color-stoneBrown800)', fontSize: '16px', lineHeight: '1.5' }}>
            "True circular economy means creating items that will endure for centuries. We refuse to use single-use plastics or untreated wood that decays rapidly. Sustainable space planning is made for life."
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 1023px) {
          .g-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
