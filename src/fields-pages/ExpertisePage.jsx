// src/pages/ExpertisePage.jsx
import React, { useEffect, useState } from 'react';
import { database } from '../firebase.js';
import { ref, onValue } from 'firebase/database';
import './ExpertisePage.css';

function ExpertisePage({ services, activeServiceId, setActiveServiceId }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null); 

  // Resets layout viewport scroll position on tab changes
  useEffect(() => {
    const contentPanel = document.querySelector('.fields-main-content-viewport');
    if (contentPanel) {
      contentPanel.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeServiceId]);

  const currentService = services.find(srv => srv.id === activeServiceId) || services[0];
  const currentServiceTitle = currentService?.title || "Field Deployment Gallery";

  // Optimized Real-Time Firebase Stream
  useEffect(() => {
    setLoadingGallery(true);
    const galleryRef = ref(database, 'expertise_gallery');

    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedImages = [];
        
        Object.keys(data).forEach((key) => {
          const block = data[key];
          
          if (block.serviceId === activeServiceId && block.images) {
            block.images.forEach((imgUrl, index) => {
              if (imgUrl) {
                parsedImages.push({
                  id: `${key}-${index}`,
                  url: imgUrl,
                  title: block.title || currentServiceTitle
                });
              }
            });
          }
        });

        setGalleryImages(parsedImages.reverse()); 
      } else {
        setGalleryImages([]);
      }
      setLoadingGallery(false);
    }, (error) => {
      console.error("Firebase fetch error: ", error);
      setLoadingGallery(false);
    });

    return () => unsubscribe();
  }, [activeServiceId, currentServiceTitle]);

  return (
    <div className="fields-split-layout-engine">
      
      {/* SIDEBAR NAVIGATION PANEL */}
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

      {/* ISOLATED GALLERY VIEWPORT */}
      <section className="fields-main-content-viewport">
        <div className="fields-content-wrapper">
          <div className="fields-gallery-container">
            
            <header className="gallery-header-block">
              <h1 className="fields-main-gallery-title">
                {currentServiceTitle}
              </h1>
              <p className="gallery-header-subtitle">
                Project Deployments &amp; Operational Gallery Records
              </p>
            </header>
            
            {loadingGallery ? (
              <p className="gallery-status-msg">Loading latest console attachments...</p>
            ) : galleryImages.length === 0 ? (
              <p className="gallery-status-msg text-muted">No operational deployment images uploaded for this category yet.</p>
            ) : (
              <div className="fields-gallery-masonry-grid">
                {galleryImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="fields-gallery-card" 
                    onClick={() => setLightboxImage(image)}
                  >
                    <img src={image.url} alt={image.title} loading="lazy" />
                    <div className="fields-gallery-card-overlay">
                      <span>{image.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR VIEWING ENLARGED PHOTOS */}
      {lightboxImage && (
        <div 
          className="gallery-lightbox-overlay" 
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="gallery-lightbox-content" 
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              className="gallery-lightbox-close-btn" 
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.title} 
              className="gallery-lightbox-image"
            />
            <div className="gallery-lightbox-caption">
              {lightboxImage.title}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ExpertisePage;