// src/admin-pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { database, auth } from "../firebase.js";
import { ref, onValue, remove, push, set } from "firebase/database";
import { signOut } from "firebase/auth";
import "./AdminDashboard.css";

function AdminDashboard({ setCurrentPage }) {
  const [inquiries, setInquiries] = useState([]);
  const [updates, setUpdates] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Journal form states
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState(""); // Optional field
  const [postCategory, setPostCategory] = useState("Communication");
  
  // Date configuration state (Defaults to today yyyy-mm-dd format natively)
  const [postDate, setPostDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Multitasking Multiple Image Selection Arrays
  const [imageSourceType, setImageSourceType] = useState("link"); 
  const [imagePool, setImagePool] = useState([]); // Dynamic collection array holding image paths
  const [singleLinkInput, setSingleLinkInput] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    const contactRef = ref(database, "contacts");
    const updatesRef = ref(database, "updates");
    
    const unsubscribeContacts = onValue(contactRef, (snapshot) => {
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
    });

    const unsubscribeUpdates = onValue(updatesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedUpdates = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUpdates(formattedUpdates.reverse()); 
      } else {
        setUpdates([]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeContacts();
      unsubscribeUpdates();
    };
  }, []);

  // Utility logic to compress images using HTML5 Canvas
  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          // Set maximum dimensional constraint thresholds for fluid rendering
          const MAX_WIDTH = 1000; 
          const MAX_HEIGHT = 750;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Export as compressed image/jpeg at 0.6 quality value parameter 
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  // Multi-image file extractor engine with integrated compressor stream
  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      try {
        const crunchedBase64 = await compressImageFile(file);
        setImagePool((prev) => [...prev, crunchedBase64]);
      } catch (err) {
        console.error("Compression processing glitch: ", err);
      }
    }
    e.target.value = null; // Flush input node target
  };

  const appendImageLinkToPool = () => {
    if (!singleLinkInput.trim()) return;
    setImagePool((prev) => [...prev, singleLinkInput.trim()]);
    setSingleLinkInput("");
  };

  const removeImageFromPool = (indexToRemove) => {
    setImagePool((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    // CONTENT REMOVED FROM THIS CONDITIONAL CHECK -> IT IS NOW OPTIONAL
    if (!postTitle.trim()) {
      alert("Please populate the journal title heading.");
      return;
    }

    setIsPublishing(true);
    try {
      const updatesRef = ref(database, "updates");
      const newPostRef = push(updatesRef);

      // Read time computation logic with fallback for empty/short texts
      let finalReadTimeStr = "1 min read";
      const cleanContent = postContent.trim();
      
      if (cleanContent) {
        const wordsPerMinute = 200; 
        const wordCount = cleanContent.split(/\s+/).length;
        const computedMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        finalReadTimeStr = `${computedMinutes} min read`;
      }

      const dateParts = postDate.split("-");
      const cleanFormattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
        .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      await set(newPostRef, {
        title: postTitle,
        content: cleanContent, // Saves as pristine text or empty string "" safely
        category: postCategory.toUpperCase(),
        readTime: finalReadTimeStr, 
        images: imagePool.length > 0 ? imagePool : ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"], 
        date: cleanFormattedDate,
        timestamp: Date.now()
      });

      setPostTitle("");
      setPostContent("");
      setImagePool([]);
      alert("Journal card committed successfully!");
    } catch (err) {
      alert("Failed to commit post node entry to cloud cluster.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to remove this journal article permanently?")) {
      try { await remove(ref(database, `updates/${id}`)); } catch (err) { alert("Operation failed."); }
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Are you sure you want to dismiss this client message?")) {
      try { await remove(ref(database, `contacts/${id}`)); } catch (err) { alert("Verification clearance error."); }
    }
  };

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="dashboard-layout-container">
      
      {/* MOBILE HEADER BAR */}
      <div className="mobile-top-bar">
        <button className="mobile-hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
        <div className="mobile-bar-title">
          <h3>MS Electronics Center</h3>
          <span className="system-tag">Console</span>
        </div>
        <div className="mobile-status-dot"></div>
      </div>

      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? "drawer-open" : ""}`}>
        <div className="sidebar-branding">
          <div className="brand-shield">📡</div>
          <div>
            <h3>MS Electronics Center</h3>
            <span className="system-tag">Admin Console</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => switchTab("overview")}>
            📊 System Overview
          </button>
          <button className={`nav-item-btn ${activeTab === "publish" ? "active" : ""}`} onClick={() => switchTab("publish")}>
            📢 Journal Publisher ({updates.length})
          </button>
          <button className={`nav-item-btn ${activeTab === "inquiries" ? "active" : ""}`} onClick={() => switchTab("inquiries")}>
            ✉️ Client Inquiries ({inquiries.length})
          </button>
        </nav>

        <button onClick={() => { auth.signOut(); setCurrentPage("home"); }} className="sidebar-logout-btn">
          🚪 Terminate Session
        </button>
      </aside>

      {/* PRIMARY CONSOLE MONITOR AREA */}
      <main className="dashboard-workspace">
        <header className="workspace-header">
          <h2>Administrative Command Center</h2>
          <div className="user-badge-profile">
            <span className="status-indicator-dot"></span>Active Admin Session
          </div>
        </header>

        <div className="workspace-scroll-grid">
          <div className="workspace-content-body">
            {activeTab === "overview" && (
              <div className="overview-pane">
                <div className="metrics-grid">
                  <div className="metric-card">
                    <h4>Published Articles</h4>
                    <p className="metric-value">{updates.length}</p>
                  </div>
                  <div className="metric-card">
                    <h4>Pending Inquiries</h4>
                    <p className="metric-value">{inquiries.length}</p>
                  </div>
                  <div className="metric-card">
                    <h4>Database Sync Status</h4>
                    <p className="metric-value static-success">ONLINE</p>
                  </div>
                </div>
                <div className="system-notice-box">
                  <h3>Journal Dispatch Console Active</h3>
                  <p>Post system revisions, field engineering reports, or telecom updates. Articles match the dynamic card layout formatting on the public front-end.</p>
                </div>
              </div>
            )}

            {activeTab === "publish" && (
              <div className="publish-pane">
                <h3>Publish Live Field Report / Update</h3>
                
                <form onSubmit={handleCreatePost} className="admin-creation-form">
                  <div className="form-group-row">
                    <div className="form-input-block">
                      <label>Article Heading / Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Barangay Wireless Radio Network Deployment..."
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-input-block">
                      <label>Tag Category Selection</label>
                      <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)}>
                        <option value="Communication">Communication</option>
                        <option value="Surveillance">Surveillance</option>
                        <option value="Signal Boosting">Signal Boosting</option>
                        <option value="Renewable Energy">Renewable Energy</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Partnerships">Partnerships</option>
                      </select>
                    </div>
                    <div className="form-input-block">
                      <label>Publication Target Date</label>
                      <input 
                        type="date" 
                        value={postDate}
                        onChange={(e) => setPostDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* ADVANCED MULTIPLE IMAGE INTERACTION MODULE */}
                  <div className="form-input-block image-interaction-box">
                    <label>Display Card Image Cover Repository ({imagePool.length} Loaded)</label>
                    <div className="image-toggle-selector">
                      <button 
                        type="button"
                        className={`toggle-sub-btn ${imageSourceType === 'link' ? 'active-toggle' : ''}`}
                        onClick={() => setImageSourceType('link')}
                      >
                        🔗 Add Images Via URL Link
                      </button>
                      <button 
                        type="button"
                        className={`toggle-sub-btn ${imageSourceType === 'file' ? 'active-toggle' : ''}`}
                        onClick={() => setImageSourceType('file')}
                      >
                        📁 Batch Upload File Attachments
                      </button>
                    </div>

                    {imageSourceType === 'link' ? (
                      <div className="link-append-responsive-row">
                        <input 
                          type="text" 
                          placeholder="Paste web address image destination..."
                          value={singleLinkInput}
                          onChange={(e) => setSingleLinkInput(e.target.value)}
                          className="link-url-input"
                        />
                        <button type="button" onClick={appendImageLinkToPool} className="append-pool-btn">
                          ＋ Add Link
                        </button>
                      </div>
                    ) : (
                      <div className="custom-file-upload-wrapper">
                        <label className="file-dropzone-mask">
                          <input 
                            type="file" 
                            accept="image/*"
                            multiple
                            onChange={handleMultipleImageUpload}
                            style={{ display: 'none' }}
                          />
                          <span>Click here to select files — Auto-compressed to JPEGs safely!</span>
                        </label>
                      </div>
                    )}

                    {/* Dynamic Thumbnails Preview */}
                    {imagePool.length > 0 && (
                      <div className="multitask-image-preview-wrapper">
                        <p className="preview-lbl">Active Media Array Queue (First item serves as primary cover):</p>
                        <div className="preview-thumbnails-grid">
                          {imagePool.map((imgSrc, index) => (
                            <div key={index} className="thumbnail-card-wrapper">
                              <img src={imgSrc} alt="Queued compressed chunk metadata" />
                              <button type="button" className="clear-thumb-idx-btn" onClick={() => removeImageFromPool(index)}>
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-input-block">
                    <label>Article Context / Content Paragraph Body <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 'normal' }}>(Optional)</span></label>
                    <textarea 
                      rows="6" 
                      placeholder="Write detailed summaries here (Leave blank if you only want to post images/title)..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isPublishing} className="form-submit-btn">
                    {isPublishing ? "Syncing Firebase Nodes..." : "🚀 Broadcast to Public Journal"}
                  </button>
                </form>

                <hr className="section-divider" />

                <h3>Currently Active Journal Stream ({updates.length})</h3>
                <div className="inquiries-stack">
                  {updates.map((post) => (
                    <div key={post.id} className="inquiry-data-card">
                      <div className="card-meta-row">
                        <span className="update-badge-label" style={{background: '#3b82f6', color: '#fff'}}>{post.category}</span>
                        <button onClick={() => handleDeletePost(post.id)} className="delete-record-btn">Purge Entry ×</button>
                      </div>
                      <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginTop: '10px'}}>
                        {post.images && post.images.length > 0 && (
                          <img src={post.images[0]} alt="" style={{width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                        )}
                        <div>
                          <h4 style={{color: '#fff', fontSize: '15px', margin: '0 0 4px 0'}}>{post.title}</h4>
                          <p style={{fontSize: '12px', color: '#94a3b8', margin: 0}}>{post.date} • {post.readTime} ({post.images ? post.images.length : 1} photos)</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "inquiries" && (
              <div className="inquiries-pane">
                <h3>Client Inquiries Node</h3>
                <div className="inquiries-stack">
                  {inquiries.map((item) => (
                    <div key={item.id} className="inquiry-data-card">
                      <div className="card-meta-row">
                        <span className="client-name">👤 {item.name || "Guest User"}</span>
                        <button className="delete-record-btn" onClick={() => handleDeleteInquiry(item.id)}>Dismiss ×</button>
                      </div>
                      <div className="card-contact-details">
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Subject:</strong> {item.subject}</p>
                      </div>
                      <div className="card-message-body"><p>{item.message}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ADMIN CONSOLE SYSTEM FOOTER */}
          <footer className="admin-dashboard-footer">
            <div className="footer-left">
              <span>© {new Date().getFullYear()} MS Electronics Center. All rights reserved.</span>
            </div>
            <div className="footer-right">
              <span className="version-tag">System Version 2.1.0</span>
              <span className="footer-separator">•</span>
              <span className="status-label-glow">Database Secure</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;