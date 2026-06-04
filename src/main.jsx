import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './nav-pages/Home.jsx';
import About from './nav-pages/About.jsx';
import Contact from './nav-pages/Contact.jsx';
import Partnership from './nav-pages/Partnership.jsx';
import Repeater from './fields-pages/Repeater.jsx'; // Import the newly mounted Repeater page
import './index.css';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <React.StrictMode>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'partnership' && <Partnership />}
        
        {/* Dynamic Entry point for your customized fields views */}
        {currentPage === 'repeater' && <Repeater setCurrentPage={setCurrentPage} />}
      </main>

      <Footer />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);