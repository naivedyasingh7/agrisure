import React from 'react';
import { ArrowDown, Play, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function CollectionsCTA({ setActiveView, onCropClick }) {
  const pillars = [
    {
      index: '01',
      id: 'dci',
      cropKey: 'rice',
      label: 'Digital Crop Identity',
      tagClass: '-urban',
      tagline: 'Growth history, damage progression, and location tracking over a complete timeline.',
      description: 'AgriSure establishes an unalterable digital twin for every insured land parcel. By recording weekly Sentinel-2 NDVI satellite telemetry, growth stage benchmarks, and micro-climate history, adjusters obtain full ground-truth visibility from seed sowing to harvest.',
      features: [
        '🌿 Sentinel-2 Multispectral Satellite Integration (10m Resolution)',
        '📍 Geofenced Land Parcel Boundaries & Historical Health Scoring'
      ],
      img: PINTEREST_IMAGES.krishinetraHero,
      actionLabel: 'Launch DCI Timeline',
      actionView: 'registry'
    },
    {
      index: '02',
      id: 'proof',
      cropKey: 'cotton',
      label: 'Proof-of-Field Capture',
      tagClass: '-nature',
      tagline: 'Guided 3-second motion check ensuring physical field presence and zero duplicate fakes.',
      description: 'Eliminate remote photo spoofing and pre-recorded video fraud. Our mobile capture protocol uses 3D gyro-compass tracking, real-time exposure balance checks, and embedded location-timestamp stamps to guarantee physical inspection authenticity.',
      features: [
        '📱 3D Gyro-Compass Vector & EXIF Geofence Anti-Spoofing',
        '⏰ Embedded Camera Timestamp & Registered Plot Cross-Check'
      ],
      img: PINTEREST_IMAGES.heroCover || PINTEREST_IMAGES.farmWaterlogged,
      actionLabel: 'Run Capture Simulator',
      actionView: 'demo'
    },
    {
      index: '03',
      id: 'fusion',
      cropKey: 'wheat',
      label: 'Intelligence Fusion',
      tagClass: '-replastic',
      tagline: 'Cross-validating YOLOv8 vision scores with local IMD rain gauges and satellite vegetation indices.',
      description: 'By fusing PyTorch YOLOv8 crop damage segmentation with automated IMD rain gauge alerts and Sentinel vegetative drop analysis, AgriSure removes subjective adjuster bias and validates natural disaster severity automatically.',
      features: [
        '⚡ Live PyTorch YOLOv8 Crop Loss Segmentation Model',
        '🌧️ IMD Weather Station Telemetry & Rain Gauge Anomaly Matching'
      ],
      img: PINTEREST_IMAGES.sustainabilityLand || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1400',
      actionLabel: 'Check Fusion Stack',
      actionView: 'tech'
    },
    {
      index: '04',
      id: 'security',
      cropKey: 'maize',
      label: 'Trust & Anti-Fraud',
      tagClass: '-golf',
      tagline: 'Stamping image hashes onto the registry, verifying metadata, and blocking fake locations.',
      description: 'Every submitted claim inspection generates a SHA-256 cryptographic hash anchored to Cloud PostgreSQL. Duplicated crop photos across different insurance claims are immediately detected and blocked, protecting insurers against double payouts.',
      features: [
        '🔐 SHA-256 Cryptographic Hash Fingerprinting',
        '🛡️ Cloud PostgreSQL Ledger & Verifiable Claim Certificates'
      ],
      img: PINTEREST_IMAGES.wheatField || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1400',
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
              <div key={p.id} className="collection-item">
                
                {/* Media Column */}
                <div 
                  className="collection-media image-reveal" 
                  onClick={() => onCropClick && onCropClick(p.cropKey || 'rice')}
                  style={{ backgroundColor: 'var(--color-brightIvory200)', cursor: 'pointer', position: 'relative' }}
                  title={`Click to open ${p.label} Crop Intelligence Modal`}
                >
                  <img 
                    src={p.img} 
                    alt={`${p.label} diagram showcase`} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200';
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

                  <h3 className="-title-2-medium animate-on-scroll" style={{ color: 'var(--color-stoneBrown800)', fontSize: 'clamp(22px, 1.6vw + 14px, 34px)', lineHeight: '1.25' }}>
                    {p.tagline}
                  </h3>

                  <p className="-body-medium animate-on-scroll" style={{ color: 'var(--color-stoneBrown700)', fontSize: '15px', lineHeight: '1.6' }}>
                    {p.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    {p.features.map((feat, idx) => (
                      <div key={idx} style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-stoneBrown800)', backgroundColor: 'rgba(36, 31, 33, 0.04)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(36, 31, 33, 0.08)' }}>
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '10px' }}>
                    <button 
                      onClick={() => setActiveView(p.actionView)}
                      className="button-premium dark"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px' }}
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
