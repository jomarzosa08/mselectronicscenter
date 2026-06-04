import { useEffect, useState } from 'react'
import './Repeater.css'

function Repeater({ setCurrentPage }) {
  const [activeLightboxImg, setActiveLightboxImg] = useState(null)
  const [isEnlarged, setIsEnlarged] = useState(false)

  // Snap page back to top on initial component load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // LOCK BODY SCROLL WHEN LIGHTBOX IS OPEN
  useEffect(() => {
    if (activeLightboxImg) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup function to restore scrolling if the component unmounts unexpectedly
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeLightboxImg])

  const closeLightbox = () => {
    setActiveLightboxImg(null)
    setIsEnlarged(false)
  }

  const galleryItems = [
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7813.jpeg",
      alt: "Manunggal Tower Installation",
      badge: "Base Station",
      title: "Manunggal Repeater Tower",
      desc: "High-elevation structural tower providing sweeping network coverage across remote mountain sectors."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7803.jpeg",
      alt: "Solar Module Rooftop Integration",
      badge: "Solar Power",
      title: "Photovoltaic Integration",
      desc: "Technicians integrating solar arrays onto the reinforced concrete outpost shelter roof."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7811.jpeg",
      alt: "Rack Mounted Repeating Matrix",
      badge: "Hardware",
      title: "Trunked Rack Array",
      desc: "Precision rack-mounted digital repeater receivers managing multi-channel frequencies."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7802.jpeg",
      alt: "Distant Ground View of Communication Bunker",
      badge: "Deployment",
      title: "Off-Grid Mountain Compound",
      desc: "A strategic long-distance look at our autonomous communication bunker nestled in high-altitude terrain."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7953.jpeg",
      alt: "Base Station Cabinet Power Array",
      badge: "Power Systems",
      title: "DC Switching Enclosure",
      desc: "Heavy-duty battery backup configurations and intelligent network switches matching corporate standards."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7950.jpeg",
      alt: "Isolated Repeater Concrete Bunker",
      badge: "Infrastructure",
      title: "Secure Concrete Shelter",
      desc: "Weatherproof, fortified structural enclosure housing sensitive transceiver elements against elements."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_2471-1.jpeg?w=2250&h=",
      alt: "Busay Elevated Telecommunication Mast",
      badge: "Busay, Cebu",
      title: "Highland Guyed Mast",
      desc: "Sleek, ultra-elevated transmission system anchoring urban-to-rural telecom relays."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4641.jpeg?w=2250&h=",
      alt: "Skyline Ridge Antennas",
      badge: "Antenna Array",
      title: "Directional Skyline Ridge",
      desc: "High-gain omni and directional sector antennas optimizing path profile links across central districts."
    },
    {
      img: "https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4639.jpeg?w=2250&h=",
      alt: "Structural Tower Construction Phase",
      badge: "Engineering",
      title: "Steel Platform Assembly",
      desc: "Rigid, structural framing phases showcasing safety and load calculations during tower installation."
    }
  ]

  return (
    <div className="repeater-page-wrapper">
      {/* Breadcrumb Header */}
      <div className="field-page-breadcrumb">
        <button onClick={() => setCurrentPage('home')} className="breadcrumb-back-btn">
          ← Back to Fields of Expertise
        </button>
        <span className="breadcrumb-current-tag">CASE STUDY & PROJECTS</span>
      </div>

      {/* Info Intro Block */}
      <header className="repeater-hero-header">
        <span className="gallery-section-tag">TELECOMMUNICATIONS INFRASTRUCTURE</span>
        <h1 className="gallery-main-title">Digital &amp; Analog Trunking Repeater Systems</h1>
        <p className="gallery-narrative-lead">
          A showcase of our robust communication solutions. Images are displayed below in their natural, original sizes. Click any image to open it in an enlarged full-screen view.
        </p>
      </header>

      {/* Core Functions Row */}
      <section className="functions-showcase-container">
        <div className="functions-inline-grid">
          <div className="function-glass-card">
            <span className="card-index">01</span>
            <h3>Signal Amplification</h3>
            <p>Amplifies incoming signals, enhancing their strength and clarity to extend critical communication coverage over vast, challenging areas.</p>
          </div>
          <div className="function-glass-card">
            <span className="card-index">02</span>
            <h3>Relay Station Matrix</h3>
            <p>Receives signals from hand-held radios and re-transmits them over long ranges, bridging communication between distant teams.</p>
          </div>
          <div className="function-glass-card">
            <span className="card-index">03</span>
            <h3>Off-Grid Resilience</h3>
            <p>Utilizes dedicated solar PV modules and robust concrete bunker networks to ensure continuous uptime during severe weather emergencies.</p>
          </div>
        </div>
      </section>

      {/* Modern Natural Size Gallery Grid Layout */}
      <section className="modern-gallery-showcase">
        <h2 className="gallery-block-label">Project Gallery &amp; Deployments</h2>
        
        <div className="portfolio-gallery-grid original-ratio-flow">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className="gallery-item-card"
              onClick={() => setActiveLightboxImg(item.img)}
            >
              <div className="gallery-image-wrapper">
                <img src={item.img} alt={item.alt} className="gallery-native-img" />
                <div className="item-overlay-info">
                  <span className="item-badge">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      {activeLightboxImg && (
        <div className="lightbox-modal-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close-trigger" onClick={closeLightbox}>✕</button>
          
          <div className="lightbox-media-viewport" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeLightboxImg} 
              alt="Enlarged Telecommunications Asset View" 
              className={`lightbox-native-render ${isEnlarged ? 'magnified-view' : ''}`}
              onClick={() => setIsEnlarged(!isEnlarged)}
              title={isEnlarged ? "Click to reset size" : "Click to enlarge further"}
            />
          </div>
          
          <div className="lightbox-instruction-tag">
            {isEnlarged ? "Click image to shrink back" : "Click image to zoom in further"}
          </div>
        </div>
      )}
    </div>
  )
}

export default Repeater