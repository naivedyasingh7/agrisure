import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Sun, CheckCircle, Database, HelpCircle } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function ClaimSimulator({ onApproveClaim }) {
  const [activeScenario, setActiveScenario] = useState('rice');
  const [pipelineStep, setPipelineStep] = useState(0); // 0: Idle, 1: Scanning Video, 2: Fusing Data, 3: Completed
  const [scanProgress, setScanProgress] = useState(0);
  const [claimStatus, setClaimStatus] = useState('pending'); // pending, approved, rejected
  const [verifyDetails, setVerifyDetails] = useState(null);

  const scenarios = {
    rice: {
      title: 'Waterlogged Rice field (Karan Singh)',
      location: 'Condeixa Sector, Block 4',
      crop: 'Rice (Basmati)',
      img: PINTEREST_IMAGES.farmWaterlogged,
      heatmapColor: 'rgba(255, 0, 77, 0.45)', // red highlight overlay
      damagePercent: 78,
      suggestedPayout: 18500,
      riskScore: 92,
      weatherAnomaly: '+98% Rainfall (Extreme Cloudburst)',
      satelliteNdvi: '0.31 (Severe Loss of Greenness)',
      aiExplanation: 'The assessment system confirms waterlogging-induced crop stress. The damage is validated by +98% rainfall deviation from automated local IMD gauges and Sentinel-2 NDVI vegetative health drop to 0.31.'
    },
    cotton: {
      title: 'Pest-Infested Cotton (Ramesh Patel)',
      location: 'Asturias Sector, Plot B',
      crop: 'Bt Cotton',
      img: PINTEREST_IMAGES.cottonField || PINTEREST_IMAGES.krishinetraHero,
      heatmapColor: 'rgba(233, 231, 120, 0.45)', // yellow highlight overlay
      damagePercent: 45,
      suggestedPayout: 9200,
      riskScore: 68,
      weatherAnomaly: '+12% Rainfall (Normal Deviation)',
      satelliteNdvi: '0.52 (Moderate Leaf Canopy Loss)',
      aiExplanation: 'AI models (YOLOv8) detect localized bollworm spots across 45% of the leaf surfaces. The satellite records moderate canopy decay. Weather indices are normal, confirming organic infestation rather than weather anomaly.'
    },
    wheat: {
      title: 'Drought-Stressed Wheat (Devendra Rao)',
      location: 'Sebal Sector, Lote 12',
      crop: 'Wheat (Durum)',
      img: PINTEREST_IMAGES.wheatField || PINTEREST_IMAGES.heroCover,
      heatmapColor: 'rgba(247, 108, 70, 0.45)', // orange highlight overlay
      damagePercent: 62,
      suggestedPayout: 14500,
      riskScore: 84,
      weatherAnomaly: '-64% Rainfall (Severe Drought Stress)',
      satelliteNdvi: '0.40 (Drying Vegetation anomaly)',
      aiExplanation: 'The system flags severe drought stress. Heat mapping shows dry soil water-deficit signatures. This aligns with -64% rainfall anomaly during critical vegetative growth weeks.'
    }
  };

  const current = scenarios[activeScenario];

  const startPipeline = () => {
    setPipelineStep(1);
    setScanProgress(0);
    setClaimStatus('pending');
    setVerifyDetails(null);
    
    // Simulate Video anti-fraud scanner progress bar
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Call API
          fetch('http://localhost:8000/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoName: `${activeScenario}_proof.mp4` })
          })
          .then(res => res.json())
          .then(data => {
            setVerifyDetails(data);
            setPipelineStep(2);
            
            return fetch('http://localhost:8000/api/assess', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ scenario: activeScenario })
            });
          })
          .then(res => res.json())
          .then(() => {
            setPipelineStep(3);
          })
          .catch(err => {
            console.log("Using client-side fallback simulation:", err);
            setVerifyDetails({
              antiSpoofCheck: "Passed",
              gpsCoordinatesCheck: "Passed (Match Registry)",
              imageHash: "sha256:7f4ea013bc...",
              duplicateCheck: "No Duplicates Found (Unique)",
              motionFramesExtracted: 24
            });
            setPipelineStep(2);
            setTimeout(() => {
              setPipelineStep(3);
            }, 1000);
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleScenarioChange = (id) => {
    setActiveScenario(id);
    setPipelineStep(0);
    setClaimStatus('pending');
    setVerifyDetails(null);
  };

  const handleDecision = (decision) => {
    setClaimStatus(decision);
    
    fetch('http://localhost:8000/api/decision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        decision: decision,
        payout: current.suggestedPayout,
        crop: current.crop
      })
    })
    .then(res => res.json())
    .then(data => {
      onApproveClaim(data.claimsPending);
    })
    .catch(err => {
      console.log("Decision API Error, using fallback:", err);
      if (decision === 'approved') {
        onApproveClaim();
      }
    });
  };

  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      
      {/* Header */}
      <div className="g-row" style={{ marginBottom: '40px' }}>
        <div className="g-col xxl-14 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-red)' }}>KrishiNetra Live Engine</span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            Interactive Claim Assessment
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            Simulate our 3-second field capture, satellite-weather fusion engine, and instant recommended payout decisions.
          </p>
        </div>
      </div>

      {/* Select Scenario */}
      <div className="g-row animate-on-scroll" style={{ marginBottom: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {Object.keys(scenarios).map((key) => (
          <button
            key={key}
            onClick={() => handleScenarioChange(key)}
            className="button-premium outline"
            style={{
              borderColor: activeScenario === key ? 'var(--color-stoneBrown800)' : 'rgba(0,0,0,0.1)',
              backgroundColor: activeScenario === key ? 'var(--color-stoneBrown800)' : 'transparent',
              color: activeScenario === key ? 'white' : 'var(--color-stoneBrown700)'
            }}
          >
            {key.toUpperCase()}: {scenarios[key].crop} Damage
          </button>
        ))}
      </div>

      {/* Pipeline Simulator Sandbox */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px' }}>
        
        {/* Left Panel: Raw Media & Heatmap Overlay */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(36,31,33,0.1)' }}>
            <img 
              src={current.img} 
              alt={current.title} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1000';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
            />
            
            {/* Heatmap overlay (Only shown if pipeline finishes) */}
            {pipelineStep === 3 && (
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '50%',
                height: '45%',
                backgroundColor: current.heatmapColor,
                borderRadius: '50%',
                filter: 'blur(30px)',
                mixBlendMode: 'multiply',
                transition: 'all 0.5s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--color-red)'
              }}>
                <span style={{ 
                  color: 'white', 
                  fontSize: '11px', 
                  fontWeight: 'bold', 
                  backgroundColor: 'rgba(0,0,0,0.6)', 
                  padding: '4px 10px', 
                  borderRadius: '10px' 
                }}>
                  AI Heatmap: YOLOv8 Segmented
                </span>
              </div>
            )}

            {/* Video anti-fraud guide overlay during scanning */}
            {pipelineStep === 1 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(36, 31, 33, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '30px',
                textAlign: 'center'
              }}>
                <ShieldCheck size={48} color="var(--color-flourYellow)" style={{ marginBottom: '16px' }} />
                <h4 className="-title-8-medium">Guided Motion Verification...</h4>
                <p className="-body-medium" style={{ color: 'var(--color-brightIvory300)', marginTop: '8px' }}>
                  Anti-spoof: Checking compass, phone acceleration vectors, and duplicate hash structures...
                </p>
                
                <div style={{ width: '80%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '24px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${scanProgress}%`, backgroundColor: 'var(--color-flourYellow)' }}></div>
                </div>
              </div>
            )}

            {/* Weather / Satellite Fusion Loader */}
            {pipelineStep === 2 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(4, 45, 43, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '30px',
                textAlign: 'center'
              }}>
                <Database size={48} color="var(--color-golfCeladon)" style={{ marginBottom: '16px' }} />
                <h4 className="-title-8-medium">Fusing Space & Climate Intelligence...</h4>
                <p className="-body-medium" style={{ color: 'var(--color-brightIvory300)', marginTop: '8px' }}>
                  Polling Sentinel-2 NDVI vegetation parameters and local weather rain gauges...
                </p>
              </div>
            )}
          </div>

          {/* Trigger button */}
          {pipelineStep === 0 && (
            <button 
              onClick={startPipeline}
              className="button-premium dark"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}
            >
              <Play size={18} fill="white" /> Launch automated proof assessment
            </button>
          )}

          {pipelineStep === 3 && (
            <button 
              onClick={() => setPipelineStep(0)}
              className="button-premium outline"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}
            >
              <RotateCcw size={18} /> Reset Inspection Simulator
            </button>
          )}
        </div>

        {/* Right Panel: Scoring Panel & Recommendation Decision */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{
            backgroundColor: 'var(--color-brightIvory100)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid rgba(36,31,33,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <h3 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
              Inspection Decision Recommendations
            </h3>

            {pipelineStep < 3 ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--color-stoneBrown500)' }}>
                <AlertTriangle size={32} style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <p className="-body-big-medium">No active assessment data.</p>
                <p className="-body-medium" style={{ marginTop: '8px' }}>Start the proof scanning to evaluate crop telemetry and automatic payouts.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Confidence Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', textTransform: 'uppercase' }}>Damage</span>
                    <h3 className="-title-2-medium" style={{ fontSize: '28px', color: 'var(--color-red)' }}>{current.damagePercent}%</h3>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', textTransform: 'uppercase' }}>Risk index</span>
                    <h3 className="-title-2-medium" style={{ fontSize: '28px', color: 'var(--color-stoneBrown800)' }}>{current.riskScore}</h3>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', textTransform: 'uppercase' }}>Confidence</span>
                    <h3 className="-title-2-medium" style={{ fontSize: '28px', color: 'var(--color-forestGreen600)' }}>98%</h3>
                  </div>
                </div>

                {/* Satellite Weather details */}
                <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-stoneBrown600)' }}>🛰️ Satellite NDVI:</span>
                    <strong>{current.satelliteNdvi}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-stoneBrown600)' }}>🌧️ Local Weather:</span>
                    <strong>{current.weatherAnomaly}</strong>
                  </div>
                </div>

                {/* Suggested claim Payout */}
                <div style={{ 
                  backgroundColor: 'rgba(4, 45, 43, 0.05)', 
                  border: '1px solid rgba(4, 45, 43, 0.15)', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '10px'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-forestGreen600)', textTransform: 'uppercase', fontWeight: 'bold' }}>Suggested Claim Payout</span>
                    <h2 className="-title-2-medium" style={{ fontSize: '32px', color: 'var(--color-forestGreen600)' }}>
                      ₹{current.suggestedPayout.toLocaleString('en-IN')}
                    </h2>
                  </div>
                  <div style={{ backgroundColor: 'var(--color-forestGreen600)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                    Auto-Computed
                  </div>
                </div>

                {/* AI Explanation Text */}
                <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', fontSize: '13px', color: 'var(--color-stoneBrown600)', lineHeight: '1.5' }}>
                  <strong>💡 AI Reason:</strong> {current.aiExplanation}
                </div>

                {/* Anti-Fraud & Trust Log Renders */}
                {verifyDetails && (
                  <div style={{ 
                    backgroundColor: 'var(--color-brightIvory50)', 
                    padding: '16px', 
                    borderRadius: '8px', 
                    fontSize: '12px', 
                    color: 'var(--color-stoneBrown600)',
                    border: '1px dashed rgba(36,31,33,0.1)'
                  }}>
                    <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--color-stoneBrown800)' }}>
                      🔐 Trust & Anti-Fraud Logs:
                    </strong>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                      <li>✓ Video Signature: <code style={{ color: 'var(--color-forestGreen600)' }}>{verifyDetails.imageHash}</code></li>
                      <li>✓ Duplicate Search: <code style={{ color: 'var(--color-forestGreen600)' }}>{verifyDetails.duplicateCheck}</code></li>
                      <li>✓ Compass Guided: <code style={{ color: 'var(--color-forestGreen600)' }}>{verifyDetails.antiSpoofCheck} (Extracted {verifyDetails.motionFramesExtracted} keyframes)</code></li>
                      <li>✓ GPS Coordinates: <code style={{ color: 'var(--color-forestGreen600)' }}>{verifyDetails.gpsCoordinatesCheck}</code></li>
                    </ul>
                  </div>
                )}

                {/* Decision Panel */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                  {claimStatus === 'pending' ? (
                    <>
                      <button 
                        onClick={() => handleDecision('approved')}
                        className="button-premium dark"
                        style={{ flexGrow: 1, backgroundColor: 'var(--color-forestGreen600)', display: 'flex', justifyCenter: 'center', alignItems: 'center', gap: '6px' }}
                      >
                        Approve Payout
                      </button>
                      <button 
                        onClick={() => handleDecision('rejected')}
                        className="button-premium outline"
                        style={{ flexGrow: 1, color: 'var(--color-red)', borderColor: 'var(--color-red)' }}
                      >
                        Reject Claim
                      </button>
                    </>
                  ) : claimStatus === 'approved' ? (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      color: 'var(--color-forestGreen600)', 
                      fontWeight: 'bold', 
                      width: '100%', 
                      justifyContent: 'center',
                      backgroundColor: 'rgba(4, 45, 43, 0.1)',
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      <CheckCircle size={20} /> Claim Payout Approved & Sent to Treasury
                    </div>
                  ) : (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      color: 'var(--color-red)', 
                      fontWeight: 'bold', 
                      width: '100%', 
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 0, 77, 0.1)',
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      Claim Request Audited & Rejected
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

    </section>
  );
}
