import React from 'react';
import { Camera, RefreshCw, HandCoins } from 'lucide-react';

export default function WorkflowOverview() {
  const steps = [
    {
      title: '1. Guided Capture',
      description: 'Farmers record a guided 3-second field video. MobileNet extracts optimal frames and verifies motion vectors to block fake images or web downloads.',
      icon: <Camera size={32} color="var(--color-urbanCoral)" />
    },
    {
      title: '2. Multi-Source Fusion',
      description: 'The cloud model fuses YOLOv8 crop damage ratios with Sentinel-2 NDVI vegetative health drops and local IMD rainfall data anomalies.',
      icon: <RefreshCw size={32} color="var(--color-forestGreen600)" />
    },
    {
      title: '3. Automatic Payout',
      description: 'The claim recommendation engine auto-calculates damage severity percentage and triggers treasury payout orders in seconds.',
      icon: <HandCoins size={32} color="var(--color-replasticVistaBlue)" />
    }
  ];

  return (
    <section className="workflow-overview-section" style={{ padding: '80px 0', borderTop: '1px solid rgba(36, 31, 33, 0.1)' }}>
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            style={{ 
              backgroundColor: 'var(--color-brightIvory25)', 
              padding: '40px', 
              borderRadius: '12px', 
              border: '1px solid rgba(36, 31, 33, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '12px', 
              backgroundColor: 'var(--color-brightIvory50)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {step.icon}
            </div>
            
            <h3 className="-title-8-medium" style={{ fontSize: '20px', color: 'var(--color-stoneBrown800)' }}>
              {step.title}
            </h3>

            <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', lineHeight: '1.6' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .workflow-overview-section > .g-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
