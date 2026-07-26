import React from 'react';
import { ArrowDown, Play, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function CollectionsCTA({ setActiveView }) {
  const pillars = [
    {
      index: '01',
      id: 'dci',
      label: 'Digital Crop Identity',
      tagClass: '-urban',
      tagline: 'Growth history, damage progression, and location tracking over a timeline',
      img: PINTEREST_IMAGES.krishinetraHero,
      actionLabel: 'Launch DCI Timeline',
      actionView: 'registry'
    },
    {
      index: '02',
      id: 'proof',
      label: 'Proof-of-Field Capture',
      tagClass: '-nature',
      tagline: 'Guided 3-second motion check ensuring physical field presence and zero duplicate fakes',
      img: PINTEREST_IMAGES.farmWaterlogged,
      actionLabel: 'Run Capture Simulator',
      actionView: 'demo'
    },
    {
      index: '03',
      id: 'fusion',
      label: 'Intelligence Fusion',
      tagClass: '-replastic',
      tagline: 'Cross-validating YOLOv8 vision scores with local IMD rain gauges and satellite vegetation indices',
      img: PINTEREST_IMAGES.heroCover,
      actionLabel: 'Check Fusion Stack',
      actionView: 'tech'
    },
    {
      index: '04',
      id: 'security',
      label: 'Trust & Anti-Fraud',
      tagClass: '-golf',
      tagline: 'Stamping image hashes onto the registry, verifying metadata, and blocking fake locations',
      img: PINTEREST_IMAGES.sustainabilityLand,
      actionLabel: 'View Trust Stack',
      actionView: 'tech'
    }
  ];

  return (
    <section className="collections-cta-section">
      <div className="g-row explore-header">
        <p className="-body-small-medium" style={{ color: 'var(--color-stoneBrown600)' }}>
          Core pillars
        </p>
        <div className="progress-line">
          <div className="progress-line-fill" style={{ width: '45%' }}></div>
        </div>
        <p className="-body-small-medium" style={{ color: 'var(--color-stoneBrown600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Explore System Features <ArrowDown size={14} />
        </p>
      </div>

      <div className="g-row">
        <div className="g-col xxl-24">
          <div className="collections-list">
            {pillars.map((p) => (
              <div key={p.id} className="collection-item" style={{ marginBottom: '40px' }}>
                
                {/* Media Column */}
                <div className="collection-media image-reveal" style={{ backgroundColor: 'var(--color-brightIvory200)' }}>
                  <img 
                    src={p.img} 
                    alt={`${p.label} diagram showcase`} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 1, display: 'block' }}
                  />
                </div>

                {/* Content Column */}
                <div className="collection-info">
                  <div className="collection-header-row animate-on-scroll">
                    <span className="collection-index">{p.index}</span>
                    <div className={`category-tag ${p.tagClass}`}>
                      <span>{p.label}</span>
                    </div>
                  </div>

                  <h4 className="-title-4-medium animate-on-scroll" style={{ color: 'var(--color-stoneBrown800)' }}>
                    {p.tagline}
                  </h4>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
                    <button 
                      onClick={() => setActiveView(p.actionView)}
                      className="button-premium dark"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      {p.actionLabel} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
