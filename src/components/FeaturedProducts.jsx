import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function FeaturedProducts({ onSelectProduct }) {
  const products = [
    {
      id: 'byside-bench-plaza',
      title: 'IoT Soil & Flood Telemetry Station',
      category: 'Hardware',
      tagClass: '-urban',
      img: PINTEREST_IMAGES.urbanBench,
      colors: [
        { name: 'Brown Wood', hex: '#8b5a2b' },
        { name: 'Forest Green', hex: '#042d2b' },
        { name: 'Replastic Blue', hex: '#85a1c5' },
        { name: 'Dark Gray', hex: '#3e3e3e' }
      ]
    },
    {
      id: 'palmer-tee-sign',
      title: 'Precision Micro-Weather Gauge',
      category: 'Weather',
      tagClass: '-golf',
      img: PINTEREST_IMAGES.golfSign,
      colors: [
        { name: 'Rustic Brass', hex: '#d4af37' },
        { name: 'Charcoal Black', hex: '#241f21' }
      ]
    }
  ];

  return (
    <section className="featured-products-section">
      <div className="g-row">
        <div className="g-col xxl-24">
          <p className="-body-smaller-medium" style={{ color: 'var(--color-stoneBrown600)', marginBottom: '8px' }}>
            Recent Additions ↓
          </p>
          <h2 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)', marginBottom: '24px' }}>
            Featured Sustainable Products
          </h2>
        </div>
      </div>

      <div className="g-row">
        <div className="g-col xxl-24">
          <div className="products-grid">
            {products.map((prod) => (
              <div key={prod.id} className="product-card">
                <div>
                  <div className="product-card-header">
                    <h3 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
                      {prod.title}
                    </h3>
                    <div className={`category-tag ${prod.tagClass}`}>
                      <span>{prod.category}</span>
                    </div>
                  </div>

                  <div className="product-image-container">
                    <img 
                      src={prod.img} 
                      alt={prod.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                </div>

                <div className="product-actions">
                  <div className="color-option-dots">
                    <span className="-body-smaller-medium" style={{ marginRight: '8px' }}>Colors</span>
                    {prod.colors.map((color, cIdx) => (
                      <span 
                        key={cIdx} 
                        className="color-dot"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      ></span>
                    ))}
                  </div>

                  <button 
                    onClick={() => onSelectProduct(prod)}
                    className="button-premium dark"
                    style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    Explore <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
