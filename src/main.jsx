import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './nav-pages/Home.jsx';
import About from './nav-pages/About.jsx';
import Contact from './nav-pages/Contact.jsx';
import Partnership from './nav-pages/Partnership.jsx';
import './index.css';

function MainApp() {
  // Track which view state is active
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <React.StrictMode>
      {/* Pass the state variable and set state function to the Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'partnership' && <Partnership />}
      </main>

      <Footer />
    </React.StrictMode>
  );
}

// Mount our managing component to the root HTML div
ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);