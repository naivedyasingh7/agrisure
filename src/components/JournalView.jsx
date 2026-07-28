import React from 'react';
import { PINTEREST_IMAGES } from '../assets/images';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function JournalView() {
  const posts = [
    {
      title: 'How satellite infrared telemetry prevents false claim payouts',
      summary: 'An extensive study on combining multispectral Sentinel-2 satellite imagery with localized AI ground video scanners to verify crop damage within 3 seconds.',
      date: 'June 3, 2025',
      author: 'Agritech Science Panel',
      img: PINTEREST_IMAGES.natureSign
    },
    {
      title: 'National Agritech Pilot Project for Paddy Farmers',
      summary: 'Implementing automated crop identity registration across 230 agricultural blocks. We verified crop stress profiles with 98% anti-spoof accuracy.',
      date: 'April 14, 2025',
      author: 'Dhara AI Lab',
      img: PINTEREST_IMAGES.heroCover
    }
  ];

  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      
      {/* Header */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-14 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-replasticVistaBlue)' }}>Case Studies & News</span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            The Floema Journal
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            Discover our reports on landscape wayfinding, material innovation, and historical trail developments.
          </p>
        </div>
      </div>

      {/* Case studies list */}
      <div className="g-row" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {posts.map((post, idx) => (
          <div 
            key={idx} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 1fr', 
              gap: '60px', 
              alignItems: 'center',
              borderBottom: '1px solid rgba(36, 31, 33, 0.08)',
              paddingBottom: '60px'
            }}
          >
            
            {/* Visual */}
            <div className="image-reveal-container" style={{ height: '350px', borderRadius: '12px', overflow: 'hidden' }}>
              <img 
                src={post.img} 
                alt={post.title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=1000';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '20px', color: 'var(--color-stoneBrown500)', fontSize: '13px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} /> {post.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} /> {post.author}
                </span>
              </div>

              <h3 className="-title-3-medium" style={{ color: 'var(--color-stoneBrown800)', lineHeight: '1.3' }}>
                {post.title}
              </h3>

              <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', lineHeight: '1.6' }}>
                {post.summary}
              </p>

              <button 
                className="button-premium outline"
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
              >
                Read Case Study <ArrowRight size={14} />
              </button>
            </div>

          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .g-row > div {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </section>
  );
}
