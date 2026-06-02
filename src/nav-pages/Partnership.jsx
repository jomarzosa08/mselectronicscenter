import { useEffect, useState } from 'react'
import '../index.css' // Step back up one directory level to reach root index.css
import './Partnership.css'  // Local styling sheet inside nav-pages/

function Partnership() {
  // State to manage the active enlarged image
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    // Smooth scroll to top instantly upon entering view state
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Intersection Observer engine for scroll trigger reveals
    const reveals = document.querySelectorAll('.reveal')
    const observerOptions = { root: null, threshold: 0.1 }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    reveals.forEach((element) => revealObserver.observe(element))
    return () => reveals.forEach((element) => revealObserver.unobserve(element))
  }, [])

  // Helper functions to open and close modal safely
  const openImage = (src, alt) => {
    setActiveImage({ src, alt });
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setActiveImage(null);
    document.body.style.overflow = ''; // Restore background scrolling
  };

  return (
    <>
      {/* INNER HERO SECTION */}
      <section className="inner-hero">
        <div className="hero-content reveal slide-up">
          <h1>OUR PARTNERSHIPS</h1>
          <p>Authorized Distributions, Proven Compliance, and World-Class Technology Brands</p>
        </div>
      </section>

      {/* CREDENTIALS & COMPLIANCE ZONE */}
      <section className="partnership-section">
        <div className="partner-container">
          
          <div className="credentials-grid">
            <div className="credential-info reveal slide-up">
              <span className="about-sub">Authorized Credentials</span>
              <h2>Industry Trust &amp; Legal Compliance</h2>
              <p className="lead-text">
                MS Electronics Center takes pride in holding all the necessary legal permits and manufacturer distributions required to address large-scale industry requirements securely.
              </p>
              
              <div className="compliance-list">
                <div className="compliance-card">
                  <h4>National Telecommunications Commission</h4>
                  <p><strong>Dealer Permit No:</strong> 10-REDP-CEB-01005</p>
                </div>
                <div className="compliance-card">
                  <h4>Department of Trade and Industry</h4>
                  <p><strong>DTI Permit No:</strong> 3061177</p>
                </div>
              </div>
            </div>

            {/* OFFICIAL REGISTRATION & CERTIFICATE GALLERY DISPLAY */}
            <div className="certificate-display reveal fade-in">
              
              {/* DTI Compliance Card */}
              <div 
                className="badge-wrapper clickable-cert" 
                onClick={() => openImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Department_of_Trade_and_Industry_%28DTI%29.svg/500px-Department_of_Trade_and_Industry_%28DTI%29.svg.png", "Department of Trade and Industry Registration")}
              >
                <div className="cert-img-container">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Department_of_Trade_and_Industry_%28DTI%29.svg/500px-Department_of_Trade_and_Industry_%28DTI%29.svg.png" 
                    alt="Department of Trade and Industry Registration" 
                    className="cert-img" 
                  />
                </div>
                <div className="cert-caption">
                  <p><strong>DTI Registered</strong></p>
                  <span>Verified Entity under the Department of Trade and Industry.</span>
                </div>
              </div>

              {/* NTC Compliance Card */}
              <div 
                className="badge-wrapper clickable-cert"
                onClick={() => openImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/National_Telecommunications_Commission.svg/1280px-National_Telecommunications_Commission.svg.png", "National Telecommunications Commission Certified")}
              >
                <div className="cert-img-container">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/National_Telecommunications_Commission.svg/1280px-National_Telecommunications_Commission.svg.png" 
                    alt="National Telecommunications Commission Certified" 
                    className="cert-img" 
                  />
                </div>
                <div className="cert-caption">
                  <p><strong>NTC Certified Dealer</strong></p>
                  <span>Authorized Telecommunications Equipment Distributor Provider.</span>
                </div>
              </div>

              {/* Hytera Dealership Card */}
              <div 
                className="badge-wrapper distribution-cert clickable-cert"
                onClick={() => openImage("https://mselectronicscenter.com/wp-content/uploads/2024/04/117305667_1467275913468950_5395421287812022685_n-edited.jpg", "Hytera Authorized Dealership Certificate")}
              >
                <div className="cert-img-container">
                  <img 
                    src="https://mselectronicscenter.com/wp-content/uploads/2024/04/117305667_1467275913468950_5395421287812022685_n-edited.jpg" 
                    alt="Hytera Authorized Dealership Certificate" 
                    className="cert-img reference-doc" 
                  />
                </div>
                <div className="cert-caption">
                  <p><strong>Official Dealership</strong></p>
                  <span>Authorized Dealer for Hytera Communications Co., Ltd. within the Philippines.</span>
                </div>
              </div>

            </div>
          </div>

          <hr className="section-divider" />

          {/* BRANDS SECTION HEADER */}
          <div className="brands-section-header reveal slide-up">
            <span className="about-sub">Global Network</span>
            <h2>Trusted Technology Brands</h2>
            <p>We work closely with world-leading communication and surveillance hardware manufacturers.</p>
          </div>

          {/* BRAND CATEGORY BLOCK 1 */}
          <div className="brand-category-block reveal slide-up">
            <h3>Radio Communication &amp; Wireless Ecosystems</h3>
            <div className="logo-grid-layout">
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Motorola-logo-black-and-white.png" alt="Motorola" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Icom_logo.svg/3840px-Icom_logo.svg.png?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail" alt="Icom" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kenwood_Logo.svg/1280px-Kenwood_Logo.svg.png?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail" alt="Kenwood" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://static.wikia.nocookie.net/logopedia/images/4/46/Hytera_logo.png/revision/latest?cb=20211120131931" alt="Hytera" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Alinco_logo.svg/3840px-Alinco_logo.svg.png" alt="Alinco" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Yaesu_logo.svg?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=original" alt="Yaesu" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKsuKfHUNeZKqTAJJpAcrhm1ZAa-TW6ezPBA&amp;s" alt="Cignus" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://rugbyradiosuk.com/cdn/shop/products/baofeng-download-logo-blue-text_800x.png?v=1759749801" alt="Baofeng" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://www.kirisun-turk.com/wp-download/dosyalar/promosyon/kirisun_logo_3d.gif" alt="Kirisun" className="partner-logo" /></div>
            </div>
          </div>

          {/* BRAND CATEGORY BLOCK 2 */}
          <div className="brand-category-block reveal slide-up">
            <h3>CCTV Security, Surveillance &amp; Networking</h3>
            <div className="logo-grid-layout">
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Hikvision_logo.svg/3840px-Hikvision_logo.svg.png" alt="Hikvision" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Dahua_Technology_logo.svg?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=original" alt="Dahua Technology" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Avigilon_logo.svg/960px-Avigilon_logo.svg.png?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail" alt="Avigilon" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Furuno_company_logo.svg/3840px-Furuno_company_logo.svg.png?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail" alt="Furuno" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQowFEjLO7W1V62N60XcSrURUpRCOaNsXY05w&amp;s" alt="Diamond Antenna" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Belden-Logo.jpg?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=original" alt="Belden" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Ubiquiti_Logo_Horizontal.png?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=original" alt="Ubiquiti Networks" className="partner-logo" /></div>
              <div className="logo-card"><img src="https://itamtech.com/pub/media/amasty/shopby/option_images/500_hustler.png" alt="Hustler" className="partner-logo" /></div>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL PORTAL */}
      {activeImage && (
        <div className="lightbox-overlay" onClick={closeModal}>
          <button className="lightbox-close" onClick={closeModal}>&times;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} />
            <p className="lightbox-caption">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Partnership