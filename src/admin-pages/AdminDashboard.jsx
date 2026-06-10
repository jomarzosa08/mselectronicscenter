// src/admin-pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { database, auth } from "../firebase.js";
import { ref, onValue, remove, push, set } from "firebase/database";
import "./AdminDashboard.css";

function AdminDashboard({ setCurrentPage }) {
  const [inquiries, setInquiries] = useState([]);
  const [updates, setUpdates] = useState([]); 
  const [galleryItems, setGalleryItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Journal form states
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState(""); 
  const [postCategory, setPostCategory] = useState("Communication");
  
  // Dedicated Expertise Gallery States
  const [galleryServiceTarget, setGalleryServiceTarget] = useState("srv1");
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImagePool, setGalleryImagePool] = useState([]);
  const [galleryLinkInput, setGalleryLinkInput] = useState("");
  const [gallerySourceType, setGallerySourceType] = useState("link");
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  // Date configuration state
  const [postDate, setPostDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Journal Image Selection Arrays
  const [imageSourceType, setImageSourceType] = useState("link"); 
  const [imagePool, setImagePool] = useState([]); 
  const [singleLinkInput, setSingleLinkInput] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Core Service Mapping Dictionary Reference
  const servicesList = [
    { id: 'srv1', title: 'Digital/Analog Trunking Repeater System' },
    { id: 'srv2', title: 'Solar Panel Systems' },
    { id: 'srv3', title: 'Street Light Systems' },
    { id: 'srv4', title: 'CCTV Camera Installation' },
    { id: 'srv5', title: 'Wireless Radio Installation' },
    { id: 'srv6', title: 'Field Equipments & Products' }
  ];

  // Clean Real-Time Stream Synchronization Effect Block
  useEffect(() => {
    const contactRef = ref(database, "contacts");
    const updatesRef = ref(database, "updates");
    const galleryRef = ref(database, "expertise_gallery"); 
    
    let contactsLoaded = false;
    let updatesLoaded = false;
    let galleryLoaded = false;

    const checkLoadingState = () => {
      if (contactsLoaded && updatesLoaded && galleryLoaded) {
        setLoading(false);
      }
    };

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
      contactsLoaded = true;
      checkLoadingState();
    }, (error) => {
      console.error(error);
      contactsLoaded = true;
      checkLoadingState();
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
      updatesLoaded = true;
      checkLoadingState();
    }, (error) => {
      console.error(error);
      updatesLoaded = true;
      checkLoadingState();
    });

    const unsubscribeGallery = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedGallery = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setGalleryItems(formattedGallery.reverse());
      } else {
        setGalleryItems([]);
      }
      galleryLoaded = true;
      checkLoadingState();
    }, (error) => {
      console.error(error);
      galleryLoaded = true;
      checkLoadingState();
    });

    return () => {
      unsubscribeContacts();
      unsubscribeUpdates();
      unsubscribeGallery();
    };
  }, []);

  // Enhanced utility logic to compress images tightly using HTML5 Canvas
  const compressImageFile = (file, mode = 'journal') => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          // Downscale resolutions aggressively for the layout galleries to preserve database limits
          const MAX_WIDTH = mode === 'gallery' ? 800 : 1000; 
          const MAX_HEIGHT = mode === 'gallery' ? 600 : 750;
          const compressionQuality = mode === 'gallery' ? 0.4 : 0.6; 

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

          const compressedDataUrl = canvas.toDataURL("image/jpeg", compressionQuality);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  const handleMultipleImageUpload = async (e, mode = 'journal') => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const crunchedBase64 = await compressImageFile(file, mode);
        if (mode === 'gallery') {
          setGalleryImagePool((prev) => [...prev, crunchedBase64]);
        } else {
          setImagePool((prev) => [...prev, crunchedBase64]);
        }
      } catch (err) {
        console.error("Compression glitch: ", err);
      }
    }
    e.target.value = null; 
  };

  const appendImageLinkToPool = (mode = 'journal') => {
    if (mode === 'gallery') {
      if (!galleryLinkInput.trim()) return;
      setGalleryImagePool((prev) => [...prev, galleryLinkInput.trim()]);
      setGalleryLinkInput("");
    } else {
      if (!singleLinkInput.trim()) return;
      setImagePool((prev) => [...prev, singleLinkInput.trim()]);
      setSingleLinkInput("");
    }
  };

  const removeImageFromPool = (indexToRemove, mode = 'journal') => {
    if (mode === 'gallery') {
      setGalleryImagePool((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    } else {
      setImagePool((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postTitle.trim()) { alert("Please populate the journal title heading."); return; }

    setIsPublishing(true);
    try {
      const updatesRef = ref(database, "updates");
      const newPostRef = push(updatesRef);

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
        content: cleanContent, 
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
      alert("Failed to commit post entry.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUploadExpertiseGallery = async (e) => {
    e.preventDefault();
    if (galleryImagePool.length === 0) {
      alert("Please upload or paste at least one snapshot photo.");
      return;
    }

    setIsUploadingGallery(true);
    try {
      const galleryRef = ref(database, "expertise_gallery");
      const newGalleryItemRef = push(galleryRef);

      await set(newGalleryItemRef, {
        serviceId: galleryServiceTarget,
        title: galleryTitle.trim() || "Operational Field Deployment",
        images: galleryImagePool,
        timestamp: Date.now()
      });

      setGalleryTitle("");
      setGalleryImagePool([]);
      alert("Images deployed directly to Expertise page grid!");
    } catch (err) {
      alert("Cloud database submission error.");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to remove this journal article permanently?")) {
      try { await remove(ref(database, `updates/${id}`)); } catch (err) { alert("Operation failed."); }
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm("Remove this asset batch from the Expertise subpage?")) {
      try { await remove(ref(database, `expertise_gallery/${id}`)); } catch (err) { alert("Operation failed."); }
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Are you sure you want to dismiss this client message?")) {
      try { await remove(ref(database, `contacts/${id}`)); } catch (err) { alert("Error deleting message."); }
    }
  };

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="admin-loading-screen" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#0f172a', color:'#fff'}}>
        <div className="spinner">Optimizing Terminal Connection Matrix...</div>
      </div>
    );
  }

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
          <button className={`nav-item-btn ${activeTab === "expertise_gallery" ? "active" : ""}`} onClick={() => switchTab("expertise_gallery")}>
            🖼️ Expertise Photo Gallery ({galleryItems.length})
          </button>
          <button className={`nav-item-btn ${activeTab === "inquiries" ? "active" : ""}`} onClick={() => switchTab("inquiries")}>
            ✉️ Client Inquiries ({inquiries.length})
          </button>
        </nav>

        <button onClick={async () => { try { await auth.signOut(); setCurrentPage("home"); } catch(e) { console.error(e); } }} className="sidebar-logout-btn">
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
                    <h4>Gallery Deployments</h4>
                    <p className="metric-value">{galleryItems.length}</p>
                  </div>
                  <div className="metric-card">
                    <h4>Pending Inquiries</h4>
                    <p className="metric-value">{inquiries.length}</p>
                  </div>
                </div>
                <div className="system-notice-box">
                  <h3>Master Control Terminal Active</h3>
                  <p>Publish field reports through the **Journal Publisher**, or deploy compressed job execution photos using the **Expertise Photo Gallery** management matrix.</p>
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
                      <input type="text" placeholder="e.g., Barangay Wireless Radio Network Deployment..." value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
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
                      <input type="date" value={postDate} onChange={(e) => setPostDate(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-input-block image-interaction-box">
                    <label>Display Card Image Cover Repository ({imagePool.length} Loaded)</label>
                    <div className="image-toggle-selector">
                      <button type="button" className={`toggle-sub-btn ${imageSourceType === 'link' ? 'active-toggle' : ''}`} onClick={() => setImageSourceType('link')}>🔗 Add Images Via URL Link</button>
                      <button type="button" className={`toggle-sub-btn ${imageSourceType === 'file' ? 'active-toggle' : ''}`} onClick={() => setImageSourceType('file')}>📁 Batch Upload File Attachments</button>
                    </div>
                    {imageSourceType === 'link' ? (
                      <div className="link-append-responsive-row">
                        <input type="text" placeholder="Paste web address image destination..." value={singleLinkInput} onChange={(e) => setSingleLinkInput(e.target.value)} className="link-url-input" />
                        <button type="button" onClick={() => appendImageLinkToPool('journal')} className="append-pool-btn">＋ Add Link</button>
                      </div>
                    ) : (
                      <div className="custom-file-upload-wrapper"><label className="file-dropzone-mask"><input type="file" accept="image/*" multiple onChange={(e) => handleMultipleImageUpload(e, 'journal')} style={{ display: 'none' }} /><span>Click here to select files — Auto-compressed to JPEGs safely!</span></label></div>
                    )}
                    {imagePool.length > 0 && (
                      <div className="multitask-image-preview-wrapper">
                        <div className="preview-thumbnails-grid">
                          {imagePool.map((imgSrc, index) => (
                            <div key={index} className="thumbnail-card-wrapper">
                              <img src={imgSrc} alt="" />
                              <button type="button" className="clear-thumb-idx-btn" onClick={() => removeImageFromPool(index, 'journal')}>✕</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-input-block">
                    <label>Article Context / Content Paragraph Body</label>
                    <textarea rows="6" placeholder="Write detailed summaries here..." value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                  </div>
                  <button type="submit" disabled={isPublishing} className="form-submit-btn">{isPublishing ? "Syncing Firebase Nodes..." : "🚀 Broadcast to Public Journal"}</button>
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
                        {post.images && post.images.length > 0 && <img src={post.images[0]} alt="" style={{width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />}
                        <div>
                          <h4 style={{color: '#fff', fontSize: '15px', margin: '0 0 4px 0'}}>{post.title}</h4>
                          <p style={{fontSize: '12px', color: '#94a3b8', margin: 0}}>{post.date} • {post.readTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERTISE GALLERY SYSTEM TAB */}
            {activeTab === "expertise_gallery" && (
              <div className="publish-pane">
                <h3>Direct Upload to Field Expertise View</h3>
                <p style={{color: '#94a3b8', fontSize: '13px', marginBottom: '20px'}}>Images loaded here automatically map and sync directly to the selected service tab inside the public view.</p>
                
                <form onSubmit={handleUploadExpertiseGallery} className="admin-creation-form">
                  <div className="form-group-row">
                    <div className="form-input-block">
                      <label>Select Target Page Service Layout Category</label>
                      <select value={galleryServiceTarget} onChange={(e) => setGalleryServiceTarget(e.target.value)}>
                        {servicesList.map(srv => (
                          <option key={srv.id} value={srv.id}>{srv.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-input-block">
                      <label>Label / Title Description (Optional)</label>
                      <input type="text" placeholder="e.g., Tower Maintenance Site Inspection..." value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-input-block image-interaction-box">
                    <label>Select Gallery Photos ({galleryImagePool.length} Loaded)</label>
                    <div className="image-toggle-selector">
                      <button type="button" className={`toggle-sub-btn ${gallerySourceType === 'link' ? 'active-toggle' : ''}`} onClick={() => setGallerySourceType('link')}>🔗 Add URL Links</button>
                      <button type="button" className={`toggle-sub-btn ${gallerySourceType === 'file' ? 'active-toggle' : ''}`} onClick={() => setGallerySourceType('file')}>📁 Local File Upload</button>
                    </div>

                    {gallerySourceType === 'link' ? (
                      <div className="link-append-responsive-row">
                        <input type="text" placeholder="Paste web address image destination URL..." value={galleryLinkInput} onChange={(e) => setGalleryLinkInput(e.target.value)} className="link-url-input" />
                        <button type="button" onClick={() => appendImageLinkToPool('gallery')} className="append-pool-btn">＋ Inject Link</button>
                      </div>
                    ) : (
                      <div className="custom-file-upload-wrapper"><label className="file-dropzone-mask"><input type="file" accept="image/*" multiple onChange={(e) => handleMultipleImageUpload(e, 'gallery')} style={{ display: 'none' }} /><span>Click here to select photos — Space Saver Compression Enabled</span></label></div>
                    )}

                    {galleryImagePool.length > 0 && (
                      <div className="multitask-image-preview-wrapper">
                        <div className="preview-thumbnails-grid">
                          {galleryImagePool.map((imgSrc, index) => (
                            <div key={index} className="thumbnail-card-wrapper">
                              <img src={imgSrc} alt="" />
                              <button type="button" className="clear-thumb-idx-btn" onClick={() => removeImageFromPool(index, 'gallery')}>✕</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={isUploadingGallery} className="form-submit-btn">
                    {isUploadingGallery ? "Compressing & Syncing Elements..." : "🖼️ Deploy Images to Expertise Sub-View"}
                  </button>
                </form>

                <hr className="section-divider" />
                <h3>Live Asset Registry Grid ({galleryItems.length})</h3>
                <div className="inquiries-stack">
                  {galleryItems.map((item) => {
                    const matchedService = servicesList.find(s => s.id === item.serviceId);
                    return (
                      <div key={item.id} className="inquiry-data-card">
                        <div className="card-meta-row">
                          <span className="update-badge-label" style={{background: '#10b981', color: '#fff'}}>
                            {matchedService ? matchedService.title : "General Layout Element"}
                          </span>
                          <button onClick={() => handleDeleteGalleryItem(item.id)} className="delete-record-btn">Purge ×</button>
                        </div>
                        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px'}}>
                          {item.images && item.images.map((img, i) => (
                            <img key={i} src={img} alt="" style={{width: '70px', height: '55px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #334155'}} />
                          ))}
                        </div>
                        <p style={{margin: '8px 0 0 0', fontSize: '13px', color: '#94a3b8'}}>Label: <strong>{item.title}</strong></p>
                      </div>
                    );
                  })}
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

          <footer className="admin-dashboard-footer">
            <div className="footer-left"><span>© {new Date().getFullYear()} MS Electronics Center. All rights reserved.</span></div>
            <div className="footer-right"><span className="version-tag">System Version 2.2.0</span><span className="footer-separator">•</span><span className="status-label-glow">Database Secure</span></div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;