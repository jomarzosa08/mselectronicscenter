import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('home');
  // Global state holding selected item to route safely to the sidebar viewport
  const [selectedServiceId, setSelectedServiceId] = useState('srv1');

  // Helper variables to determine when to hide global public headers/footers
  const isAdminView = currentPage === 'login' || currentPage === 'admin-dashboard';

  // Centralized single source of truth data array mapping fields configurations
  // Inside your MainApp component, update the services array:
const services = [
  { 
    id: 'srv1', 
    title: 'Digital/Analog Trunking Repeater System', 
    img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7803.jpeg',
    leadText: 'MS Electronics Center provides high-quality installations and end-to-end engineered system configurations for Digital/Analog Trunking Repeater Systems across operations in the Philippines.',
    locations: [
      {
        name: 'Manunggal, Cebu',
        description: 'The image depicts the towering structure of our repeater system installation in Manunggal, Cebu. Rising against the backdrop of lush greenery, the sturdy tower stands as a testament to our commitment to providing robust communication solutions in remote areas.'
      },
      {
        name: 'Busay, Cebu',
        description: 'The image captures the towering structure of our repeater system installation located in Busay, Cebu. Standing prominently against the skyline, the tower serves as the backbone of our communication network, facilitating seamless transmission of signals across vast distances.'
      }
    ],
    functions: [
      { title: 'Signal Amplification', text: 'The repeater system amplifies incoming signals, enhancing their strength and clarity, thus extending communication coverage across vast areas.' },
      { title: 'Relay Station', text: 'Acting as a relay station, the tower receives signals from radios and transmits them over longer distances, facilitating seamless communication between users situated far apart.' },
      { title: 'Network Expansion', text: 'By extending the reach of radio signals, the repeater system facilitates network expansion into previously inaccessible or underserved areas, improving connectivity for communities and organizations.' },
      { title: 'Emergency Communication', text: 'In remote or rugged terrain like Manunggal, where conventional communication infrastructure may be limited, the repeater system ensures reliable communication channels, crucial for emergency response and public safety.' },
      { title: 'Scalability', text: 'The tower’s design allows for scalability, accommodating future upgrades and additional equipment to meet evolving communication needs in the region.' }
    ]
  },
  { 
    id: 'srv2', 
    title: 'Solar Panel Systems', 
    img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_5723.jpeg?w=NaN&h=',
    leadText: 'MS Electronics Center provides high-quality installations and end-to-end engineered system configurations for Solar Panel Systems across operations in the Philippines.',
    locations: [
      {
        name: 'Manunggal, Cebu',
        description: 'The image depicts the towering structure of our repeater system installation in Manunggal, Cebu. Rising against the backdrop of lush greenery, the sturdy tower stands as a testament to our commitment to providing robust communication solutions in remote areas.'
      },
      {
        name: 'Busay, Cebu',
        description: 'The image captures the towering structure of our repeater system installation located in Busay, Cebu. Standing prominently against the skyline, the tower serves as the backbone of our communication network, facilitating seamless transmission of signals across vast distances.'
      }
    ],
    functions: [
      { title: 'Signal Amplification', text: 'The repeater system amplifies incoming signals, enhancing their strength and clarity, thus extending communication coverage across vast areas.' },
      { title: 'Relay Station', text: 'Acting as a relay station, the tower receives signals from radios and transmits them over longer distances, facilitating seamless communication between users situated far apart.' },
      { title: 'Network Expansion', text: 'By extending the reach of radio signals, the repeater system facilitates network expansion into previously inaccessible or underserved areas, improving connectivity for communities and organizations.' },
      { title: 'Emergency Communication', text: 'In remote or rugged terrain like Manunggal, where conventional communication infrastructure may be limited, the repeater system ensures reliable communication channels, crucial for emergency response and public safety.' },
      { title: 'Scalability', text: 'The tower’s design allows for scalability, accommodating future upgrades and additional equipment to meet evolving communication needs in the region.' }
    ]
  },
  { 
    id: 'srv3', 
    title: 'Street Light Systems', 
    img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_6656-2.jpeg?w=2250&h=',
    leadText: 'MS Electronics Center provides high-quality installations and end-to-end engineered system configurations for Street Light Systems across operations in the Philippines.',
    locations: [
      {
        name: 'Manunggal, Cebu',
        description: 'The image depicts the towering structure of our repeater system installation in Manunggal, Cebu. Rising against the backdrop of lush greenery, the sturdy tower stands as a testament to our commitment to providing robust communication solutions in remote areas.'
      },
      {
        name: 'Busay, Cebu',
        description: 'The image captures the towering structure of our repeater system installation located in Busay, Cebu. Standing prominently against the skyline, the tower serves as the backbone of our communication network, facilitating seamless transmission of signals across vast distances.'
      }
    ],
    functions: [
      { title: 'Signal Amplification', text: 'The repeater system amplifies incoming signals, enhancing their strength and clarity, thus extending communication coverage across vast areas.' },
      { title: 'Relay Station', text: 'Acting as a relay station, the tower receives signals from radios and transmits them over longer distances, facilitating seamless communication between users situated far apart.' },
      { title: 'Network Expansion', text: 'By extending the reach of radio signals, the repeater system facilitates network expansion into previously inaccessible or underserved areas, improving connectivity for communities and organizations.' },
      { title: 'Emergency Communication', text: 'In remote or rugged terrain like Manunggal, where conventional communication infrastructure may be limited, the repeater system ensures reliable communication channels, crucial for emergency response and public safety.' },
      { title: 'Scalability', text: 'The tower’s design allows for scalability, accommodating future upgrades and additional equipment to meet evolving communication needs in the region.' }
    ]
  },
  { 
    id: 'srv4', 
    title: 'CCTV Camera Installation', 
    img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_0560.jpeg?w=NaN&h=',
    leadText: 'MS Electronics Center provides high-quality installations and end-to-end engineered system configurations for CCTV Camera Installations across operations in the Philippines.',
    locations: [
      {
        name: 'Manunggal, Cebu',
        description: 'The image depicts the towering structure of our repeater system installation in Manunggal, Cebu. Rising against the backdrop of lush greenery, the sturdy tower stands as a testament to our commitment to providing robust communication solutions in remote areas.'
      },
      {
        name: 'Busay, Cebu',
        description: 'The image captures the towering structure of our repeater system installation located in Busay, Cebu. Standing prominently against the skyline, the tower serves as the backbone of our communication network, facilitating seamless transmission of signals across vast distances.'
      }
    ],
    functions: [
      { title: 'Signal Amplification', text: 'The repeater system amplifies incoming signals, enhancing their strength and clarity, thus extending communication coverage across vast areas.' },
      { title: 'Relay Station', text: 'Acting as a relay station, the tower receives signals from radios and transmits them over longer distances, facilitating seamless communication between users situated far apart.' },
      { title: 'Network Expansion', text: 'By extending the reach of radio signals, the repeater system facilitates network expansion into previously inaccessible or underserved areas, improving connectivity for communities and organizations.' },
      { title: 'Emergency Communication', text: 'In remote or rugged terrain like Manunggal, where conventional communication infrastructure may be limited, the repeater system ensures reliable communication channels, crucial for emergency response and public safety.' },
      { title: 'Scalability', text: 'The tower’s design allows for scalability, accommodating future upgrades and additional equipment to meet evolving communication needs in the region.' }
    ]
  },
  { 
    id: 'srv5', 
    title: 'Wireless Radio Installation', 
    img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_8371.jpeg?w=NaN&h=',
    leadText: 'MS Electronics Center provides high-quality installations and end-to-end engineered system configurations for Wireless Radio Installations across operations in the Philippines.',
    locations: [
      {
        name: 'Manunggal, Cebu',
        description: 'The image depicts the towering structure of our repeater system installation in Manunggal, Cebu. Rising against the backdrop of lush greenery, the sturdy tower stands as a testament to our commitment to providing robust communication solutions in remote areas.'
      },
      {
        name: 'Busay, Cebu',
        description: 'The image captures the towering structure of our repeater system installation located in Busay, Cebu. Standing prominently against the skyline, the tower serves as the backbone of our communication network, facilitating seamless transmission of signals across vast distances.'
      }
    ],
    functions: [
      { title: 'Signal Amplification', text: 'The repeater system amplifies incoming signals, enhancing their strength and clarity, thus extending communication coverage across vast areas.' },
      { title: 'Relay Station', text: 'Acting as a relay station, the tower receives signals from radios and transmits them over longer distances, facilitating seamless communication between users situated far apart.' },
      { title: 'Network Expansion', text: 'By extending the reach of radio signals, the repeater system facilitates network expansion into previously inaccessible or underserved areas, improving connectivity for communities and organizations.' },
      { title: 'Emergency Communication', text: 'In remote or rugged terrain like Manunggal, where conventional communication infrastructure may be limited, the repeater system ensures reliable communication channels, crucial for emergency response and public safety.' },
      { title: 'Scalability', text: 'The tower’s design allows for scalability, accommodating future upgrades and additional equipment to meet evolving communication needs in the region.' }
    ]
  },
  { 
    id: 'srv6', 
    title: 'Field Equipments & Products', 
    img: 'https://mselectronicscenter.com/wp-content/uploads/2024/04/img_7562.jpeg?w=NaN&h=',
    leadText: 'MS Electronics Center provides high-quality installations and end-to-end engineered system configurations for Field Equipments & Products across operations in the Philippines.',
    locations: [
      {
        name: 'Manunggal, Cebu',
        description: 'The image depicts the towering structure of our repeater system installation in Manunggal, Cebu. Rising against the backdrop of lush greenery, the sturdy tower stands as a testament to our commitment to providing robust communication solutions in remote areas.'
      },
      {
        name: 'Busay, Cebu',
        description: 'The image captures the towering structure of our repeater system installation located in Busay, Cebu. Standing prominently against the skyline, the tower serves as the backbone of our communication network, facilitating seamless transmission of signals across vast distances.'
      }
    ],
    functions: [
      { title: 'Signal Amplification', text: 'The repeater system amplifies incoming signals, enhancing their strength and clarity, thus extending communication coverage across vast areas.' },
      { title: 'Relay Station', text: 'Acting as a relay station, the tower receives signals from radios and transmits them over longer distances, facilitating seamless communication between users situated far apart.' },
      { title: 'Network Expansion', text: 'By extending the reach of radio signals, the repeater system facilitates network expansion into previously inaccessible or underserved areas, improving connectivity for communities and organizations.' },
      { title: 'Emergency Communication', text: 'In remote or rugged terrain like Manunggal, where conventional communication infrastructure may be limited, the repeater system ensures reliable communication channels, crucial for emergency response and public safety.' },
      { title: 'Scalability', text: 'The tower’s design allows for scalability, accommodating future upgrades and additional equipment to meet evolving communication needs in the region.' }
    ]
  }
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
        
        {/* Render split template matching image_0438e6.png */}
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