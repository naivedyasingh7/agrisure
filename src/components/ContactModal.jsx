import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', country: '', message: '' });
      onClose();
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-wrapper" 
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h3 className="-title-2-medium" style={{ fontSize: '28px' }}>Contact</h3>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <X size={24} color="var(--color-stoneBrown800)" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', gap: '16px', textAlign: 'center' }}>
              <CheckCircle size={48} color="var(--color-forestGreen600)" />
              <h4 className="-title-8-medium">Message Sent!</h4>
              <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)' }}>
                Thank you. We will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  required 
                />
                <label>First Name</label>
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  required 
                />
                <label>Last Name</label>
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
                <label>Email</label>
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleInputChange} 
                  required 
                />
                <label>Country</label>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                ></textarea>
                <label>Message</label>
              </div>

              <button 
                type="submit" 
                className="button-premium dark"
                style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Send Message <Send size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ borderTop: '1px solid rgba(36, 31, 33, 0.05)', paddingTop: '20px', marginTop: '20px' }}>
          <p className="-body-smaller-medium" style={{ color: 'var(--color-stoneBrown500)' }}>
            Or call us directly at +351 239 561 392
          </p>
        </div>
      </div>
    </div>
  );
}
