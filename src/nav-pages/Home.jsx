import { useState, useEffect } from 'react'
import '../index.css'
import './Home.css'  

function Home({ setCurrentPage }) {
  const [activeModalPost, setActiveModalPost] = useState(null)

  // Map each service to its respective page target state identifier
  const services = [
    { id: 'srv1', title: 'Digital/Analog Trunking Repeater System', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7803.jpeg', pageId: 'repeater' },
    { id: 'srv2', title: 'Solar Panel Systems', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_5723.jpeg?w=NaN&h=', pageId: 'home' },
    { id: 'srv3', title: 'Street Light Systems', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_6656-2.jpeg?w=2250&h=', pageId: 'home' },
    { id: 'srv4', title: 'CCTV Camera Installation', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_0560.jpeg?w=NaN&h=', pageId: 'home' },
    { id: 'srv5', title: 'Wireless Radio Installation', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_8371.jpeg?w=NaN&h=', pageId: 'home' },
    { id: 'srv6', title: 'Field Equipments & Products', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7562.jpeg?w=NaN&h=', pageId: 'home' }
    
  ]

  const journalPosts = [
    {
      id: 'post1',
      category: 'Communication',
      date: 'May 25, 2026',
      readTime: '3 min read',
      title: 'Barangay Wireless Radio Network Deployment Across Cebu Mountain Districts',
      img: 'https://mselectronicscenter.com/wp-content/uploads/2026/01/img_6782.jpeg?w=768',
      desc: 'We successfully completed the setup of a multi-site critical communication network spanning rural and mountainous barangays in Cebu. This network ensures a reliable lifeline during natural disasters.'
    },
    {
      id: 'post2',
      category: 'Surveillance',
      date: 'May 12, 2026',
      readTime: '2 min read',
      title: 'High-Definition CCTV Command Center Integration Deployed for Enterprise Client',
      img: 'https://mselectronicscenter.com/wp-content/uploads/2026/01/c364e3e7be1bf64275cfe32bccb5b5da.jpeg?w=768',
      desc: 'MS Electronics Center deployed a comprehensive enterprise surveillance matrix for a commercial facility in urban Cebu.'
    }
  ]

  const doubledServices = [...services, ...services]

  useEffect(() => {
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
      {/* HERO SECTION */}
      <section className="hero">
        <img 
          src="https://mselectronicscenter.com/wp-content/uploads/2024/04/img_4641.jpeg?w=NaN&h=" 
          className="hero-bg" 
          alt="Hero Background"
        />
        <div className="hero-content reveal slide-up">
          <h1>
            WELCOME TO <br />
            <span className="hero-brand-title">MS ELECTRONICS</span>
          </h1>
          <p>Your all-around electronics expert.</p>
          <div className="hero-actions">
            <button 
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} 
              className="hero-cta-btn"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Contact Us Now <span className="cta-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="description">
        <p className="reveal slide-up">
          MS Electronics Center is a premier communications equipment dealer in the Philippines,
          trusted by industry leaders to address security concerns effectively.
        </p>
        <div className="logo-container reveal slide-up">
          <img src="https://mselectronicscenter.com/wp-content/uploads/2024/04/ms-logo.png?w=768" alt="MS Logo" className="description-logo" />
        </div>
      </section>

      {/* EXPERTISE CAROUSEL TRACK */}
      <section className="expertise">
        <div className="expertise-header-block">
          <span className="expertise-subtitle">What We Do Best</span>
          <h2 className="expertise-main-title">Field of Expertise</h2>
          <a href="#expertise-gallery" className="expertise-global-link">Explore Services</a>
        </div>

        <div className="expertise-carousel-viewport" id="expertise-gallery">
          <div className="expertise-track">
            {doubledServices.map((service, index) => (
              /* 1. Moved onClick here to make the entire background image card clickable */
              <div 
                key={`${service.id}-${index}`}
                className="expertise-bleed-card" 
                onClick={() => {
                  if (service.pageId !== 'home') {
                    setCurrentPage(service.pageId);
                  }
                }}
                style={{ 
                  '--bg-image': `url('${service.img}')`,
                  cursor: 'pointer' // Changes mouse cursor to indicator across the whole image surface
                }}
              >
                <div className="bleed-card-inner">
                  <h3>{service.title}</h3>
                  {/* 2. Turned this back into a clean visual span tracker since the wrapper handles the click event now */}
                  <span className="bleed-card-action">
                    Read More <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL / UPDATES GRID */}
      <section className="news-section">
        <div className="news-container">
          <div className="news-header reveal slide-up">
            <div className="news-header-left">
              <span className="news-tag-line">MS Electronics Journal</span>
              <h2 className="news-main-title">Latest Updates &amp; Field Reports</h2>
            </div>
            <div className="news-ticker-date">Updated: May 2026</div>
          </div>
          
          <div className="news-matrix-grid">
            {journalPosts.map((post) => (
              <article 
                key={post.id}
                className="news-post-card update-card reveal fade-in"
                onClick={() => setActiveModalPost(post)}
              >
                <div className="news-img-frame">
                  <img src={post.img} alt={post.title} className="news-cover" />
                  <span className="news-category-badge">{post.category}</span>
                </div>
                <div className="news-body">
                  <div className="news-meta-row">
                    <span>{post.date}</span>
                    <span> • {post.readTime}</span>
                  </div>
                  <h3 className="news-headline">{post.title}</h3>
                  <button className="read-update-btn">Read Full Article</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL VIEW */}
      {activeModalPost && (
        <div className="update-modal active" role="dialog">
          <div className="update-modal-container">
            <button className="update-modal-close" onClick={() => setActiveModalPost(null)}>✕</button>
            <div className="update-modal-content">
              <div className="modal-left-column">
                <div className="modal-img-frame">
                  <img src={activeModalPost.img} alt={activeModalPost.title} />
                </div>
              </div>
              <div className="modal-right-column">
                <span className="modal-post-date">{activeModalPost.date}</span>
                <h2 className="modal-post-title">{activeModalPost.title}</h2>
                <div className="modal-post-description">{activeModalPost.desc}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home