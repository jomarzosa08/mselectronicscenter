import { useState, useEffect } from 'react'
import { database } from '../firebase.js' 
import { ref, onValue } from 'firebase/database'
import '../index.css'
import './Home.css'  

// Destructured setSelectedServiceId from props to pass the active selection back to MainApp
function Home({ setCurrentPage, setSelectedServiceId }) {
  const [activeModalPost, setActiveModalPost] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0) 
  const [journalPosts, setJournalPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const services = [
    { id: 'srv1', title: 'Digital/Analog Trunking Repeater System', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7803.jpeg', pageId: 'repeater' },
    { id: 'srv2', title: 'Solar Panel Systems', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_5723.jpeg?w=NaN&h=', pageId: 'home' },
    { id: 'srv3', title: 'Street Light Systems', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_6656-2.jpeg?w=2250&h=', pageId: 'home' },
    { id: 'srv4', title: 'CCTV Camera Installation', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_0560.jpeg?w=NaN&h=', pageId: 'home' },
    { id: 'srv5', title: 'Wireless Radio Installation', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_8371.jpeg?w=NaN&h=', pageId: 'home' },
    { id: 'srv6', title: 'Field Equipments & Products', img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7562.jpeg?w=NaN&h=', pageId: 'home' }
  ]

  const doubledServices = [...services, ...services]

  useEffect(() => {
    const updatesRef = ref(database, 'updates');
    
    const unsubscribe = onValue(updatesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedUpdates = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        
        const sortedUpdates = formattedUpdates.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          
          if (dateB !== dateA) {
            return dateB - dateA;
          }
          return (b.timestamp || 0) - (a.timestamp || 0);
        });

        setJournalPosts(sortedUpdates);
      } else {
        setJournalPosts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
  }, [journalPosts, loading])

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
              className="hero-cta-btn pointer-btn"
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
              <div 
                key={`${service.id}-${index}`}
                className="expertise-bleed-card pointer-btn" 
                onClick={() => {
                  // Directs routing flow to image_0438e6.png split-screen style template
                  setSelectedServiceId(service.id);
                  setCurrentPage('expertise');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                style={{ '--bg-image': `url('${service.img}')` }}
              >
                <div className="bleed-card-inner">
                  <h3>{service.title}</h3>
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
            <div className="news-ticker-date">
              {journalPosts.length > 0 ? `Latest: ${journalPosts[0].date}` : "Live Feed"}
            </div>
          </div>
          
          {loading ? (
            <div className="feed-status-message">
              Synchronizing with database...
            </div>
          ) : journalPosts.length === 0 ? (
            <div className="feed-status-message">
              No field updates published yet.
            </div>
          ) : (
            <div className="news-matrix-grid">
              {journalPosts.map((post) => {
                const coverImage = post.images && post.images.length > 0 
                  ? post.images[0] 
                  : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800";

                return (
                  <article 
                    key={post.id}
                    className="news-post-card update-card reveal fade-in"
                    onClick={() => {
                      setActiveImageIndex(0);
                      setActiveModalPost(post);
                    }}
                  >
                    <div className="news-img-frame">
                      <img src={coverImage} alt={post.title} className="news-cover" />
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* MODERN MINIMALIST THEMED MODAL */}
      {activeModalPost && (
        <div className="minimal-modal-overlay" role="dialog">
          <div className="minimal-modal-wrapper">
            
            {/* Elegant Minimal Close Button */}
            <button className="minimal-modal-close-btn" onClick={() => setActiveModalPost(null)}>
              ✕
            </button>

            <div className="minimal-modal-content-grid">
              
              {/* LEFT SIDE: MINIMAL MEDIA VIEWER */}
              <div className="minimal-modal-media-side">
                <div className="minimal-modal-img-container">
                  <img 
                    src={activeModalPost.images && activeModalPost.images.length > 0 
                      ? activeModalPost.images[activeImageIndex] 
                      : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
                    } 
                    alt={activeModalPost.title} 
                    className="minimal-modal-active-img"
                  />
                </div>

                {/* Carousel UI Controls */}
                {activeModalPost.images && activeModalPost.images.length > 1 && (
                  <>
                    <button 
                      type="button" 
                      className="minimal-carousel-arrow arrow-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev === 0 ? activeModalPost.images.length - 1 : prev - 1));
                      }}
                    >
                      ‹
                    </button>

                    <button 
                      type="button" 
                      className="minimal-carousel-arrow arrow-right"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev === activeModalPost.images.length - 1 ? 0 : prev + 1));
                      }}
                    >
                      ›
                    </button>

                    {/* Modern Dynamic Pill Indicators */}
                    <div className="minimal-carousel-pill-indicators">
                      {activeModalPost.images.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveImageIndex(dotIdx)}
                          className={`minimal-carousel-pill ${dotIdx === activeImageIndex ? 'active-pill' : ''}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* RIGHT SIDE: TEXT METADATA PANEL */}
              <div className="minimal-modal-info-side">
                <div className="minimal-modal-meta-row">
                  <span className="minimal-modal-category-badge">
                    {activeModalPost.category}
                  </span>
                  <span className="minimal-modal-date-text">
                    {activeModalPost.date} &nbsp;•&nbsp; {activeModalPost.readTime}
                  </span>
                </div>

                <h2 className="minimal-modal-headline">
                  {activeModalPost.title}
                </h2>

                <div className="minimal-modal-divider" />

                <div className="minimal-modal-body-text">
                  {activeModalPost.content || activeModalPost.desc}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home;