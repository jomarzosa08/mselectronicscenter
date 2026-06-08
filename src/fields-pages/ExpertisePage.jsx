import React, { useEffect } from 'react';
import Footer from '../Footer.jsx'; 
import './ExpertisePage.css';

function ExpertisePage({ services, activeServiceId, setActiveServiceId, setCurrentPage }) {
  
  // Resets the right view scrollbar container position every time menu choice updates
  useEffect(() => {
    const contentPanel = document.querySelector('.fields-main-content-viewport');
    if (contentPanel) {
      contentPanel.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeServiceId]);

  const currentService = services.find(srv => srv.id === activeServiceId) || services[0];

  return (
    <div className="fields-split-layout-engine">
      
      {/* SIDEBAR NAVIGATION PANEL (FIXED) */}
      <aside className="fields-sidebar-nav">
        <div className="fields-sidebar-header">
          FIELD OF EXPERTISE
        </div>
        <nav className="fields-sidebar-links">
          {services.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`fields-sidebar-btn ${activeServiceId === item.id ? 'is-active' : ''}`}
              onClick={() => setActiveServiceId(item.id)}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* INDEPENDENTLY SCROLLABLE CONTENT VIEWPORT */}
      <section className="fields-main-content-viewport">
        
        <div className="fields-content-wrapper">
          {/* Main Display Image */}
          <div className="fields-hero-banner">
            <img 
              src={currentService.img} 
              alt={currentService.title} 
              className="fields-hero-image"
            />
            <div className="fields-hero-title-tint">
              <h1>{currentService.title}</h1>
            </div>
          </div>

          <div className="fields-article-body">
            {/* Intro Lead Paragraph */}
            <p className="fields-lead-paragraph">
              {currentService.leadText}
            </p>
            
            <p>
              Our field solutions emphasize robust engineering structures designed to keep equipment running safely and consistently under demanding environments.
            </p>

            {/* Dynamic Locations Mapping */}
            {currentService.locations && currentService.locations.map((loc, idx) => (
              <div key={idx} className="fields-location-block">
                <h2 className="fields-section-subtitle">{loc.name}</h2>
                <p>{loc.description}</p>
              </div>
            ))}

            {/* Dynamic Functions Grid Section */}
            {currentService.functions && (
              <div className="fields-functions-section">
                <h2 className="fields-section-subtitle">Functions</h2>
                <div className="fields-functions-grid">
                  {currentService.functions.map((func, idx) => (
                    <div key={idx} className="fields-function-card">
                      <h3>{func.title}</h3>
                      <p>{func.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Standard Info Footnote Box */}
            <div className="fields-specs-callout-box">
              <h3>Technical Execution Standards</h3>
              <ul>
                <li>Industrial-grade durability materials provisioned.</li>
                <li>Rigorous site calibrations and signal/power optimization testing routines.</li>
                <li>Comprehensive field report and deployment metrics logbooks.</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default ExpertisePage;