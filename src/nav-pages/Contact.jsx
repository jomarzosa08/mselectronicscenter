import { useEffect } from 'react'
import '../index.css' // Steps back up one folder level to hit root src/
import './Contact.css'  // Local folder styling for Contact view

function Contact() {
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

  return (
    <>
      {/* INNER HERO SECTION */}
      <section className="inner-hero contact-hero">
        <div className="hero-content reveal slide-up">
          <h1>GET IN TOUCH</h1>
          <p>Connect with our Communication Specialists for Professional Consultation</p>
        </div>
      </section>

      {/* CONTACT CHANNELS & DETAILS */}
      <section className="contact-section">
        <div className="contact-container">
          
          <div className="contact-grid">
            
            {/* DIRECT CHANNELS BLOCK */}
            <div className="contact-info-block reveal slide-up">
              <span className="about-sub">Direct Channels</span>
              <h2>Contact Information</h2>
              <p className="manager-title">
                <strong>Melchor L. Abad</strong><br />
                <span className="role-badge">Manager</span>
              </p>
              
              <div className="info-links-list">
                <div className="info-item">
                  <span className="info-icon">📞</span>
                  <div>
                    <p className="info-label">Landline Numbers</p>
                    <a href="tel:3469758">346-9758</a> | <a href="tel:3455928">345-5928</a>
                  </div>
                </div>
                
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <div>
                    <p className="info-label">Mobile Hotline</p>
                    <a href="tel:09199916724">0919 991 6724</a>
                  </div>
                </div>
                
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <div>
                    <p className="info-label">Email Addresses</p>
                    <a href="mailto:melchorabad@mselectronicscenter.com">melchorabad@mselectronicscenter.com</a><br />
                    <a href="mailto:ms_electronicscenter@yahoo.com" className="alt-email">ms_electronicscenter@yahoo.com</a>
                  </div>
                </div>
                
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <p className="info-label">Office Location</p>
                    <p className="address-text">4 Old Bonifacio St., Cebu City, 6000 Cebu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONSULTATION HOURS & SOCIAL HELPDESK */}
            <div className="consultation-card reveal fade-in">
              <div className="consultation-header">
                <h3>Professional Consult</h3>
                <p>Planning a large-scale setup? Our team is available to assist you during standard operational hours.</p>
              </div>

              <div className="hours-box">
                <div className="hours-row">
                  <span className="days">Monday – Saturday</span>
                  <span className="time">8:00 AM – 5:00 PM</span>
                </div>
                <div className="hours-row closed">
                  <span className="days">Sunday</span>
                  <span className="time">Closed</span>
                </div>
              </div>

              <div className="fb-connect-box">
                <p>Feel free to reach out to us instantly through our social helpdesk platform:</p>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="fb-consult-btn">
                  <span className="fb-icon">f</span> Message Us on Facebook
                </a>
              </div>
            </div>
          </div>

          {/* GOOGLE MAP WRAPPER */}
          <div className="map-wrapper reveal slide-up">
            <div className="map-header">
              <div>
                <h3>Find Us on the Map</h3>
                <p>MS Electronics Center, Old Bonifacio St., Banilad, Cebu City</p>
              </div>
              <a href="https://maps.app.goo.gl/Jpd3kmiFHEvo3LgE7" target="_blank" rel="noopener noreferrer" className="directions-btn">
                Get Directions ↗
              </a>
            </div>
            <div className="map-iframe-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.0352105850025!2d123.91076497401153!3d10.344144267020534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999aa2e15000b%3A0x24d572645379f848!2sMS%20Electronics%20Center!5e1!3m2!1sen!2sph!4v1779513887457!5m2!1sen!2sphh" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MS Electronics Center Office Location Map"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Contact