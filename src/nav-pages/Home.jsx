import { useState, useEffect, useRef } from 'react'
import '../index.css'
import './Home.css'  

function Home() {
  const [activeModalPost, setActiveModalPost] = useState(null)
  const viewportRef = useRef(null)
  const isInteractingRef = useRef(false)

  const services = [
    { id: 'srv1', title: 'Digital/Analog Trunking Repeater System', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7803.jpeg', link: '#' },
    { id: 'srv2', title: 'Solar Panel Systems & Street Lights', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_5723.jpeg?w=NaN&h=', link: '#' },
    { id: 'srv3', title: 'CCTV Camera Installation', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_0560.jpeg?w=NaN&h=', link: 'expertise-cctv.html' },
    { id: 'srv4', title: 'Wireless Radio Installation', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_8371.jpeg?w=NaN&h=', link: 'expertise-radio.html' },
    { id: 'srv5', title: 'Field Equipments & Products', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7562.jpeg?w=NaN&h=', link: '#' }
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

  // Double the array for infinite-feeling scrolling layouts
  const doubledServices = [...services, ...services]

  // 1. Reveal Animations Observer
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

// 2. TRUE SEAMLESS INFINITE LOOP ENGINE (FOR DESKTOP & MOBILE SWIPING)
useEffect(() => {
  const viewport = viewportRef.current
  if (!viewport) return

  let autoScrollInterval

  // Calculate the width of one complete set of cards
  const getHalfScrollWidth = () => viewport.scrollWidth / 2

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      if (!isInteractingRef.current) {
        const halfWidth = getHalfScrollWidth()
        
        // If we are approaching or past the half-way mark (end of first array set)
        if (viewport.scrollLeft >= halfWidth) {
          // Instantly snap back to start silently, then scroll smoothly
          viewport.scrollLeft = viewport.scrollLeft - halfWidth
        }
        
        viewport.scrollBy({ left: 280, behavior: 'smooth' })
      }
    }, 3000) // Moves automatically every 3 seconds
  }

  // This handles manual finger swipes. If they swipe to the end or start, it snaps instantly.
  const handleScrollReset = () => {
    const halfWidth = getHalfScrollWidth()
    
    if (viewport.scrollLeft >= halfWidth) {
      // User swiped into the second set: snap back to the first set invisibly
      viewport.scrollLeft -= halfWidth
    } else if (viewport.scrollLeft <= 0) {
      // User swiped backward past the start: snap ahead to the twin card invisibly
      viewport.scrollLeft += halfWidth
    }
  }

  const handleInteractionStart = () => { isInteractingRef.current = true }
  const handleInteractionEnd = () => { isInteractingRef.current = false }

  startAutoScroll()

  // Listeners for infinite scroll normalization
  viewport.addEventListener('scroll', handleScrollReset, { passive: true })
  
  // Touch & Gesture controls
  viewport.addEventListener('touchstart', handleInteractionStart, { passive: true })
  viewport.addEventListener('touchend', handleInteractionEnd, { passive: true })
  viewport.addEventListener('mouseenter', handleInteractionStart)
  viewport.addEventListener('mouseleave', handleInteractionEnd)

  return () => {
    clearInterval(autoScrollInterval)
    viewport.removeEventListener('scroll', handleScrollReset)
    viewport.removeEventListener('touchstart', handleInteractionStart)
    viewport.removeEventListener('touchend', handleInteractionEnd)
    viewport.removeEventListener('mouseenter', handleInteractionStart)
    viewport.removeEventListener('mouseleave', handleInteractionEnd)
  }
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
            <a href="contact" className="hero-cta-btn">
              Contact Us Now <span className="cta-arrow">→</span>
            </a>
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

        {/* 💡 Linked Ref Node to run Javascript layout calculations flawlessly */}
        <div className="expertise-carousel-viewport" id="expertise-gallery" ref={viewportRef}>
          <div className="expertise-track">
            {doubledServices.map((service, index) => (
              <div 
                key={`${service.id}-${index}`}
                className="expertise-bleed-card" 
                style={{ '--bg-image': `url('${service.img}')` }}
              >
                <div className="bleed-card-inner">
                  <h3>{service.title}</h3>
                  <a href={service.link} className="bleed-card-action">Read More <span>→</span></a>
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