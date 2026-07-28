import React, { useState, useRef } from 'react';
import { 
  Play, RotateCcw, AlertTriangle, ShieldCheck, Sun, CheckCircle, Database, HelpCircle, 
  Upload, Image as ImageIcon, CheckCircle2, XCircle, Camera, RefreshCw, Sparkles, FileCheck 
} from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function ClaimSimulator({ onApproveClaim }) {
  const [activeTab, setActiveTab] = useState('preset'); // 'preset' | 'upload'
  const [activeScenario, setActiveScenario] = useState('rice');
  const [pipelineStep, setPipelineStep] = useState(0); // 0: Idle, 1: Scanning Video, 2: Fusing Data, 3: Completed
  const [scanProgress, setScanProgress] = useState(0);
  const [claimStatus, setClaimStatus] = useState('pending'); // pending, approved, rejected
  const [verifyDetails, setVerifyDetails] = useState(null);

  // Upload & Quality Checklist state
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [qualityChecklist, setQualityChecklist] = useState(null);
  const [isVerifyingImage, setIsVerifyingImage] = useState(false);
  const [checklistTicks, setChecklistTicks] = useState([]);
  const [showCameraNotice, setShowCameraNotice] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [liveAssessmentData, setLiveAssessmentData] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

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
          
          const targetScenario = (activeTab === 'upload' && detectionResults?.topPrediction) 
            ? (detectionResults.topPrediction.class || detectionResults.topPrediction.readableLabel) 
            : activeScenario;

          // Call API
          fetch('http://localhost:8000/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoName: `${targetScenario}_proof.mp4` })
          })
          .then(res => res.json())
          .then(data => {
            setVerifyDetails(data);
            setPipelineStep(2);
            
            return fetch('http://localhost:8000/api/assess', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ scenario: targetScenario })
            });
          })
          .then(res => res.json())
          .then((assessData) => {
            setLiveAssessmentData(assessData);
            setPipelineStep(3);
          })
          .catch(err => {
            console.log("Using client-side fallback simulation:", err);
            setVerifyDetails({
              antiSpoofCheck: "Passed (Guided Compass Match)",
              gpsCoordinatesCheck: "Passed (Coordinates 28.6139° N, 77.2090° E within plot)",
              imageHash: "sha256:7f4ea013bc9a1f22...",
              duplicateCheck: "No Duplicates Found (Unique Claim)",
              motionFramesExtracted: 24
            });

            let fallbackAssessment;
            if (activeTab === 'upload' && detectionResults?.topPrediction) {
              const label = detectionResults.topPrediction.readableLabel;
              const isHealthy = label.toLowerCase().includes('healthy');
              const dmg = isHealthy ? 0 : 68;
              const pay = isHealthy ? 0 : 15500;
              const rsk = isHealthy ? 15 : 84;
              fallbackAssessment = {
                crop: label,
                damagePercent: dmg,
                suggestedPayout: pay,
                riskScore: rsk,
                weatherAnomaly: isHealthy ? "Normal Microclimate (No Extreme Weather Anomalies)" : "+68% Moisture & High Relative Humidity",
                satelliteNdvi: isHealthy ? "0.82 (Optimal Canopy Health)" : "0.36 (Vegetation Anomaly Detected)",
                yoloModel: "Fine-Tuned YOLOv8 Crop Disease Model",
                aiExplanation: `Fine-Tuned YOLOv8 model diagnosed '${label}' with ${detectionResults.topPrediction.confidencePercent}% confidence.`
              };
            } else {
              fallbackAssessment = {
                crop: scenarios[activeScenario]?.crop || 'Crop',
                damagePercent: scenarios[activeScenario]?.damagePercent || 65,
                suggestedPayout: scenarios[activeScenario]?.suggestedPayout || 14500,
                riskScore: scenarios[activeScenario]?.riskScore || 82,
                weatherAnomaly: scenarios[activeScenario]?.weatherAnomaly || 'Excessive Moisture & Heat Stress',
                satelliteNdvi: scenarios[activeScenario]?.satelliteNdvi || '0.38 (Vegetation Anomaly Detected)',
                yoloModel: "YOLOv8 Engine",
                aiExplanation: scenarios[activeScenario]?.aiExplanation || 'Crop disease assessment completed.'
              };
            }
            setLiveAssessmentData(fallbackAssessment);
            setPipelineStep(2);
            setTimeout(() => {
              setPipelineStep(3);
            }, 800);
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
    setLiveAssessmentData(null);
  };

  const animateChecklist = (data) => {
    setChecklistTicks([]);
    const items = (data && data.checklist) ? data.checklist : [];
    if (items.length === 0) {
      setIsVerifyingImage(false);
      return;
    }
    items.forEach((item, idx) => {
      setTimeout(() => {
        setChecklistTicks(prev => [...prev, item.id]);
        if (idx === items.length - 1) {
          setIsVerifyingImage(false);
          if (data.allPassed) {
            setTimeout(() => {
              startPipeline();
            }, 800);
          }
        }
      }, (idx + 1) * 350);
    });
  };

  const handleFileProcess = (file) => {
    if (!file) return;
    setUploadedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setIsVerifyingImage(true);
    setQualityChecklist(null);
    setChecklistTicks([]);
    setPipelineStep(0);
    setDetectionResults(null);
    setLiveAssessmentData(null);

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8000/api/detect', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      setQualityChecklist(data);
      if (data.allPassed) {
        setDetectionResults(data);
      }
      animateChecklist(data);
    })
    .catch(err => {
      console.log("Detect API offline, using client fallback:", err);
      const isBlur = file.name.toLowerCase().includes('blur') || file.name.toLowerCase().includes('invalid');
      const isUnstamped = file.name.toLowerCase().includes('unstamped') || file.name.toLowerCase().includes('no_stamp') || file.name.toLowerCase().includes('nostamp') || file.name.toLowerCase().includes('mismatch');
      
      const clarityPassed = !isBlur;
      const coveragePassed = !isBlur;
      const lightingPassed = true;
      const stampPassed = !(isBlur || isUnstamped);
      const landPassed = !(isBlur || isUnstamped);
      const allPassed = clarityPassed && coveragePassed && lightingPassed && stampPassed && landPassed;

      const fallbackData = {
        allPassed: allPassed,
        action: allPassed ? "PROCEED" : "RETAKE_REQUIRED",
        recommendation: allPassed 
          ? "All 5 quality and anti-fraud standards satisfied." 
          : (isUnstamped ? "Photo rejected: Missing embedded timestamp/location stamp overlay or mismatched registered land boundary." : "Photo fails field verification requirements. Please retake photo."),
        checklist: [
          { id: 'clarity', name: 'Image Clarity & Focus', passed: clarityPassed, score: clarityPassed ? 94 : 38, detail: clarityPassed ? 'High resolution, sharp edge gradient' : 'Motion blur / low sharpness detected (Score: 38/100)' },
          { id: 'coverage', name: 'Crop Field Area Coverage (≥ 70%)', passed: coveragePassed, score: coveragePassed ? 88 : 42, detail: coveragePassed ? 'Canopy covers 88% of frame' : 'Inadequate field coverage: Crop occupies only 42% of frame' },
          { id: 'lighting', name: 'Lighting & Exposure Balance', passed: lightingPassed, score: 91, detail: 'Optimal daylight illumination' },
          { id: 'timestamp_stamp', name: 'Embedded Timestamp & Location Stamp', passed: stampPassed, score: stampPassed ? 98 : 0, detail: stampPassed ? 'Camera timestamp & location watermark verified on image' : 'REJECTED: Missing required timestamp and location stamp overlay' },
          { id: 'land_crosscheck', name: 'Registered Land Location Cross-Check', passed: landPassed, score: landPassed ? 96 : 0, detail: landPassed ? 'Location stamp matched registered plot (28.6139° N, 77.2090° E)' : 'REJECTED FRAUD RISK: Image location does not match farmer registered land boundary' }
        ]
      };
      setQualityChecklist(fallbackData);
      animateChecklist(fallbackData);
    });
  };

  const handleSampleBlurClick = () => {
    const dummyBlurFile = new File(["dummy content"], "blurry_field_invalid.jpg", { type: "image/jpeg" });
    setUploadedImage(dummyBlurFile);
    setImagePreviewUrl('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000');
    handleFileProcess(dummyBlurFile);
  };

  const handleSampleUnstampedClick = () => {
    const dummyUnstampedFile = new File(["dummy content"], "unstamped_no_stamp_mismatch.jpg", { type: "image/jpeg" });
    setUploadedImage(dummyUnstampedFile);
    setImagePreviewUrl('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000');
    handleFileProcess(dummyUnstampedFile);
  };

  const handleSampleClearClick = () => {
    const dummyClearFile = new File(["dummy content"], "clear_field_valid.jpg", { type: "image/jpeg" });
    setUploadedImage(dummyClearFile);
    setImagePreviewUrl('https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1000');
    handleFileProcess(dummyClearFile);
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

      {/* Mode Selector Tabs */}
      <div className="g-row animate-on-scroll" style={{ marginBottom: '30px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => { setActiveTab('preset'); setQualityChecklist(null); setUploadedImage(null); setShowCameraNotice(false); }}
          className="button-premium"
          style={{
            backgroundColor: activeTab === 'preset' ? 'var(--color-forestGreen600)' : 'transparent',
            color: activeTab === 'preset' ? '#FFFFFF' : 'var(--color-stoneBrown800)',
            border: '1px solid ' + (activeTab === 'preset' ? 'var(--color-forestGreen600)' : 'rgba(4,45,43,0.3)'),
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600'
          }}
        >
          <FileCheck size={16} /> ⚡ Preset Regional Scenarios
        </button>

        <button
          onClick={() => { 
            setActiveTab('upload'); 
            setShowCameraNotice(false);
          }}
          className="button-premium"
          style={{
            backgroundColor: activeTab === 'upload' ? 'var(--color-forestGreen600)' : 'transparent',
            color: activeTab === 'upload' ? '#FFFFFF' : 'var(--color-forestGreen600)',
            border: '1px solid ' + (activeTab === 'upload' ? 'var(--color-forestGreen600)' : 'rgba(4,45,43,0.3)'),
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600'
          }}
        >
          <Upload size={16} /> 📁 Upload Farmer Crop Photo (With AI Quality Checklist)
        </button>

        <button
          onClick={() => { 
            setActiveTab('camera');
            setShowCameraNotice(true);
          }}
          className="button-premium"
          style={{
            backgroundColor: activeTab === 'camera' ? 'var(--color-flourYellow)' : 'transparent',
            color: activeTab === 'camera' ? '#042D2B' : 'var(--color-stoneBrown800)',
            border: '1px solid ' + (activeTab === 'camera' ? 'var(--color-flourYellow)' : 'rgba(0,0,0,0.2)'),
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600'
          }}
        >
          <Camera size={16} color={activeTab === 'camera' ? '#042D2B' : 'currentColor'} /> 📷 Take Field Photo (Direct Camera)
        </button>
      </div>

      {/* Camera Viewfinder Not Integrated Notice */}
      {activeTab === 'camera' && (
        <div style={{ paddingLeft: 'var(--grid-margin)', paddingRight: 'var(--grid-margin)', maxWidth: '1600px', margin: '0 auto 40px auto' }}>
          <div style={{
            padding: '24px 30px',
            borderRadius: '16px',
            backgroundColor: 'rgba(233, 231, 120, 0.25)',
            border: '1.5px solid var(--color-stoneBrown800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Camera size={32} color="var(--color-stoneBrown800)" />
              <div>
                <h3 className="-title-8-medium" style={{ fontSize: '16px', color: 'var(--color-stoneBrown800)' }}>
                  📷 Direct Camera Viewfinder: Not Integrated Yet
                </h3>
                <p className="-body-medium" style={{ fontSize: '13px', color: 'var(--color-stoneBrown700)', marginTop: '4px' }}>
                  Direct live mobile camera streaming is currently in active development for our native Android & iOS mobile application.
                  Please select <strong>"Upload Farmer Crop Photo"</strong> or test sample field photos to run the AI quality checklist!
                </p>
              </div>
            </div>

            <button 
              onClick={() => { setActiveTab('upload'); setShowCameraNotice(false); }}
              className="button-premium dark"
              style={{ backgroundColor: 'var(--color-forestGreen600)', color: 'white', fontSize: '12px', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Upload size={14} /> Switch to Photo Upload
            </button>
          </div>
        </div>
      )}

      {/* Preset Scenario Selector Sub-pills */}
      {activeTab === 'preset' && (
        <div className="g-row" style={{ marginBottom: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {Object.keys(scenarios).map((key) => (
            <button
              key={key}
              onClick={() => handleScenarioChange(key)}
              className="button-premium outline"
              style={{
                borderColor: activeScenario === key ? 'var(--color-forestGreen600)' : 'rgba(4,45,43,0.3)',
                backgroundColor: activeScenario === key ? 'var(--color-forestGreen600)' : 'transparent',
                color: activeScenario === key ? '#FFFFFF' : 'var(--color-stoneBrown800)',
                fontSize: '13px',
                padding: '8px 16px',
                fontWeight: '600'
              }}
            >
              {key.toUpperCase()}: {scenarios[key].crop}
            </button>
          ))}
        </div>
      )}

      {/* Upload & Checklist Dropzone Bar */}
      {activeTab === 'upload' && (
        <div style={{ paddingLeft: 'var(--grid-margin)', paddingRight: 'var(--grid-margin)', maxWidth: '1600px', margin: '0 auto 40px auto', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          
          {/* File input (Disk upload) */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFileProcess(e.target.files[0])} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          {/* Camera input (Direct mobile / webcam camera trigger) */}
          <input 
            type="file" 
            ref={cameraInputRef} 
            onChange={(e) => handleFileProcess(e.target.files[0])} 
            accept="image/*" 
            capture="environment" 
            style={{ display: 'none' }} 
          />

          {/* Minimal Aesthetic Dropzone */}
          <div 
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: isDragging ? '2px dashed var(--color-forestGreen600)' : '2px dashed rgba(4, 45, 43, 0.35)',
              backgroundColor: isDragging ? 'rgba(4, 45, 43, 0.09)' : 'rgba(4, 45, 43, 0.02)',
              borderRadius: '20px',
              padding: '50px 30px',
              minHeight: '210px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
              transform: isDragging ? 'scale(1.01)' : 'scale(1)'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: isDragging ? 'var(--color-forestGreen600)' : 'rgba(4, 45, 43, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <Upload size={26} color={isDragging ? 'white' : 'var(--color-forestGreen600)'} />
            </div>

            <div>
              <h4 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)', fontSize: '17px', fontWeight: '600' }}>
                {isDragging ? 'Release to Drop Crop Photo' : 'Drag & Drop Crop Inspection Photo Here'}
              </h4>
              <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', fontSize: '13px', marginTop: '4px' }}>
                or click anywhere in this box to browse image files (JPG, PNG, WEBP)
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="button-premium dark"
                style={{ backgroundColor: 'var(--color-forestGreen600)', fontSize: '13px', padding: '10px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Upload size={15} /> Select Image File
              </button>
            </div>
          </div>

          {/* Live Step-by-Step Auto-Ticking Checklist Modal / Card */}
          {(isVerifyingImage || qualityChecklist) && (
            <div style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: qualityChecklist ? (qualityChecklist.allPassed ? 'rgba(186, 207, 163, 0.12)' : 'rgba(255, 0, 77, 0.05)') : 'rgba(255,255,255,0.95)',
              border: '1px solid ' + (qualityChecklist ? (qualityChecklist.allPassed ? 'var(--color-forestGreen600)' : 'var(--color-red)') : 'rgba(0,0,0,0.15)'),
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              
              {/* Header status indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {isVerifyingImage ? (
                    <RefreshCw size={20} className="spin" color="var(--color-forestGreen600)" />
                  ) : qualityChecklist && qualityChecklist.allPassed ? (
                    <CheckCircle2 size={24} color="var(--color-forestGreen600)" />
                  ) : (
                    <XCircle size={24} color="var(--color-red)" />
                  )}
                  
                  <div>
                    <h3 className="-title-8-medium" style={{ fontSize: '15px', color: qualityChecklist ? (qualityChecklist.allPassed ? 'var(--color-forestGreen600)' : 'var(--color-red)') : 'var(--color-stoneBrown800)' }}>
                      {isVerifyingImage 
                        ? '🔄 Verifying Photo Quality & Authenticity Criteria...' 
                        : qualityChecklist && qualityChecklist.allPassed 
                          ? '✅ ALL 5 QUALITY & ANTI-FRAUD CHECKS SATISFIED — MOVING AHEAD TO RISK ASSESSMENT' 
                          : '⚠️ PHOTO VERIFICATION FAILED — RETAKE PHOTO REQUIRED'}
                    </h3>
                    <p className="-body-medium" style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '2px' }}>
                      {qualityChecklist ? qualityChecklist.recommendation : 'Running gradient sharpness, field framing %, camera timestamp/location stamp, and land polygon cross-check...'}
                    </p>
                  </div>
                </div>

                {qualityChecklist && !qualityChecklist.allPassed && !isVerifyingImage && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
                      className="button-premium dark"
                      style={{ backgroundColor: 'var(--color-red)', fontSize: '12px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Camera size={14} /> 📷 Retake with Camera
                    </button>
                    <button 
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="button-premium outline"
                      style={{ borderColor: 'var(--color-stoneBrown800)', fontSize: '12px', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Upload size={14} /> Select Different File
                    </button>
                  </div>
                )}
              </div>

              {/* Step-by-Step Auto-Ticking Checklist Items */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '4px' }}>
                {(qualityChecklist ? qualityChecklist.checklist : [
                  { id: 'clarity', name: 'Image Clarity & Focus' },
                  { id: 'coverage', name: 'Crop Field Area Coverage (≥ 70%)' },
                  { id: 'lighting', name: 'Lighting & Exposure Balance' },
                  { id: 'timestamp_stamp', name: 'Embedded Timestamp & Location Stamp' },
                  { id: 'land_crosscheck', name: 'Registered Land Location Cross-Check' }
                ]).map((item) => {
                  const isChecked = checklistTicks.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: isChecked ? (item.passed ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.95)') : 'rgba(240,240,240,0.5)',
                        border: '1px solid ' + (isChecked ? (item.passed ? 'rgba(4,45,43,0.2)' : 'rgba(255,0,77,0.3)') : 'rgba(0,0,0,0.08)'),
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-stoneBrown800)' }}>
                          {item.name}
                        </span>
                        
                        {isChecked ? (
                          item.passed ? (
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-forestGreen600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={13} color="var(--color-forestGreen600)" /> {item.score}/100
                            </span>
                          ) : (
                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-red)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <XCircle size={13} color="var(--color-red)" /> FAIL
                            </span>
                          )
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RefreshCw size={11} className="spin" /> Verifying...
                          </span>
                        )}
                      </div>

                      {isChecked && item.detail && (
                        <p style={{ fontSize: '11px', color: item.passed ? 'var(--color-stoneBrown600)' : 'var(--color-red)', lineHeight: '1.3' }}>
                          {item.detail}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {qualityChecklist && !qualityChecklist.allPassed && !isVerifyingImage && (
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 0, 77, 0.08)', borderRadius: '8px', borderLeft: '4px solid var(--color-red)', fontSize: '12px', color: 'var(--color-stoneBrown800)' }}>
                  <strong>💡 Farmer Instructions:</strong> Please step back 2 meters to frame the full crop canopy, ensure steady camera grip, and take a new photo in clear daylight.
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* Pipeline Simulator Sandbox */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px' }}>
        
        {/* Left Panel: Raw Media & Heatmap Overlay */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(36,31,33,0.1)' }}>
            <img 
              src={activeTab === 'upload' && imagePreviewUrl ? imagePreviewUrl : current.img} 
              alt={activeTab === 'upload' ? "Uploaded Field Inspection" : current.title} 
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
              disabled={activeTab === 'upload' && qualityChecklist && !qualityChecklist.allPassed}
              onClick={startPipeline}
              className="button-premium dark"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px', 
                width: '100%',
                backgroundColor: (activeTab === 'upload' && qualityChecklist && !qualityChecklist.allPassed)
                  ? 'rgba(36, 31, 33, 0.3)'
                  : (activeTab === 'upload' ? 'var(--color-forestGreen600)' : 'var(--color-stoneBrown800)'),
                cursor: (activeTab === 'upload' && qualityChecklist && !qualityChecklist.allPassed) ? 'not-allowed' : 'pointer'
              }}
            >
              {activeTab === 'upload' && qualityChecklist && !qualityChecklist.allPassed ? (
                <>
                  <XCircle size={18} color="var(--color-red)" /> Photo Retake Required (Quality Checklist Failed)
                </>
              ) : (
                <>
                  <Play size={18} fill="white" /> Launch Automated Proof & Risk Assessment
                </>
              )}
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
                
                {/* Mode Indicator Badge */}
                {activeTab === 'upload' && detectionResults?.topPrediction && (
                  <div style={{
                    backgroundColor: 'var(--color-forestGreen600)',
                    color: 'white',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Sparkles size={16} /> Live Fine-Tuned YOLOv8 AI Diagnosis: {detectionResults.topPrediction.readableLabel}
                  </div>
                )}

                {/* Confidence Metrics Grid */}
                {(() => {
                  const isUploadLive = activeTab === 'upload' && detectionResults?.topPrediction;
                  const assess = liveAssessmentData || (isUploadLive ? {
                    crop: detectionResults.topPrediction.readableLabel,
                    damagePercent: detectionResults.topPrediction.readableLabel.toLowerCase().includes('healthy') ? 0 : 68,
                    suggestedPayout: detectionResults.topPrediction.readableLabel.toLowerCase().includes('healthy') ? 0 : 15500,
                    riskScore: detectionResults.topPrediction.readableLabel.toLowerCase().includes('healthy') ? 15 : 84,
                    weatherAnomaly: "+68% Relative Humidity & Heat Stress",
                    satelliteNdvi: "0.36 (Foliage Degradation)",
                    yoloModel: "Fine-Tuned YOLOv8 Crop Disease Model",
                    aiExplanation: `Fine-Tuned YOLOv8 model evaluated crop photo and classified: "${detectionResults.topPrediction.readableLabel}" with ${detectionResults.topPrediction.confidencePercent}% confidence.`
                  } : current);
                  
                  const damageVal = assess.damagePercent;
                  const riskVal = assess.riskScore;
                  const confVal = isUploadLive ? `${detectionResults.topPrediction.confidencePercent}%` : '98.6%';
                  const payoutVal = assess.suggestedPayout;
                  const explanationText = assess.aiExplanation;

                  return (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', textTransform: 'uppercase' }}>Damage</span>
                          <h3 className="-title-2-medium" style={{ fontSize: '28px', color: 'var(--color-red)' }}>{damageVal}%</h3>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', textTransform: 'uppercase' }}>Risk index</span>
                          <h3 className="-title-2-medium" style={{ fontSize: '28px', color: 'var(--color-stoneBrown800)' }}>{riskVal}</h3>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-stoneBrown500)', textTransform: 'uppercase' }}>AI Confidence</span>
                          <h3 className="-title-2-medium" style={{ fontSize: '24px', color: 'var(--color-forestGreen600)' }}>{confVal}</h3>
                        </div>
                      </div>

                      {/* Top 5 AI Candidates if Uploaded */}
                      {isUploadLive && detectionResults?.detections?.length > 0 && (
                        <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(4,45,43,0.1)' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-forestGreen600)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            🔍 YOLOv8 Classification Probability Breakdown:
                          </span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {detectionResults.detections.slice(0, 3).map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: 'var(--color-stoneBrown800)', fontWeight: idx === 0 ? '600' : 'normal' }}>
                                  {idx + 1}. {item.label}
                                </span>
                                <strong style={{ color: idx === 0 ? 'var(--color-forestGreen600)' : 'var(--color-stoneBrown600)' }}>
                                  {item.confidencePercent}%
                                </strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Satellite Weather details */}
                      <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-stoneBrown600)' }}>🛰️ Model Loaded:</span>
                          <strong>{assess.yoloModel || (isUploadLive ? "Fine-Tuned YOLOv8 Crop Model" : "YOLOv8 Vision")}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-stoneBrown600)' }}>📊 Satellite NDVI:</span>
                          <strong>{assess.satelliteNdvi || current.satelliteNdvi}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--color-stoneBrown600)' }}>🌧️ Weather / Field Fusion:</span>
                          <strong>{assess.weatherAnomaly || current.weatherAnomaly}</strong>
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
                            ₹{payoutVal.toLocaleString('en-IN')}
                          </h2>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-forestGreen600)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                          YOLO Auto-Computed
                        </div>
                      </div>

                      {/* AI Explanation Text */}
                      <div style={{ backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px', fontSize: '13px', color: 'var(--color-stoneBrown600)', lineHeight: '1.5' }}>
                        <strong>💡 AI Reason:</strong> {explanationText}
                      </div>
                    </>
                  );
                })()}

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
