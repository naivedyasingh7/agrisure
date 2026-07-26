import React, { useState } from 'react';
import { Calendar, ShieldCheck, CloudRain, ShieldAlert, Cpu } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function DciRegistry() {
  const [selectedFarm, setSelectedFarm] = useState('farm-1');

  const farms = [
    {
      id: 'farm-1',
      name: 'Karan Singh - Rice Field (Condeixa Block)',
      crop: 'Rice (Basmati)',
      location: '28.6139° N, 77.2090° E',
      status: 'Claim Pending Assessment',
      history: [
        { week: 'Week 1', date: 'June 02', health: 92, ndvi: 0.72, weather: 'Normal Rainfall', note: 'Sowing completed, uniform germination detected.' },
        { week: 'Week 2', date: 'June 09', health: 89, ndvi: 0.68, weather: 'Normal Rainfall', note: 'Vegetative growth index optimal.' },
        { week: 'Week 3', date: 'June 16', health: 85, ndvi: 0.65, weather: '+45% Rainfall (Excessive)', note: 'Light puddling in low zones. Sub-satellite warnings.' },
        { week: 'Week 4', date: 'June 23', health: 40, ndvi: 0.31, weather: '+98% Rain (Cloudburst)', note: 'Severe waterlogging. Submergence damage confirmed via video.' }
      ]
    },
    {
      id: 'farm-2',
      name: 'Ramesh Patel - Cotton Plantation',
      crop: 'Bt Cotton',
      location: '22.2587° N, 71.1924° E',
      status: 'Healthy / Monitored',
      history: [
        { week: 'Week 1', date: 'June 04', health: 95, ndvi: 0.81, weather: 'Normal Temp', note: 'Germination rate 94%. Optimal soil moisture.' },
        { week: 'Week 2', date: 'June 11', health: 94, ndvi: 0.80, weather: 'Warm wind', note: 'Branching stage initiated. Pest trap indicators clean.' },
        { week: 'Week 3', date: 'June 18', health: 91, ndvi: 0.78, weather: 'Normal', note: 'Flower bud formation observed. Geo-proof checks passed.' },
        { week: 'Week 4', date: 'June 25', health: 88, ndvi: 0.75, weather: 'High Humidity', note: 'Spotted bollworm alerts nearby. Health remains optimal.' }
      ]
    }
  ];

  const activeFarm = farms.find(f => f.id === selectedFarm);

  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      
      {/* Header */}
      <div className="g-row" style={{ marginBottom: '40px' }}>
        <div className="g-col xxl-14 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-urbanCoral)' }}>Digital Crop Identity (DCI)</span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            DCI Registry Timeline
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            We replace manual inspections with transparent crop progression health profiles backed by weather, satellite, and geo-data.
          </p>
        </div>
      </div>

      {/* Select Farm Toggle */}
      <div className="g-row animate-on-scroll" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {farms.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFarm(f.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '24px',
                border: '1px solid',
                borderColor: selectedFarm === f.id ? 'var(--color-stoneBrown800)' : 'var(--color-stoneBrown300)',
                backgroundColor: selectedFarm === f.id ? 'var(--color-stoneBrown800)' : 'transparent',
                color: selectedFarm === f.id ? 'var(--color-brightIvory25)' : 'var(--color-stoneBrown700)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* DCI Timeline Cards */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        
        {/* Left - Progression Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
            Historical progression data
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', paddingLeft: '30px' }}>
            {/* Vertical timeline line */}
            <div style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '8px',
              width: '2px',
              backgroundColor: 'rgba(36, 31, 33, 0.1)'
            }}></div>

            {activeFarm.history.map((hist, idx) => (
              <div key={idx} className="animate-on-scroll" style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-29px',
                  top: '6px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: hist.health > 50 ? 'var(--color-forestGreen600)' : 'var(--color-red)',
                  border: '3px solid var(--color-brightIvory50)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}></div>

                <div style={{
                  backgroundColor: 'var(--color-brightIvory25)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(36, 31, 33, 0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="-body-small-medium" style={{ color: 'var(--color-stoneBrown500)' }}>{hist.week}</span>
                      <span className="-body-medium" style={{ fontWeight: 'bold' }}>{hist.date}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)' }}>
                        NDVI: <strong>{hist.ndvi}</strong>
                      </span>
                      <span style={{ fontSize: '13px', color: hist.health > 50 ? 'var(--color-forestGreen600)' : 'var(--color-red)', fontWeight: 'bold' }}>
                        Health Index: {hist.health}%
                      </span>
                    </div>
                  </div>

                  <p className="-body-medium" style={{ color: 'var(--color-stoneBrown700)', lineHeight: '1.5' }}>
                    {hist.note}
                  </p>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px', alignItems: 'center' }}>
                    <span className="category-tag -nature" style={{ fontSize: '10px', padding: '4px 10px' }}>
                      <CloudRain size={10} /> {hist.weather}
                    </span>
                    <span className="category-tag -urban" style={{ fontSize: '10px', padding: '4px 10px', backgroundColor: 'rgba(4, 45, 43, 0.05)', color: 'var(--color-forestGreen600)' }}>
                      <ShieldCheck size={10} /> GPS Geo-Proof Consistent
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Profile Information Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{
            backgroundColor: 'var(--color-brightIvory100)',
            padding: '30px',
            borderRadius: '12px',
            border: '1px solid rgba(36, 31, 33, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
              Profile Overview
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-stoneBrown600)' }}>Registered Crop:</span>
                <strong>{activeFarm.crop}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-stoneBrown600)' }}>Coordinates:</span>
                <strong>{activeFarm.location}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-stoneBrown600)' }}>Status:</span>
                <span style={{ color: activeFarm.status.includes('Pending') ? 'var(--color-red)' : 'var(--color-forestGreen600)', fontWeight: 'bold' }}>
                  {activeFarm.status}
                </span>
              </div>
            </div>

            {/* Simulated Live visual */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginTop: '10px' }}>
              <img 
                src={selectedFarm === 'farm-1' ? PINTEREST_IMAGES.farmWaterlogged : PINTEREST_IMAGES.krishinetraHero} 
                alt="Crop view" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px' }}>
              <Cpu size={24} color="var(--color-stoneBrown700)" />
              <p className="-body-medium" style={{ fontSize: '12px', color: 'var(--color-stoneBrown600)' }}>
                This DCI profile is encrypted and synced with satellite Sentinel-2 and local automated IMD weather channels.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
