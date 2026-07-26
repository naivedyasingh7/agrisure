import React, { useState } from 'react';
import { User, LogIn, LogOut, Settings, ShieldCheck, CheckCircle2, Menu, X, Database, Camera, FileText, Users, Clock, Search, Save, Phone, Mail } from 'lucide-react';

export default function Navbar({ activeView, setActiveView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Modals
  const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false);
  const [switchAccModalOpen, setSwitchAccModalOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState(null);

  const dummyAccounts = [
    {
      name: 'Dhananjay Singh',
      email: 'dhananjay@agrisure.ai',
      phone: '+91 98765 43210',
      role: 'Chief Agritech Architect',
      id: 'DCI-IND-1001',
      crop: 'Rice (Basmati Paddy)'
    },
    {
      name: 'Naivedya Singh',
      email: 'naivedya@agrisure.ai',
      phone: '+91 98123 45678',
      role: 'Lead AI Vision Engineer',
      id: 'DCI-IND-1002',
      crop: 'Bt Cotton'
    },
    {
      name: 'Shashwat Mishra',
      email: 'shashwat@agrisure.ai',
      phone: '+91 97654 32109',
      role: 'Spatial Telemetry Lead',
      id: 'DCI-IND-1003',
      crop: 'Wheat (Durum)'
    },
    {
      name: 'Angel Verman',
      email: 'angel@agrisure.ai',
      phone: '+91 96543 21098',
      role: 'Crop Damage Inspector',
      id: 'DCI-IND-1004',
      crop: 'Sugarcane Sector'
    },
    {
      name: 'Arushi Sharma',
      email: 'arushi@agrisure.ai',
      phone: '+91 95432 10987',
      role: 'Claims Settlement Officer',
      id: 'DCI-IND-1005',
      crop: 'Maize (Kharif)'
    },
    {
      name: 'Pragalbha',
      email: 'pragalbha@agrisure.ai',
      phone: '+91 94321 09876',
      role: 'Data Integrity Analyst',
      id: 'DCI-IND-1006',
      crop: 'Paddy (Basmati)'
    }
  ];

  const [currentUser, setCurrentUser] = useState(dummyAccounts[0]);
  const [formData, setFormData] = useState({ ...dummyAccounts[0] });

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'registry', label: 'DCI Registry' },
    { id: 'demo', label: 'Live Inspector' },
  ];

  // Helper to compute initials
  const getInitials = (name) => {
    if (!name) return 'DS';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Helper to compute background color
  const getAvatarBg = (name) => {
    const colors = ['#18181B', '#042D2B', '#1E3A8A', '#7C2D12', '#4C1D95', '#065F46'];
    let sum = 0;
    for (let i = 0; i < (name || '').length; i++) sum += name.charCodeAt(i);
    return colors[sum % colors.length];
  };

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleSwitchUser = (account) => {
    setCurrentUser(account);
    setFormData({ ...account });
    setIsLoggedIn(true);
    setSwitchAccModalOpen(false);
    setDropdownOpen(false);
    showToast(`Switched account to ${account.name}`);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setCurrentUser({ ...formData });
    setUserSettingsModalOpen(false);
    showToast('User settings updated successfully!');
  };

  const showToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  return (
    <header className="navbar-header" style={{ position: 'relative' }}>
      
      {/* Toast Alert */}
      {toastNotice && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 3000,
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={16} color="#10B981" />
          {toastNotice}
        </div>
      )}

      <div className="navbar-container">
        <a href="#home" onClick={() => handleNavClick('home')} className="logo-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          KrishiNetra AI
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#audit"
            className={`nav-link ${activeView === 'audit' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('audit');
            }}
          >
            History & Records
          </a>
        </nav>

        {/* Top Right Initial Avatar Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: getAvatarBg(currentUser.name),
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {getInitials(currentUser.name)}
                </div>
              </button>

              {/* User Dropdown Menu Card */}
              {dropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '54px',
                    right: 0,
                    width: '320px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '16px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0,0,0,0.04)',
                    zIndex: 1000,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    animation: 'fadeIn 0.2s ease'
                  }}
                >
                  {/* Inner Top Profile Card Header */}
                  <div style={{
                    border: '1px solid #EFEFEF',
                    borderRadius: '18px',
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF'
                  }}>
                    <div style={{ overflow: 'hidden', paddingRight: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#000000', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#71717A', margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser.email}
                      </p>
                    </div>

                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: getAvatarBg(currentUser.name),
                      color: '#FFFFFF',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                    }}>
                      {getInitials(currentUser.name)}
                    </div>
                  </div>

                  {/* Separate Options Menu List */}
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    
                    {/* Separate Option 1: Settings */}
                    <div 
                      onClick={() => handleNavClick('settings')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        backgroundColor: activeView === 'settings' ? '#F4F4F5' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <Settings size={20} color="#000000" strokeWidth={2} />
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}>Settings</span>
                    </div>

                    {/* Separate Option 2: Switch Account */}
                    <div 
                      onClick={() => { setSwitchAccModalOpen(true); setDropdownOpen(false); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Users size={20} color="#000000" strokeWidth={2} />
                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}>Switch Account</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', backgroundColor: '#F4F4F5', padding: '2px 8px', borderRadius: '10px', color: '#71717A' }}>
                        6 Accounts
                      </span>
                    </div>

                    {/* Option 3: Pending Tasks */}
                    <div 
                      onClick={() => handleNavClick('demo')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Clock size={20} color="#000000" strokeWidth={2} />
                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}>Pending Tasks</span>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: 'rgba(247,108,70,0.15)', color: 'var(--color-urbanCoral)', padding: '2px 10px', borderRadius: '12px' }}>
                        3 Pending
                      </span>
                    </div>

                    {/* Option 4: Total Searches */}
                    <div 
                      onClick={() => handleNavClick('audit')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '14px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Search size={20} color="#000000" strokeWidth={2} />
                        <span style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}>Total Searches</span>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#F4F4F5', color: '#71717A', padding: '2px 10px', borderRadius: '12px' }}>
                        142 Scans
                      </span>
                    </div>

                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', backgroundColor: '#EFEFEF', margin: '10px 0' }} />

                  {/* Option 5: Sign out */}
                  <div 
                    onClick={() => { setIsLoggedIn(false); setDropdownOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <LogOut size={20} color="#000000" strokeWidth={2} />
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}>Sign out</span>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => { setIsLoggedIn(true); setDropdownOpen(true); }}
              className="button-premium dark"
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              <LogIn size={15} color="#FFFFFF" />
              Sign in
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 1. User Settings Modal (Editable Profile, Name, Email, Phone, Role) */}
      {userSettingsModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '30px',
            maxWidth: '460px',
            width: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            <button 
              onClick={() => setUserSettingsModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} color="#71717A" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: getAvatarBg(formData.name),
                color: '#FFFFFF',
                fontSize: '18px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getInitials(formData.name)}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: 0 }}>
                  User Profile Settings
                </h3>
                <p style={{ fontSize: '13px', color: '#71717A', margin: '2px 0 0 0' }}>
                  Update your personal info, contact details & role preferences.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #EFEFEF',
                    backgroundColor: '#F4F4F5',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    marginTop: '6px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #EFEFEF',
                    backgroundColor: '#F4F4F5',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    marginTop: '6px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #EFEFEF',
                    backgroundColor: '#F4F4F5',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    marginTop: '6px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Role / Sector</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid #EFEFEF',
                    backgroundColor: '#F4F4F5',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    marginTop: '6px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setUserSettingsModalOpen(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '14px', border: '1px solid #EFEFEF', backgroundColor: '#FFFFFF', color: '#000000', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '12px', borderRadius: '14px', border: 'none', backgroundColor: '#000000', color: '#FFFFFF', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Switch User Account Modal (6 Team Accounts) */}
      {switchAccModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            maxWidth: '460px',
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            <button 
              onClick={() => setSwitchAccModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} color="#71717A" />
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000000', margin: '0 0 6px 0' }}>
              Switch User Account
            </h3>
            <p style={{ fontSize: '13px', color: '#71717A', margin: '0 0 20px 0' }}>
              Select one of the 6 team member accounts to switch active login state.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {dummyAccounts.map((account, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSwitchUser(account)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    border: currentUser.name === account.name ? '2px solid #000000' : '1px solid #EFEFEF',
                    backgroundColor: currentUser.name === account.name ? '#F4F4F5' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: getAvatarBg(account.name),
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {getInitials(account.name)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px', color: '#000000' }}>{account.name}</div>
                      <div style={{ fontSize: '12px', color: '#71717A' }}>{account.email} • <span style={{ fontWeight: '500' }}>{account.role}</span></div>
                    </div>
                  </div>
                  {currentUser.name === account.name && <CheckCircle2 size={18} color="#000000" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            padding: '20px var(--grid-margin)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            zIndex: 499,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#audit"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              handleNavClick('audit');
            }}
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            History & Records
          </a>
        </div>
      )}

      {/* Inline media queries */}
      <style>{`
        @media (max-width: 1023px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
