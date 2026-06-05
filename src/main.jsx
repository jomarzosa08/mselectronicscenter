import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './nav-pages/Home.jsx';
import About from './nav-pages/About.jsx';
import Contact from './nav-pages/Contact.jsx';
import Partnership from './nav-pages/Partnership.jsx';
import Repeater from './fields-pages/Repeater.jsx'; 
import Login from './admin-pages/Login.jsx'; 
import AdminDashboard from './admin-pages/AdminDashboard.jsx';
import './index.css';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');

  // Helper variables to determine when to hide global public headers/footers
  const isAdminView = currentPage === 'login' || currentPage === 'admin-dashboard';

  return (
    <React.StrictMode>
      {/* Render Header only if NOT in an administrative control screen */}
      {!isAdminView && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      
      <main>
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <About setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'partnership' && <Partnership />}
        
        {/* Dynamic Entry point for your customized fields views */}
        {currentPage === 'repeater' && <Repeater setCurrentPage={setCurrentPage} />}

        {/* 3. CONDITIONAL ROUTING LINKS FOR ADMIN MODULES */}
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'admin-dashboard' && <AdminDashboard setCurrentPage={setCurrentPage} />}
      </main>

      {/* Render Footer only if NOT in an administrative control screen */}
      {!isAdminView && <Footer />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);