import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PINTEREST_IMAGES } from '../assets/images';

export default function ProductsCatalog({ categoryFilter, setCategoryFilter, onSelectProduct }) {
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = [
    {
      id: 'byside-bench-plaza',
      title: 'IoT Soil & Flood Telemetry Station',
      category: 'urban',
      categoryLabel: 'Hardware',
      tagClass: '-urban',
      img: PINTEREST_IMAGES.urbanBench,
      colors: [
        { name: 'Brown Wood', hex: '#8b5a2b' },
        { name: 'Forest Green', hex: '#042d2b' },
        { name: 'Replastic Blue', hex: '#85a1c5' }
      ]
    },
    {
      id: 'palmer-tee-sign',
      title: 'Precision Micro-Weather Gauge',
      category: 'golf',
      categoryLabel: 'Weather',
      tagClass: '-golf',
      img: PINTEREST_IMAGES.golfSign,
      colors: [
        { name: 'Rustic Brass', hex: '#d4af37' },
        { name: 'Charcoal Black', hex: '#241f21' }
      ]
    },
    {
      id: 'forest-trail-wayfinding',
      title: 'DCI Solar Field Marker Beacon',
      category: 'nature',
      categoryLabel: 'Solar GPS',
      tagClass: '-nature',
      img: PINTEREST_IMAGES.natureSign,
      colors: [
        { name: 'Natural Oak', hex: '#b58a5c' },
        { name: 'Dark Pine', hex: '#403020' }
      ]
    },
    {
      id: 'replastic-picnic-table',
      title: 'Eco-reconstructed Field Monitoring Hub',
      category: 'replastic',
      categoryLabel: 'RePlastic',
      tagClass: '-replastic',
      img: PINTEREST_IMAGES.urbanBench,
      colors: [
        { name: 'Replastic Vista Blue', hex: '#85a1c5' },
        { name: 'Stone Gray', hex: '#7a716d' }
      ]
    },
    {
      id: 'custom-heritage-plaque',
      title: 'Satellite Ground-Truthing Target Sign',
      category: 'details',
      categoryLabel: 'Satellite',
      tagClass: '-details',
      img: PINTEREST_IMAGES.natureSign,
      colors: [
        { name: 'Brass Finish', hex: '#c5a059' },
        { name: 'Slate Gray', hex: '#524945' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'urban', label: 'Urban' },
    { id: 'nature', label: 'Nature' },
    { id: 'replastic', label: 'RePlastic' },
    { id: 'golf', label: 'Golf' },
    { id: 'details', label: 'Details' }
  ];

  const filteredProducts = allProducts.filter((prod) => {
    const matchesCategory = categoryFilter === 'all' || prod.category === categoryFilter;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ padding: '60px 0 100px 0' }}>
      {/* Page Header */}
      <div className="g-row" style={{ marginBottom: '40px' }}>
        <div className="g-col xxl-24">
          <h1 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
            Sustainable Outdoor Solutions
          </h1>
          <p className="-body-medium" style={{ color: 'var(--color-stoneBrown600)', marginTop: '8px' }}>
            Browse our durable, maintenance-free products designed for cities, landscapes, and golf courses.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="g-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        
        {/* Category Toggles */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: categoryFilter === cat.id ? 'var(--color-stoneBrown800)' : 'var(--color-stoneBrown300)',
                backgroundColor: categoryFilter === cat.id ? 'var(--color-stoneBrown800)' : 'transparent',
                color: categoryFilter === cat.id ? 'var(--color-brightIvory25)' : 'var(--color-stoneBrown700)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '300px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: '20px',
              border: '1px solid var(--color-stoneBrown300)',
              backgroundColor: 'var(--color-brightIvory25)',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <Search 
            size={18} 
            color="var(--color-stoneBrown500)" 
            style={{ position: 'absolute', left: '14px', top: '12px' }}
          />
        </div>

      </div>

      {/* Products Grid */}
      <div className="g-row">
        <div className="g-col xxl-24">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p className="-body-big-medium" style={{ color: 'var(--color-stoneBrown500)' }}>
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="products-grid" style={{ marginTop: '0' }}>
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="product-card">
                  <div>
                    <div className="product-card-header">
                      <h3 className="-title-8-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
                        {prod.title}
                      </h3>
                      <div className={`category-tag ${prod.tagClass}`}>
                        <span>{prod.categoryLabel}</span>
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
                      {prod.colors.map((color, idx) => (
                        <span 
                          key={idx} 
                          className="color-dot"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        ></span>
                      ))}
                    </div>

                    <button 
                      onClick={() => onSelectProduct(prod)}
                      className="button-premium dark"
                      style={{ padding: '8px 16px', fontSize: '11px' }}
                    >
                      Configure & Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
