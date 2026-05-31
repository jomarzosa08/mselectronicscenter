import { useState, useEffect } from 'react'
import './App.css'

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Synchronize dark theme state across the DOM element tree
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <header className="navbar reveal fade-in active">
      <div className="nav-left">
        <img 
          src="https://mselectronicscenter.com/wp-content/uploads/2024/04/profile-picture-2.png?w=1440&h=1440" 
          alt="MS Electronics Logo" 
          className="logo-img"
        />
        <div className="brand">
          <h2>MS Electronics Center</h2>
          <p>Cebu's Trusted Electronics Specialist</p>
        </div>
      </div>

      <div className="nav-actions">
        <button 
          id="darkToggle" 
          className="dark-toggle" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button 
          className={`hamburger ${isNavOpen ? 'active' : ''}`}
          onClick={() => setIsNavOpen(!isNavOpen)} 
          aria-label="Menu Open"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`nav-links ${isNavOpen ? 'open' : ''}`} id="nav-links">
        <a href="home.html" className="active-nav" onClick={() => setIsNavOpen(false)}>Home</a>
        <a href="about.html" onClick={() => setIsNavOpen(false)}>About Us</a>
        <a href="contact.html" onClick={() => setIsNavOpen(false)}>Contact Us</a>
        <a href="#" onClick={() => setIsNavOpen(false)}>Products</a>
        <a href="partnership.html" onClick={() => setIsNavOpen(false)}>Partnership</a>
      </nav>
    </header>
  )
}

export default Header