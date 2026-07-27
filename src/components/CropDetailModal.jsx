import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Sprout, ShieldCheck, Sun, Droplets, ArrowRight, Activity, Layers, Award, Sparkles } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export const CROP_DATASET = {
  rice: {
    id: 'rice',
    primaryName: 'Rice',
    subName: '(Basmati Paddy)',
    botanicalName: 'Oryza sativa',
    category: 'Kharif Cereal Crop',
    img: PINTEREST_IMAGES.krishinetraHero,
    tabs: {
      overview: {
        description: 'Basmati Rice is an essential high-value cereal crop requiring high moisture index, regulated standing water, and warm humid climate during vegetative growth phases.',
        card1: { icon: Calendar, iconColor: '#BACFA3', title: 'Growing & Harvest', text: 'Kharif Season (June–Nov)', sub: '⏳ Maturity: 120 - 140 Days' },
        card2: { icon: Award, iconColor: '#E9E778', title: 'Payout Benchmark', value: '₹18,500 / Acre', sub: 'Target: 21°C – 37°C' },
        regionsTitle: 'Major Producing Regions in India',
        regions: ['📍 Punjab (28%)', '📍 Haryana (22%)', '📍 Uttar Pradesh (19%)', '📍 West Bengal (14%)', '📍 AP (10%)']
      },
      agronomy: {
        description: 'Soil requirement: Clayey loam with high water-retention capacity (pH 5.5 - 7.0). Requires puddling before transplanting to form an impermeable hardpan layer.',
        card1: { icon: Sun, iconColor: '#E9E778', title: 'Optimal Climate', text: 'Warm & Humid (21°C – 37°C)', sub: '☀️ Solar: 5.5 kWh/m²/day' },
        card2: { icon: Droplets, iconColor: '#64B5F6', title: 'Water & Irrigation', value: '100 – 200 cm', sub: '💧 Standing water required' },
        regionsTitle: 'Agronomic Soil Belts & Target pH',
        regions: ['🌱 Alluvial Plain (pH 6.5)', '🌾 Deltaic Tracts (pH 5.8)', '💧 Clayey Basins (pH 6.2)', '🍃 Silt Loam (pH 6.8)']
      },
      regions: {
        description: 'Indo-Gangetic Plains account for over 68% of commercial Basmati production registered under GI-tagged agricultural districts in Northern and Eastern India.',
        card1: { icon: MapPin, iconColor: '#FF8A65', title: 'Indo-Gangetic Belt', text: 'Ludhiana, Karnal, Kurukshetra', sub: '🌾 3.2M Hectares Insured' },
        card2: { icon: Layers, iconColor: '#BACFA3', title: 'National Share', value: '44.2%', sub: '🏆 #1 Export Commodity' },
        regionsTitle: 'Key District Production Clusters',
        regions: ['📍 Ludhiana (PB)', '📍 Karnal (HR)', '📍 West Godavari (AP)', '📍 Bardhaman (WB)', '📍 Bareilly (UP)']
      },
      telemetry: {
        description: 'Sentinel-2 multispectral sensors track vegetative density weekly. Sudden drops below 0.35 NDVI indicate flash flood submergence or severe waterlogging.',
        card1: { icon: Activity, iconColor: '#BACFA3', title: 'Satellite Telemetry', text: 'Sentinel-2 Band 8 (NIR) & Band 4', sub: '🛰️ 10m Spatial Resolution' },
        card2: { icon: ShieldCheck, iconColor: '#81C784', title: 'AI Verification', value: '98.4%', sub: '⚡ YOLOv8 Submergence Score' },
        regionsTitle: 'Telemetry Risk & Anti-Fraud Anchoring',
        regions: ['🌊 Submergence Flood (High)', '🐛 Stem Borer (Moderate)', '🛰️ Satellite NDVI Track', '🔒 SHA-256 Hash']
      }
    }
  },

  cotton: {
    id: 'cotton',
    primaryName: 'Cotton',
    subName: '(Bt Hybrid)',
    botanicalName: 'Gossypium hirsutum',
    category: 'Cash & Fiber Crop',
    img: PINTEREST_IMAGES.cottonField || 'https://images.unsplash.com/photo-1594771804886-a933b2253646?auto=format&fit=crop&q=80&w=1200',
    tabs: {
      overview: {
        description: 'Bt Cotton is a major commercial cash crop vulnerable to spotted bollworm infestation, excessive humidity, and unseasonal rainfall during boll opening stages.',
        card1: { icon: Calendar, iconColor: '#BACFA3', title: 'Growing & Harvest', text: 'Long Season (April–Feb)', sub: '⏳ Maturity: 160 - 180 Days' },
        card2: { icon: Award, iconColor: '#E9E778', title: 'Payout Benchmark', value: '₹9,200 / Acre', sub: 'Target: 21°C – 30°C' },
        regionsTitle: 'Major Producing Regions in India',
        regions: ['📍 Gujarat (32%)', '📍 Maharashtra (26%)', '📍 Telangana (18%)', '📍 Andhra Pradesh (11%)', '📍 Rajasthan (8%)']
      },
      agronomy: {
        description: 'Thrives in deep black cotton soil (Regur) with deep root aeration (pH 6.0 - 8.0). Requires 210 frost-free days and warm sunshine during flowering.',
        card1: { icon: Sun, iconColor: '#E9E778', title: 'Optimal Climate', text: 'Warm & Dry (21°C – 30°C)', sub: '☀️ 210 Frost-Free Days' },
        card2: { icon: Droplets, iconColor: '#64B5F6', title: 'Water & Irrigation', value: '50 – 100 cm', sub: '💧 Dry weather at boll burst' },
        regionsTitle: 'Soil Types & Agronomic Profiles',
        regions: ['🌱 Black Regur Soil (pH 7.5)', '🌾 Deep Clay Soil (pH 7.2)', '🍃 Well-Drained Loam (pH 6.8)', '💧 Deccan Traps Belt']
      },
      regions: {
        description: 'Saurashtra in Gujarat and Vidarbha in Maharashtra form India\'s primary cotton corridor, accounting for over 58% of national lint production.',
        card1: { icon: MapPin, iconColor: '#FF8A65', title: 'Cotton Belt', text: 'Rajkot, Amreli, Yavatmal, Nagpur', sub: '🌾 4.5M Hectares Insured' },
        card2: { icon: Layers, iconColor: '#BACFA3', title: 'National Share', value: '38.6%', sub: '🏭 Major Textile Fiber' },
        regionsTitle: 'Key District Production Clusters',
        regions: ['📍 Rajkot (GJ)', '📍 Amreli (GJ)', '📍 Yavatmal (MH)', '📍 Warangal (TS)', '📍 Bathinda (PB)']
      },
      telemetry: {
        description: 'PyTorch YOLOv8 vision models identify leaf spot lesions and bollworm damage across field canopy photos with 94.2% precision.',
        card1: { icon: Activity, iconColor: '#BACFA3', title: 'Vision Analytics', text: 'PyTorch YOLOv8 Pest Model', sub: '📱 3D Gyro Compass Check' },
        card2: { icon: ShieldCheck, iconColor: '#81C784', title: 'AI Verification', value: '94.2%', sub: '⚡ Pest & Damage Score' },
        regionsTitle: 'Telemetry Risk & Anti-Fraud Anchoring',
        regions: ['🐛 Spotted Bollworm (High)', '🌧️ Unseasonal Rain (High)', '📱 3D Camera Check', '🔒 PostgreSQL Ledger Hash']
      }
    }
  },

  wheat: {
    id: 'wheat',
    primaryName: 'Wheat',
    subName: '(Durum)',
    botanicalName: 'Triticum aestivum',
    category: 'Rabi Cereal Crop',
    img: PINTEREST_IMAGES.wheatField || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1200',
    tabs: {
      overview: {
        description: 'Wheat is the premier staple Rabi crop requiring cool weather during vegetative growth and warm bright sunshine during kernel ripening.',
        card1: { icon: Calendar, iconColor: '#BACFA3', title: 'Growing & Harvest', text: 'Rabi Season (Oct–April)', sub: '⏳ Maturity: 110 - 130 Days' },
        card2: { icon: Award, iconColor: '#E9E778', title: 'Payout Benchmark', value: '₹14,500 / Acre', sub: 'Cool: 10°C–15°C | Warm: 25°C' },
        regionsTitle: 'Major Producing Regions in India',
        regions: ['📍 Uttar Pradesh (34%)', '📍 Punjab (22%)', '📍 Madhya Pradesh (19%)', '📍 Haryana (14%)', '📍 Rajasthan (7%)']
      },
      agronomy: {
        description: 'Requires well-drained fertile loamy soil rich in organic matter and nitrogen (pH 6.0 - 7.5). Cool moist growing period followed by warm dry weather.',
        card1: { icon: Sun, iconColor: '#E9E778', title: 'Optimal Climate', text: 'Cool Growing (10°C – 15°C)', sub: '☀️ Bright sun at grain fill' },
        card2: { icon: Droplets, iconColor: '#64B5F6', title: 'Water & Irrigation', value: '75 cm', sub: '💧 Irrigation at Crown Root' },
        regionsTitle: 'Agronomic Soil Belts & Target pH',
        regions: ['🌱 Alluvial Loam (pH 7.0)', '🌾 Clay Loam Plains (pH 6.8)', '🍃 Sandy Loam Basin (pH 6.5)', '💧 Black Soils MP (pH 7.2)']
      },
      regions: {
        description: 'Indo-Gangetic plains produce over 75% of India\'s wheat. Punjab and Haryana achieve the highest yield per hectare (over 4.8 tonnes/ha).',
        card1: { icon: MapPin, iconColor: '#FF8A65', title: 'Wheat Granary', text: 'Patiala, Sangrur, Hisar, Meerut', sub: '🌾 5.8M Hectares Insured' },
        card2: { icon: Layers, iconColor: '#BACFA3', title: 'National Share', value: '52.1%', sub: '🌾 Essential Staple Crop' },
        regionsTitle: 'Key District Production Clusters',
        regions: ['📍 Patiala (PB)', '📍 Sangrur (PB)', '📍 Hisar (HR)', '📍 Meerut (UP)', '📍 Ujjain (MP)']
      },
      telemetry: {
        description: 'Micro-climate weather station telemetry flags rain deficit anomalies below 60% during critical crown root initiation weeks.',
        card1: { icon: Activity, iconColor: '#BACFA3', title: 'Weather Telemetry', text: 'IMD Station Rain Gauge Grid', sub: '🌧️ Real-Time Rain Matching' },
        card2: { icon: ShieldCheck, iconColor: '#81C784', title: 'AI Verification', value: '96.8%', sub: '⚡ Drought & Canopy Score' },
        regionsTitle: 'Telemetry Risk & Anti-Fraud Anchoring',
        regions: ['☀️ Heatwave Stress (High)', '🌵 Rain Deficit Anomaly', '🛰️ Sentinel NDVI Track', '🔒 SHA-256 Claim Hash']
      }
    }
  },

  maize: {
    id: 'maize',
    primaryName: 'Maize',
    subName: '(Kharif Corn)',
    botanicalName: 'Zea mays',
    category: 'Coarse Grain Crop',
    img: PINTEREST_IMAGES.krishinetraHero,
    tabs: {
      overview: {
        description: 'Maize serves as both food and industrial raw material. It thrives in well-aerated soils and requires steady nitrogen replenishment.',
        card1: { icon: Calendar, iconColor: '#BACFA3', title: 'Growing & Harvest', text: 'Kharif Season (June–Oct)', sub: '⏳ Maturity: 90 - 110 Days' },
        card2: { icon: Award, iconColor: '#E9E778', title: 'Payout Benchmark', value: '₹12,800 / Acre', sub: 'Target: 21°C – 27°C' },
        regionsTitle: 'Major Producing Regions in India',
        regions: ['📍 Karnataka (24%)', '📍 Madhya Pradesh (18%)', '📍 Maharashtra (16%)', '📍 Rajasthan (14%)', '📍 Bihar (12%)']
      },
      agronomy: {
        description: 'Old alluvial or fertile loamy soil with neutral pH (5.5 - 7.5) and good drainage. Sensitive to waterlogging during seedling stages.',
        card1: { icon: Sun, iconColor: '#E9E778', title: 'Optimal Climate', text: 'Moderate Warmth (21°C – 27°C)', sub: '☀️ Solar intensity target' },
        card2: { icon: Droplets, iconColor: '#64B5F6', title: 'Water & Irrigation', value: '50 – 100 cm', sub: '💧 Drainage crucial to avoid stagnation' },
        regionsTitle: 'Agronomic Soil Belts & Target pH',
        regions: ['🌱 Old Alluvial Soil (pH 6.8)', '🌾 Red Sandy Loam (pH 6.2)', '🍃 Well-Drained Silt (pH 7.0)', '💧 Well-Aerated Basins']
      },
      regions: {
        description: 'Karnataka and Madhya Pradesh dominate Kharif maize cultivation, supplying raw materials to starch industries and poultry feed sectors.',
        card1: { icon: MapPin, iconColor: '#FF8A65', title: 'Peninsular Corn Hub', text: 'Davangere, Chhindwara, Belagavi', sub: '🌾 2.8M Hectares Insured' },
        card2: { icon: Layers, iconColor: '#BACFA3', title: 'National Share', value: '31.5%', sub: '🌽 Key Industrial Material' },
        regionsTitle: 'Key District Production Clusters',
        regions: ['📍 Davangere (KA)', '📍 Chhindwara (MP)', '📍 Belagavi (KA)', '📍 Samastipur (BR)', '📍 Bhilwara (RJ)']
      },
      telemetry: {
        description: 'Automated 3D motion field checks ensure crop canopy coverage exceeds 70% before claim assessment, preventing empty land fraud.',
        card1: { icon: Activity, iconColor: '#BACFA3', title: 'Motion Check', text: '3D Gyro Canopy Density (≥70%)', sub: '📱 Anti-Spoofing Protocol' },
        card2: { icon: ShieldCheck, iconColor: '#81C784', title: 'AI Verification', value: '97.1%', sub: '⚡ Motion Field Rating' },
        regionsTitle: 'Telemetry Risk & Anti-Fraud Anchoring',
        regions: ['🐛 Fall Armyworm (High)', '🌊 Water Stagnation Risk', '📱 3D Gyro Verification', '🔒 SHA-256 Ledger Hash']
      }
    }
  },

  sugarcane: {
    id: 'sugarcane',
    primaryName: 'Sugarcane',
    subName: '(Commercial)',
    botanicalName: 'Saccharum officinarum',
    category: 'Perennial Commercial Crop',
    img: PINTEREST_IMAGES.sustainabilityLand || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200',
    tabs: {
      overview: {
        description: 'Sugarcane is a long-duration tropical crop producing high sucrose content. Requires continuous soil moisture, warm climate, and high solar radiation.',
        card1: { icon: Calendar, iconColor: '#BACFA3', title: 'Growing & Harvest', text: 'Annual (Oct–March)', sub: '⏳ Maturity: 360 - 450 Days' },
        card2: { icon: Award, iconColor: '#E9E778', title: 'Payout Benchmark', value: '₹22,000 / Acre', sub: 'Target: 21°C – 27°C' },
        regionsTitle: 'Major Producing Regions in India',
        regions: ['📍 Uttar Pradesh (42%)', '📍 Maharashtra (28%)', '📍 Karnataka (14%)', '📍 Tamil Nadu (8%)', '📍 Gujarat (5%)']
      },
      agronomy: {
        description: 'Deep rich loamy soils with good drainage and high organic content (pH 6.5 - 7.5). Heavy NPK requirements over a 12-month lifecycle.',
        card1: { icon: Sun, iconColor: '#E9E778', title: 'Optimal Climate', text: 'Hot & Humid (21°C – 27°C)', sub: '☀️ Intense solar exposure' },
        card2: { icon: Droplets, iconColor: '#64B5F6', title: 'Water & Irrigation', value: '75 – 100 cm', sub: '💧 Frequent irrigation cycles' },
        regionsTitle: 'Agronomic Soil Belts & Target pH',
        regions: ['🌱 Deep Alluvial Soil (pH 7.2)', '🌾 Black Clay Loam (pH 7.5)', '🍃 Silt Loam Basins (pH 6.8)', '💧 Heavy Irrigation Belts']
      },
      regions: {
        description: 'Uttar Pradesh sub-tropical belt and Maharashtra tropical sugar factories form India\'s primary sugarcane economy.',
        card1: { icon: MapPin, iconColor: '#FF8A65', title: 'Sub-Tropical Corridor', text: 'Muzaffarnagar, Kolhapur, Mandya', sub: '🌾 5.2M Hectares Insured' },
        card2: { icon: Layers, iconColor: '#BACFA3', title: 'National Share', value: '48.9%', sub: '🍬 Sugar & Ethanol Source' },
        regionsTitle: 'Key District Production Clusters',
        regions: ['📍 Muzaffarnagar (UP)', '📍 Kolhapur (MH)', '📍 Mandya (KA)', '📍 Belagavi (KA)', '📍 Solapur (MH)']
      },
      telemetry: {
        description: 'Multi-year DCI timelines track historical crop rotations and vegetative biomass density over 12+ months using continuous Sentinel-2 satellite passes.',
        card1: { icon: Activity, iconColor: '#BACFA3', title: 'Multi-Season DCI', text: '12-Month Biomass Track', sub: '🛰️ Long-Term Satellite Sync' },
        card2: { icon: ShieldCheck, iconColor: '#81C784', title: 'AI Verification', value: '95.6%', sub: '⚡ Multi-Year DCI Rating' },
        regionsTitle: 'Telemetry Risk & Anti-Fraud Anchoring',
        regions: ['🍂 Red Rot Disease (High)', '❄️ Frost Damage (Moderate)', '🛰️ Multi-Year DCI Timeline', '🔒 SHA-256 Hash Anchoring']
      }
    }
  }
};

