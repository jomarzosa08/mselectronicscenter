import { useState, useEffect } from 'react'
import './index.css'

// CRITICAL: Ensure { currentPage, setCurrentPage } are listed inside the parentheses here!
function Header({ currentPage, setCurrentPage }) {
  // Lazy initialize state from localStorage to preserve dark mode toggle across browser refreshes
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('ms_dark_mode') === 'true';
  });
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('ms_dark_mode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('ms_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Custom click handler to tell main.jsx to change the view
  const handlePageSwitch = (e, targetPage) => {
    e.preventDefault(); // Keeps the page from doing a full refresh
    if (setCurrentPage) {
      setCurrentPage(targetPage); // Changes 'home' to 'about' or vice-versa
    }
    setIsNavOpen(false); // Closes mobile menu drawer
  }

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

      {/* Navigation links block synchronized with your clean state matrix */}
      <nav className={`nav-links ${isNavOpen ? 'open' : ''}`} id="nav-links">
        <a 
          href="#" 
          className={currentPage === 'home' ? 'active-nav' : ''} 
          onClick={(e) => handlePageSwitch(e, 'home')}
        >
          Home
        </a>
        <a 
          href="#" 
          className={currentPage === 'about' ? 'active-nav' : ''} 
          onClick={(e) => handlePageSwitch(e, 'about')}
        >
          About Us
        </a>
        <a 
          href="#" 
          className={currentPage === 'contact' ? 'active-nav' : ''} 
          onClick={(e) => handlePageSwitch(e, 'contact')}
        >
          Contact Us
        </a>
        <a
          href="#"
          className={currentPage === 'partnership' ? 'active-nav' : ''}
          onClick={(e) => handlePageSwitch(e, 'partnership')}
        >
          Partnerships
        </a>
      </nav>

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
    </header>
  )
}

export default Header