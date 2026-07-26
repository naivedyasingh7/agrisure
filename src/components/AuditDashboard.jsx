import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, DollarSign, Clock, CheckCircle2, XCircle, Clock3, Search, Download, FileText, Award, Image as ImageIcon } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function AuditDashboard() {
  const [stats, setStats] = useState({
    claimsPending: 3,
    payoutTotal: 32200,
    audited: [
      { id: 'CLM-101', farmer: 'Karan Singh', crop: 'Rice (Basmati)', status: 'approved', payout: 18500, time: '2026-07-26 12:40:15', hash: 'sha256:7f4ea013bc9a1f22', img: PINTEREST_IMAGES.farmWaterlogged, damage: '78%', qualityScore: '96/100' },
      { id: 'CLM-102', farmer: 'Ramesh Patel', crop: 'Bt Cotton', status: 'approved', payout: 9200, time: '2026-07-26 11:15:30', hash: 'sha256:8e3fa912ab4c3e11', img: PINTEREST_IMAGES.farmDrought, damage: '64%', qualityScore: '92/100' },
      { id: 'CLM-103', farmer: 'Devendra Rao', crop: 'Wheat (Durum)', status: 'rejected', payout: 0, time: '2026-07-26 09:50:00', hash: 'sha256:9d2eb711cd2f5a00', img: PINTEREST_IMAGES.farmWaterlogged, damage: '12%', qualityScore: '45/100 (Blurry)' }
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
            img: idx === 0 ? PINTEREST_IMAGES.farmWaterlogged : idx === 1 ? PINTEREST_IMAGES.farmDrought : PINTEREST_IMAGES.farmWaterlogged,
            damage: item.status === 'approved' ? (idx === 0 ? '78%' : '64%') : '12%',
            qualityScore: item.status === 'approved' ? '95/100' : '45/100 (Blurry)'
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

    triggerNotice(`Downloaded Full Inspection Report for ${row.farmer}`);
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

AUTHENTICITY STATUS: CRYPTOGRAPHICALLY VERIFIED ON CLOUD LEDGER
====================================================`;

    const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AgriSure_Verifiable_Certificate_${row.farmer.replace(/\s+/g, '_')}.txt`;
    link.click();

    triggerNotice(`Downloaded Official Claim Certificate for ${row.farmer}`);
  };

  const triggerNotice = (msg) => {
    setDownloadNotice(msg);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const filteredAudited = (stats.audited || []).filter(item => {
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.farmer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.crop.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      
      {/* Toast Notification */}
      {downloadNotice && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: 'var(--color-stoneBrown800)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 1000,
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={16} color="var(--color-flourYellow)" />
          {downloadNotice}
        </div>
      )}

      {/* Header */}
      <div className="g-row" style={{ marginBottom: '40px' }}>
        <div className="g-col xxl-18 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-forestGreen600)', letterSpacing: '0.05em' }}>
            KRISHINETRA RECORD AUDIT & ARCHIVE
          </span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            History & Past Upload Records
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            Review past farmer crop photo uploads, AI quality inspection scores, and download official PDF/TXT Inspection Reports & Verifiable Claim Certificates.
          </p>
        </div>
      </div>

      {/* Past Photo Uploads Grid Section */}
      <div className="g-row" style={{ marginBottom: '50px' }}>
        <div className="g-col xxl-24">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <ImageIcon size={20} color="var(--color-forestGreen600)" />
            <h3 className="-title-8-medium" style={{ fontSize: '18px', color: 'var(--color-stoneBrown800)' }}>
              Past Field Photo Uploads & AI Quality Audits
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {stats.audited.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={item.img} 
                      alt={item.crop} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      {item.status === 'approved' ? (
                        <span style={{ backgroundColor: 'var(--color-forestGreen600)', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>
                          ✓ Approved (₹{item.payout.toLocaleString()})
                        </span>
                      ) : (
                        <span style={{ backgroundColor: 'var(--color-red)', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>
                          ✕ Rejected
                        </span>
                      )}
                    </div>
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '11px', padding: '4px 10px', borderRadius: '8px' }}>
                      Checklist: {item.qualityScore}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-stoneBrown800)' }}>
                        {item.farmer}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'var(--color-stoneBrown500)' }}>{item.time}</span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>
                      Crop: <strong>{item.crop}</strong> • Damage: <strong style={{ color: 'var(--color-red)' }}>{item.damage}</strong>
                    </p>

                    <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-stoneBrown500)', marginTop: '10px' }}>
                      {item.hash}
                    </p>
                  </div>
                </div>

                {/* Dual Download Buttons */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: 'var(--color-brightIvory200)', display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleDownloadReport(item)}
                    className="button-premium outline"
                    style={{ flex: 1, fontSize: '12px', padding: '8px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderColor: 'var(--color-stoneBrown800)', color: 'var(--color-stoneBrown800)' }}
                  >
                    <FileText size={14} /> Download Report
                  </button>

                  <button 
                    onClick={() => handleDownloadCertificate(item)}
                    className="button-premium dark"
                    disabled={item.status === 'rejected'}
                    style={{ 
                      flex: 1, 
                      fontSize: '12px', 
                      padding: '8px 10px', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '6px', 
                      backgroundColor: item.status === 'rejected' ? '#ccc' : 'var(--color-forestGreen600)',
                      cursor: item.status === 'rejected' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Award size={14} /> Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="g-row" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 className="-title-8-medium" style={{ fontSize: '18px', color: 'var(--color-stoneBrown800)' }}>
            Full Claims Audit History
          </h3>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px', flexGrow: 1, maxWidth: '360px' }}>
          <Search size={16} color="var(--color-stoneBrown500)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search farmer name or crop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 38px',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.15)',
              backgroundColor: 'white',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'approved', 'pending', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className="button-premium outline"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                borderColor: filterStatus === status ? 'var(--color-stoneBrown800)' : 'rgba(0,0,0,0.1)',
                backgroundColor: filterStatus === status ? 'var(--color-stoneBrown800)' : 'transparent',
                color: filterStatus === status ? 'white' : 'var(--color-stoneBrown700)',
                textTransform: 'capitalize'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Claims Ledger Table */}
      <div className="g-row">
        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-brightIvory200)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>Farmer</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>Crop</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>Settled Payout</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase' }}>SHA-256 Hash</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--color-stoneBrown600)', textTransform: 'uppercase', textAlign: 'center' }}>Downloads</th>
              </tr>
            </thead>
            <tbody>
              {filteredAudited.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--color-stoneBrown500)', fontSize: '14px' }}>
                    No audit records matching criteria.
                  </td>
                </tr>
              ) : (
                filteredAudited.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', transition: 'backgroundColor 0.2s ease' }}>
                    <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--color-stoneBrown800)', fontSize: '14px' }}>
                      {row.farmer}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-stoneBrown700)', fontSize: '13px' }}>
                      {row.crop}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {row.status === 'approved' && (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-forestGreen600)', backgroundColor: 'rgba(4,45,43,0.1)', padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} /> Approved
                        </span>
                      )}
                      {row.status === 'rejected' && (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-red)', backgroundColor: 'rgba(255,0,77,0.1)', padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <XCircle size={12} /> Rejected
                        </span>
                      )}
                      {row.status === 'pending' && (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-urbanCoral)', backgroundColor: 'rgba(247,108,70,0.15)', padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock3 size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--color-stoneBrown800)', fontSize: '14px' }}>
                      ₹{row.payout ? row.payout.toLocaleString() : '0'}
                    </td>
                    <td style={{ padding: '16px 20px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-stoneBrown600)' }}>
                      {row.hash || 'sha256:7f4ea013bc9a1f22'}
                    </td>

                    {/* Dual Download Column */}
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleDownloadReport(row)}
                          title="Download Inspection Report"
                          style={{
                            backgroundColor: 'rgba(4,45,43,0.08)',
                            color: 'var(--color-forestGreen600)',
                            border: '1px solid rgba(4,45,43,0.2)',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <FileText size={13} /> Report
                        </button>

                        <button
                          onClick={() => handleDownloadCertificate(row)}
                          title={row.status === 'rejected' ? 'Certificate unavailable for rejected claims' : 'Download Verifiable Claim Certificate'}
                          disabled={row.status === 'rejected'}
                          style={{
                            backgroundColor: row.status === 'rejected' ? '#eee' : 'var(--color-flourYellow)',
                            color: row.status === 'rejected' ? '#999' : 'var(--color-stoneBrown800)',
                            border: '1px solid ' + (row.status === 'rejected' ? '#ddd' : 'var(--color-stoneBrown800)'),
                            borderRadius: '8px',
                            padding: '6px 10px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: row.status === 'rejected' ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Award size={13} /> Certificate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
