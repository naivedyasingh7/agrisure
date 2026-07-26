import React from 'react';
import { PINTEREST_IMAGES } from '../assets/images';
import { ArrowRight } from 'lucide-react';

export default function Hero({ setActiveView }) {
  return (
    <section className="hero-section">
      <div className="g-row">
        <div className="g-col xxl-16 sm-22">
          <h1 className="-title-1 animate-on-scroll" style={{ color: 'var(--color-stoneBrown800)', marginBottom: '30px' }}>
            From Crop Image<br />
            to Claim Decision<br />
            in Seconds.
          </h1>
        </div>
      </div>

      <div className="g-row">
        <div className="g-col xxl-24">
          <div className="hero-images-grid">
            {/* Left large drone agritech fields cover */}
            <div className="hero-image-large image-reveal">
              <img 
                src={PINTEREST_IMAGES.krishinetraHero} 
                alt="KrishiNetra agricultural crop field layouts" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Right smaller card pointing to Live Demo */}
            <div className="hero-image-small" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
              <img 
                src={PINTEREST_IMAGES.farmWaterlogged} 
                alt="Waterlogged Farm Verification" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 1 }}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(10,15,20,0.85) 100%)', zIndex: 2 }} />
              
              <div style={{ position: 'relative', zIndex: 3, padding: '30px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                <h3 className="-title-3-medium animate-on-scroll" style={{ color: '#ffffff', marginBottom: '10px', fontSize: '26px', lineHeight: '1.2', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  We don't just detect crops—we verify truth.
                </h3>
                <p className="-body-medium animate-on-scroll" style={{ color: 'rgba(255,255,255,0.92)', marginBottom: '24px', fontSize: '14px', lineHeight: '1.5', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                  Guided 3-second guided video scans, GPS spoof checks, and satellite anomaly cross-matching.
                </p>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setActiveView('demo')}
                    className="button-premium dark"
                    style={{ 
                      backgroundColor: 'var(--color-flourYellow)', 
                      color: 'var(--color-stoneBrown800)',
                      border: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Live Simulator <ArrowRight size={14} />
                  </button>
                  <button 
                    onClick={() => setActiveView('registry')}
                    className="button-premium outline"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                      borderColor: 'rgba(255, 255, 255, 0.4)', 
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    Explore DCI Timeline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
