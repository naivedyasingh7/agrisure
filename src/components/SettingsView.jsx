import React, { useState } from 'react';
import { User, Shield, Bell, Lock, Sprout, Save, CheckCircle2, Database, Key, Phone, Mail, MapPin, DollarSign, Sliders, Globe } from 'lucide-react';

export default function SettingsView({ currentUser, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [toastMessage, setToastMessage] = useState(null);

  // Form State initialized with current user
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Dhananjay Singh',
    email: currentUser?.email || 'dhananjay@agrisure.ai',
    phone: currentUser?.phone || '+91 98765 43210',
    role: currentUser?.role || 'Chief Agritech Architect',
    farmerId: currentUser?.id || 'DCI-IND-1001',
    organization: 'KrishiNetra AI Labs',
    address: 'Condeixa Sector, Block 4, Uttar Pradesh',
    
    // Farm Preferences
    primaryCrop: 'Rice (Basmati Paddy)',
    landArea: '4.2 Acres',
    soilType: 'Alluvial Clay Loam',
    irrigationType: 'Canal & Borewell',
    ndviAlertThreshold: '0.35',
    unitSystem: 'Acres',

    // Payout & Insurance
    upiId: 'dhananjay@okicici',
    bankAccount: 'XXXX-XXXX-8921 (SBI)',
    autoPayoutLimit: '25000',
    claimRetrySensitivity: 'High (Strict Quality Checklist)',

    // Notifications
    smsAlerts: true,
    emailReports: true,
    whatsappUpdates: true,
    weatherWarnings: true,

    // Security & API
    neonDbStatus: 'Connected (PostgreSQL Cloud)',
    yoloConfidence: '0.85',
    sha256Verification: 'Enabled'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...currentUser,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role
      });
    }
    showToast('Settings saved successfully!');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section style={{ padding: '60px 0 100px 0', minHeight: '85vh' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: '14px 22px',
          borderRadius: '16px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
          zIndex: 3000,
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} color="#10B981" />
          {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <div className="g-row" style={{ marginBottom: '40px' }}>
        <div className="g-col xxl-18 sm-22">
          <span className="-body-small-medium" style={{ color: 'var(--color-forestGreen600)', letterSpacing: '0.05em' }}>
            SYSTEM & ACCOUNT CONFIGURATION
          </span>
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginTop: '8px' }}>
            Account Settings & Preferences
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            Manage your personal profile, agricultural parameters, insurance payout accounts, notification alerts, and security & privacy preferences.
          </p>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="g-row" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', alignItems: 'start' }}>
        
        {/* Left Navigation Sidebar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {[
            { id: 'profile', label: 'Profile & Identity', icon: User },
            { id: 'farm', label: 'Farm & Crop Parameters', icon: Sprout },
            { id: 'payout', label: 'Insurance & Payouts', icon: DollarSign },
            { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
            { id: 'security', label: 'Security & Privacy', icon: Lock }
          ].map(tab => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--color-stoneBrown800)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--color-stoneBrown700)',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <IconComp size={18} color={isActive ? '#FFFFFF' : 'var(--color-stoneBrown600)'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Settings Form Content Panel */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <form onSubmit={handleSave}>

            {/* TAB 1: Profile & Identity */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>
                    Personal Profile & Identity
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>
                    Your primary account details used for claim certification and identity verification.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Farmer / Official ID</label>
                    <input 
                      type="text" 
                      value={formData.farmerId} 
                      onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Role Title</label>
                    <input 
                      type="text" 
                      value={formData.role} 
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Organization / Co-op</label>
                    <input 
                      type="text" 
                      value={formData.organization} 
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Registered Address</label>
                  <input 
                    type="text" 
                    value={formData.address} 
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Farm & Crop Parameters */}
            {activeTab === 'farm' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>
                    Agricultural & Crop Parameters
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>
                    Configure default crop categories, land area units, and satellite NDVI anomaly alerts.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Primary Crop</label>
                    <select 
                      value={formData.primaryCrop} 
                      onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none', backgroundColor: 'white' }}
                    >
                      <option value="Rice (Basmati Paddy)">Rice (Basmati Paddy)</option>
                      <option value="Bt Cotton">Bt Cotton</option>
                      <option value="Wheat (Durum)">Wheat (Durum)</option>
                      <option value="Sugarcane">Sugarcane</option>
                      <option value="Maize (Kharif)">Maize (Kharif)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Total Land Area</label>
                    <input 
                      type="text" 
                      value={formData.landArea} 
                      onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Soil Classification</label>
                    <input 
                      type="text" 
                      value={formData.soilType} 
                      onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>NDVI Alert Sensitivity</label>
                    <select 
                      value={formData.ndviAlertThreshold} 
                      onChange={(e) => setFormData({ ...formData, ndviAlertThreshold: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none', backgroundColor: 'white' }}
                    >
                      <option value="0.30">0.30 (Extreme Loss Threshold)</option>
                      <option value="0.35">0.35 (Recommended Default)</option>
                      <option value="0.45">0.45 (Moderate Alert Sensitivity)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Insurance & Payouts */}
            {activeTab === 'payout' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>
                    Insurance & Direct Benefit Payout Config
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>
                    Manage direct bank transfers, UPI settlement endpoints, and automatic claim processing limits.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Direct Payout UPI ID</label>
                    <input 
                      type="text" 
                      value={formData.upiId} 
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Linked Bank Account</label>
                    <input 
                      type="text" 
                      value={formData.bankAccount} 
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Auto-Approval Limit (₹)</label>
                    <input 
                      type="number" 
                      value={formData.autoPayoutLimit} 
                      onChange={(e) => setFormData({ ...formData, autoPayoutLimit: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)', textTransform: 'uppercase' }}>Photo Quality Check Sensitivity</label>
                    <input 
                      type="text" 
                      value={formData.claimRetrySensitivity} 
                      disabled
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', fontSize: '14px', marginTop: '6px', backgroundColor: '#F4F4F5', color: '#71717A' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Notifications & Alerts */}
            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>
                    Notification Channels & Severe Weather Alerts
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>
                    Select how you want to receive claim decision notifications and cloudburst flood warnings.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { key: 'weatherWarnings', title: '⛈️ Extreme Rain & Cloudburst Alerts', desc: 'Instant SMS & voice alerts when local IMD rain gauges exceed +50% baseline.' },
                    { key: 'smsAlerts', title: '📱 Instant Payout SMS Notifications', desc: 'Receive real-time SMS whenever a claim is approved and settled.' },
                    { key: 'emailReports', title: '📧 Daily Satellite Telemetry Digest', desc: 'Daily Sentinel-2 vegetation NDVI email summaries for registered land.' },
                    { key: 'whatsappUpdates', title: '💬 WhatsApp Automated Claim Assistant', desc: 'Automated claim status tracking and photo retake reminders on WhatsApp.' }
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'var(--color-brightIvory200)' }}>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-stoneBrown800)' }}>{item.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-stoneBrown600)', marginTop: '2px' }}>{item.desc}</p>
                      </div>

                      <input 
                        type="checkbox" 
                        checked={formData[item.key]} 
                        onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--color-forestGreen600)', cursor: 'pointer' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Security & Privacy */}
            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>
                    Security & Data Privacy Controls
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>
                    Configure multi-factor authentication, GPS EXIF location privacy, data consent, and cryptographic ledger signatures.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'var(--color-brightIvory200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-forestGreen600)' }}>🔑 TWO-FACTOR & BIOMETRIC AUTHENTICATION</span>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-stoneBrown800)', marginTop: '2px' }}>Payout Release Verification</h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>Require SMS OTP or biometric verification before releasing direct bank payouts.</p>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: 'rgba(4,45,43,0.1)', color: 'var(--color-forestGreen600)', padding: '4px 10px', borderRadius: '6px' }}>Active</span>
                    </div>
                  </div>

                  <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'var(--color-brightIvory200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>📍 GPS EXIF METADATA & LOCATION PRIVACY</span>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-stoneBrown800)', marginTop: '2px' }}>Farm Boundary Encryption</h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>Encrypt raw GPS camera coordinates and precise land plot boundaries using AES-256 encryption.</p>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: 'rgba(4,45,43,0.1)', color: 'var(--color-forestGreen600)', padding: '4px 10px', borderRadius: '6px' }}>AES-256 Enabled</span>
                    </div>
                  </div>

                  <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'var(--color-brightIvory200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>🛡️ INSURER DATA CONSENT & ACCESS</span>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-stoneBrown800)', marginTop: '2px' }}>Third-Party Underwriter Permission</h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>Grant read-only telemetry access to PMFBY insurance underwriters strictly during active claim audits.</p>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: 'rgba(4,45,43,0.1)', color: 'var(--color-forestGreen600)', padding: '4px 10px', borderRadius: '6px' }}>Strict Consent</span>
                    </div>
                  </div>

                  <div style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'var(--color-brightIvory200)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-stoneBrown800)' }}>🔐 CRYPTOGRAPHIC AUDIT SIGNATURES</span>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-stoneBrown800)', marginTop: '2px' }}>SHA-256 Ledger Audit Signing</h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-stoneBrown600)', marginTop: '4px' }}>Every inspection photo upload & payout decision is stamped with a SHA-256 tamper-proof hash.</p>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: 'rgba(4,45,43,0.1)', color: 'var(--color-forestGreen600)', padding: '4px 10px', borderRadius: '6px' }}>Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button Bar */}
            <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
              <button
                type="submit"
                className="button-premium dark"
                style={{
                  backgroundColor: 'var(--color-forestGreen600)',
                  fontSize: '14px',
                  padding: '12px 32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Save size={16} /> Save All Settings
              </button>
            </div>

          </form>
        </div>

      </div>

    </section>
  );
}
