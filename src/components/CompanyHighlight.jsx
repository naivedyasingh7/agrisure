import React from 'react';
import { PINTEREST_IMAGES } from '../assets/images';
import { ArrowUpRight } from 'lucide-react';

export default function CompanyHighlight({ setActiveView, onCropClick }) {
  const news = [
    {
      title: 'Reducing Crop Payout Disputes by 74% with Digital Crop Identities',
      date: 'June 21, 2025',
      img: PINTEREST_IMAGES.krishinetraHero
    },
    {
      title: 'Regional government launches automated agritech pilots for 12,000 paddy farmers',
      date: 'May 04, 2025',
      img: PINTEREST_IMAGES.heroCover
    }
  ];

  return (
    <section className="company-highlight" style={{ padding: '60px 0', borderTop: '1px solid rgba(36, 31, 33, 0.1)' }}>
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '40px' }}>
        
        {/* Main highlight text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h4 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)', fontSize: '14px', letterSpacing: '0.05em' }}>
              KRISHINETRA AI · EST. 2026
            </h4>
            <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'rgba(36, 31, 33, 0.1)' }}></div>
          </div>

          <div 
            className="image-reveal" 
            onClick={() => onCropClick && onCropClick('sugarcane')}
            style={{ height: '260px', width: '100%', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
            title="Click to view Sugarcane Crop Intelligence"
          >
            <img 
              src={PINTEREST_IMAGES.sustainabilityLand} 
              alt="Ecosystem reserve satellite tracking overview" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          <h2 className="animate-on-scroll" style={{ color: 'var(--color-stoneBrown800)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 1.1vw + 9px, 23px)', fontWeight: '400', lineHeight: '1.45', letterSpacing: '-0.01em' }}>
            Instead of sending field investigators to review claims months after a disaster, KrishiNetra AI evaluates crop health instantly. By layering satellite data, precipitation timelines, and guided farmer videos, we reduce claim settlement times from 90 days to seconds.
          </h2>
        </div>

        {/* Recent news sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <p className="-body-smaller-medium" style={{ color: 'var(--color-stoneBrown500)' }}>
              Agritech Logs ↓
            </p>
            <div style={{ height: '1px', backgroundColor: 'rgba(36, 31, 33, 0.1)', marginTop: '8px' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {news.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveView('demo')}
                style={{ 
                  display: 'flex', 
                  gap: '20px', 
                  cursor: 'pointer',
                  borderBottom: idx === 0 ? '1px solid rgba(36, 31, 33, 0.05)' : 'none',
                  paddingBottom: idx === 0 ? '24px' : '0'
                }}
              >
                <div style={{ width: '120px', height: '90px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h4 className="-title-8-medium" style={{ fontSize: '14px', color: 'var(--color-stoneBrown800)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <span className="-body-small-medium" style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)' }}>
                      {item.date}
                    </span>
                    <ArrowUpRight size={12} color="var(--color-stoneBrown500)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1023px) {
          .company-highlight > .g-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
