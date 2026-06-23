import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './nav-pages/Home.jsx';
import About from './nav-pages/About.jsx';
import Contact from './nav-pages/Contact.jsx';
import Partnership from './nav-pages/Partnership.jsx';
import ExpertisePage from './fields-pages/ExpertisePage.jsx'; 
import Login from './admin-pages/Login.jsx'; 
import AdminDashboard from './admin-pages/AdminDashboard.jsx';
import './index.css';

function MainApp() {
  // Initialize state by checking localStorage first so views persist across browser refreshes
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('ms_current_page') || 'home';
  });

  // Global state holding selected item to route safely to the sidebar viewport
  const [selectedServiceId, setSelectedServiceId] = useState(() => {
    return localStorage.getItem('ms_active_service_id') || 'srv1';
  });

  // Automatically synchronize runtime page shifts to storage vectors
  useEffect(() => {
    localStorage.setItem('ms_current_page', currentPage);
  }, [currentPage]);

  // Sync active expertise category selection to keep tabs intact on refresh
  useEffect(() => {
    localStorage.setItem('ms_active_service_id', selectedServiceId);
  }, [selectedServiceId]);

  // Helper variables to determine when to hide global public headers/footers
  const isAdminView = currentPage === 'login' || currentPage === 'admin-dashboard';

  // Streamlined source of truth mapping array (Metadata now fetched from Firebase database context)
  const services = [
    { id: 'srv1', title: 'Digital/Analog Trunking Repeater System' },
    { id: 'srv2', title: 'Solar Panel Systems' },
    { id: 'srv3', title: 'Street Light Systems' },
    { id: 'srv4', title: 'CCTV Camera Installation' },
    { id: 'srv5', title: 'Wireless Radio Installation' },
    { id: 'srv6', title: 'Field Equipments & Products' }
  ];

  return (
    <React.StrictMode>
      {/* Render Header only if NOT in an administrative control screen */}
      {!isAdminView && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      
      {/* Dynamic class layout wrapping content scopes */}
      <main className={isAdminView ? "admin-isolated-view" : "public-view"}>
        {currentPage === 'home' && (
          <Home 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        )}
        {currentPage === 'about' && <About setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'partnership' && <Partnership />}
        
        {/* Render split template layout */}
        {currentPage === 'expertise' && (
          <ExpertisePage 
            services={services}
            activeServiceId={selectedServiceId}
            setActiveServiceId={setSelectedServiceId}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* CONDITIONAL ROUTING LINKS FOR ADMIN MODULES */}
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'admin-dashboard' && <AdminDashboard setCurrentPage={setCurrentPage} />}
      </main>

      {/* Render global footer ONLY if not on admin dashboard AND not viewing the nested sidebar */}
      {!isAdminView && currentPage !== 'expertise' && <Footer />}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);