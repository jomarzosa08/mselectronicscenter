import { useEffect, useState } from 'react'
import '../index.css' // Steps out to root src/ folder
import './About.css'  // Local styling sheet for About page

function About() {
  // State to manage the active enlarged modal image
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

  // Helper modules to open and close modal window states safely
  const openImage = (src, alt) => {
    setActiveImage({ src, alt });
    document.body.style.overflow = 'hidden'; // Lock main scroll grid
  };

  const closeModal = () => {
    setActiveImage(null);
    document.body.style.overflow = ''; // Unlock background scroll grid
  };

  return (
    <>
      {/* INNER HERO SECTION */}
      <section className="inner-hero">
        <div className="hero-content reveal slide-up">
          <h1>OUR JOURNEY &amp; MISSION</h1>
          <p>Pioneering Radio Communication Solutions since 1996</p>
        </div>
      </section>

      {/* CORE ABOUT DETAILS */}
      <section className="about-section">
        <div className="about-container">
          
          <div className="about-grid">
            <div className="about-text-block reveal slide-up">
              <span className="about-sub">Established 1996</span>
              <h2>Our Humble Beginnings</h2>
              <p>Founded on <strong>August 26, 1996</strong>, under the sole proprietorship and leadership of <strong>Melchor L. Abad</strong>, MS Electronics Center started its journey as a humble supplier of electronics communication equipment with just <strong>one (1) technician</strong> and a few loyal clients.</p>
              <p>Through decades of dedicated effort, competitive pricing, and efficient service delivery, we have achieved our pinnacle goal of becoming one of the premier radio communication dealers in the region, trusted nationwide across neighboring provinces.</p>
            </div>
            
            <div className="legal-card reveal fade-in">
              <h3>Authorized &amp; Fully Compliant</h3>
              <p>MS Electronics Center holds all necessary legal permits issued by regulatory bodies to address large-scale industry requirements securely:</p>
              
              <ul className="legal-list unified-badge-list">
                <li>
                  <div className="legal-badge-img-wrapper">
                    {/* ↙ PLACE YOUR DTI LOGO IMAGE URL HERE ↙ */}
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Department_of_Trade_and_Industry_%28DTI%29.svg/500px-Department_of_Trade_and_Industry_%28DTI%29.svg.png" 
                      alt="DTI Logo" 
                      className="legal-logo-icon" 
                    />
                  </div>
                  <div>
                    <strong>DTI Permit No.</strong> 3061177
                  </div>
                </li>
                <li>
                  <div className="legal-badge-img-wrapper">
                    {/* ↙ PLACE YOUR NTC LOGO IMAGE URL HERE ↙ */}
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/National_Telecommunications_Commission.svg/3840px-National_Telecommunications_Commission.svg.png" 
                      alt="NTC Logo" 
                      className="legal-logo-icon" 
                    />
                  </div>
                  <div>
                    <strong>NTC Dealer Permit No.</strong> 10-REDP-CEB-01005
                  </div>
                </li>
              </ul>
              
              <p className="legal-notice">Granted full authorization by the <strong>National Telecommunications Commission (NTC)</strong> for the purchase, sale, installation, repair, design, maintenance, and fabrication of mast towers and advanced antenna systems.</p>
            </div>
          </div>

          {/* EXPERT TECHNICAL TEAM FORCE */}
          <div className="team-block">
            <div className="team-grid">
              <div 
                className="team-img-frame reveal fade-in clickable-about-img"
                onClick={() => openImage("https://mselectronicscenter.com/wp-content/uploads/2024/04/img_6294.jpg?w=768&amp;h=575", "MS Electronics Team Group Photo")}
              >
                <img src="https://mselectronicscenter.com/wp-content/uploads/2024/04/img_6294.jpg?w=768&amp;h=575" alt="MS Electronics Team Group Photo" className="team-img" />
              </div>
              <div className="team-details reveal slide-up">
                <span className="about-sub">Our Core Assets</span>
                <h2>Expert Technical Force</h2>
                <p>Presently, our operations have expanded to feature a highly disciplined, multi-role technical deployment force specialized in complex infrastructure projects:</p>
                
                <div className="stats-table">
                  <div className="table-row"><span>4</span> Technicians</div>
                  <div className="table-row"><span>1</span> Licensed Radio Operator</div>
                  <div className="table-row"><span>1</span> Electronics Communication Engineer</div>
                  <div className="table-row"><span>2</span> Office Staff Members</div>
                </div>
                <a href="#" className="chart-btn">View Company Chart</a>
              </div>
            </div>
          </div>

          {/* TECHNICAL FIELD CAPABILITIES */}
          <div className="capabilities-zone">
            <div className="capabilities-container">
              
              <div className="capabilities-header reveal slide-up">
                <span className="capabilities-tag-line">Our Infrastructure &amp; Assets</span>
                <h2 className="section-title">Technical Field Capabilities</h2>
                <div className="capabilities-divider"></div>
              </div>

              <div className="capabilities-grid">
                
                {/* Capability Card 1 */}
                <div className="capability-card reveal fade-in">
                  <div 
                    className="capability-img-frame clickable-about-img"
                    onClick={() => openImage("https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4641.jpeg?w=NaN&h=", "Busay Relay Station Tower Infrastructure")}
                  >
                    <img 
                      src="https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4641.jpeg?w=NaN&h=" 
                      alt="Busay Relay Station Tower Infrastructure" 
                      className="capability-cover-img" 
                    />
                  </div>
                  <div className="capability-content-body">
                    <h3>Busay Relay Station</h3>
                    <p>We own and operate a premium independent <strong>MARCONI Repeater Site</strong> located at Busay, Cebu City to provide strong signal coverage.</p>
                  </div>
                </div>

                {/* Capability Card 2 */}
                <div className="capability-card reveal fade-in">
                  <div 
                    className="capability-img-frame clickable-about-img"
                    onClick={() => openImage("https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4664.jpeg?w=NaN&h=", "Precision Diagnostics Engineering Equipment")}
                  >
                    <img 
                      src="https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4664.jpeg?w=NaN&h=" 
                      alt="Precision Diagnostics Engineering Equipment" 
                      className="capability-cover-img" 
                    />
                  </div>
                  <div className="capability-content-body">
                    <h3>Precision Diagnostics</h3>
                    <p>Equipped with <strong>two (2) complete sets of communication tester models</strong> for component verification and signal calibration tuning.</p>
                  </div>
                </div>

                {/* Capability Card 3 */}
                <div className="capability-card reveal fade-in">
                  <div 
                    className="capability-img-frame clickable-about-img"
                    onClick={() => openImage("https://mselectronicscenter.com/wp-content/uploads/2024/04/img_5723.jpeg", "MS Electronics Center Service Logistics Fleet")}
                  >
                    <img 
                      src="https://mselectronicscenter.com/wp-content/uploads/2024/04/img_5723.jpeg" 
                      alt="MS Electronics Center Service Logistics Fleet" 
                      className="capability-cover-img" 
                    />
                  </div>
                  <div className="capability-content-body">
                    <h3>Mobile Logistics Fleet</h3>
                    <p>Deploying fast technical response capabilities with a fleet consisting of a Toyota Hi-Ace Pick-up 4x4, two Mitsubishi FB vehicles, and two XRM motorcycles.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* PARTNERS & BRAND BADGES */}
          <div className="partners-block reveal slide-up">
            <h3>Global Technology Partners</h3>
            <p>As authorized service providers and system partners with world-leading security hardware firms, we provide premium product line setups:</p>
            <div className="brand-badges">
              <span className="badge-item">HIKVISION</span>
              <span className="badge-item">DAHUA</span>
            </div>
            <p className="guarantee-text">Committed to reasonable pricing, efficient execution, and a strict <strong>100% Customer Satisfaction Guarantee</strong>.</p>
          </div>

        </div>
      </section>

      {/* GLOBAL LIGHTBOX MODAL PORTAL */}
      {activeImage && (
        <div className="about-lightbox-overlay" onClick={closeModal}>
          <button className="about-lightbox-close" onClick={closeModal}>&times;</button>
          <div className="about-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} />
            <p className="about-lightbox-caption">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default About