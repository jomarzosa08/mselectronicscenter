// src/admin-pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { database, auth } from "../firebase.js";
import { ref, onValue, remove } from "firebase/database";
import { signOut } from "firebase/auth";
import "./AdminDashboard.css";

function AdminDashboard({ setCurrentPage }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Toggle state for mobile slide-out panel

  // Fetch submitted customer information logs from Firebase Realtime Database
  useEffect(() => {
    const contactRef = ref(database, "contacts");
    
    const unsubscribe = onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setInquiries(formattedData.reverse());
      } else {
        setInquiries([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Delete/Clear an inquiry record card safely
  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this client inquiry log permanently?")) {
      try {
        await remove(ref(database, `contacts/${id}`));
      } catch (err) {
        alert("Failed to delete record node. Verify administrative network clearances.");
      }
    }
  };

  // Secure Administrative Logout Termination Routine
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      console.error("System logout execution exception:", err);
    }
  };

  // Helper utility to switch views and auto-close drawer menu layout on mobile
  const switchTab = (tabName) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="dashboard-layout-container">
      
      {/* MOBILE HEADER BAR (Hidden on Desktop) */}
      <div className="mobile-top-bar">
        <button 
          className="mobile-hamburger-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
        <div className="mobile-bar-title">
          <h3>MS Electronics</h3>
          <span className="system-tag">Console</span>
        </div>
        <div className="mobile-status-dot"></div>
      </div>

      {/* OVERLAY GLASS LAYER FOR CLOSING DRAWER CONSOLE */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* SIDE CONTROL BAR MODULE (Transforms to sliding drawer panel on mobile) */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? "drawer-open" : ""}`}>
        <div className="sidebar-branding">
          <div className="brand-shield">📡</div>
          <div>
            <h3>MS Electronics</h3>
            <span className="system-tag">Admin Console</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => switchTab("overview")}
          >
            📊 System Overview
          </button>
          <button 
            className={`nav-item-btn ${activeTab === "inquiries" ? "active" : ""}`}
            onClick={() => switchTab("inquiries")}
          >
            ✉️ Client Inquiries ({inquiries.length})
          </button>
        </nav>

        <button onClick={handleLogout} className="sidebar-logout-btn">
          🚪 Terminate Session
        </button>
      </aside>

      {/* PRIMARY CONSOLE MONITOR LAYOUT PANEL */}
      <main className="dashboard-workspace">
        <header className="workspace-header">
          <h2>Administrative Command Center</h2>
          <div className="user-badge-profile">
            <span className="status-indicator-dot"></span>
            Active Root Node: <strong>Admin</strong>
          </div>
        </header>

        <div className="workspace-scroll-grid">
          {activeTab === "overview" && (
            <div className="overview-pane">
              <div className="metrics-grid">
                <div className="metric-card">
                  <h4>Total Received Inquiries</h4>
                  <p className="metric-value">{inquiries.length}</p>
                </div>
                <div className="metric-card">
                  <h4>Database Sync Status</h4>
                  <p className="metric-value static-success">ONLINE</p>
                </div>
              </div>
              
              <div className="system-notice-box">
                <h3>Welcome back, Administrator.</h3>
                <p>Use the panel options to view real-time form data submissions. Changes made here sync instantaneously with your live system endpoints.</p>
              </div>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="inquiries-pane">
              <h3>Customer Communications Node</h3>
              
              {loading ? (
                <div className="dashboard-fallback-msg">Streaming secure record streams...</div>
              ) : inquiries.length === 0 ? (
                <div className="dashboard-fallback-msg">No customer submissions logged in the database cluster.</div>
              ) : (
                <div className="inquiries-stack">
                  {inquiries.map((item) => (
                    <div key={item.id} className="inquiry-data-card">
                      <div className="card-meta-row">
                        <span className="client-name">👤 {item.name || "Anonymous Sender"}</span>
                        <button 
                          className="delete-record-btn"
                          onClick={() => handleDeleteInquiry(item.id)}
                          title="Purge record"
                        >
                          Delete Node ×
                        </button>
                      </div>
                      
                      <div className="card-contact-details">
                        <p><strong>Email:</strong> {item.email || "N/A"}</p>
                        <p><strong>Subject:</strong> {item.subject || "No Subject Given"}</p>
                      </div>
                      
                      <div className="card-message-body">
                        <p>{item.message || "No contextual text message provided by customer."}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;