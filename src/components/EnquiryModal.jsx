import React, { useState } from 'react';
import { X, Trash2, CheckCircle, ArrowRight } from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, enquiryList, onRemoveItem, onClearEnquiry }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      onClearEnquiry();
      onClose();
    }, 2500);
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-wrapper" 
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3 className="-title-2-medium" style={{ fontSize: '28px' }}>Enquiry List</h3>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <X size={24} color="var(--color-stoneBrown800)" />
          </button>
        </div>

        {/* Scrollable List */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', gap: '16px', textAlign: 'center' }}>
              <CheckCircle size={48} color="var(--color-forestGreen600)" />
              <h4 className="-title-8-medium">Enquiry Submitted!</h4>
              <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)' }}>
                Your request has been received. Our sales representatives will send a custom pricing proposal shortly.
              </p>
            </div>
          ) : enquiryList.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', gap: '12px', textAlign: 'center' }}>
              <p className="-body-big-medium" style={{ color: 'var(--color-stoneBrown500)' }}>
                Your enquiry list is currently empty.
              </p>
              <p className="-body-medium" style={{ color: 'var(--color-stoneBrown400)' }}>
                Browse our collections and add sustainable solutions to your cart.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {enquiryList.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '16px', 
                    backgroundColor: 'var(--color-brightIvory50)', 
                    borderRadius: '8px',
                    border: '1px solid rgba(36, 31, 33, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                    <div>
                      <h4 className="-title-8-medium" style={{ fontSize: '15px' }}>{item.title}</h4>
                      <p className="-body-medium" style={{ fontSize: '12px', color: 'var(--color-stoneBrown500)', marginTop: '4px' }}>
                        Selected Color: <strong style={{ color: item.selectedColorHex }}>{item.selectedColorName}</strong>
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onRemoveItem(idx)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-red)', padding: '8px' }}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                  <label>Business Email for Quote</label>
                </div>

                <button 
                  type="submit" 
                  className="button-premium dark"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  Submit Enquiry Request <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(36, 31, 33, 0.05)', paddingTop: '20px', marginTop: '20px' }}>
          <p className="-body-smaller-medium" style={{ color: 'var(--color-stoneBrown500)' }}>
            We guarantee 100% recyclable, zero-maintenance products.
          </p>
        </div>
      </div>
    </div>
  );
}
