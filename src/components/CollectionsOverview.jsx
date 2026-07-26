import React from 'react';
import { Layers, Map, Compass, Trash, Grid } from 'lucide-react';

export default function CollectionsOverview({ setActiveView, setCategoryFilter }) {
  const overviews = [
    { id: 'urban', title: 'Urban', count: 50, icon: <Layers size={20} /> },
    { id: 'nature', title: 'Nature', count: 38, icon: <Map size={20} /> },
    { id: 'golf', title: 'Golf', count: 62, icon: <Compass size={20} /> },
    { id: 'replastic', title: 'RePlastic', count: 1, icon: <Trash size={20} /> },
    { id: 'details', title: 'Details', count: 0, icon: <Grid size={20} /> }
  ];

  const handleCardClick = (id) => {
    setCategoryFilter(id);
    setActiveView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="collections-overview-section">
      <div className="g-row">
        <div className="g-col xxl-24">
          <p className="-body-smaller-medium" style={{ color: 'var(--color-stoneBrown600)', marginBottom: '8px' }}>
            Product Catalog Index
          </p>
          <h2 className="-title-2-medium" style={{ color: 'var(--color-stoneBrown800)' }}>
            The Collections
          </h2>
        </div>
      </div>

      <div className="g-row">
        <div className="g-col xxl-24">
          <div className="overview-grid">
            {overviews.map((item) => (
              <div 
                key={item.id} 
                className="overview-card"
                onClick={() => handleCardClick(item.id)}
              >
                <div className="card-icon" style={{ color: 'var(--color-stoneBrown700)' }}>
                  {item.icon}
                </div>
                <h3 className="-title-8-medium" style={{ fontSize: '18px' }}>
                  {item.title}
                </h3>
                <span className="count">({String(item.count).padStart(2, '0')})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
