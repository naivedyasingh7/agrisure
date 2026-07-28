import React from 'react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function SustainabilityView() {
  const points = [
    {
      title: 'Solar-Powered Field Nodes',
      description: 'All field micro-weather stations and soil sensors operate on integrated solar panels with ultra-low power telemetry, requiring zero grid energy.'
    },
    {
      title: 'Low-Carbon Remote Sensing',
      description: 'By leveraging Sentinel-2 satellite infrared telemetry, field adjusters reduce unnecessary physical vehicle trips, lowering inspection carbon emissions.'
    },
    {
      title: 'Eco-Friendly Sensor Housings',
      description: 'Field sensor casings placed directly in farm soil are constructed with non-toxic, eco-friendly materials that leave zero microplastics in farm soil.'
    }
  ];

  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      
      {/* Header */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-14 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-forestGreen600)' }}>Eco Innovation</span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            Designing structures to last, while keeping our planet unharmed.
          </h1>
        </div>
      </div>

      {/* Hero Image */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-24">
          <div className="image-reveal-container" style={{ height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
            <img 
              src={PINTEREST_IMAGES.sustainabilityLand} 
              alt="Agricultural satellite inspection view" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
            />
          </div>
        </div>
      </div>

      {/* Points */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {points.map((point, idx) => (
          <div 
            key={idx} 
            style={{ 
              backgroundColor: 'var(--color-brightIvory25)', 
              padding: '30px', 
              borderRadius: '12px', 
              border: '1px solid rgba(36, 31, 33, 0.05)' 
            }}
          >
            <span className="-title-3-medium" style={{ fontSize: '32px', color: 'var(--color-forestGreen600)', display: 'block', marginBottom: '16px' }}>
              0{idx + 1}
            </span>
            <h4 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)', marginBottom: '12px' }}>
              {point.title}
            </h4>
            <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', lineHeight: '1.6' }}>
              {point.description}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .g-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
