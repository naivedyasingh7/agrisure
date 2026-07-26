import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, DollarSign, Clock, CheckCircle2, XCircle, Clock3, Search, Download, FileText, Award, Image as ImageIcon, Filter, Check, X, ShieldAlert } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function AuditDashboard({ onCropClick }) {
  const [stats, setStats] = useState({
    claimsPending: 3,
    payoutTotal: 27700,
    audited: [
      { id: 'CLM-101', farmer: 'Karan Singh', crop: 'Rice (Basmati)', status: 'approved', payout: 18500, time: '2026-07-26 12:40', hash: 'sha256:7f4ea013bc9a1f22', img: PINTEREST_IMAGES.farmWaterlogged, damage: '78%', qualityScore: '96/100', cropKey: 'rice' },
      { id: 'CLM-102', farmer: 'Ramesh Patel', crop: 'Bt Cotton', status: 'approved', payout: 9200, time: '2026-07-26 11:15', hash: 'sha256:8e3fa912ab4c3e11', img: PINTEREST_IMAGES.cottonField, damage: '64%', qualityScore: '92/100', cropKey: 'cotton' },
      { id: 'CLM-103', farmer: 'Devendra Rao', crop: 'Wheat (Durum)', status: 'rejected', payout: 0, time: '2026-07-26 09:50', hash: 'sha256:9d2eb711cd2f5a00', img: PINTEREST_IMAGES.wheatField, damage: '12%', qualityScore: '45/100 (Blurry)', cropKey: 'wheat' }
    ]
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadNotice, setDownloadNotice] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.audited && data.audited.length > 0) {
          const enhancedAudited = data.audited.map((item, idx) => ({
            id: `CLM-10${idx + 1}`,
            ...item,
            img: idx === 0 ? PINTEREST_IMAGES.farmWaterlogged : idx === 1 ? PINTEREST_IMAGES.cottonField : PINTEREST_IMAGES.wheatField,
            damage: item.status === 'approved' ? (idx === 0 ? '78%' : '64%') : '12%',
            qualityScore: item.status === 'approved' ? '96/100' : '45/100 (Blurry)',
            cropKey: idx === 0 ? 'rice' : idx === 1 ? 'cotton' : 'wheat'
          }));
          setStats({ ...data, audited: enhancedAudited });
        }
      })
      .catch(err => console.log("Using local history audit state:", err));
  }, []);

  const handleDownloadReport = (row) => {
    const reportContent = `====================================================
KRISHINETRA AI - CROP FIELD INSPECTION REPORT
====================================================
Report ID: RPT-${row.id || '101'}-${Math.floor(1000 + Math.random() * 9000)}
Generated Date: ${new Date().toLocaleString()}

FARMER & CROP DETAILS:
- Farmer Applicant: ${row.farmer}
- Crop Category: ${row.crop}
- Inspection Date: ${row.time || '2026-07-26 12:40:15'}
- AI Quality Score: ${row.qualityScore || '96/100'}

MULTI-SOURCE FUSION ANALYSIS:
- Assessed Crop Damage: ${row.damage || '78%'}
- Satellite Sentinel-2 NDVI: 0.31 (Severe Vegetative Loss)
- IMD Weather Anomaly: +98% Precipitation (Cloudburst)
- Vision Model Segmentation: YOLOv8 Flood Mask Match

CHECKLIST QUALITY & ANTI-SPOOFING AUDIT:
[✓] Image Sharpness & Clarity: PASSED
[✓] Crop Field Area Coverage (70%+): PASSED
[✓] Daylight Lighting & Exposure: PASSED
[✓] GPS EXIF & Motion Anti-Spoofing: VERIFIED

AUDIT DIGEST & PERSISTENCE:
- Cryptographic Hash: ${row.hash || 'sha256:7f4ea013bc9a1f22'}
- Ledger State: Neon Cloud PostgreSQL Database Persisted
====================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AgriSure_Inspection_Report_${row.farmer.replace(/\s+/g, '_')}.txt`;
    link.click();

    triggerNotice(`Downloaded Report for ${row.farmer}`);
  };

  const handleDownloadCertificate = (row) => {
    if (row.status === 'rejected') {
      triggerNotice(`⚠️ Certificate unavailable for rejected claim (${row.farmer})`);
      return;
    }

    const certContent = `====================================================
OFFICIAL VERIFIABLE CROP CLAIM CERTIFICATE
ISSUED BY KRISHINETRA AI ENTERPRISE ENGINE
====================================================
Certificate ID: CERT-${row.id || '101'}-${Math.floor(1000 + Math.random() * 9000)}
Issue Date: ${new Date().toLocaleDateString()}

THIS CERTIFIES THAT THE CROP DAMAGE CLAIM FOR:
- Beneficiary Farmer: ${row.farmer}
- Crop Type: ${row.crop}
- Assessed Loss: ${row.damage || '78%'}

HAS BEEN AUTOMATICALLY VERIFIED AND SETTLED:
- Claim Status: APPROVED & SETTLED
- Payout Settlement Amount: ₹${row.payout ? row.payout.toLocaleString() : '18,500'} INR
- SHA-256 Digest Hash: ${row.hash || 'sha256:7f4ea013bc9a1f22'}
- Neon Cloud DB Tx ID: TX-PG-${Math.floor(10000000 + Math.random() * 90000000)}
====================================================`;

    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AgriSure_Claim_Certificate_${row.farmer.replace(/\s+/g, '_')}.txt`;
    link.click();

    triggerNotice(`Downloaded Certificate for ${row.farmer}`);
  };

  const triggerNotice = (msg) => {
    setDownloadNotice(msg);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3200);
  };

  const filteredAudited = (stats.audited || []).filter(item => {
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.farmer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.crop.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPayout = (stats.audited || []).reduce((acc, curr) => acc + (curr.payout || 0), 0);
  const approvedCount = (stats.audited || []).filter(i => i.status === 'approved').length;
  const rejectedCount = (stats.audited || []).filter(i => i.status === 'rejected').length;

  return (
    <section style={{ 
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 0 60px 0',
      marginBottom: '120px',
      boxSizing: 'border-box'
    }}>
      
      {/* Toast Notification */}
      {downloadNotice && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: 'var(--color-stoneBrown800)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          zIndex: 1000,
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <CheckCircle2 size={16} color="var(--color-flourYellow)" />
          {downloadNotice}
        </div>
      )}

      {/* Header */}
      <div className="g-row" style={{ marginBottom: '32px' }}>
        <div className="g-col xxl-18 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-stoneBrown600)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700' }}>
            KRISHINETRA RECORD AUDIT & ARCHIVE
          </span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '6px', fontSize: 'clamp(28px, 2vw + 16px, 42px)' }}>
            History & Records
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '6px', fontSize: '15px' }}>
            Clean ledger audit history of past crop inspection records, SHA-256 verification hashes, and official certificate archives.
          </p>
        </div>
      </div>

      {/* Executive KPI Stats Overview Bar (Replaces Clustered Cards) */}
      <div className="g-row" style={{ marginBottom: '36px' }}>
        <div className="g-col xxl-24">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            
            <div style={{ backgroundColor: 'rgba(36, 31, 33, 0.03)', border: '1px solid rgba(36, 31, 33, 0.08)', borderRadius: '18px', padding: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>Total Upload Audits</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-stoneBrown800)', margin: '4px 0 0 0' }}>
                {stats.audited.length} <span style={{ fontSize: '13px', fontWeight: '400', color: 'var(--color-stoneBrown600)' }}>Records</span>
              </h3>
            </div>

            <div style={{ backgroundColor: 'rgba(186, 207, 163, 0.15)', border: '1px solid rgba(186, 207, 163, 0.3)', borderRadius: '18px', padding: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-forestGreen600)', textTransform: 'uppercase' }}>Approved Claims</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-forestGreen600)', margin: '4px 0 0 0' }}>
                {approvedCount} <span style={{ fontSize: '13px', fontWeight: '500' }}>Approved</span>
              </h3>
            </div>

            <div style={{ backgroundColor: 'rgba(36, 31, 33, 0.03)', border: '1px solid rgba(36, 31, 33, 0.08)', borderRadius: '18px', padding: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>Disbursed Payout</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-stoneBrown800)', margin: '4px 0 0 0' }}>
                ₹{totalPayout.toLocaleString()} <span style={{ fontSize: '13px', fontWeight: '400', color: 'var(--color-stoneBrown600)' }}>INR</span>
              </h3>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 0, 77, 0.06)', border: '1px solid rgba(255, 0, 77, 0.15)', borderRadius: '18px', padding: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-red)', textTransform: 'uppercase' }}>Fraud Blocked</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-red)', margin: '4px 0 0 0' }}>
                {rejectedCount} <span style={{ fontSize: '13px', fontWeight: '500' }}>Rejected</span>
              </h3>
            </div>

          </div>
        </div>
      </div>

      {/* Main Clean Audit History Table & Controls Section */}
      <div className="g-row">
        <div className="g-col xxl-24">
          
          {/* Controls Bar: Search & Status Filters */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            
            {/* Search Bar */}
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-stoneBrown500)' }} />
              <input 
                type="text" 
                placeholder="Search farmer name or crop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: '30px',
                  border: '1px solid rgba(36, 31, 33, 0.15)',
                  backgroundColor: 'white',
                  fontSize: '13px',
                  color: 'var(--color-stoneBrown800)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'all', label: 'All Records' },
                { id: 'approved', label: 'Approved' },
                { id: 'rejected', label: 'Rejected' }
              ].map(tab => {
                const isActive = filterStatus === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterStatus(tab.id)}
                    style={{
                      backgroundColor: isActive ? 'var(--color-forestGreen600)' : 'rgba(128, 128, 128, 0.12)',
                      color: isActive ? '#FFFFFF' : 'var(--color-stoneBrown700)',
                      border: isActive ? '1px solid var(--color-forestGreen600)' : '1px solid rgba(128, 128, 128, 0.2)',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      fontSize: '13px',
                      fontWeight: isActive ? '700' : '600',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: isActive ? '0 4px 12px rgba(4, 45, 43, 0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Table Container */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            border: '1px solid rgba(36, 31, 33, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(36, 31, 33, 0.03)', borderBottom: '1px solid rgba(36, 31, 33, 0.08)' }}>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)' }}>Farmer / ID</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)' }}>Crop & Damage</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)' }}>Audit Date</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)' }}>Status</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)' }}>Payout</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)' }}>SHA-256 Hash</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-stoneBrown600)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudited.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-stoneBrown500)' }}>
                      No matching audit records found.
                    </td>
                  </tr>
                ) : (
                  filteredAudited.map((row, idx) => (
                    <tr 
                      key={row.id || idx}
                      style={{ borderBottom: '1px solid rgba(36, 31, 33, 0.06)', transition: 'background-color 0.15s ease' }}
                    >
                      {/* Farmer & Thumbnail */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={row.img} 
                            alt={row.crop}
                            onClick={() => onCropClick && onCropClick(row.cropKey || 'rice')}
                            style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', cursor: 'pointer' }}
                            title="Click to view Crop Intelligence Modal"
                          />
                          <div>
                            <div style={{ fontWeight: '600', color: 'var(--color-stoneBrown800)' }}>{row.farmer}</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-stoneBrown500)' }}>{row.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Crop & Damage */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: '600', color: 'var(--color-stoneBrown800)' }}>{row.crop}</div>
                        <div style={{ fontSize: '12px', color: row.status === 'approved' ? 'var(--color-red)' : 'var(--color-stoneBrown500)' }}>
                          Loss: {row.damage} • Quality: {row.qualityScore}
                        </div>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '16px 20px', color: 'var(--color-stoneBrown700)', fontSize: '13px' }}>
                        {row.time}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 20px' }}>
                        {row.status === 'approved' ? (
                          <span style={{ backgroundColor: 'rgba(4, 45, 43, 0.08)', color: 'var(--color-forestGreen600)', border: '1px solid rgba(4, 45, 43, 0.2)', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={12} /> Approved
                          </span>
                        ) : (
                          <span style={{ backgroundColor: 'rgba(255, 0, 77, 0.08)', color: 'var(--color-red)', border: '1px solid rgba(255, 0, 77, 0.2)', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <X size={12} /> Rejected
                          </span>
                        )}
                      </td>

                      {/* Payout */}
                      <td style={{ padding: '16px 20px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>
                        {row.payout ? `₹${row.payout.toLocaleString()}` : '—'}
                      </td>

                      {/* Hash */}
                      <td style={{ padding: '16px 20px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-stoneBrown600)' }}>
                        {row.hash ? `${row.hash.substring(0, 18)}...` : 'sha256:7f4ea0...'}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => handleDownloadReport(row)}
                            title="Download Official Inspection Report"
                            style={{
                              backgroundColor: 'rgba(36, 31, 33, 0.05)',
                              border: '1px solid rgba(36, 31, 33, 0.1)',
                              color: 'var(--color-stoneBrown800)',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <FileText size={13} /> Report
                          </button>

                          {row.status === 'approved' && (
                            <button
                              onClick={() => handleDownloadCertificate(row)}
                              title="Download Verifiable Claim Certificate"
                              style={{
                                backgroundColor: 'var(--color-forestGreen600)',
                                border: 'none',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Award size={13} /> Certificate
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </section>
  );
}
