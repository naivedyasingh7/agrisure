import React from 'react';
import { Smartphone, Cloud, Layers, Compass, HelpCircle } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function TechStackView() {
  const components = [
    {
      title: 'Mobile App Client (React Native)',
      tech: 'React Native + Voice Assist',
      desc: 'Features a Voice-First interface (rural-optimized, supports Hindi + regional languages). Runs a local on-device MobileNet model in offline mode to filter out poor lighting and blurry frames before upload.',
      icon: <Smartphone size={24} color="var(--color-urbanCoral)" />
    },
    {
      title: 'AI Verification (FastAPI + PyTorch)',
      tech: 'YOLOv8 + EfficientNet-B4',
      desc: 'Classifies crop type via EfficientNet and segments crop damage areas via YOLOv8. AI outputs damage maps and bounding coordinates to flag exact decay patterns.',
      icon: <Layers size={24} color="var(--color-forestGreen600)" />
    },
    {
      title: 'Multi-Source Fusion Engine & Sentinel Hub Satellite',
      tech: 'Sentinel Hub API Key (10m Sentinel-2 Infrared) + IMD Weather API',
      desc: 'Connects directly to Sentinel Hub using API Key (PLAKdf0aec42496540158b9ff7cc32b2d1fe) to pull real-time 10m spatial resolution Sentinel-2 Near-Infrared (NIR), NDVI vegetation heatmaps, and flood risk overlays for any farm coordinates.',
      icon: <Cloud size={24} color="var(--color-replasticVistaBlue)" />
    },
    {
      title: 'Trust & Anti-Fraud Layer',
      tech: 'GPS Spoof Protection + Image Hash Check',
      desc: 'Calculates local sha256 checksums to flag duplicate/downloaded files. Extracts metadata GPS coordinate history and matches it against crop registry boundaries to prevent geo-spoofing.',
      icon: <Compass size={24} color="var(--color-red)" />
    }
  ];

  return (
    <section style={{ padding: '60px 0 100px 0' }}>

      {/* Header */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-14 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-forestGreen600)' }}>System Architecture</span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            Dhara AI Tech Stack
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            We merge on-device client intelligence with multi-layer cloud vision and satellite telemetry.
          </p>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="g-row" style={{ marginBottom: '60px' }}>
        <div className="g-col xxl-24">
          <div className="image-reveal" style={{ height: '350px', borderRadius: '16px', overflow: 'hidden' }}>
            <img
              src={PINTEREST_IMAGES.heroCover}
              alt="Tech stack visual"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=1000';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {components.map((comp, idx) => (
          <div
            key={idx}
            className="animate-on-scroll"
            style={{
              backgroundColor: 'var(--color-brightIvory25)',
              padding: '36px',
              borderRadius: '12px',
              border: '1px solid rgba(36, 31, 33, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-brightIvory50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {comp.icon}
              </div>
              <div>
                <h4 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
                  {comp.title}
                </h4>
                <span className="-body-smaller-medium" style={{ color: 'var(--color-stoneBrown500)' }}>
                  {comp.tech}
                </span>
              </div>
            </div>

            <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', lineHeight: '1.6' }}>
              {comp.desc}
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