export default function CropDetailModal({ crop, onClose, onActionClick }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isClosing, setIsClosing] = useState(false);

  const cropData = typeof crop === 'string' 
    ? (CROP_DATASET[crop.toLowerCase()] || CROP_DATASET['rice'])
    : (crop && crop.id && CROP_DATASET[crop.id])
      ? CROP_DATASET[crop.id]
      : (crop && crop.name) 
        ? { ...CROP_DATASET['rice'], primaryName: crop.name, subName: '', img: crop.img || CROP_DATASET['rice'].img }
        : CROP_DATASET['rice'];

  const currentTabData = cropData.tabs && cropData.tabs[activeTab] 
    ? cropData.tabs[activeTab] 
    : cropData.tabs.overview;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  // ABSOLUTE BACKGROUND SCROLL PREVENT (Stops cursor wheel & trackpad scroll on home page)
  useEffect(() => {
    // 1. Pause Lenis smooth scroll globally
    if (window.lenis) {
      window.lenis.stop();
    }

    // 2. Prevent body & html overflow
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 3. Capture-phase wheel & touchmove preventer to block background scrolling from mouse cursor
    const blockBackgroundScroll = (e) => {
      const isInsideScrollable = e.target.closest('.crop-modal-scrollable');
      if (!isInsideScrollable) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('wheel', blockBackgroundScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', blockBackgroundScroll, { passive: false, capture: true });
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('wheel', blockBackgroundScroll, { capture: true });
      window.removeEventListener('touchmove', blockBackgroundScroll, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isClosing]);

  const Card1Icon = currentTabData.card1.icon || Calendar;
  const Card2Icon = currentTabData.card2.icon || Award;

  return (
    <div 
      onClick={handleClose}
      className={isClosing ? 'crop-modal-backdrop-out' : 'crop-modal-backdrop-in'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 9, 16, 0.88)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* PERFECTLY PROPORTIONED COMPACT LIQUID GLASS CARD CONTAINER (FITS 100% WITHOUT OVERFLOW) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`liquid-glass-panel crop-modal-scrollable ${isClosing ? 'crop-modal-card-out' : 'crop-modal-card-in'}`}
        style={{
          width: 'min(1240px, 92vw)',
          height: 'min(660px, 86vh)',
          backgroundColor: 'rgba(14, 22, 34, 0.96)',
          borderRadius: '26px',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          color: '#FFFFFF',
          padding: '24px 32px',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}
      >
        
        {/* Top Navigation Tabs & Exit Cross Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          zIndex: 10,
          flexShrink: 0
        }}>
          
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '40px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'agronomy', label: 'Agronomy & Soil' },
              { id: 'regions', label: 'Producing Regions' },
              { id: 'telemetry', label: 'Satellite & AI Telemetry' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                  color: activeTab === tab.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                  border: activeTab === tab.id ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                  borderRadius: '30px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 14px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Exit Cross Button (X) */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 6px 20px rgba(0, 0, 0, 0.4)',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Grid Area */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '32px',
          alignItems: 'stretch',
          flexGrow: 1,
          overflow: 'hidden'
        }}>
          
          {/* Left Column: Proportioned Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'space-between' }}>
            
            {/* Title Line */}
            <div>
              <h1 style={{
                fontSize: 'clamp(42px, 3.4vw + 14px, 58px)',
                fontWeight: '900',
                lineHeight: '1.02',
                color: '#FFFFFF',
                margin: '0 0 8px 0',
                display: 'block',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '-0.03em'
              }}>
                {cropData.primaryName}{' '}
                <span style={{
                  fontSize: 'clamp(22px, 1.8vw + 10px, 30px)',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.55)',
                  fontFamily: 'sans-serif',
                  letterSpacing: '0'
                }}>
                  {cropData.subName}
                </span>
              </h1>

              {/* Subtitle Tags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.75)' }}>
                  {cropData.botanicalName}
                </span>

                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#BACFA3',
                  backgroundColor: 'rgba(186, 207, 163, 0.12)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  border: '1px solid rgba(186, 207, 163, 0.25)'
                }}>
                  {cropData.category}
                </span>
              </div>
            </div>

            {/* Description Card */}
            <div className="liquid-glass-card" style={{ padding: '16px 20px', borderRadius: '18px' }}>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.55',
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0,
                fontWeight: '400'
              }}>
                {currentTabData.description}
              </p>
            </div>

            {/* Dynamic Info Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              
              {/* Card 1 */}
              <div className="liquid-glass-card" style={{ padding: '14px 16px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Card1Icon size={16} color={currentTabData.card1.iconColor || '#BACFA3'} />
                  <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>
                    {currentTabData.card1.title}
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', margin: '0 0 3px 0', lineHeight: '1.35' }}>
                  {currentTabData.card1.text}
                </p>
                <span style={{ fontSize: '11px', color: '#E9E778', fontWeight: '600' }}>
                  {currentTabData.card1.sub}
                </span>
              </div>

              {/* Card 2 */}
              <div className="liquid-glass-card" style={{ padding: '14px 16px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Card2Icon size={16} color={currentTabData.card2.iconColor || '#E9E778'} />
                  <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>
                    {currentTabData.card2.title}
                  </h4>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#BACFA3', margin: '1px 0' }}>
                  {currentTabData.card2.value}
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>
                  {currentTabData.card2.sub}
                </span>
              </div>

            </div>

            {/* Location Chips Card */}
            <div className="liquid-glass-card" style={{ padding: '14px 18px', borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={16} color="#BACFA3" />
                <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>
                  {currentTabData.regionsTitle}
                </h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {currentTabData.regions.map((region, idx) => (
                  <span 
                    key={idx}
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '2px' }}>
              <button
                onClick={() => {
                  handleClose();
                  if (onActionClick) onActionClick(cropData.id);
                }}
                className="button-premium dark"
                style={{
                  backgroundColor: '#BACFA3',
                  color: '#042D2B',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '700',
                  padding: '11px 22px',
                  borderRadius: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(186, 207, 163, 0.3)'
                }}
              >
                Inspect Crop Field <ArrowRight size={14} />
              </button>

              <button
                onClick={handleClose}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '13px',
                  fontWeight: '600',
                  padding: '11px 20px',
                  borderRadius: '24px',
                  cursor: 'pointer'
                }}
              >
                Close View
              </button>
            </div>

          </div>

          {/* Right Column: Perfectly Proportioned Hero Crop Image Card */}
          <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div className="liquid-glass-panel" style={{
              width: '100%',
              height: '100%',
              maxHeight: '490px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
            }}>
              <img 
                src={cropData.img} 
                alt={cropData.primaryName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1594771804886-a933b2253646?auto=format&fit=crop&q=80&w=1200';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
              
              {/* Bottom Liquid Glass Telemetry Overlay Badge */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                padding: '14px 18px',
                borderRadius: '16px',
                backgroundColor: 'rgba(10, 16, 26, 0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#BACFA3', fontWeight: '700' }}>
                    Vegetative Health Index
                  </span>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: '1px 0 0 0' }}>
                    0.72 - 0.85 <span style={{ fontSize: '11px', fontWeight: '400', color: 'rgba(255,255,255,0.7)' }}>NDVI</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>AI Confidence</span>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#BACFA3' }}>
                    98.4%
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
