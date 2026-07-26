import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

export default function ProductCustomizationModal({ isOpen, onClose, product, onAddToEnquiry }) {
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToEnquiry({
      ...product,
      selectedColorName: selectedColor ? selectedColor.name : 'Default',
      selectedColorHex: selectedColor ? selectedColor.hex : '#000000'
    });
    onClose();
  };

  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div 
        className="modal-wrapper" 
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 className="-title-2-medium" style={{ fontSize: '24px' }}>Configure Product</h3>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <X size={24} color="var(--color-stoneBrown800)" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h4 className="-title-4-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
            {product.title}
          </h4>

          <div style={{ height: '240px', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ marginTop: '10px' }}>
            <h5 className="-title-8-medium" style={{ fontSize: '14px', marginBottom: '12px' }}>
              Select Finishes / Color
            </h5>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {product.colors && product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: selectedColor && selectedColor.name === color.name 
                      ? 'var(--color-stoneBrown800)' 
                      : 'var(--color-stoneBrown300)',
                    backgroundColor: selectedColor && selectedColor.name === color.name 
                      ? 'var(--color-stoneBrown100)' 
                      : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ 
                    display: 'block', 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: color.hex 
                  }}></span>
                  <span className="-body-medium" style={{ fontSize: '13px', fontWeight: '500' }}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '16px', backgroundColor: 'var(--color-brightIvory50)', padding: '16px', borderRadius: '8px' }}>
            <p className="-body-medium" style={{ fontSize: '13px', color: 'var(--color-stoneBrown600)', lineHeight: '1.6' }}>
              Floema solutions are build out of <strong>100% recycled RePlastic materials</strong>, delivering long-lasting weather-proof outdoor installations with zero structural maintenance required.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div style={{ borderTop: '1px solid rgba(36, 31, 33, 0.05)', paddingTop: '20px', marginTop: '20px' }}>
          <button
            onClick={handleAdd}
            className="button-premium dark"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <ShoppingBag size={18} /> Add to Enquiry List
          </button>
        </div>
      </div>
    </div>
  );
}
